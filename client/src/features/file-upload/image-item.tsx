import { Flex, Image } from 'antd';

interface ImageItemProps {
  url: string | null;
  title: string;
  imageWidth?: number;
}

export const ImageItem = ({ url, title, imageWidth = 300 }: ImageItemProps) => {
  return (
    <>
      {url && (
        <Flex vertical align="center" gap={8}>
          <h3>{title}</h3>
          <Image width={imageWidth} src={url} />
        </Flex>
      )}
    </>
  );
};
