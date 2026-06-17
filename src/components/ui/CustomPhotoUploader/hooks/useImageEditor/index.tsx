"use client";

import { useState, useRef, useCallback } from "react";
import { type AvatarEditorRef } from "react-avatar-editor";

interface ImageEditorState {
  scale: number;
  rotate: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

interface UseImageEditorOptions {
  initialImage?: string;
  onChange?: (file: File) => void;
}

type ImageType = string | File | undefined;

interface UseImageEditorReturn {
  // State
  image: ImageType;
  editorState: ImageEditorState;
  showEditor: boolean;
  isDragging: boolean;

  // Refs
  editorRef: React.RefObject<AvatarEditorRef | null>;
  fileInputRef: React.RefObject<HTMLInputElement | null>;

  // Actions
  setImage: (image: string | File) => void;
  openEditor: () => void;
  closeEditor: () => void;

  zoomIn: () => void;
  zoomOut: () => void;
  setScale: (scale: number) => void;

  rotateImage: () => void;
  toggleFlipHorizontal: () => void;
  toggleFlipVertical: () => void;

  resetEditor: () => void;

  // Event Handlers
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnter: () => void;
  handleDragLeave: () => void;
  handleSave: () => void;
  saveImage: () => void;
}

const useImageEditor = (
  options: UseImageEditorOptions = {},
): UseImageEditorReturn => {
  const { initialImage, onChange } = options;

  const [image, setImage] = useState<ImageType>(initialImage || undefined);
  const [showEditor, setShowEditor] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [editorState, setEditorState] = useState<ImageEditorState>({
    scale: 1,
    rotate: 0,
    flipHorizontal: false,
    flipVertical: false,
  });

  const editorRef = useRef<AvatarEditorRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const openEditor = useCallback(() => setShowEditor(true), []);
  const closeEditor = useCallback(() => setShowEditor(false), []);

  const updateEditorState = useCallback(
    (newState: Partial<ImageEditorState>) => {
      setEditorState((prev) => ({ ...prev, ...newState }));
    },
    [],
  );

  const zoomIn = () =>
    updateEditorState({ scale: Math.min(editorState.scale + 0.1, 5) });

  const zoomOut = () =>
    updateEditorState({ scale: Math.max(editorState.scale - 0.1, 0.5) });

  const setScale = (scale: number) =>
    updateEditorState({ scale: Math.max(0.5, Math.min(scale, 5)) });

  const rotateImage = () =>
    updateEditorState({ rotate: (editorState.rotate + 90) % 360 });

  const toggleFlipHorizontal = () =>
    updateEditorState({ flipHorizontal: !editorState.flipHorizontal });

  const toggleFlipVertical = () =>
    updateEditorState({ flipVertical: !editorState.flipVertical });

  const resetEditor = useCallback(() => {
    setEditorState({
      scale: 1,
      rotate: 0,
      flipHorizontal: false,
      flipVertical: false,
    });
  }, []);

  const saveImage = useCallback(() => {
    if (!editorRef.current || !image) return;

    const canvas = editorRef.current.getImageScaledToCanvas();
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const editedFile = new File([blob], `profile-${Date.now()}.png`, {
            type: "image/png",
          });

          console.log(
            "original size:",
            image instanceof File ? image.size : "N/A",
          );
          console.log("edited size:", editedFile.size);
          onChange?.(editedFile);
          closeEditor();
        }
      },
      "image/png",
      0.92,
    );
  }, [image, closeEditor, onChange]);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file && file.type.startsWith("image/")) {
        setImage(file);
        onChange?.(file);
        openEditor();
      }
    },
    [openEditor, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        setImage(file);
        resetEditor();
        openEditor();
      }
    },
    [resetEditor, openEditor],
  );

  const handleDragEnter = useCallback(() => {
    dragCounterRef.current += 1;

    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    dragCounterRef.current -= 1;

    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleSave = useCallback(() => {
    saveImage();
  }, [saveImage]);

  return {
    openEditor,
    image,
    editorState,
    showEditor,
    isDragging,
    editorRef,
    fileInputRef,
    setImage,
    closeEditor,
    zoomIn,
    zoomOut,
    setScale,
    rotateImage,
    toggleFlipHorizontal,
    toggleFlipVertical,
    resetEditor,
    saveImage,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleSave,
  };
};

export { useImageEditor };
