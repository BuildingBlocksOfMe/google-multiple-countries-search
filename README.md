# Google Search - Multi Country Comparison

複数国のGoogle検索結果を並べて比較できるWebアプリケーションです。アメリカと日本の検索結果を左右に表示し、検索履歴を確認できます。

## 機能

- 🌍 **複数国の検索結果比較**: アメリカと日本のGoogle検索結果を同時表示
- 📜 **検索履歴**: 過去の検索を保存し、クリックで再検索可能
- 🎨 **モダンなUI**: TailwindCSSによる美しく使いやすいデザイン
- 💾 **データベース保存**: SQLiteで検索履歴を永続化

## 技術スタック

### フロントエンド
- React 18
- Vite
- TailwindCSS
- Axios

### バックエンド
- Node.js
- Express
- SQLite3
- Google Custom Search API

## セットアップ手順

### 1. Google Custom Search APIの設定

#### APIキーの取得
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成（または既存のプロジェクトを選択）
3. 「APIとサービス」→「ライブラリ」から「Custom Search API」を検索
4. 「Custom Search API」を有効化
5. 「APIとサービス」→「認証情報」から「APIキー」を作成

#### カスタム検索エンジンIDの取得
1. [Google Programmable Search Engine](https://programmablesearchengine.google.com/)にアクセス
2. 「追加」をクリックして新しい検索エンジンを作成
3. 検索対象: 「ウェブ全体を検索」を選択
4. 検索エンジン名: 任意の名前を入力
5. 作成後、「検索エンジンID（CX）」をコピー

### 2. バックエンドのセットアップ

```bash
# バックエンドディレクトリに移動
cd backend

# 依存関係のインストール（既に完了している場合はスキップ）
npm install

# 環境変数ファイルを作成
cp env.example.txt .env

# .envファイルを編集してAPIキーを設定
# GOOGLE_API_KEY=あなたのAPIキー
# GOOGLE_CX_ID=あなたの検索エンジンID
# PORT=3001
```

### 3. フロントエンドのセットアップ

```bash
# フロントエンドディレクトリに移動
cd frontend

# 依存関係のインストール（既に完了している場合はスキップ）
npm install
```

## アプリケーションの起動

### バックエンドサーバーの起動

```bash
cd backend
npm start
```

サーバーは `http://localhost:3001` で起動します。

### フロントエンドの起動

別のターミナルで以下を実行:

```bash
cd frontend
npm run dev
```

フロントエンドは `http://localhost:3000` で起動します。

### ブラウザでアクセス

ブラウザで `http://localhost:3000` にアクセスしてアプリケーションを使用できます。

## 使い方

1. 検索バーにキーワードを入力
2. 「検索」ボタンをクリック
3. アメリカと日本の検索結果が左右に表示されます
4. 左側のサイドバーに検索履歴が表示されます
5. 履歴をクリックすると再検索できます

## プロジェクト構造

```
google-search-multiple-countries/
├── backend/                    # バックエンドAPI
│   ├── database/
│   │   └── db.js              # SQLiteデータベース設定
│   ├── routes/
│   │   └── search.js          # 検索APIエンドポイント
│   ├── server.js              # Expressサーバー
│   ├── package.json
│   └── .env                   # 環境変数（要作成）
├── frontend/                   # Reactフロントエンド
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx      # 検索入力フォーム
│   │   │   ├── ResultsPanel.jsx   # 検索結果表示
│   │   │   └── SearchHistory.jsx  # 検索履歴サイドバー
│   │   ├── services/
│   │   │   └── api.js         # API通信
│   │   ├── App.jsx            # メインアプリ
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## APIエンドポイント

### POST /api/search
検索を実行し、2カ国の結果を返します。

**リクエスト:**
```json
{
  "query": "検索キーワード"
}
```

**レスポンス:**
```json
{
  "query": "検索キーワード",
  "results": {
    "us": [
      {
        "title": "タイトル",
        "link": "URL",
        "snippet": "説明文",
        "displayLink": "example.com"
      }
    ],
    "jp": [...]
  }
}
```

### GET /api/history
検索履歴を取得します。

**クエリパラメータ:**
- `limit`: 取得件数（デフォルト: 20）

**レスポンス:**
```json
[
  {
    "id": 1,
    "query": "検索キーワード",
    "country1": "US",
    "country2": "JP",
    "timestamp": "2026-01-14T12:00:00.000Z"
  }
]
```

## 注意事項

### Google Custom Search API の制限
- **無料枠**: 1日あたり100クエリまで
- 無料枠を超える場合は、Google Cloud Platformで課金を有効にする必要があります
- 実際のGoogle検索とは異なる結果が表示される場合があります

### 開発環境
- Node.js 18以上を推奨
- npm または yarn

### セキュリティ
- `.env` ファイルは絶対にGitにコミットしないでください
- 本番環境では適切な環境変数管理を行ってください

## トラブルシューティング

### APIキーエラーが出る場合
- `.env` ファイルが正しく作成されているか確認
- `GOOGLE_API_KEY` と `GOOGLE_CX_ID` が正しく設定されているか確認
- Custom Search APIが有効化されているか確認

### 検索結果が表示されない場合
- バックエンドサーバーが起動しているか確認（`http://localhost:3001/health` にアクセス）
- ブラウザのコンソールでエラーを確認
- APIの無料枠（1日100クエリ）を超えていないか確認

### ポートが使用中の場合
- バックエンド: `.env` ファイルの `PORT` を変更
- フロントエンド: `vite.config.js` の `server.port` を変更

## ライセンス

ISC

## 作成者

DIYアプリ開発プロジェクト
