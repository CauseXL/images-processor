# dynamic 图片批量编辑器项目

## 调试

项目基座由 **tsdx** (https://github.com/formium/tsdx#features) 搭建

### 启动

```bash
npm i # or yarn
npm start # or yarn start
```

- 提供开发时的调试环境，用于边写代码边调试

```bash
cd example
npm i # or yarn
npm start # or yarn start
```

- 支持 Storybook (https://storybook.js.org/)

```bash
# 根目录
yarn storybook
```

### lint

```bash
tsdx lint src
tsdx lint src --fix
tsdx lint src --write-file
```

### Jest

`npm test` or `yarn test`.

### Bundle analysis

 `npm run size && npm run analyze`.

### TODO Publish

- 代码合并到master自动执行发包？
- changelog？


## 开发

### 工具和风格

- ESLint + Prettier
  - FP only
  - 箭头函数 only
  - hooks only
  - 禁止 `export default`，只允许具名导出
  - 行数太长的文件请切分，有特例请在文件中 disable 该规则


CSS 的开发模式目前主要使用（CSS in JS "@emotion/css"）

### 整体文件结构

**src/**

* **core/**：系统核心
- **components/**：组件库
- **logic/**：业务有关的执行逻辑（比如尺寸计算，数据生成等，hotkey 等系统）
- **utils/**：业务无关的 util（工厂函数等）
- **types/**：TS 类型声明

---

可以用下面的代码更新 remote（建议用 ssh 的模式）

```sh
git remote set-url origin git@git.tezign.com:engineering/tezign-intelligence-images-processor.git
git fetch --all --prune
```

### 分支

- prod 主分支：**master**
- dev 主分支：**develop**
- test 主分支：**test**
- 功能分支：**feat/xxx**
- 修复分支：**fix/xxx**

子任务（feat or fix）完成后 merge 到 develop 上

- commit （推荐）用：<https://github.com/commitizen/cz-cli> （https://www.conventionalcommits.org/zh-hans/v1.0.0-beta.4/）
- merge 用：`git merge --no-ff [your-branch]`

提交流程：
- 当前开发分支 feat/xxx
- git add .
- cz
- git rebase -i HEAD~{你做的修改}
- 修改信息，合并多次提交，wq 退出编辑
- git pull origin develop --rebase 同步 dev
- git push
- git checkout 到 develop
- git merge feat/xxx --no-ff
