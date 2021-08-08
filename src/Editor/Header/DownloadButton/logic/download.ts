import { dataURLtoFile } from "@/utils/imageTransferFuns";

export const downloadFile = (fileName: string, url: string) => {
  let ele = document.createElement("a");
  ele.style.display = "none";
  ele.href = url;
  ele.download = fileName;
  document.body.appendChild(ele);
  ele.click();
  document.body.removeChild(ele);
};

export const downloadFileByBase64 = (name: string, base64: string) => {
  const myBlob = dataURLtoFile(base64);
  const myUrl = URL.createObjectURL(myBlob);
  downloadFile(`${name}.jpg`, myUrl);
  URL.revokeObjectURL(myUrl);
};

export const isBase64 = (dataUrl: string) => {
  return dataUrl.includes(";base64,");
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
