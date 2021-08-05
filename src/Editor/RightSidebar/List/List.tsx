import { useValue } from "@/core/utils";
import { changeCurrentImage } from "@/logic/action/currentImage";
import { deleteImage } from "@/logic/action/imageList";
import { getCurrentImage } from "@/logic/get/currentImage";
import { css } from "@emotion/react";
import React from "react";
import { Icon } from "tezign-ui";
import tw from "twin.macro";
import { formatSize } from "../format";
import { Thumbnail } from "./Thumbnail";

const log = console.log.bind(console);

export const List = ({ list, width }) => {
  const extraInfoDisplayWidth = 300;
  const showExtraInfo = width > extraInfoDisplayWidth;

  const current = useValue(getCurrentImage);

  return (
    <div css={[listStyle]}>
      {list?.map((item) => {
        const { id } = item;
        return (
          <Item
            key={item.name}
            item={item}
            showExtraInfo={showExtraInfo}
            active={current.id === id}
            onClick={() => changeCurrentImage(id)}
          />
        );
      })}
    </div>
  );
};

const Item = ({ item, showExtraInfo, active, onClick }) => {
  return (
    <div
      key={item.name}
      css={[tw`flex items-center mb-4`, itemStyle, showExtraInfo ? infoHoverStyle : "", active && activeStyle]}
      onClick={() => {
        log("clicked", item);
        onClick();
      }}
    >
      <Thumbnail item={item} />
      <div css={[tw`ml-2`, nameStyle]}>{item.name}</div>
      <div css={[tw`flex ml-auto`, showExtraInfo ? aniStyle : {}]} style={{ display: showExtraInfo ? "flex" : "none" }}>
        <div css={tw`mr-2`}>
          {item.width}*{item.height}px
        </div>
        <div>{formatSize(item.size)}</div>
      </div>
      <div css={operationStyle}>
        <Icon
          type="delete"
          css={tw`cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            deleteImage(item.id);
            log("del");
          }}
        />
      </div>
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
      /* display: none; */
      opacity: 0;
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

const aniStyle = css`
  @keyframes fadeIn {
    0% {
      color: rgba(255, 255, 255, 0.78);
    }
    25% {
      opacity: 0;
    }
    100% {
      color: rgba(255, 255, 255, 0.78);
    }
  }
  animation: fadeIn 1s linear;
`;
