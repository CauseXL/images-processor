export const formatSize = (size: number) => {
  const KB = size / 1024;
  const MB = size / 1024 / 1024;
  if (typeof size !== "number") {
    return "-KB";
  }

  if (MB < 1) {
    return `${Math.ceil(KB)}KB`;
  }
  return `${Math.ceil(MB)}MB`;
};

export const formatOrder = (index: number, total: number) => {
  return `${index + 1}/${total}`;
};

export const formatExtension = (extStr: string) => {
  if (extStr?.includes("/")) {
    // "image/jpeg"
    const ext = extStr.split("/")[1];
    return ext;
  } else {
    return extStr;
  }
};
