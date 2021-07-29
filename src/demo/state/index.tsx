import { render } from "react-dom";
import "./autorun";
import { CompState } from "./CompState";

const dom = document.createElement("div");
document.body.appendChild(dom);
render(<CompState />, dom);
