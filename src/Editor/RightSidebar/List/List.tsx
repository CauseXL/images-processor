import { css } from "@emotion/react";
import React from "react";
import { Icon } from "tezign-ui";
import tw from "twin.macro";
import { formatSize } from "../format";
import { Thumbnail } from "./Thumbnail";

const log = console.log.bind(console);

export const List = ({ list, width, activeIndex, setActiveIndex }) => {
  const extraInfoDisplayWidth = 300;
  const showExtraInfo = width > extraInfoDisplayWidth;

  return (
    <div css={[listStyle]}>
      {list?.map((item, i) => {
        const active = activeIndex === i;
        const onClick = () => setActiveIndex(i);
        return (
          <div
            key={item.name + i}
            css={[tw`flex items-center mb-4`, itemStyle, showExtraInfo ? infoHoverStyle : "", active && activeStyle]}
            onClick={() => {
              log("clicked", item);
              onClick();
            }}
          >
            <Thumbnail item={item} />
            <div css={[tw`ml-2`, nameStyle]}>{item.name}</div>
            {showExtraInfo && (
              <div css={[tw`flex ml-auto`]}>
                <div css={tw`mr-2`}>
                  {item.width}*{item.height}px
                </div>
                <div>{formatSize(item.size)}</div>
              </div>
            )}
            <div css={operationStyle}>
              <Icon type="delete" css={tw`cursor-pointer`} onClick={() => log("del")} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const listStyle = css`
  height: 100%;
  overflow-y: scroll;
`;

const activeStyle = css`
  border: 2px solid #fff;
  border-radius: 4px;
`;

const operationStyle = css`
  margin-left: auto;
  padding-left: 16px;
  display: none;
`;

const infoHoverStyle = css`
  &:hover {
    & > div:nth-last-of-type(2) {
      display: none;
    }
  }
`;

const itemStyle = css`
  padding: 8px;
  font-size: 12px;
  &:hover {
    background: #474747;
    border-radius: 4px;

    & > div:nth-last-of-type(1) {
      display: flex;
    }
  }
`;

const nameStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;