import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const typesArray = loadFilesSync(path.join(__dirname, './**/*.gql'));
const definitions = mergeTypeDefs(typesArray).definitions.filter(
  (definition) => {
    if (definition.kind !== 'ScalarTypeDefinition') {
      return true;
    }
    return definition.name.value !== 'Upload';
  },
);
const typeDefs = { kind: 'Document' as const, definitions };

export default typeDefs;
