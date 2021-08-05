import { useValue } from "@/core/utils";
import { changeCurrentImage } from "@/logic/action/currentImage";
import { getCurrentImage } from "@/logic/get/currentImage";
import { css } from "@emotion/react";
import React from "react";
import { formatOrder } from "../format";
import { ImageComp } from "../ImageComp/ImageComp";

export const Card = ({ list }) => {
  const current = useValue(getCurrentImage);

  return (
    <div css={cardListStyle}>
      {list.map((item, i) => {
        const order = formatOrder(i, list.length);
        const { id } = item;
        return (
          <ImageComp
            key={i}
            order={order}
            item={item}
            active={current.id === id}
            onClick={() => changeCurrentImage(id)}
          />
        );
      })}
    </div>
  );
};

const cardListStyle = css`
  position: relative;
  height: 100%;
  overflow-y: scroll;
  /* pointer-events: none; */
`;
