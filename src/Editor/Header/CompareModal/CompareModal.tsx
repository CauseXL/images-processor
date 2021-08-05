import { pageData } from "@/core/data";
import { useValue } from "@/core/utils";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import type { FC } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { Icon, ModalV2 as Modal } from "tezign-ui";
import tw from "twin.macro";

// * --------------------------------------------------------------------------- comp
export const CompareModal: FC<any> = () => {
  const imgList = useValue(() => pageData.get().imgList);
  // 当前选中图片的index
  let activeIndex = imgList.findIndex((item) => item.active);
  activeIndex = activeIndex >= 0 ? activeIndex : 0;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalItem, setModalItem] = useState(imgList[activeIndex]);
  const [count, setCount] = useState(activeIndex);

  useEffect(() => {
    setCount(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    setModalItem(imgList[count]);
  }, [count, imgList]);

  const getPreview = () => {
    const maxLength = imgList.length;
    if (count - 1 < 0) {
      setCount(maxLength - 1);
    } else {
      setCount((c) => c - 1);
    }
  };

  const getNext = () => {
    const maxLength = imgList.length;
    if (count + 1 >= maxLength) {
      setCount(0);
    } else {
      setCount((c) => c + 1);
    }
  };

  const modal = useMemo(() => {
    const { name: oName, url: oUrl, type: oType, width: oWidth, height: oHeight } = modalItem?.origin || {};
    return (
      modalItem && (
        <Modal
          visible={modalVisible}
          css={modalStyle}
          full={true}
          footer={true}
          mask={false}
          closable={true}
          style={{ background: theme.bgColors.opacity }}
          onCancel={() => setModalVisible(false)}
        >
          <div css={tw`h-full flex flex-col items-center justify-center px-48`}>
            <Icon type="round-right" css={[tw`transform -rotate-90 cursor-pointer`, iconStyle]} onClick={getPreview} />
            <div css={tw`w-full flex items-center justify-center my-6`}>
              <div css={[tw`mr-8 w-1/2 overflow-hidden pb-1`, containerStyle]}>
                <div css={tw`text-base mb-3`}>原图</div>
                <div css={[tw`flex items-center justify-center`, imgContainerStyle]}>
                  <img css={tw`max-w-full max-h-full object-contain`} src={oUrl} alt="" />
                </div>
                <div css={tw`flex items-center justify-between mt-4`}>
                  <span css={tw`truncate`}>{oName}</span>
                  <div>
                    <span css={tw`px-4 py-1 rounded-3xl border border-solid mx-4`}>{oType}</span>
                    <span css={tw`px-4 py-1 rounded-3xl border border-solid`}>
                      {oWidth}*{oHeight}px
                    </span>
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
                    <span css={tw`px-4 py-1 rounded-3xl border border-solid`}>
                      {modalItem.width}*{modalItem.height}px
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <Icon type="round-right" css={[tw`transform rotate-90 cursor-pointer`, iconStyle]} onClick={getNext} />
          </div>
        </Modal>
      )
    );
  }, [modalVisible, modalItem]);

  return (
    <>
      <div
        css={[
          tw`rounded-sm px-4 py-1`,
          css`
            &:hover {
              color: #0cc5ae;
              background-color: rgba(12, 197, 174, 0.16);
            }
          `,
          imgList.length === 0 && disabledCss,
        ]}
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

const disabledCss = css`
  opacity: 0.3;
  cursor: not-allowed;
`;
