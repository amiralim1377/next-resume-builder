"use client";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { CustomButton } from "../CustomButton";
import { useLang } from "@/provider/lngProvider";
import { useTranslation } from "@/lib/i18n/client";
import { BoldSvg } from "@/components/svg/BoldSvg";
import { useThemeColors } from "@/provider/themeProvider/useThemeColors";
import { ItalicSvg } from "@/components/svg/ItalicSvg";
import { UnderlineSvg } from "@/components/svg/UnderlineSvg";
import { AlignLeftSvg } from "@/components/svg/AlignLeftSvg";
import { AlignRightSvg } from "@/components/svg/AlignRightSvg";
import { AlignCenterSvg } from "@/components/svg/AlignCenterSvg";
import { BulletListSvg } from "@/components/svg/BulletListSvg";
import { NumberListSvg } from "@/components/svg/NumberListSvg";
import { CustomTooltip } from "../CustomTooltip";
import { UndoSvg } from "@/components/svg/UndoSvg";
import { RedoSvg } from "@/components/svg/RedoSvg";
import { Popover } from "../CustomPopover";
import { LinkSvg } from "@/components/svg/LinkSvg";
import { CustomModal } from "../CustomModal";
import { ResumeAddLinkModal } from "./components/ResumeAddLinkModal";
import { ResumeRemoveLinkModal } from "./components/ResumeRemoveLinkModal";

export type CustomResumeEditorClassNamesProps = {
  root: string;
  toolbarWrapper: string;
};

type CustomResumeEditorProps = {
  value?: JSONContent | null;
  onChange: (content: JSONContent) => void;
  placeholder?: string;
  classNames?: CustomResumeEditorClassNamesProps;
  label: string;
  isValid: boolean;
  error?: undefined | string;
  maxWords?: number;
  maxCharacters?: number;
};

