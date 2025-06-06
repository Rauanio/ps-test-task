import type { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useUploadStore } from './use-upload-store';
import { useMutation } from '@apollo/client';
import { UPLOAD_FILE } from '@/shared/api/mutations';
import useMessage from 'antd/es/message/useMessage';

export const useUpload = () => {
  const [message, contextHolder] = useMessage();
  const { setFile, setPreviewUrl, setUploadedUrl } = useUploadStore();
  const [uploadFile, { loading }] = useMutation(UPLOAD_FILE, {
    onCompleted: () => message.success('Файл успешно загружен !'),
    onError: () => message.error('Ошибка загрузки файла'),
  });

  const handleChange = (info: UploadChangeParam<UploadFile<File>>) => {
    const file = info.file.originFileObj;

    if (file) {
      setFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleUpload = async () => {
    const { file } = useUploadStore.getState();

    if (!file) return;

    try {
      const { data } = await uploadFile({ variables: { file } });

      if (data) {
        setUploadedUrl(data.uploadFile.url);
      }

      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    upload: handleUpload,
    onChange: handleChange,
    loading,
    contextHolder,
  };
};
