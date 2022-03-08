import { Logger } from '@aws-lambda-powertools/logger';
import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';

const logger = new Logger();

export const handler: APIGatewayProxyHandler = async(event: APIGatewayEvent, context: Context) => {
  logger.addContext(context);

  logger.debug('This is a DEBUG log');
  logger.info('This is an INFO log');
  logger.warn('This is a WARN log');
  logger.error('This is an ERROR log');

  logger.info('Event received', { event: event });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};