import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      default: string;
      primary: string;
    };
  }
}
