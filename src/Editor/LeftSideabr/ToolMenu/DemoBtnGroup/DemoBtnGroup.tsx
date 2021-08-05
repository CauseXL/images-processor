import {
  changeCurrentImage,
  updateAllImages,
  updateCurrentImage,
  updatePageTitle,
  useCurrentImage,
  usePageData,
} from "@/store/pageData";
import type { FC } from "react";
import { Button } from "tezign-ui";

export const DemoBtnGroup: FC = () => {
  const pageData = usePageData();
  const currentImage = useCurrentImage();

  return (
    <div>
      <p>
        <strong>TITLE: </strong>
        {pageData.title}
      </p>
      <p>
        <strong>CURRENT IMAGE: </strong>
        {currentImage?.width} {currentImage?.height}
      </p>
      <p>
        <strong>ALL IMAGES COUNT: </strong>
        {pageData.imgList.length}
      </p>
      <p>
        <img style={{ width: 100 }} src={currentImage?.url} alt="" />
      </p>
      <br />
      <p>
        <Button
          type="primary"
          onClick={() => {
            updatePageTitle("change name 123");
          }}
        >
          set title to 123
        </Button>
      </p>
      <br />
      <p>
        <Button
          type="primary"
          onClick={() => {
            updateCurrentImage({ width: 1, height: 1 });
          }}
        >
          set current image size to 1
        </Button>
      </p>
      <br />
      <p>
        <Button
          type="primary"
          onClick={() => {
            updateAllImages([]);
          }}
        >
          set all images to []
        </Button>
      </p>
      <br />
      <p>
        <Button
          type="primary"
          onClick={() => {
            changeCurrentImage(1);
          }}
        >
          change current image to id === 1
        </Button>
      </p>
    </div>
  );
};
