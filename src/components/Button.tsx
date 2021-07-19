import React, { FC } from "react";
import { Icon } from "tezign-ui";
import { css } from "@emotion/css";

export interface ButtonProps {
  text: string;
}
export const Button: FC<ButtonProps> = ({ text }) => {
  return (
    <button className={BtnStyle}>
      <Icon type="file" />
      {text}
    </button>
  );
};

const BtnStyle = css`
  display: flex;
  font-size: 16px;
  padding: 10px 16px;
  border-radius: 5px;
`;
