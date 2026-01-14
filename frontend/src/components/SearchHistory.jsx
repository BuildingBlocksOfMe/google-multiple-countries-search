import React from 'react';

const SearchHistory = ({ history, onHistoryClick, loading }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ja-JP', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-full overflow-y-auto">
      <h2 className="text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-200">
        📜 検索履歴
      </h2>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && history.length === 0 && (
        <p className="text-gray-500 text-sm text-center py-8">
          履歴がありません
        </p>
      )}

      {!loading && history.length > 0 && (
        <div className="space-y-2">
          {history.map((item) => (
            <div
              key={item.id}
              onClick={() => onHistoryClick(item.query)}
              className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all"
            >
              <p className="font-medium text-gray-800 text-sm truncate">
                {item.query}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {item.country1} / {item.country2}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(item.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;
