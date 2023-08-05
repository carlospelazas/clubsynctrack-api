import MulterGoogleCloudStorage from 'multer-google-storage';
import { v4 as uuidv4 } from 'uuid';

const StorageConfig = (): any => ({
  storage: new MulterGoogleCloudStorage({
    projectId: 'saas-392114',
    keyFilename: `service-account-key.json`,
    bucket: 'saas-media-files',
    filename: (req, file, cb) => {
      const fileNameSplit = file.originalname.split('.');
      const fileExt = fileNameSplit.pop();
      const fileName = `${uuidv4()}-${Date.now()}.${fileExt}`;
      const bucket = 'saas-media-files';
      const generatedUrl = `https://storage.googleapis.com/${bucket}/${fileName}`;
      cb(null, fileName);
    },
  }),
});

export { StorageConfig };
