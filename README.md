# Google Search - Multi Country Comparison

A web application to compare Google search results from multiple countries side by side, with search history tracking.

複数国のGoogle検索結果を比較できるWebアプリケーションです。検索履歴機能付き。

## Features | 機能

- 🌍 **Multi-Country Comparison**: Compare search results from 15 countries simultaneously  
  **複数国比較**: 15カ国から選択して検索結果を同時表示
- 🔍 **Extended Results**: Up to 30 search results per country  
  **拡張結果**: 各国最大30件の検索結果
- 📜 **Search History**: Save and replay previous searches  
  **検索履歴**: 過去の検索を保存・再実行可能
- 🎨 **Modern UI**: Beautiful interface built with TailwindCSS  
  **モダンUI**: TailwindCSSによる美しいデザイン
- 💾 **Persistent Storage**: SQLite database for search history  
  **永続保存**: SQLiteで検索履歴を保存

## Supported Countries | 対応国

🇺🇸 United States | 🇯🇵 Japan | 🇬🇧 United Kingdom | 🇩🇪 Germany | 🇫🇷 France  
🇨🇳 China | 🇰🇷 South Korea | 🇮🇳 India | 🇧🇷 Brazil | 🇨🇦 Canada  
🇦🇺 Australia | 🇲🇽 Mexico | 🇪🇸 Spain | 🇮🇹 Italy | 🇷🇺 Russia

## Tech Stack | 技術スタック

### Frontend | フロントエンド
- React 18
- Vite
- TailwindCSS
- Axios

### Backend | バックエンド
- Node.js
- Express
- SQLite3
- Google Custom Search API

## Setup | セットアップ

### 1. Google Custom Search API Configuration | API設定

