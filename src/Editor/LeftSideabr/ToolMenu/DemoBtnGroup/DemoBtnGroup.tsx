import { pageData } from "@/core/data";
import { useValue } from "@/core/utils";
import { changeCurrentImage } from "@/logic/action/currentImage";
import { updateAllImages } from "@/logic/action/imageList";
import { updatePageTitle } from "@/logic/action/updatePageTitle";
import { getCurrentImage } from "@/logic/get/currentImage";
import { Button } from "antd";
import type { FC } from "react";

export const DemoBtnGroup: FC = () => {
  const data = useValue(() => pageData.get());
  const currentImage = useValue(() => getCurrentImage());

  return (
    <div>
      <p>
        <strong>TITLE: </strong>
        {data.title}
      </p>
      <p>
        <strong>CURRENT IMAGE: </strong>
        {currentImage?.width} {currentImage?.height}
      </p>
      <p>
        <strong>ALL IMAGES COUNT: </strong>
        {data.imgList.length}
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
            // updateCurrentImage({ width: 1, height: 1 });
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
