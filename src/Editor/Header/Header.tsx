import { Snap, useCurrentImage, usePageData, useRedoable, useUndoable } from "@/hooks/usePageData";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import { useCallback, useMemo } from "react";
import { Icon, Input } from "tezign-ui";
import tw from "twin.macro";
import { CompareModal } from "./CompareModal/CompareModal";
import { DownloadButton } from "./DownloadButton/DownloadButton";
import { mock } from "./mockData";

// * --------------------------------------------------------------------------- comp

// TODO: props type
export const Header: FC = (props: any) => {
  const { onCancel } = props;
  const hasUnsavedData = true;
  const pageData = usePageData();
  const currentImage = useCurrentImage();
  const undoable = useUndoable();
  const redoable = useRedoable();

  const handleReturnClick = useCallback(() => {
    if (hasUnsavedData) {
      const result = confirm("系统可能不会保存您所做的更改。");
      // 点击确认后，退出页面
      result && onCancel?.();
    } else {
      onCancel?.();
    }
  }, [hasUnsavedData, onCancel]);

  return useMemo(
    () => (
      <div css={[tw`flex justify-between items-center relative px-4`, headerStyle]}>
        <div css={tw`flex items-center`}>
          <div onClick={handleReturnClick} css={tw`flex cursor-pointer`}>
            <Icon type="left" css={tw`pr-1 flex items-center`} /> 返回
          </div>
          <div css={[tw`mx-4`, titleInputStyle]}>
            <Input.Text style={{ width: 120 }} value="名字很长的情况名字很长的情况名字很长的情况" />
          </div>
          <div css={tw`mx-4 cursor-pointer`}>
            <CompareModal pageData={mock} />
          </div>
          <div
            css={[tw`mx-4 cursor-pointer`]}
            onClick={() => {
              Snap.undo();
              console.log("undo");
            }}
          >
            <Icon type="undo" css={tw`text-xl flex items-center`} />
          </div>
          <div
            css={[tw`cursor-pointer`]}
            onClick={() => {
              Snap.redo();
            }}
          >
            <Icon type="redo" css={tw`text-xl flex items-center`} />
          </div>
        </div>
        <div css={tw`absolute left-2/4 transform -translate-x-1/2`}>
          {pageData?.title}: {currentImage?.width}px
        </div>
        <div css={tw`flex`}>
          <div className="ml-16">
            <DownloadButton />
          </div>
        </div>
      </div>
    ),
    [undoable, redoable, pageData?.title, currentImage],
  );
};

// * --------------------------------------------------------------------------- style

const headerStyle = css`
  width: 100%;
  height: 54px;
  background-color: ${theme.bgColors.light};
  border-bottom: 1px solid ${theme.bgColors.dark};
`;

const titleInputStyle = css`
  .edit-input {
    background-color: ${theme.bgColors.light};
  }
`;
