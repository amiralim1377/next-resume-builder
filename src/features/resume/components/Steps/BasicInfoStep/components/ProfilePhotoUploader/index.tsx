import { cn } from "@/utils/cn";
import { TFunction } from "i18next";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { CustomModal } from "@/components/ui/CustomModal";
import { UserProfileEditorModal } from "./components/EditorModal";
import { useImageEditor } from "./hooks/useImageEditor";
import { useFormContext } from "react-hook-form";

type ProfilePhotoUploaderProps = {
  t: TFunction<string, undefined>;
  className?: string;
  initialImage: string;
};

const ProfilePhotoUploader = ({
  t,
  className,
  initialImage,
}: ProfilePhotoUploaderProps) => {
  const { setValue } = useFormContext();
  const {
    image,
    showEditor,
    handleDrop,
    handleDragLeave,
    handleDragOver,
    closeEditor,
    isDragging,
    fileInputRef,
    handleFileSelect,
    editorRef,
    editorState,
    resetEditor,
    rotateImage,
    setScale,
    toggleFlipHorizontal,
    toggleFlipVertical,
    saveImage,
    zoomIn,
    zoomOut,
  } = useImageEditor({ initialImage });

  const handleSaveProfileImage = (file: File) => {
    console.log(file);

    // مثال RHF:
    setValue("profileImage", file, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className={`profile-photo-uploader ${className}`}>
      {/* Upload Area */}
      {!showEditor && (
        <div
          className={`hover:border-brandPrimary relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 transition-colors ${isDragging ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : ""}`}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <ImagePlus className="h-8 w-8 text-gray-500" />{" "}
              {/* Changed to Google-style icon */}
            </div>
            <p className="font-medium text-gray-700 dark:text-gray-300">
              {t("uploadResumeProfilePhoto")}
            </p>
            <p className="mt-1 text-sm text-gray-500">PNG, JPG up to 5MB</p>
            <p className="mt-3 text-xs text-gray-400">or drag and drop</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          {initialImage && (
            <Image
              src={initialImage}
              alt="Current profile"
              className="absolute inset-0 h-full w-full rounded-2xl object-cover opacity-30"
            />
          )}
        </div>
      )}
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
            saveImage={() => saveImage(handleSaveProfileImage)}
            height={250}
            borderRadius={180}
            editorRef={editorRef}
            editorState={editorState}
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

export { ProfilePhotoUploader };
