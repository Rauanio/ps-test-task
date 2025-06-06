import { create } from 'zustand';

type UploadStore = {
  file: File | null;
  previewUrl: string | null;
  uploadedUrl: string | null;
  setFile: (file: File) => void;
  setPreviewUrl: (url: string | null) => void;
  setUploadedUrl: (url: string | null) => void;
};

export const useUploadStore = create<UploadStore>((set) => ({
  file: null,
  previewUrl: null,
  uploadedUrl: null,
  setFile: (file) => set({ file }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
  setUploadedUrl: (url) => set({ uploadedUrl: url }),
}));
