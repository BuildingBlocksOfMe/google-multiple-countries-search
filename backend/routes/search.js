import express from 'express';
import { google } from 'googleapis';
import { saveSearch, getSearchHistory } from '../database/db.js';

const router = express.Router();

// Google Custom Search API setup
const customsearch = google.customsearch('v1');

// 国の設定マッピング
const countryConfig = {
  us: { gl: 'us', hl: 'en', name: 'US' },
  jp: { gl: 'jp', hl: 'ja', name: 'JP' },
  uk: { gl: 'uk', hl: 'en', name: 'UK' },
  de: { gl: 'de', hl: 'de', name: 'DE' },
  fr: { gl: 'fr', hl: 'fr', name: 'FR' },
  cn: { gl: 'cn', hl: 'zh-CN', name: 'CN' },
  kr: { gl: 'kr', hl: 'ko', name: 'KR' },
  in: { gl: 'in', hl: 'en', name: 'IN' },
  br: { gl: 'br', hl: 'pt', name: 'BR' },
  ca: { gl: 'ca', hl: 'en', name: 'CA' },
  au: { gl: 'au', hl: 'en', name: 'AU' },
  mx: { gl: 'mx', hl: 'es', name: 'MX' },
  es: { gl: 'es', hl: 'es', name: 'ES' },
  it: { gl: 'it', hl: 'it', name: 'IT' },
  ru: { gl: 'ru', hl: 'ru', name: 'RU' }
};

// 検索を実行
router.post('/search', async (req, res) => {
  try {
    const { query, country1 = 'us', country2 = 'jp' } = req.body;
    
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: '検索クエリが必要です' });
    }

    // 国コードの検証
    if (!countryConfig[country1] || !countryConfig[country2]) {
      return res.status(400).json({ error: '無効な国コードです' });
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.GOOGLE_CX_ID;

    if (!apiKey || !cx) {
      return res.status(500).json({ 
        error: 'Google API の設定が必要です。.env ファイルに GOOGLE_API_KEY と GOOGLE_CX_ID を設定してください。' 
      });
    }

    const config1 = countryConfig[country1];
    const config2 = countryConfig[country2];

    // 複数ページの結果を取得する関数
    const fetchMultiplePages = async (config, pages = 3) => {
      const allResults = [];
      
      for (let i = 0; i < pages; i++) {
        const startIndex = i * 10 + 1;
        try {
          const response = await customsearch.cse.list({
            auth: apiKey,
            cx: cx,
            q: query,
            gl: config.gl,
            hl: config.hl,
            num: 10,
            start: startIndex
          });
          
          if (response.data.items) {
            allResults.push(...response.data.items);
          }
        } catch (err) {
          // ページが存在しない場合はループを終了
          console.log(`ページ ${i + 1} の取得に失敗: ${err.message}`);
          break;
        }
      }
      
      return allResults;
    };

    // 国1の検索結果を取得（最大30件）
    const results1Items = await fetchMultiplePages(config1, 3);

    // 国2の検索結果を取得（最大30件）
    const results2Items = await fetchMultiplePages(config2, 3);

    // 結果を整形
    const formatResults = (items) => {
      if (!items || items.length === 0) return [];
      return items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
        displayLink: item.displayLink
      }));
    };

    const formatted1 = formatResults(results1Items);
    const formatted2 = formatResults(results2Items);

    // データベースに保存
    await saveSearch(query, config1.name, config2.name, formatted1, formatted2);

    // クライアントに返却
    res.json({
      query: query,
      countries: {
        country1: country1,
        country2: country2
      },
      results: {
        country1: formatted1,
        country2: formatted2
      }
    });

  } catch (error) {
    console.error('検索エラー:', error);
    
    // Google API のエラーを詳細に返す
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Google API エラー',
        message: error.response.data.error.message
      });
    }
    
    res.status(500).json({ 
      error: '検索中にエラーが発生しました',
      message: error.message 
    });
  }
});

// 検索履歴を取得
router.get('/history', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const history = await getSearchHistory(limit);
    res.json(history);
  } catch (error) {
    console.error('履歴取得エラー:', error);
    res.status(500).json({ 
      error: '履歴取得中にエラーが発生しました',
      message: error.message 
    });
  }
});

export default router;
