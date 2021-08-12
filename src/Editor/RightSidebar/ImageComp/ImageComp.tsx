import { ImgItemType } from "@/core/data";
import { TImage } from "@/hooks/useWaterFall";
import { deleteImage } from "@/logic/action/imageList";
import { css } from "@emotion/react";
import { useDebounceFn } from "ahooks";
import type { FC } from "react";
import React, { useState } from "react";
import { Icon } from "tezign-ui";
import tw from "twin.macro";
import { formatExtension, formatSize } from "../format";
import { getImgSizeStyle, getPositionStyle } from "../size";

const log = console.log.bind(console);

export interface IImageCompProps {
  item: TImage<ImgItemType>;
  order: string;
  active: boolean;
  onClick: () => void;
}

export const ImageComp: FC<IImageCompProps> = ({ item, order, active, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const { run } = useDebounceFn(deleteImage, { wait: 500 });

  return (
    <div css={[imgCompStyle]} style={getPositionStyle(item)}>
      <img
        css={[imgStyle, !loaded && tw`opacity-0`, active && activeStyle]}
        src={item.url}
        onLoad={() => {
          setLoaded(true);
        }}
        style={getImgSizeStyle(item)}
        onClick={() => {
          onClick?.();
        }}
      />
      {loaded ? (
        <>
          <div css={[countStyle]}>{order}</div>
          <div css={[sizeStyle]}>{formatSize(item.size!)}</div>
          <div
            css={[deleteStyle]}
            // @ts-ignore
            onClick={(e) => {
              e.stopPropagation();
              run(item.id);
            }}
          >
            <Icon type="delete" />
          </div>
        </>
      ) : (
        <div css={[loadingStyle]} style={getImgSizeStyle(item)} />
      )}
      <div css={[nameStyle]}>
        {item.name}.{formatExtension(item.type)}
      </div>
    </div>
  );
};

const imgCompStyle = css`
  position: absolute;
  color: rgba(255, 255, 255, 0.78);

  min-height: 72px;
  border-radius: 4px;
  font-size: 12px;

  &:hover {
    /* border: 2px solid #fff; */
    & > div {
      opacity: 1;
    }
  }
`;

const activeStyle = css`
  border: 2px solid #fff;
  padding: 2px;
`;

const imgStyle = css`
  position: relative;
  border-radius: 4px;
  min-height: 72px;
`;

const nameStyle = css`
  margin-top: 8px;
  max-width: 184px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.56);
`;

const labelStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: rgba(255, 255, 255, 0.78);
  background: rgba(0, 0, 0, 0.5);
`;

const countStyle = css`
  ${labelStyle};
  top: 8px;
  left: 8px;

  width: 54px;
  height: 24px;

  border-radius: 20px;
`;

const sizeStyle = css`
  ${labelStyle};
  left: 8px;
  bottom: 36px;

  width: 54px;
  height: 24px;

  border-radius: 20px;
`;

const deleteStyle = css`
  ${labelStyle};
  right: 8px;
  bottom: 36px;

  width: 24px;
  height: 24px;

  opacity: 0;
  border-radius: 4px;
  cursor: pointer;
`;

const loadingStyle = css`
  position: absolute;
  top: 0;
  left: 0;

  border-radius: 4px;

  width: 184px;
  height: 138px;
  @keyframes loading {
    0% {
      background-color: rgba(255, 255, 255, 0.08);
    }
    50% {
      background-color: rgba(255, 255, 255, 0.04);
    }
    100% {
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
  animation: loading 1s infinite;
`;
