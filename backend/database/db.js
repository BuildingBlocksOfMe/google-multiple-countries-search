import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// データベースファイルのパス
const dbPath = join(__dirname, 'searches.db');

// SQLite データベース接続
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('データベース接続エラー:', err.message);
  } else {
    console.log('SQLite データベースに接続しました');
  }
});

// テーブル作成
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS search_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      query TEXT NOT NULL,
      country1 TEXT NOT NULL,
      country2 TEXT NOT NULL,
      results1 TEXT,
      results2 TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// 検索履歴を保存
export function saveSearch(query, country1, country2, results1, results2) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO search_history (query, country1, country2, results1, results2)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(
      sql,
      [query, country1, country2, JSON.stringify(results1), JSON.stringify(results2)],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      }
    );
  });
}

// 検索履歴を取得（最新20件）
export function getSearchHistory(limit = 20) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, query, country1, country2, timestamp
      FROM search_history
      ORDER BY timestamp DESC
      LIMIT ?
    `;
    
    db.all(sql, [limit], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// 特定の検索結果を取得
export function getSearchById(id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT *
      FROM search_history
      WHERE id = ?
    `;
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row) {
          row.results1 = JSON.parse(row.results1);
          row.results2 = JSON.parse(row.results2);
        }
        resolve(row);
      }
    });
  });
}

// データベースを閉じる
export function closeDatabase() {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        console.log('データベース接続を閉じました');
        resolve();
      }
    });
  });
}

export default db;
