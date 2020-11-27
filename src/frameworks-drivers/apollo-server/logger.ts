/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Pino from 'pino';
import { GraphQLRequestContext, WithRequired } from 'apollo-server-types';
import {
  GraphQLRequestListener,
  ApolloServerPlugin,
} from 'apollo-server-plugin-base';

export const baseLogger = Pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  name: 'Librero Backend',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TContext = Record<string, any>;
export const loggerPlugin: ApolloServerPlugin<TContext> = {
  requestDidStart(
    requestContext: WithRequired<
      GraphQLRequestContext<TContext>,
      'request' | 'context' | 'logger'
    >,
  ): GraphQLRequestListener | void {
    if (requestContext.request.operationName === 'IntrospectionQuery') return;
    return {
      didResolveOperation({
        operationName,
        source,
        request,
        logger,
      }: WithRequired<
        GraphQLRequestContext<TContext>,
        | 'metrics'
        | 'source'
        | 'document'
        | 'operationName'
        | 'operation'
        | 'logger'
      >) {
        const lifecycle = 'didResolveOperation';
        logger.info({
          request,
          operationName,
          source,
          lifecycle,
          msg: 'Request',
        });
      },
      willSendResponse({
        response,
        errors,
        logger,
      }: WithRequired<
        GraphQLRequestContext<TContext>,
        'metrics' | 'response' | 'logger'
      >) {
        if (errors) return;
        const lifecycle = 'willSendResponse';
        logger.info({ response, lifecycle, msg: 'Send Response' });
      },
      didEncounterErrors({
        source,
        errors,
        logger,
      }: WithRequired<
        GraphQLRequestContext<TContext>,
        'metrics' | 'source' | 'errors' | 'logger'
      >) {
        const lifecycle = 'didEncounterErrors';
        logger.error({ source, errors, lifecycle, mg: 'Encountered Errors' });
        return;
      },
    };
  },
};
