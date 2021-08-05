import { css } from "@emotion/react";
import type { FC } from "react";
import { useState } from "react";
import tw from "twin.macro";

export const Thumbnail: FC<{ item: any }> = ({ item }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  return (
    <div css={tw`relative`}>
      <img css={[imgStyle, !loaded && tw`opacity-0`]} src={item.url} onLoad={() => setLoaded(true)} />
      {!loaded && <div css={maskStyle} />}
    </div>
  );
};

const imgStyle = css`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
`;

const maskStyle = css`
  position: absolute;
  top: 0;
  left: 0;

  border-radius: 4px;

  width: 32px;
  height: 32px;
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