const CustomResumeEditor = ({
  onChange,
  value,
  classNames,
  label,
  isValid,
  error,
  placeholder = "Write a professional summary...",
  maxWords = 500,
  maxCharacters = 3000,
}: CustomResumeEditorProps) => {
  const { lng } = useLang();
  const { t } = useTranslation(lng, "form");
  const { colors } = useThemeColors();
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [isRemoveLinkModalOpen, setIsRemoveLinkModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  const globalDirection = lng === "fa" ? "rtl" : "ltr";

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount.configure({
        limit: maxCharacters,
      }),
    ],
    textDirection: globalDirection,
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
      setWordCount(editor.storage.characterCount.words());
      setCharCount(editor.storage.characterCount.characters());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[200px] p-4 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6  [&_li]:ml-5 [&_li::marker]:text-text-secondary",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== undefined) {
      const currentContent = editor.getJSON();

      if (JSON.stringify(currentContent) !== JSON.stringify(value)) {
        editor.chain().setMeta("addToHistory", false).setContent(value).run();
      }
    }
  }, [editor, value]);

  if (!editor) return null;

  const handleOpenAddLinkModal = () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " ",
    );
    setText(selectedText);
    setIsAddLinkModalOpen(true);
    setIsLinkPopoverOpen(false);
  };

  const handleCloseAddLinkModal = () => {
    setIsAddLinkModalOpen(false);
  };

  const handleOpenRemoveLinkModal = () => {
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " ",
    );
    setText(selectedText);
    if (!selectedText) return null;

    setIsRemoveLinkModalOpen(true);
    setIsLinkPopoverOpen(false);
  };

  const handleConfirmAddLinkModal = () => {
    if (!editor) return;

    if (!url) return;

    let formattedUrl = url.trim();

    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const { empty } = editor.state.selection;

    if (empty) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: text || url,
          marks: [
            {
              type: "link",
              attrs: { href: formattedUrl },
            },
          ],
        })
        .run();
    } else {
      editor.chain().focus().setLink({ href: formattedUrl }).run();
    }

    setIsAddLinkModalOpen(false);
    setUrl("");
    setText("");
  };

  const handleConfirmRemoveLinkModal = () => {
    if (!editor) return;

    editor.chain().focus().extendMarkRange("link").unsetLink().run();

    setIsRemoveLinkModalOpen(false);
  };

  const handleCloseRemoveLinkModal = () => {
    setIsRemoveLinkModalOpen(false);
  };
  return (
    <>
      <div
        className={cn(
          "border-ui-border overflow-hidden rounded-md border bg-transparent",

          classNames?.root,
        )}
      >
        {/* toolbar-wrappert */}
        <div
          className={cn(
            "border-ui-border bg-accentLight felx-warp flex flex-1 gap-1 border-b",
            classNames?.toolbarWrapper,
          )}
        >
          <CustomTooltip
            closeDelay={75}
            label={t("makeTextBold")}
            position="top"
          >
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={cn(
                editor.isActive("bold")
                  ? "bg-brandPrimary text-white"
                  : "hover:bg-brandHover",
              )}
            >
              <BoldSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <CustomTooltip
            closeDelay={75}
            label={t("makeTextItalic")}
            position="top"
          >
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={cn(
                "rounded px-3 py-1",
                editor.isActive("italic")
                  ? "bg-brandPrimary text-white"
                  : "hover:bg-brandHover",
              )}
            >
              <ItalicSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <CustomTooltip
            closeDelay={75}
            label={t("makeTextUnderline")}
            position="top"
          >
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={cn(
                "rounded px-3 py-1",
                editor.isActive("underline")
                  ? "bg-brandPrimary text-white"
                  : "hover:bg-brandHover",
              )}
            >
              <UnderlineSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <div className="mx-2 h-6 w-px self-center bg-gray-300" />

          <Popover
            position="bottom"
            width={250}
            withArrow
            shadow="lg"
            opened={isLinkPopoverOpen}
            onClose={() => setIsLinkPopoverOpen(false)}
          >
            <Popover.Target>
              <CustomTooltip
                closeDelay={75}
                label={t("addAndRemoveLink")}
                position="top"
              >
                <CustomButton
                  type="button"
                  variant="simple"
                  className="hover:bg-brandHover flex h-9 min-w-25 items-center justify-center rounded-sm"
                  onClick={() => setIsLinkPopoverOpen((o) => !o)}
                >
                  <LinkSvg size={20} color={colors.state?.success} />
                </CustomButton>
              </CustomTooltip>
            </Popover.Target>

            <Popover.Dropdown>
              <div className="w-full space-y-2">
                <CustomTooltip
                  closeDelay={75}
                  label={t("addLinkButtonTooltip")}
                  position="top"
                  triggerClassName="w-full"
                >
                  <CustomButton
                    onClick={handleOpenAddLinkModal}
                    className="w-full"
                  >
                    {t("addlink")}
                  </CustomButton>
                </CustomTooltip>
                <CustomTooltip
                  closeDelay={75}
                  label={t("removeLinkButtonTooltip")}
                  position="bottom"
                  triggerClassName="w-full"
                >
                  <CustomButton
                    onClick={handleOpenRemoveLinkModal}
                    className="w-full"
                  >
                    {t("removeLink")}
                  </CustomButton>
                </CustomTooltip>
              </div>
            </Popover.Dropdown>
          </Popover>

          <div className="mx-2 h-6 w-px self-center bg-gray-300" />
          <CustomTooltip
            closeDelay={75}
            label={t("alignTextRight")}
            position="top"
          >
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={cn(
                "rounded px-3 py-1",
                editor.isActive("right")
                  ? "bg-brandPrimary text-white"
                  : "hover:bg-brandHover",
              )}
            >
              <AlignRightSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <CustomTooltip
            closeDelay={75}
            label={t("alignTextCenter")}
            position="top"
          >
            <CustomButton
              type="button"
              variant="simple"
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={cn(
                "rounded px-3 py-1",
                editor.isActive("center")
                  ? "bg-brandPrimary text-white"
                  : "hover:bg-brandHover",
              )}
            >
              <AlignCenterSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <CustomTooltip
            closeDelay={75}
            label={t("alignTextLeft")}
            position="top"
          >
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={cn(
                "rounded px-3 py-1",
                editor.isActive("left")
                  ? "bg-brandPrimary text-white"
                  : "hover:bg-brandHover",
              )}
            >
              <AlignLeftSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <div className="mx-2 h-6 w-px self-center bg-gray-300" />
          <CustomTooltip closeDelay={75} label={t("bulletList")} position="top">
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={cn(
                "rounded px-3 py-1",
                editor.isActive("bulletList")
                  ? "bg-brandPrimary text-white"
                  : "hover:bg-brandHover",
              )}
            >
              <BulletListSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <CustomTooltip
            closeDelay={75}
            label={t("orderedList")}
            position="top"
          >
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={cn(
                "rounded px-3 py-1",
                editor.isActive("orderedList")
                  ? "bg-brandPrimary text-white"
                  : "hover:bg-brandHover",
              )}
            >
              <NumberListSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <div className="mx-2 h-6 w-px self-center bg-gray-300" />
          <CustomTooltip closeDelay={75} label={t("undo")} position="top">
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className={cn("rounded px-3 py-1")}
            >
              <UndoSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
          <CustomTooltip closeDelay={75} label={t("redo")} position="top">
            <CustomButton
              type="button"
              variant="simple"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className={cn("rounded px-3 py-1")}
            >
              <RedoSvg size={20} color={colors.state?.success} />
            </CustomButton>
          </CustomTooltip>
        </div>
        {/* Editor Content */}
        <EditorContent
          label={label}
          editor={editor}
          className={cn(
            "text-text-secondary min-h-55",
            isValid && "border-state-success",
            error && "border-state-error",
          )}
        />
        {/* {error && <p className="text-state-error text-xs">{error}</p>} */}

        <div className="border-accentDark bg-accentLight text-text-secondary border-t px-4 py-2 text-xs">
          <div>
            {wordCount} {t("word")} {t("fromMax")} {maxWords}
            {wordCount > maxWords && (
              <span className="text-state-error ml-1 text-xs">
                {t("overlimit")}
              </span>
            )}
          </div>
          <div>
            {charCount} {t("letter")} {t("fromMax")} {maxCharacters}
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={isAddLinkModalOpen}
        onClose={handleCloseAddLinkModal}
        title={t("addlink")}
        withCloseButton
      >
        <ResumeAddLinkModal
          onConfirm={handleConfirmAddLinkModal}
          onCancel={handleCloseAddLinkModal}
          t={t}
          url={url}
          text={text}
          onUrlChange={setUrl}
          onTextChange={setText}
        />
      </CustomModal>
      <CustomModal
        isOpen={isRemoveLinkModalOpen}
        onClose={handleCloseRemoveLinkModal}
        title={t("removeLink")}
        withCloseButton
      >
        <ResumeRemoveLinkModal
          onConfirm={handleConfirmRemoveLinkModal}
          onCancel={handleCloseRemoveLinkModal}
          t={t}
          text={text}
        />
      </CustomModal>
    </>
  );
};

export { CustomResumeEditor };
