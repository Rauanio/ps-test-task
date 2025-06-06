import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import { FileUpload } from './file-upload';
import { UPLOAD_FILE } from '@/shared/api/mutations';

const mockFile = new File(['content'], 'test.png', { type: 'image/png' });

const newDataSpy = vi.fn();
// Мок мутации
const mocks = [
  {
    request: {
      query: UPLOAD_FILE,
      variables: {
        file: mockFile,
      },
    },
    result: () => {
      newDataSpy();
      return {
        data: {
          uploadFile: {
            __typename: 'UploadResult',
            url: 'https://example.com/uploaded.jpg',
          },
        },
      };
    },
  },
];

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => 'mocked-url');
});


it('should successfully call mutation', async () => {
  const user = userEvent.setup();

  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FileUpload />
    </MockedProvider>
  );

  const input = container.querySelector('input[type="file"]') as HTMLInputElement;
  expect(input).toBeInTheDocument();

  // Смоделируем выбор файла
  await user.upload(input, mockFile);

  // Кликаем на кнопку загрузки
  const uploadButton = screen.getByRole('button', { name: /Загрузить/i });
  await user.click(uploadButton);

  // Проверим, что мок мутации вызвался
  await waitFor(() => {
    expect(newDataSpy).toHaveBeenCalledTimes(1);
  });
});
