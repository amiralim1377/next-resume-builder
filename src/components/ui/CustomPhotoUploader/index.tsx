import { cn } from "@/utils/cn";
import { TFunction } from "i18next";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { CustomModal } from "@/components/ui/CustomModal";
import { useImageEditor } from "./hooks/useImageEditor";
import { UserProfileEditorModal } from "./components/UserProfileEditorModal";
import { useEffect, useMemo } from "react";
import { CustomAvatar } from "../CustomAvatar";

type CustomPhotoUploaderProps = {
  t: TFunction<string, undefined>;
  className?: string;
  label: string;
  error?: string | undefined;
  isValid: boolean;
  value?: File;
  onChange?: (file?: File) => void;
};

const CustomPhotoUploader = ({
  t,
  className,
  label,
  error,
  onChange,
  value,
  isValid,
}: CustomPhotoUploaderProps) => {
  const previewUrl = useMemo(
    () => (value ? URL.createObjectURL(value) : undefined),
    [value],
  );

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const {
    image,
    showEditor,
    closeEditor,
    isDragging,
    fileInputRef,
    handleFileSelect,
    editorRef,
    editorState,
    handleSave,
    resetEditor,
    rotateImage,
    setScale,
    toggleFlipHorizontal,
    toggleFlipVertical,
    zoomIn,
    zoomOut,
    handleDrop,
    handleDragLeave,
    handleDragOver,
    handleDragEnter,
  } = useImageEditor({ initialImage: previewUrl, onChange });

  return (
    <div className={cn(className)}>
      {/* Upload Area */}
      {!showEditor && (
        <div
          className={cn(
            "hover:border-brandPrimary relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-300 py-4 transition-colors",
            isDragging ? "border-blue-500 bg-blue-50" : "",
            error && "border-state-error",
            isValid && "border-state-success",
          )}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDragEnter={handleDragEnter}
        >
          {previewUrl ? (
            <>
              <Image
                src={previewUrl}
                alt="Selected profile photo"
                className="absolute inset-0 w-full rounded-2xl object-cover"
                fill
              />
              <CustomAvatar size="xxl" src={previewUrl} />
              <div className="relative z-10 rounded-lg bg-black/40 px-3 py-1 text-sm text-white">
                {t("changePhoto")}
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <ImagePlus className="h-8 w-8 text-gray-500" />
                </div>
                <p className="font-medium text-gray-700">
                  {label || t("uploadResumeProfilePhoto")}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {t("photoFormats")}
                </p>
                <p className="my-2 text-xs text-gray-400">{t("dragAndDrop")}</p>
              </div>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
      {error && <p className="text-state-error mt-1 text-sm">{error}</p>}
      {/* Editor Modal remains the same */}
      {showEditor && image && (
        <CustomModal
          className="p-6"
          classNames={{
            inner: cn("h-40"),
          }}
          onClose={closeEditor}
          isOpen={showEditor && Boolean(image)}
        >
          <UserProfileEditorModal
            t={t}
            width={250}
            height={250}
            borderRadius={180}
            editorRef={editorRef}
            editorState={editorState}
            handleSave={handleSave}
            image={image}
            resetEditor={resetEditor}
            rotateImage={rotateImage}
            setScale={setScale}
            toggleFlipHorizontal={toggleFlipHorizontal}
            toggleFlipVertical={toggleFlipVertical}
            zoomIn={zoomIn}
            zoomOut={zoomOut}
          />
        </CustomModal>
      )}
    </div>
  );
};

export { CustomPhotoUploader };
