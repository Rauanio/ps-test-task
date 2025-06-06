import { ApolloClient, InMemoryCache } from '@apollo/client';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import { CONFIG } from '../model/config';

export const client = new ApolloClient({
  link: createUploadLink({
    uri: CONFIG.API_BASE_URL,
  }),
  cache: new InMemoryCache(),
});
