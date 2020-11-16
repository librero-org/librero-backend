/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { GraphqlController } from '../../delivery/controllers';
import { Resolvers } from '../../generated/graphql';
export const resolvers: Resolvers = {
  Query: {
    hello: (): string => 'world',
  },
  Mutation: {
    sendContactEmail: async (
      _root,
      { data },
      { services },
    ): Promise<boolean> => {
      const result = await GraphqlController.sendContactEmail(
        services.emailer,
        data,
      );
      return result;
    },
  },
};
