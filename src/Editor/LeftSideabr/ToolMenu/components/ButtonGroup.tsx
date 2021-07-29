import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import { Button } from "tezign-ui";

// * --------------------------------------------------------------------------- type

interface ButtonGroupProps {
  okText?: string;
  cancelText?: string;
  disabled?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  /* 禁用 确认 按钮 */
  disableOnOk?: boolean;
}

// * --------------------------------------------------------------------------- comp

export const ButtonGroup: FC<ButtonGroupProps> = (props) => {
  const { onOk, onCancel, okText = "确认", cancelText = "取消", disableOnOk = false } = props;
  return (
    <div css={buttonGroupStyle}>
      <Button size="small" onClick={onOk} css={okBtnStyle} disabled={disableOnOk}>
        {okText}
      </Button>
      <Button size="small" onClick={onCancel} css={cancelBtnStyle} type="neutral">
        {cancelText}
      </Button>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const buttonGroupStyle = css`
  padding-top: 8px;
  padding-bottom: 8px;
`;

const okBtnStyle = css`
  margin-right: 16px;
`;

const cancelBtnStyle = css`
  &.tz-btn.type-neutral {
    border: 0;
    color: ${theme.colors.default};
    background-color: rgba(255, 255, 255, 0.16);
  }
`;
