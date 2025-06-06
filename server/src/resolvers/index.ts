import fileResolver from './file.resolver.js';

export const resolvers = {
  Upload: fileResolver.Upload,
  Mutation: {
    ...fileResolver.Mutation,
    // другие мутации из других резолверов
  },
  Query: {
    ...fileResolver.Query,
    // другие Query
  },
};