#### Get API Key | APIキーの取得
1. Go to [Google Cloud Console](https://console.cloud.google.com/)  
   [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. Create a new project or select an existing one  
   新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. Navigate to "APIs & Services" → "Library" and search for "Custom Search API"  
   「APIとサービス」→「ライブラリ」から「Custom Search API」を検索
4. Enable "Custom Search API"  
   「Custom Search API」を有効化
5. Go to "APIs & Services" → "Credentials" and create an "API Key"  
   「APIとサービス」→「認証情報」から「APIキー」を作成

#### Get Custom Search Engine ID | 検索エンジンIDの取得
1. Go to [Google Programmable Search Engine](https://programmablesearchengine.google.com/)  
   [Google Programmable Search Engine](https://programmablesearchengine.google.com/)にアクセス
2. Click "Add" to create a new search engine  
   「追加」をクリックして新しい検索エンジンを作成
3. Select "Search the entire web"  
   「ウェブ全体を検索」を選択
4. Enter any name for the search engine  
   検索エンジン名を任意に入力
5. Copy the "Search engine ID (CX)" after creation  
   作成後、「検索エンジンID（CX）」をコピー

### 2. Backend Setup | バックエンドセットアップ

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example.txt .env

# Edit .env file and set your API credentials
# GOOGLE_API_KEY=your_api_key_here
# GOOGLE_CX_ID=your_custom_search_engine_id
# PORT=3001
```

### 3. Frontend Setup | フロントエンドセットアップ

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## Running the Application | アプリケーションの起動

### Start Backend Server | バックエンドサーバーの起動

```bash
cd backend
npm start
```

Server will start at `http://localhost:3001`  
サーバーは `http://localhost:3001` で起動します

### Start Frontend | フロントエンドの起動

In a separate terminal:  
別のターミナルで実行:

```bash
cd frontend
npm run dev
```

Frontend will start at `http://localhost:3000`  
フロントエンドは `http://localhost:3000` で起動します

### Access the Application | アクセス

Open your browser and navigate to `http://localhost:3000`  
ブラウザで `http://localhost:3000` にアクセス

## Usage | 使い方

1. Select two countries from the dropdown menus  
   ドロップダウンメニューから2つの国を選択
2. Enter your search query in the search bar  
   検索バーにキーワードを入力
3. Click "Search" button  
   「検索」ボタンをクリック
4. View results from both countries side by side  
   両国の検索結果が左右に表示されます
5. Search history appears in the left sidebar  
   左サイドバーに検索履歴が表示されます
6. Click on history items to re-run searches  
   履歴をクリックすると再検索できます

## Project Structure | プロジェクト構造

```
google-search-multiple-countries/
├── backend/                    # Backend API | バックエンドAPI
│   ├── database/
│   │   └── db.js              # SQLite database | データベース設定
│   ├── routes/
│   │   └── search.js          # Search API endpoints | 検索エンドポイント
│   ├── server.js              # Express server | サーバー
│   ├── package.json
│   └── .env                   # Environment variables | 環境変数（要作成）
├── frontend/                   # React frontend | フロントエンド
│   ├── src/
│   │   ├── components/
│   │   │   ├── CountrySelector.jsx   # Country selection | 国選択
│   │   │   ├── SearchBar.jsx         # Search input | 検索フォーム
│   │   │   ├── ResultsPanel.jsx      # Results display | 結果表示
│   │   │   └── SearchHistory.jsx     # History sidebar | 履歴サイドバー
│   │   ├── services/
│   │   │   └── api.js         # API communication | API通信
│   │   ├── App.jsx            # Main app | メインアプリ
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints | APIエンドポイント

### POST /api/search
Execute search and return results from two countries.  
検索を実行し、2カ国の結果を返します。

**Request | リクエスト:**
```json
{
  "query": "search term",
  "country1": "us",
  "country2": "jp"
}
```

**Response | レスポンス:**
```json
{
  "query": "search term",
  "countries": {
    "country1": "us",
    "country2": "jp"
  },
  "results": {
    "country1": [
      {
        "title": "Title",
        "link": "URL",
        "snippet": "Description",
        "displayLink": "example.com"
      }
    ],
    "country2": [...]
  }
}
```

### GET /api/history
Get search history.  
検索履歴を取得します。

**Query Parameters | クエリパラメータ:**
- `limit`: Number of items to return (default: 20) | 取得件数（デフォルト: 20）

**Response | レスポンス:**
```json
[
  {
    "id": 1,
    "query": "search term",
    "country1": "US",
    "country2": "JP",
    "timestamp": "2026-01-14T12:00:00.000Z"
  }
]
```

## Important Notes | 注意事項

### Google Custom Search API Limitations | API制限
- **Free Tier**: 100 queries per day  
  **無料枠**: 1日あたり100クエリまで
- **Current Usage**: 6 queries per search (3 pages × 2 countries)  
  **現在の使用量**: 1検索あたり6クエリ（3ページ×2カ国）
- **Daily Searches**: ~16 searches per day with free tier  
  **1日の検索回数**: 無料枠で約16回
- Billing must be enabled for usage beyond free tier  
  無料枠を超える場合は課金が必要
- Results may differ from actual Google search  
  実際のGoogle検索とは異なる結果が表示される場合があります

### Requirements | 必要環境
- Node.js 18 or higher | Node.js 18以上
- npm or yarn

### Security | セキュリティ
- ⚠️ Never commit `.env` file to Git  
  `.env` ファイルは絶対にGitにコミットしないでください
- Use proper environment variable management in production  
  本番環境では適切な環境変数管理を行ってください

## Troubleshooting | トラブルシューティング

### API Key Error | APIキーエラー
- Check if `.env` file exists and is properly configured  
  `.env` ファイルが正しく作成・設定されているか確認
- Verify `GOOGLE_API_KEY` and `GOOGLE_CX_ID` are correct  
  `GOOGLE_API_KEY` と `GOOGLE_CX_ID` が正しいか確認
- Confirm Custom Search API is enabled  
  Custom Search APIが有効化されているか確認

### No Search Results | 検索結果が表示されない
- Verify backend server is running (check `http://localhost:3001/health`)  
  バックエンドサーバーが起動しているか確認
- Check browser console for errors  
  ブラウザのコンソールでエラーを確認
- Ensure you haven't exceeded the daily quota (100 queries)  
  1日の無料枠（100クエリ）を超えていないか確認

### Port Already in Use | ポートが使用中
- Backend: Change `PORT` in `.env` file  
  バックエンド: `.env` ファイルの `PORT` を変更
- Frontend: Change `server.port` in `vite.config.js`  
  フロントエンド: `vite.config.js` の `server.port` を変更

## Adjusting Results Count | 結果数の調整

To change the number of results per country, edit `backend/routes/search.js`:  
国ごとの結果数を変更するには、`backend/routes/search.js` を編集:

```javascript
// Current: 3 pages (30 results) - 6 queries per search
const results1Items = await fetchMultiplePages(config1, 3);

// Option 1: 2 pages (20 results) - 4 queries per search (~25 searches/day)
const results1Items = await fetchMultiplePages(config1, 2);

// Option 2: 1 page (10 results) - 2 queries per search (~50 searches/day)
const results1Items = await fetchMultiplePages(config1, 1);
```

## Deployment | デプロイ

### Railway Deployment (Recommended) | Railway デプロイ（推奨）

Railway is the easiest way to deploy this application with SQLite support.  
RailwayはSQLite対応で最も簡単なデプロイ方法です。

#### Prerequisites | 前提条件
- Railway account (sign up at [railway.app](https://railway.app/))  
  Railwayアカウント（[railway.app](https://railway.app/)で登録）
- GitHub repository (already done ✓)  
  GitHubリポジトリ（完了済み✓）

#### Step 1: Create New Project | 新規プロジェクト作成

1. Go to [Railway Dashboard](https://railway.app/dashboard)  
   [Railwayダッシュボード](https://railway.app/dashboard)にアクセス
2. Click **"New Project"**  
   **"New Project"**をクリック
3. Select **"Deploy from GitHub repo"**  
   **"Deploy from GitHub repo"**を選択
4. Choose your repository: `BuildingBlocksOfMe/google-multiple-countries-search`  
   リポジトリを選択: `BuildingBlocksOfMe/google-multiple-countries-search`

#### Step 2: Deploy Backend | バックエンドのデプロイ

1. Railway will detect the project. Click **"Add variables"**  
   Railwayがプロジェクトを検出します。**"Add variables"**をクリック
2. Add environment variables | 環境変数を追加:
   ```
   GOOGLE_API_KEY=your_api_key_here
   GOOGLE_CX_ID=your_search_engine_id
   PORT=3001
   ```
3. In **Settings**, set:  
   **Settings**で設定:
   - **Root Directory**: `backend`
   - **Start Command**: `node server.js`
   - **Build Command**: `npm install`

4. Add a **Volume** for SQLite persistence | SQLite永続化用のVolumeを追加:
   - Go to **Data** tab  
     **Data**タブに移動
   - Click **"New Volume"**  
     **"New Volume"**をクリック
   - Mount Path: `/app/backend/database`  
     マウントパス: `/app/backend/database`

5. Click **"Deploy"** | **"Deploy"**をクリック

6. Copy the generated URL (e.g., `https://your-app.railway.app`)  
   生成されたURLをコピー（例: `https://your-app.railway.app`）

#### Step 3: Deploy Frontend | フロントエンドのデプロイ

1. In the same Railway project, click **"New Service"**  
   同じRailwayプロジェクトで**"New Service"**をクリック
2. Select **"GitHub Repo"** → Same repository  
   **"GitHub Repo"**を選択 → 同じリポジトリ
3. In **Settings**, set:  
   **Settings**で設定:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview -- --port $PORT --host 0.0.0.0`

4. Add environment variable | 環境変数を追加:
   ```
   VITE_API_URL=https://your-backend-url.railway.app
   ```

5. Update `frontend/vite.config.js` to use environment variable:  
   `frontend/vite.config.js`を更新して環境変数を使用:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  preview: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0'
  }
})
```

6. Update `frontend/src/services/api.js`:  
   `frontend/src/services/api.js`を更新:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL 
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';
```

7. Commit and push changes | 変更をコミット・プッシュ:
   ```bash
   git add .
   git commit -m "Configure for Railway deployment"
   git push
   ```

8. Railway will automatically redeploy  
   Railwayが自動的に再デプロイ

#### Step 4: Configure CORS | CORSの設定

Update `backend/server.js` to allow frontend domain:  
`backend/server.js`を更新してフロントエンドドメインを許可:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.railway.app'
  ]
}));
```

#### Step 5: Access Your App | アプリにアクセス

Visit your frontend Railway URL: `https://your-frontend.railway.app`  
フロントエンドのRailway URLにアクセス: `https://your-frontend.railway.app`

🎉 Your app is now live! | アプリが公開されました！

### Railway Free Tier Limits | Railway 無料枠の制限

- **$5 credit per month** | 月$5のクレジット
- **~500 hours of usage** | 約500時間の利用
- **Automatic sleep after inactivity** | 非アクティブ時は自動スリープ
- **Perfect for personal projects** | 個人プロジェクトに最適

### Cost Optimization Tips | コスト最適化のヒント

1. **Reduce API queries**: Use 1 page instead of 3 (see "Adjusting Results Count")  
   **APIクエリを削減**: 3ページではなく1ページを使用（「結果数の調整」を参照）
2. **Monitor usage**: Check Railway dashboard regularly  
   **使用量を監視**: Railwayダッシュボードを定期的に確認
3. **Add custom domain**: Free with Railway Pro ($5/month)  
   **カスタムドメイン追加**: Railway Pro（$5/月）で無料

## License | ライセンス

ISC

## Author | 作成者

DIY App Development Project | DIYアプリ開発プロジェクト
