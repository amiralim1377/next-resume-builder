import { CustomButton } from "@/components/ui/CustomButton";
import { TFunction } from "i18next";
import {
  Check,
  FlipHorizontal,
  FlipVertical,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import AvatarEditor, { AvatarEditorRef } from "react-avatar-editor";

type EditorModalProps = {
  t: TFunction<string, undefined>;
  width: number;
  height: number;
  borderRadius: number;
  image: string | File | null;
  editorState: {
    scale: number;
    rotate: number;
    flipHorizontal: boolean;
    flipVertical: boolean;
  };
  editorRef: React.RefObject<AvatarEditorRef | null>;

  zoomIn: () => void;
  zoomOut: () => void;
  setScale: (scale: number) => void;
  rotateImage: () => void;
  toggleFlipHorizontal: () => void;
  toggleFlipVertical: () => void;
  resetEditor: () => void;
  handleSave: () => void;
};

const UserProfileEditorModal = ({
  borderRadius,
  t,
  width,
  height,
  editorRef,
  editorState,
  handleSave,
  image,
  resetEditor,
  rotateImage,
  setScale,
  toggleFlipHorizontal,
  toggleFlipVertical,
  zoomIn,
  zoomOut,
}: EditorModalProps) => {
  if (!image) {
    return <div className="py-10 text-center">No image loaded</div>;
  }

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center">
        <div className="relative overflow-hidden rounded-2xl shadow-inner">
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={width}
            height={height}
            border={40}
            borderRadius={borderRadius}
            color={[0, 0, 0, 0.6]}
            scale={editorState.scale}
            rotate={editorState.rotate}
            style={{
              transform: `scaleX(${editorState.flipHorizontal ? -1 : 1}) scaleY(${editorState.flipVertical ? -1 : 1})`,
            }}
          />
        </div>

        <div className="mt-8 w-full space-y-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium">
              <ZoomIn className="h-4 w-4" /> Zoom
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(editorState.scale * 100)}%
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={zoomOut}
              className="rounded-2xl bg-gray-100 p-3 transition-colors"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.01"
              value={editorState.scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="flex-1 accent-blue-600"
            />
            <button
              onClick={zoomIn}
              className="rounded-2xl bg-gray-100 p-3 transition-colors"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={rotateImage}
              className="flex flex-col items-center justify-center rounded-2xl bg-gray-100 p-4 transition-all hover:bg-gray-200 active:scale-95"
            >
              <RotateCw className="mb-1 h-5 w-5" />
              <span className="text-xs">Rotate</span>
            </button>
            <button
              onClick={toggleFlipHorizontal}
              className={`flex flex-col items-center justify-center rounded-2xl p-4 transition-all active:scale-95 ${editorState.flipHorizontal ? "bg-blue-100 text-blue-600" : "bg-gray-100"}`}
            >
              <FlipHorizontal className="mb-1 h-5 w-5" />
              <span className="text-xs">Flip H</span>
            </button>
            <button
              onClick={toggleFlipVertical}
              className={`flex flex-col items-center justify-center rounded-2xl p-4 transition-all active:scale-95 ${editorState.flipVertical ? "bg-blue-100 text-blue-600" : "bg-gray-100"}`}
            >
              <FlipVertical className="mb-1 h-5 w-5" />
              <span className="text-xs">Flip V</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-3 py-2 md:flex-row">
        <CustomButton
          variant="outlined-negative"
          onClick={resetEditor}
          className="flex-1 py-3 text-sm font-medium"
        >
          {t("reset")}
        </CustomButton>
        <CustomButton
          variant="primary"
          onClick={() => handleSave()}
          className="flex flex-1 items-center justify-center gap-2 text-sm font-semibold transition-colors"
        >
          {t("saveUpload")}
          <Check className="h-4 w-4" />
        </CustomButton>
      </div>
    </div>
  );
};

export { UserProfileEditorModal };
