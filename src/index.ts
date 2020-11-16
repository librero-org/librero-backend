import { server } from './frameworks-drivers/apollo-server';

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
