export const urlToImage = (dataURL: string): HTMLImageElement => {
  const img = new Image();
  img.src = dataURL;
  return img;
};
