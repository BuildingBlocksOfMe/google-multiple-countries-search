import React from 'react';

const CountrySelector = ({ value, onChange, label, disabled }) => {
  const countries = [
    { code: 'us', name: 'アメリカ', flag: '🇺🇸', gl: 'us', hl: 'en' },
    { code: 'jp', name: '日本', flag: '🇯🇵', gl: 'jp', hl: 'ja' },
    { code: 'uk', name: 'イギリス', flag: '🇬🇧', gl: 'uk', hl: 'en' },
    { code: 'de', name: 'ドイツ', flag: '🇩🇪', gl: 'de', hl: 'de' },
    { code: 'fr', name: 'フランス', flag: '🇫🇷', gl: 'fr', hl: 'fr' },
    { code: 'cn', name: '中国', flag: '🇨🇳', gl: 'cn', hl: 'zh-CN' },
    { code: 'kr', name: '韓国', flag: '🇰🇷', gl: 'kr', hl: 'ko' },
    { code: 'in', name: 'インド', flag: '🇮🇳', gl: 'in', hl: 'en' },
    { code: 'br', name: 'ブラジル', flag: '🇧🇷', gl: 'br', hl: 'pt' },
    { code: 'ca', name: 'カナダ', flag: '🇨🇦', gl: 'ca', hl: 'en' },
    { code: 'au', name: 'オーストラリア', flag: '🇦🇺', gl: 'au', hl: 'en' },
    { code: 'mx', name: 'メキシコ', flag: '🇲🇽', gl: 'mx', hl: 'es' },
    { code: 'es', name: 'スペイン', flag: '🇪🇸', gl: 'es', hl: 'es' },
    { code: 'it', name: 'イタリア', flag: '🇮🇹', gl: 'it', hl: 'it' },
    { code: 'ru', name: 'ロシア', flag: '🇷🇺', gl: 'ru', hl: 'ru' }
  ];

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.flag} {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
