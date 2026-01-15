import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import searchRoutes from './routes/search.js';

// 環境変数を読み込む
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 本番環境のフロントエンドURLを許可
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

// ミドルウェア
app.use(cors({
  origin: function(origin, callback) {
    // originがない場合（Postmanなど）または許可リストにある場合は許可
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// ルート
app.use('/api', searchRoutes);

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'サーバーは正常に動作しています' });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`サーバーがポート ${PORT} で起動しました`);
  console.log(`http://localhost:${PORT}`);
});

// グレースフルシャットダウン
process.on('SIGINT', () => {
  console.log('\nサーバーをシャットダウンしています...');
  process.exit(0);
});
