import { css } from "@emotion/css";
import type { FC } from "react";
import { memo } from "react";

const s = 32;
const r = 16;

// * --------------------------------------------------------------------------- comp

export const IconNw: FC = memo(() => (
  <svg viewBox="0 0 32 32">
    <path d={`M${16 + r} ${r}L${r} ${r}L${r} ${16 + r}`} className={p2} />
    <path d={`M${14 + r} ${r}L${r} ${r}L${r} ${14 + r}`} className={p1} />
  </svg>
));

export const IconNe: FC = memo(() => (
  <svg viewBox="0 0 32 32">
    <path d={`M${r - 16} ${r}L${s - r} ${r}L${s - r} ${16 + r}`} className={p2} />
    <path d={`M${r - 14} ${r}L${s - r} ${r}L${s - r} ${14 + r}`} className={p1} />
  </svg>
));

export const IconSw: FC = memo(() => (
  <svg viewBox="0 0 32 32">
    <path d={`M${r} ${r - 16}L${r} ${s - r}L${16 + r} ${s - r}`} className={p2} />
    <path d={`M${r} ${r - 14}L${r} ${s - r}L${14 + r} ${s - r}`} className={p1} />
  </svg>
));

export const IconSe: FC = memo(() => (
  <svg viewBox="0 0 32 32">
    <path d={`M${r - 16} ${s - r}L${s - r} ${s - r}L${s - r} ${r - 16}`} className={p2} />
    <path d={`M${r - 14} ${s - r}L${s - r} ${s - r}L${s - r} ${r - 14}`} className={p1} />
  </svg>
));

// * --------------------------------------------------------------------------- style

const p2 = css`
  stroke: hsla(0, 0%, 0%, 0.2);
  stroke-width: 7;
`;

const p1 = css`
  stroke: white;
  stroke-width: 3;
`;
