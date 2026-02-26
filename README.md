# nano-banana-driver

本仓库是一个「本地 nano banana 生图 driver」的最小 MVP：

- 目标：给你一个**可打开的 Web 小工具**，方便在本机填入 `baseURL`、`token` 和 `prompt`，模拟/对接 nano banana 生图服务；
- 当前状态：前端界面已搭好，暂时还是 **mock 调用**，尚未接入真实 nano banana API；
- 技术栈：React + TypeScript + Vite + Tailwind CSS。

> ⚠️ 注意：目前版本主要用于验证交互形态，不适合作为生产环境的长期方案。后续可以按实际 nano banana API 规格接入真实调用，并增加安全/限流等能力。

---

## 1. 解决什么问题（What / Why）

当你在本机想快速试验 / 对接某个生图服务（这里叫「nano banana」）时，往往需要：

- 记住 API 路径、鉴权方式、参数格式；
- 反复用 curl/Postman 调试请求；
- 自己处理 prompt、参数、返回内容。

这个小工具的目标是：

- 提供一个**统一的本地 Web 界面**：
  - 填入 `baseURL` 和 `token`；
  - 输入 prompt 和少量参数；
  - 点击一个按钮即可发起请求；
- 对上层（你、或以后接入的脚本/工具）暴露一个相对固定的“调用形态”，把 API 细节藏在下面。

目前版本主要用于：

- 验证交互形态（配置 + prompt + 生成按钮）；
- 为后续接入真实 nano banana API 准备骨架。

---

## 2. 安装与运行（Install / Usage）

### 2.1 前置条件

- Node.js >= 18
- npm / pnpm / yarn（三选一，这里以 npm 为例）

### 2.2 克隆并安装依赖

```bash
git clone https://github.com/SnowFairy001/nano-banana-driver.git
cd nano-banana-driver
npm install
```

### 2.3 开发模式运行（本地 Web UI）

```bash
npm run dev
```

命令执行后，终端会提示一个本地地址（通常是 `http://localhost:5173`）。

在浏览器中打开该地址，即可看到 Web 界面：

- `Base URL`：填入 nano banana 服务的基础地址，例如 `https://api.nanobanana.dev`；
- `Token`：填入访问 nano banana 服务所需的 API token；
- `Prompt`：输入你想生成的图像描述文案；
- 点击「生成（mock）」按钮，目前会在页面下方显示一行模拟调用信息：
  - `(mock) would call {baseUrl} with given token and prompt: "..."`

> 当前版本不对接真实生图 API，只演示调用形态。后续可在 `src/App.tsx` 中实现真实调用逻辑。

### 2.4 构建与预览（可选）

如果你想打包构建并以静态资源形式预览：

```bash
npm run build
npm run preview
```

同样在终端提示的地址打开浏览器即可。

---

## 3. 最小示例（Example）

1. 启动开发服务器：

   ```bash
   npm run dev
   ```

2. 浏览器访问 `http://localhost:5173`。
3. 在界面中输入：
   - Base URL：`https://api.nanobanana.dev`
   - Token：`your-api-token`
   - Prompt：`a small orange cat on the moon`
4. 点击「生成（mock）」按钮，你会在页面下方看到提示：

   ```text
   (mock) would call https://api.nanobanana.dev with given token and prompt: "a small orange cat on the moon"
   ```

这说明：

- 配置与表单交互正常；
- 未来只需要在逻辑层接入真实 nano banana API，即可把 mock 改为真实调用。

---

## 4. 边界与后续工作（Limits / Next Steps）

### 4.1 当前版本的边界

- 未接入真实 nano banana API：
  - `handleGenerate` 目前只是将 baseURL、token 和 prompt 拼接成一段文本显示；
- 没有后端服务：
  - 所有逻辑都在前端完成，没有独立的 Node 后端；
  - 不适合在浏览器端直接携带敏感 token 进行真实生产调用；
- 未做任何安全/限流控制：
  - 对频繁调用、恶意 prompt 等情况没有额外保护。

### 4.2 建议的后续演进方向

1. **接入真实 nano banana API**
   - 在 `src/App.tsx` 的 `handleGenerate` 函数中：
     - 通过 fetch/axios 等方式调用后端服务；
     - 或增加一个简单的后端（Node/TS），由前端只与后端交互，后端再请求 nano banana API。

2. **增加结果展示与历史记录**
   - 将生成的图片以缩略图形式展示在界面中；
   - 可选：记录最近若干次调用的 prompt 和结果，便于对比。

3. **抽离配置与环境**
   - 支持从本地配置文件或 `.env` 文件中读取默认 baseURL/token；
   - 前端只管理非敏感参数，敏感信息下放到后端或本机配置。

4. **结合测试与 CI（工程化）**
   - 后续可以补充：
     - 基础的单元测试（React 组件、调用逻辑）；
     - 简单 CI 流程（lint + test + build）。

---

## 5. 开发提示

- 主要入口文件：
  - `src/main.tsx`：React 入口挂载；
  - `src/App.tsx`：主界面和交互逻辑。
- 样式相关：
  - 使用 Tailwind CSS，自定义样式可在 `index.css` 中扩展。

如果你后续希望我：

- 补上真实 nano banana API 调用；
- 引入简单的后端层；
- 或为这个项目加上最小的测试/CI 流程；

都可以直接在这个 README 的基础上继续演进，我会按这里约定的结构和原则来扩展。