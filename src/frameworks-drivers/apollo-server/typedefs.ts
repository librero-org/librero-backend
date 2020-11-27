import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

// Get schema form graphql-codegen output
// See ./graphql-codegen.yml
const typesArray = loadFilesSync('./graphql-schema.graphql');
const { definitions } = mergeTypeDefs(typesArray);

export const typeDefs = { kind: 'Document' as const, definitions };
