import { useCurrentImage, usePageData } from "@/hooks/usePageData";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import type { FC } from "react";
import React, { useMemo, useState } from "react";
import { Button, Dropdown, Icon, Menu, ModalV2 as Modal, Progress } from "tezign-ui";
import tw from "twin.macro";
import { downloadFile } from "./logic/download";

// * --------------------------------------------------------------------------- comp

export const DownloadButton: FC = () => {
  const pageData = usePageData();
  const currentImage = useCurrentImage();
  const [progress, setProgress] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const PERCENT = Math.ceil(100 / pageData.imgList.length);

  const menu = (
    <Menu>
      <Menu.Item
        disabled={!currentImage}
        onClick={() => {
          downloadFile(pageData.title, currentImage.url);
        }}
      >
        当前图片下载
      </Menu.Item>
      <Menu.Item
        disabled={!pageData.imgList.length}
        onClick={() => {
          setProgress(0);
          setModalVisible(true);
          const zip = new JSZip();
          const folder = zip.folder(pageData.title);
          pageData.imgList.forEach((item) => {
            const blobPromise = fetch(item.url).then((response) => {
              setProgress((progress) => progress + PERCENT);
              if (response.status === 200 || response.status === 0) {
                return Promise.resolve(response.blob());
              } else {
                return Promise.reject(new Error(response.statusText));
              }
            });
            const downloadName = `${item.name}.${item.type}`;
            folder!.file(downloadName, blobPromise, { base64: true });
          });

          zip
            .generateAsync({ type: "blob" })
            .then((blob) => {
              saveAs(blob, pageData.title);
              setModalVisible(false);
            })
            .catch((e) => {
              throw Error(e);
            });
        }}
      >
        全部批量下载
      </Menu.Item>
    </Menu>
  );

  const progressBar = useMemo(() => {
    return (
      <>
        <p>{progress >= 100 ? "打包完成～" : "正在打包..."}</p>
        <div css={tw`flex justify-between items-center`}>
          <Progress percent={progress} size="small" status="success" />
          {progress >= 100 && <Icon type="success" style={{ color: "#11CB9E" }} />}
        </div>
      </>
    );
  }, [progress]);

  return (
    <>
      <Dropdown overlay={menu} placement="bottomLeft">
        <Button>
          <Icon className="btn-left-icon" type="download" />
          下载
        </Button>
      </Dropdown>
      <Modal
        visible={modalVisible}
        width={300}
        footer={null}
        centered={true}
        closable={false}
        maskClosable={false}
        onCancel={() => setModalVisible(false)}
      >
        {progressBar}
      </Modal>
    </>
  );
};
