import { gql } from '@/shared/__generated__';

export const GET_FILE_BY_ID = gql(`
  query Query($getFileId: ID!) {
    getFile(id: $getFileId)
  }
`);
