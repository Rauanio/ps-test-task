import { Button, Space, Flex, Upload } from 'antd';
import { useUploadStore } from './model/use-upload-store';
import { useUpload } from './model/use-upload';
import { ImageItem } from './image-item';

export const FileUpload = () => {
  const { upload, onChange, loading, contextHolder } = useUpload();
  const previewUrl = useUploadStore((state) => state.previewUrl);
  const uploadedUrl = useUploadStore((state) => state.uploadedUrl);

  return (
    <Flex gap={24} align="center" vertical>
      {contextHolder}
      <Space>
        <Upload onChange={onChange} showUploadList={false}>
          <Button>Выбрать изображение</Button>
        </Upload>
        <Button onClick={upload} type="primary" disabled={loading} loading={loading}>
          Загрузить
        </Button>
      </Space>

      {previewUrl && <ImageItem url={previewUrl} title="Превью" />}
      {uploadedUrl && (
        <ImageItem url={uploadedUrl} title="Загруженное изображение" imageWidth={500} />
      )}
    </Flex>
  );
};
