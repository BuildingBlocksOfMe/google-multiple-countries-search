import React, { useState } from 'react';
import CountrySelector from './CountrySelector';

const SearchBar = ({ onSearch, loading, country1, country2, onCountry1Change, onCountry2Change }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 国選択 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CountrySelector
            value={country1}
            onChange={onCountry1Change}
            label="国1"
            disabled={loading}
          />
          <CountrySelector
            value={country2}
            onChange={onCountry2Change}
            label="国2"
            disabled={loading}
          />
        </div>

        {/* 検索バー */}
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索キーワードを入力..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? '検索中...' : '検索'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
