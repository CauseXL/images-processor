import { css } from "@emotion/react";
import React, { useState, useEffect, useMemo } from "react";
import tw from "twin.macro";
import { theme } from "@/styles/theme";
import { ModalV2 as Modal, Icon } from "tezign-ui";

// * --------------------------------------------------------------------------- comp

// TODO: props type
export const CompareModal: React.FC<any> = (props) => {
  const {pageData} = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState(pageData[0]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setModalItem(pageData[count]);
  }, [count, pageData]);

  const getPreview = () => {
    const maxLength = pageData.length;
    if (count - 1 < 0) {
      setCount(maxLength - 1);
    } else {
      setCount(c => c - 1);
    }
  };

  const getNext = () => {
    const maxLength = pageData.length;
    if (count + 1 >= maxLength) {
      setCount(0);
    } else {
      setCount(c => c + 1);
    }
  };

  const modal = useMemo(() => {
    return (
      <Modal
        visible={modalVisible}
        css={modalStyle}
        full={true}
        footer={true}
        mask={false}
        closable={true}
        style={{background: theme.bgColors.opacity}}
        onCancel={() => setModalVisible(false)}
      >
        <div css={tw`h-full flex flex-col items-center justify-center px-48`}>
          <Icon type="round-right" css={[tw`transform -rotate-90 cursor-pointer`, iconStyle]} onClick={getPreview}/>
          <div css={tw`w-full flex items-center justify-center my-6`}>
            <div css={[tw`mr-8 w-1/2 overflow-hidden pb-1`, containerStyle]}>
              <div css={tw`text-base mb-3`}>原图</div>
              <div css={[tw`flex items-center justify-center`, imgContainerStyle]}>
                <img css={tw`max-w-full max-h-full object-contain`} src={modalItem.oUrl} alt="" />
              </div>
              <div css={tw`flex items-center justify-between mt-4`}>
                <span css={tw`truncate`}>{modalItem.oName}</span>
                <div>
                  <span css={tw`px-4 py-1 rounded-3xl border border-solid mx-4`}>{modalItem.oType}</span>
                  <span css={tw`px-4 py-1 rounded-3xl border border-solid`}>{modalItem.oWidth}*{modalItem.oHeight}px</span>
                </div>
              </div>
            </div>

            <div css={[tw`ml-8 w-1/2 overflow-hidden pb-1`, containerStyle]}>
              <div css={tw`text-base mb-3`}>批量结果图</div>
              <div css={[tw`flex items-center justify-center`, imgContainerStyle]}>
                <img css={tw`max-w-full max-h-full object-contain`} src={modalItem.url} alt="" />
              </div>
              <div css={tw`flex items-center justify-between mt-4`}>
                <span css={tw`truncate`}>{modalItem.name}</span>
                <div>
                  <span css={tw`px-4 py-1 rounded-3xl border border-solid mx-4`}>{modalItem.type}</span>
                  <span css={tw`px-4 py-1 rounded-3xl border border-solid`}>{modalItem.width}*{modalItem.height}px</span>
                </div>
              </div>
            </div>
          </div>
          <Icon type="round-right" css={[tw`transform rotate-90 cursor-pointer`, iconStyle]} onClick={getNext} />
        </div>
      </Modal>
    )
  }, [modalVisible, modalItem])

  return (
    <>
      <div css={
        [
          tw`rounded-sm px-4 py-1`,
          css`&:hover {
            color: #0CC5AE;
            background-color: rgba(12, 197, 174, 0.16)}
          `
        ]
      }
        onClick={() => setModalVisible(true)}
      >
        原图对比
      </div>
      {modal}
    </>
  );
};

// * --------------------------------------------------------------------------- style
const modalStyle = css`
  color: ${theme.colors.white};
  .ant-modal-content {
    background: transparent;
    .ant-modal-close .ant-modal-close-x {
      border: none;
      color: ${theme.colors.white};
    }
  }
`;

const iconStyle = css`
  font-size: 48px;
`;

const containerStyle = css`
  max-width: 512px;
  width: 50%;
`;

const imgContainerStyle = css`
  height: 375px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.16);
`;
