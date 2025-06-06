import { gql } from '@/shared/__generated__';

export const UPLOAD_FILE = gql(`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      url
    }
  }
`);
