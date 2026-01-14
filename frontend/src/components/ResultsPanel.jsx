import React from 'react';

const ResultsPanel = ({ country, countryCode, results, loading }) => {
  // 国旗の絵文字
  const flags = {
    us: '🇺🇸',
    jp: '🇯🇵',
    uk: '🇬🇧',
    de: '🇩🇪',
    fr: '🇫🇷',
    cn: '🇨🇳',
    kr: '🇰🇷',
    in: '🇮🇳',
    br: '🇧🇷',
    ca: '🇨🇦',
    au: '🇦🇺',
    mx: '🇲🇽',
    es: '🇪🇸',
    it: '🇮🇹',
    ru: '🇷🇺'
  };

  const countryNames = {
    us: 'アメリカ',
    jp: '日本',
    uk: 'イギリス',
    de: 'ドイツ',
    fr: 'フランス',
    cn: '中国',
    kr: '韓国',
    in: 'インド',
    br: 'ブラジル',
    ca: 'カナダ',
    au: 'オーストラリア',
    mx: 'メキシコ',
    es: 'スペイン',
    it: 'イタリア',
    ru: 'ロシア'
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
        <span className="text-3xl">{flags[countryCode]}</span>
        <h2 className="text-xl font-bold text-gray-800">
          {countryNames[countryCode]}の検索結果
        </h2>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && results.length === 0 && (
        <p className="text-gray-500 text-center py-12">
          検索結果がありません
        </p>
      )}

      {!loading && results.length > 0 && (
        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={index}
              className="border-b border-gray-100 pb-4 last:border-b-0 hover:bg-gray-50 transition-colors p-2 rounded"
            >
              <a
                href={result.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium text-lg hover:underline"
              >
                {result.title}
              </a>
              <p className="text-green-700 text-sm mt-1">{result.displayLink}</p>
              <p className="text-gray-600 text-sm mt-2">{result.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;
