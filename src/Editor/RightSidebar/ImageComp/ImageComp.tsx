import { deleteImage } from "@/store/imageList";
import { css } from "@emotion/react";
import React, { useState } from "react";
import { Icon } from "tezign-ui";
import tw from "twin.macro";
import { formatExtension, formatSize } from "../format";
import { getImgSizeStyle, getPositionStyle } from "../size";

const log = console.log.bind(console);

export const ImageComp = ({ item, order, active, onClick }: any) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div css={[imgCompStyle]} style={getPositionStyle(item, loaded)}>
      <img
        css={[imgStyle, !loaded && tw`opacity-0`, active && activeStyle]}
        src={item.url}
        onLoad={() => {
          // log("loaded", item.name);
          setLoaded(true);
        }}
        style={getImgSizeStyle(item)}
        onClick={() => {
          log("clicked", item);
          onClick?.();
        }}
      />
      {loaded ? (
        <>
          <div css={[countStyle]}>{order}</div>
          {/* TODO: 不会直接有 size 属性，使用 utils 里的方法 */}
          <div css={[sizeStyle]}>{formatSize(item.size)}</div>
          <div
            css={[deleteStyle]}
            onClick={(e) => {
              e.stopPropagation();
              deleteImage(item.id);
              log("del");
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

  min-height: 138px;
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
