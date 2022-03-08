import { join } from 'path';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const gateway = new RestApi(this, 'powertools-ts', {
      restApiName: 'apigateway-powertooles-ts',
    });

    const lambda = new NodejsFunction(this, 'lambda', {
      entry: join(__dirname, 'lambda-fns/lambda.ts'),
      handler: 'handler',
      runtime: Runtime.NODEJS_14_X,
      environment: {
        POWERTOOLS_SERVICE_NAME: 'powertools-ts-service',
      },
      bundling: {
        minify: true,
      },
    });

    const integrationPost = new LambdaIntegration(lambda);

    const root = gateway.root;
    root.addMethod('POST', integrationPost);
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'powertools-ts-example', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();