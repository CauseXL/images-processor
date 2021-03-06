import { pageData, Snap, useRedoable, useUndoable } from "@/core/data";
import { useValue } from "@/core/utils";
import { updatePageTitle } from "@/logic/action/updatePageTitle";
import { getCurrentImage } from "@/logic/get/currentImage";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import { useKeyPress } from "ahooks";
import { Icon, message } from "antd";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import tw from "twin.macro";
import { CompareModal } from "./CompareModal/CompareModal";
import { DownloadButton } from "./DownloadButton/DownloadButton";

// * --------------------------------------------------------------------------- comp
export interface IHeader {
  onCancel: () => void;
}
export const Header: FC<IHeader> = (props) => {
  const { onCancel } = props;
  const hasUnsavedData = true;
  const title = useValue(() => pageData.get().title);
  const undoable = useUndoable();
  const redoable = useRedoable();

  useKeyPress(["meta.z", "ctrl.z"], (event) => {
    !event.shiftKey && Snap.undo();
  });

  useKeyPress(["meta.shift.z", "ctrl.shift.z"], () => {
    Snap.redo();
  });

  const handleReturnClick = useCallback(() => {
    if (hasUnsavedData) {
      const result = confirm("系统可能不会保存您所做的更改。");
      // 点击确认后，退出页面
      result && onCancel?.();
    } else {
      onCancel?.();
    }
  }, [hasUnsavedData, onCancel]);

  const onTitleChange = (e: any) => {
    const { value } = e.target;
    const len = value.trim().length;
    const isEmpty = !len;
    if (isEmpty) return true;
    if (len > 10) {
      message.error("最多支持10个文字！");
      return true;
    }

    updatePageTitle(value);
    return true;
  };

  return useMemo(
    () => (
      <div css={[tw`flex justify-between items-center relative px-4`, headerStyle]}>
        <div css={tw`flex items-center`}>
          <div onClick={handleReturnClick} css={tw`flex cursor-pointer`}>
            <Icon type="left" css={tw`pr-1 flex items-center`} /> 返回
          </div>
          <div css={[tw`mx-4`, titleInputStyle]}>
            {/* <Input style={{ width: 120 }} value={title} onChange={onTitleChange} /> */}
            <div style={{ width: 120 }}>{title}</div>
          </div>
          <div css={tw`mx-4 cursor-pointer`}>
            <CompareModal />
          </div>
          <div
            css={[tw`mx-4 cursor-pointer`, !undoable && disabledCss]}
            onClick={() => {
              Snap.undo();
            }}
          >
            <Icon type="undo" css={tw`text-xl flex items-center`} />
          </div>
          <div
            css={[tw`cursor-pointer`, !redoable && disabledCss]}
            onClick={() => {
              Snap.redo();
            }}
          >
            <Icon type="redo" css={tw`text-xl flex items-center`} />
          </div>
        </div>
        <ProjectTitle />
        <div css={tw`flex`}>
          <div className="ml-16">
            <DownloadButton />
          </div>
        </div>
      </div>
    ),
    [title, undoable, redoable],
  );
};

const ProjectTitle: FC = () => {
  const { width, height } = useValue(getCurrentImage) ?? {};
  const [isChanging, setIsChanging] = useState<boolean>(false);
  useEffect(() => {
    setIsChanging(true);
    let timer = setTimeout(() => {
      setIsChanging(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [width, height]);
  return (
    <div
      css={[
        tw`absolute left-2/4 transform -translate-x-1/2 transition-colors duration-500`,
        isChanging && infoChangingStyle,
      ]}
    >
      宽度：{width}px 高度：{height}px
    </div>
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

const infoChangingStyle = css`
  color: #0cc5ae;
`;

const disabledCss = css`
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
`;
