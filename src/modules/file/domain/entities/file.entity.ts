export type FileDBType = {
  path: string;
  url?: string;
  mimetype: string;
  originalName: string;
  placeholder?: string;
  status?: StatusType;
  createdAt?: Date;
};
