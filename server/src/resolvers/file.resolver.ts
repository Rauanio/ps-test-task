import GraphQLUpload, { FileUpload } from 'graphql-upload/GraphQLUpload.mjs';
import { getPresignedUrl, uploadToS3 } from '../services/s3.js';
import { streamToBuffer } from '../utils/streamToBuffer.js';
import { FileModel } from '../models/file.js';
import { getRandomImageName } from '../utils/getRandomName.js';

const fileResolver = {
  Upload: GraphQLUpload,

  Query: {
    getFile: async (_: any, { id }: { id: string }) => {
      const file = await FileModel.findById(id);

      const url = await getPresignedUrl(file.filename);

      return url;
    },
  },

  Mutation: {
    uploadFile: async (_: any, { file }: { file: Promise<FileUpload> }) => {
      const { filename, mimetype, encoding, createReadStream } = await file;
      const stream = createReadStream();
      const buffer = await streamToBuffer(stream);
      const randomFilename = getRandomImageName();

      await uploadToS3(randomFilename, buffer, mimetype);

      const url = await getPresignedUrl(randomFilename);

      const savedFile = await FileModel.create({
        filename: randomFilename,
        mimetype,
        encoding,
      });

      return { id: savedFile.id, url };
    },
  },
};

export default fileResolver;
