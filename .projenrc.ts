import { awscdk } from "projen";

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: "2.13.0",
  defaultReleaseBranch: "main",
  name: "powertools-ts-example",
  projenrcTs: true,

  authorName: "Marcio Cruz de Almeida",
  authorEmail: "marciocadev@gmail.com",
  repository: "git@github.com:marciocadev/powertools-ts-example.git",

  release: true,
  eslint: true,
  tsconfig: {
    compilerOptions: {
      lib: ['dom', 'es2019'],
    },
  },
});

project.addDeps("@types/aws-lambda");
project.addDeps("@aws-lambda-powertools/logger");

project.synth();