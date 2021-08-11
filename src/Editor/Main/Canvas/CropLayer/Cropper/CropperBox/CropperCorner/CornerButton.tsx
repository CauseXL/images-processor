import { css, cx } from "@emotion/css";
import type { FC } from "react";
import { useMemo } from "react";
// @ts-ignore
import { tw } from "twind";
import { CornerDirectionType } from "./CropperCorner";
import { useCornerMove } from "./useCornerMove";

const size = 32;

// * --------------------------------------------------------------------------- comp

export const CornerButton: FC<{
  axis: [1 | -1, 1 | -1];
  className: string;
  direction: CornerDirectionType;
}> = ({ axis, className, direction, children }) => {
  const [ax, ay] = axis;
  const { moveProps } = useCornerMove(direction);

  return useMemo(() => {
    return (
      <div
        {...moveProps}
        className={cx(className, tw`absolute`, corner)}
        style={{
          [ax === -1 ? "left" : "right"]: `-${size / 2}px`,
          [ay === -1 ? "top" : "bottom"]: `-${size / 2}px`,
        }}
      >
        {children}
      </div>
    );
  }, [ax, ay, children, className]);
};

// * --------------------------------------------------------------------------- style

const corner = css`
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  overflow: hidden;
  svg {
    width: 100%;
    height: 100%;
    fill: none;
  }
  &.point-nw {
    cursor: nwse-resize;
  }
  &.point-ne {
    cursor: nesw-resize;
  }
  &.point-se {
    cursor: nwse-resize;
  }
  &.point-sw {
    cursor: nesw-resize;
  }
`;
