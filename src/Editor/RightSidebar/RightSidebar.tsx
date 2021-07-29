import { useDrag } from "@/hooks/useDrag";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React, { useState } from "react";
import tw from "twin.macro";
import { Card } from "./Card/Card";
import { List } from "./List/List";
import { mockList } from "./mock";
import { EViewMode, ViewMode } from "./ViewMode/ViewMode";

// * --------------------------------------------------------------------------- comp

// const log = console.log.bind(console);

const DEFAULT_MIN_WIDTH = 200;
export const RightSidebar: React.FC = () => {
  const [viewMode, setViewMode] = useState<EViewMode>(EViewMode.CARD);

  // @ts-ignore
  const [list, setList] = useState(mockList);

  const [activeIndex, setActiveIndex] = useState();

  const { barRef, contentRef, width, positionList } = useDrag({ list: list, minWidth: DEFAULT_MIN_WIDTH });

  return (
    <div css={containerStyle}>
      <div css={barStyle} ref={barRef} />
      <div ref={contentRef} style={{ width: width, minWidth: DEFAULT_MIN_WIDTH }} css={rightSidebarStyle}>
        <div css={tw`flex items-center mb-4`}>
          <ViewMode
            viewMode={viewMode}
            onChange={(v) => {
              setViewMode(v);
            }}
          />
        </div>
        {viewMode === EViewMode.CARD ? (
          <Card list={positionList} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        ) : (
          <List list={list} width={width} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        )}
      </div>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const containerStyle = css`
  display: flex;
  height: calc(100vh - 54px);
  background-color: ${theme.bgColors.medium};
  user-select: none;
`;

const barStyle = css`
  width: 2px;
  height: 100%;
  background: linear-gradient(#696969, #515151);
  cursor: ew-resize;
`;

const rightSidebarStyle = css`
  padding: 16px 8px 4px;
  user-select: none;
  /* height: 100%; */
  height: calc(100vh - 90px);

  &::-webkit-scrollbar,
  & ::-webkit-scrollbar {
    display: none;
  }
`;
