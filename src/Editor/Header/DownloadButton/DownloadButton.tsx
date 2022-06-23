import { pageData } from "@/core/data";
import { useValue } from "@/core/utils";
import { getCurrentImage } from "@/logic/get/currentImage";
import { Button, Dropdown, Icon, Menu, Modal, Progress } from "antd";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import type { FC } from "react";
import { useMemo, useState } from "react";
import tw from "twin.macro";
import { downloadFile, formatExtension } from "./logic/download";

// * --------------------------------------------------------------------------- comp

export const DownloadButton: FC = () => {
  const imgList = useValue(() => pageData.get().imgList);
  const pageTitle = useValue(() => pageData.get().title);
  const currentImage = useValue(getCurrentImage);
  const [progress, setProgress] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const menu = (
    <Menu>
      <Menu.Item
        disabled={!currentImage}
        onClick={() => {
          downloadFile(currentImage.name, currentImage.url);
        }}
      >
        当前图片下载
      </Menu.Item>
      <Menu.Item
        disabled={!imgList.length}
        onClick={() => {
          const folderName = pageTitle.replaceAll("/", "_");
          setProgress(0);
          setModalVisible(true);
          const zip = new JSZip();
          const folder = zip.folder(folderName);
          imgList.forEach((item) => {
            const blobPromise = fetch(item.url).then((response) => {
              if (response.status === 200 || response.status === 0) {
                return Promise.resolve(response.blob());
              } else {
                return Promise.reject(new Error(response.statusText));
              }
            });
            const name = item.name.replaceAll("/", "");
            const downloadName = `${name}.${formatExtension(item.type)}`;
            folder!.file(downloadName, blobPromise, { base64: true });
          });
          zip
            .generateAsync({ type: "blob" }, (metadata) => {
              setProgress(metadata.percent);
            })
            .then((blob) => {
              saveAs(blob, folderName);
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
        <Button type="primary">
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
