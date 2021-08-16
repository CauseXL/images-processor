import { CropTemplateType } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropTemplate/CropTemplate";

export const MIN_CROP_LENGTH = 20;

export const WRAPPER_PADDING = 20;

export const cropTemplateList: CropTemplateType[] = [
  { type: "origin", title: "原始比例", ratio: [NaN, NaN] },
  { type: "custom", title: "自定义", ratio: [NaN, NaN] },
  { type: "template", title: "微信公众号首图", desc: "比例 7 : 3，最佳尺寸 900 * 383", ratio: [7, 3] },
  { type: "template", title: "公众号次图", desc: "比例 1 : 1，最佳尺寸 200 * 200", ratio: [1, 1] },
  { type: "template", title: "淘宝店图", desc: "比例 1 : 1，最佳尺寸 800 * 800", ratio: [1, 1] },
  { type: "template", title: "产品主图", desc: "比例 1 : 1，最佳尺寸 800 * 800", ratio: [1, 1] },
  { type: "template", title: "店标图片", desc: "比例 1 : 1，最佳尺寸 100 * 100", ratio: [1, 1] },
  { type: "template", title: "宝贝描述图片", desc: "比例 1 : 1，最佳尺寸 500 * 500", ratio: [1, 1] },
  { type: "template", title: "旺旺头像图片", desc: "比例 1 : 1，最佳尺寸 120 * 120", ratio: [1, 1] },
  { type: "template", title: "店铺公告图片", desc: "比例 4 : 5，最佳尺寸 320 * 400", ratio: [4, 5] },
  { type: "template", title: "店铺介绍图片", desc: "比例 4 : 3，最佳尺寸 600 * 450", ratio: [4, 3] },
  { type: "template", title: "店招图片", desc: "比例 64 : 5，最佳尺寸 1920 * 150", ratio: [64, 5] },
  { type: "template", title: "详情页主图片", desc: "比例 1 : 1，最佳尺寸 800 * 800", ratio: [1, 1] },
  { type: "template", title: "拼多多订单列表图片", desc: "比例 1 : 1，最佳尺寸 200 * 200", ratio: [1, 1] },
  { type: "template", title: "商品分类列表、搜索展示图片", desc: "比例 1 : 1，最佳尺寸 400 * 400", ratio: [1, 1] },
  { type: "template", title: "轮播图片", desc: "比例 8 : 5，最佳尺寸 640 * 400", ratio: [8, 5] },
  { type: "template", title: "详情图片", desc: "比例 2 : 3，最佳尺寸 640 * 960", ratio: [2, 3] },
];
