import { CropTemplateType } from "@/Editor/LeftSideabr/ToolMenu/ImageCrop/CropTemplate/CropTemplate";

export const MIN_CROP_LENGTH = 20;

export const WRAPPER_PADDING = 30;

export const cropTemplateList: CropTemplateType[] = [
  {
    title: "原始比例",
    type: "origin",
  },
  {
    title: "自定义",
    type: "custom",
  },
  {
    title: "公众号首图",
    desc: "比例 7 : 3，最佳尺寸 900 * 383",
  },
  {
    title: "公众号次图",
    desc: "比例 1 : 1，最佳尺寸 200 * 200",
  },
  {
    title: "淘宝店图",
    desc: "比例 1 : 1，最佳尺寸 800 * 800",
  },
  {
    title: "产品主图",
    desc: "比例 1 : 1，最佳尺寸 800 * 800",
  },
  {
    title: "店标图片",
    desc: "比例 1 : 1，最佳尺寸 100 * 100",
  },
  {
    title: "宝贝描述图片",
    desc: "比例 1 : 1，最佳尺寸 500 * 500",
  },
  {
    title: "旺旺头像图片",
    desc: "比例 1 : 1，最佳尺寸 120 * 120",
  },
  {
    title: "店铺公告图片",
    desc: "比例 4 : 5，最佳尺寸 320 * 400",
  },
  {
    title: "店铺介绍图片",
    desc: "比例 4 : 3，最佳尺寸 600 * 450",
  },
  {
    title: "店招图片",
    desc: "比例 64 : 5，最佳尺寸 1920 * 150",
  },
  {
    title: "详情页主图片",
    desc: "比例 1 : 1，最佳尺寸 800 * 800",
  },
  {
    title: "拼多多订单列表图片",
    desc: "比例 1 : 1，最佳尺寸 200 * 200",
  },
  {
    title: "商品分类列表、搜索展示图片",
    desc: "比例 1 : 1，最佳尺寸 400 * 400",
  },
  {
    title: "轮播图片",
    desc: "比例 8 : 5，最佳尺寸 640 * 400",
  },
  {
    title: "详情图片",
    desc: "比例 2 : 3，最佳尺寸 640 * 960",
  },
];
