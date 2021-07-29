import { css } from "@emotion/react";
import React from "react";
import { formatOrder } from "../format";
import { ImageComp } from "../ImageComp/ImageComp";

export const Card = ({ list, activeIndex, setActiveIndex }) => {
  return (
    <div css={cardListStyle}>
      {list.map((item, i) => {
        const order = formatOrder(i, list.length);
        return (
          <ImageComp key={i} order={order} item={item} active={activeIndex === i} onClick={() => setActiveIndex(i)} />
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
