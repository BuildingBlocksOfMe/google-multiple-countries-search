import axios from 'axios';

// 環境変数からバックエンドURLを取得（本番環境用）
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// 複数国の検索を実行
export const searchMultipleCountries = async (query, country1 = 'us', country2 = 'jp') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search`, { 
      query,
      country1,
      country2
    });
    return response.data;
  } catch (error) {
    console.error('検索エラー:', error);
    throw error;
  }
};

// 検索履歴を取得
export const getSearchHistory = async (limit = 20) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/history`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('履歴取得エラー:', error);
    throw error;
  }
};
