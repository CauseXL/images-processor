import { pageData } from "@/core/data";
import { useValue } from "@/core/utils";
import { useDrag } from "@/hooks/useDrag";
import { useRafState } from "@/hooks/useRafState";
import { off, on } from "@/hooks/util";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import React, { useEffect, useMemo, useState } from "react";
import tw from "twin.macro";
import { Card } from "./Card/Card";
import { List } from "./List/List";
// import { mockList } from "./mock";
import { EViewMode, ViewMode } from "./ViewMode/ViewMode";

// * --------------------------------------------------------------------------- comp

// const log = console.log.bind(console);

const LEFT_SIDEBAR_WIDTH = 280;
const BAR_WIDTH = 2;
const DEFAULT_MIN_WIDTH = 200;
const HEADER_HEIGHT = 54;

export const RightSidebar: React.FC = () => {
  const [viewMode, setViewMode] = useState<EViewMode>(EViewMode.CARD);

  // @ts-ignore
  // const [list, setList] = useState(mockList);

  const list = useValue(() => pageData.get().imgList);

  const [screenWidth, setScreenWidth] = useRafState(() => window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      const sw = window.innerWidth;
      setScreenWidth(sw);
    };
    on(window, "resize", onResize);
    return () => {
      off(window, "resize", onResize);
    };
  }, [setScreenWidth]);

  const maxWidth = useMemo(() => screenWidth - LEFT_SIDEBAR_WIDTH - BAR_WIDTH, [screenWidth]);

  const { barRef, contentRef, width, positionList } = useDrag({
    list: list,
    minWidth: DEFAULT_MIN_WIDTH,
    maxWidth: maxWidth,
    screenWidth: screenWidth,
  });

  const maskWidth = useMemo(() => screenWidth - width - BAR_WIDTH, [screenWidth, width]);

  return (
    <div css={containerStyle}>
      {/* 设计稿要求图片栏超过 600px 有遮罩层 */}
      <div css={rightMaskStyle} style={{ display: width > 600 ? "block" : "none", width: maskWidth }} />
      <div css={barStyle} ref={barRef} />
      <div
        ref={contentRef}
        style={{ width: width, minWidth: DEFAULT_MIN_WIDTH, maxWidth: maxWidth }}
        css={rightSidebarStyle}
      >
        <div css={tw`flex items-center mb-4`}>
          <ViewMode
            viewMode={viewMode}
            onChange={(v) => {
              setViewMode(v);
            }}
          />
        </div>
        {viewMode === EViewMode.CARD ? <Card list={positionList} /> : <List list={positionList} width={width} />}
      </div>
    </div>
  );
};

// * --------------------------------------------------------------------------- style

const containerStyle = css`
  display: flex;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  background-color: ${theme.bgColors.medium};
  user-select: none;
`;

const rightMaskStyle = css`
  position: fixed;
  height: 100%;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  background: black;
  opacity: 0.45;
`;

const barStyle = css`
  width: ${BAR_WIDTH}px;
  height: 100%;
  background: linear-gradient(#696969, #515151);
  cursor: ew-resize;
`;

const rightSidebarStyle = css`
  padding: 16px 8px 4px;
  user-select: none;
  height: calc(100vh - 90px);

  &::-webkit-scrollbar,
  & ::-webkit-scrollbar {
    display: none;
  }
`;
