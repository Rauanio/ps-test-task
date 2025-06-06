import { getModelForClass, prop } from '@typegoose/typegoose';

export class File {
  @prop({ required: true })
  filename!: string;

  @prop({ required: true })
  mimetype!: string;

  @prop({ required: true })
  encoding!: string;
}

export const FileModel = getModelForClass(File);
