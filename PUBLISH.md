# 📦 發布到 NPM 指南

本文檔說明如何將 Hao Chatbot 發布到 npm registry。

## 📋 發布前檢查清單

### 1. 確認版本號

在 `package.json` 中更新版本號（遵循語義化版本規範）：

- **Patch 版本** (1.0.0 → 1.0.1): 修復 bug
- **Minor 版本** (1.0.0 → 1.1.0): 新增功能，向下兼容
- **Major 版本** (1.0.0 → 2.0.0): 破壞性變更

```bash
# 自動更新版本號
pnpm version patch  # 或 minor / major
```

### 2. 更新 README.md

確保 README.md 包含：
- [ ] 清晰的安裝說明
- [ ] 使用示例
- [ ] API 文檔
- [ ] 貢獻指南

### 3. 測試構建

```bash
# 清理舊的構建文件
rm -rf dist

# 重新構建
pnpm build

# 檢查 dist 目錄
ls -la dist/
```

確認 dist 目錄包含：
- [ ] `hao-chatbot.es.js` (ES Module)
- [ ] `hao-chatbot.umd.js` (UMD)
- [ ] `style.css`
- [ ] `index.d.ts` (TypeScript 類型定義)

### 4. 本地測試

使用 `demo.html` 測試本地構建：

```bash
# 開啟本地服務器
python3 -m http.server 8000
# 或使用 Node.js
npx serve .
```

訪問 `http://localhost:8000/demo.html` 測試功能。

## 🚀 發布步驟

### 步驟 1: 登入 NPM

```bash
npm login
```

輸入你的 npm 帳號資訊：
- Username
- Password
- Email
- One-time password (如果啟用了 2FA)

驗證登入狀態：
```bash
npm whoami
```

### 步驟 2: 確認 package.json 配置

檢查關鍵欄位：

```json
{
  "name": "hao-chatbot",
  "version": "1.0.0",
  "description": "一個可嵌入任何網頁的 AI 聊天機器人組件",
  "main": "./dist/hao-chatbot.umd.js",
  "module": "./dist/hao-chatbot.es.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ]
}
```

### 步驟 3: 預覽要發布的文件

```bash
npm pack --dry-run
```

這會顯示將要包含在 npm 包中的所有文件。

### 步驟 4: 發布到 NPM

```bash
# 發布
npm publish

# 如果是首次發布且包名被佔用，可以使用 scoped package
npm publish --access public
```

### 步驟 5: 驗證發布

1. 訪問 npm 網站：`https://www.npmjs.com/package/hao-chatbot`
2. 測試安裝：
```bash
# 在另一個目錄測試
mkdir test-install
cd test-install
npm init -y
npm install hao-chatbot
```

## 🔄 更新已發布的包

```bash
# 1. 更新代碼
# 2. 更新版本號
pnpm version patch

# 3. 重新構建
pnpm build

# 4. 發布新版本
npm publish
```

## 📝 Git 標籤

建議為每個版本創建 Git 標籤：

```bash
# 創建標籤
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送標籤到遠端
git push origin v1.0.0

# 或推送所有標籤
git push --tags
```

## 🔐 安全建議

1. **啟用 2FA**: 在 npm 帳號上啟用兩步驟驗證
2. **使用 .npmignore**: 確保敏感文件不被包含
3. **審查依賴**: 定期更新和審查依賴項的安全性

## 📊 發布後

### 更新文檔

1. 更新 GitHub README
2. 創建 Release Notes
3. 更新示例和教程

### 推廣

1. 在社交媒體分享
2. 提交到 awesome lists
3. 撰寫部落格文章

### 監控

1. 檢查 npm 下載量：`https://npm-stat.com/charts.html?package=hao-chatbot`
2. 監控 GitHub issues
3. 回應用戶反饋

## 🐛 撤銷發布

⚠️ **注意**: npm 不建議撤銷已發布的版本，除非有嚴重問題。

```bash
# 撤銷特定版本（發布後 72 小時內）
npm unpublish hao-chatbot@1.0.0

# 棄用某個版本
npm deprecate hao-chatbot@1.0.0 "此版本存在重大問題，請升級到最新版本"
```

## 📚 相關資源

- [npm 發布文檔](https://docs.npmjs.com/cli/v8/commands/npm-publish)
- [語義化版本規範](https://semver.org/lang/zh-TW/)
- [npm package.json 指南](https://docs.npmjs.com/cli/v8/configuring-npm/package-json)

