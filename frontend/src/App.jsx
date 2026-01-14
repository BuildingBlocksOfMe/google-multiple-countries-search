import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ResultsPanel from './components/ResultsPanel';
import SearchHistory from './components/SearchHistory';
import { searchMultipleCountries, getSearchHistory } from './services/api';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [country1, setCountry1] = useState('us');
  const [country2, setCountry2] = useState('jp');
  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState(null);

  // 初回マウント時に履歴を読み込む
  useEffect(() => {
    loadHistory();
  }, []);

  // 検索履歴を読み込む
  const loadHistory = async () => {
    setHistoryLoading(true);
    try {
      const data = await getSearchHistory();
      setHistory(data);
    } catch (err) {
      console.error('履歴の読み込みエラー:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  // 検索を実行
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError(null);
    setResults1([]);
    setResults2([]);

    try {
      const data = await searchMultipleCountries(query, country1, country2);
      setResults1(data.results.country1 || []);
      setResults2(data.results.country2 || []);
      
      // 検索成功後に履歴を再読み込み
      await loadHistory();
    } catch (err) {
      console.error('検索エラー:', err);
      let errorMessage = '検索中にエラーが発生しました';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 履歴アイテムをクリックした時
  const handleHistoryClick = (query) => {
    handleSearch(query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            🌍 Google Search - Multi Country Comparison
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            アメリカと日本の検索結果を比較
          </p>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 検索バー */}
        <SearchBar 
          onSearch={handleSearch} 
          loading={loading}
          country1={country1}
          country2={country2}
          onCountry1Change={setCountry1}
          onCountry2Change={setCountry2}
        />

        {/* エラーメッセージ */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">エラー</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* 現在の検索クエリ */}
        {searchQuery && (
          <div className="mb-4">
            <p className="text-gray-600">
              検索キーワード: <span className="font-semibold">{searchQuery}</span>
            </p>
          </div>
        )}

        {/* 3カラムレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" style={{ height: 'calc(100vh - 280px)' }}>
          {/* 左: 検索履歴 */}
          <div className="lg:col-span-3 overflow-hidden">
            <SearchHistory
              history={history}
              onHistoryClick={handleHistoryClick}
              loading={historyLoading}
            />
          </div>

          {/* 中央: 国1の結果 */}
          <div className="lg:col-span-4 overflow-hidden">
            <ResultsPanel
              country={country1}
              countryCode={country1}
              results={results1}
              loading={loading}
            />
          </div>

          {/* 右: 国2の結果 */}
          <div className="lg:col-span-5 overflow-hidden">
            <ResultsPanel
              country={country2}
              countryCode={country2}
              results={results2}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
