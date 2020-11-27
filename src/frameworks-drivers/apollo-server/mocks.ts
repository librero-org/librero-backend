import { Book } from '../../generated/graphql';
import faker from 'faker';
import { MockList } from 'apollo-server';

export const mocks = {
  Book: (): Book => {
    return {
      id: faker.random.uuid(),
      title: faker.lorem.sentence(4),
      authors:
        faker.random.float({ min: 0.0, max: 1.0 }) > 0.3
          ? [faker.name.findName()]
          : [faker.name.findName(), faker.name.findName()],
      url: 'https://picsum.photos/260/400',
      coverUrl: 'https://picsum.photos/260/400',
    };
  },
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  Query: () => ({
    books: () => new MockList([6, 12]),
  }),
};
