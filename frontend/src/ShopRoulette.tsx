import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NextScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category, rouletteResult } = location.state || {}; // state から取得

  const [selectedAdditionalOption, setSelectedAdditionalOption] = useState<string | null>(null);

  const additionalOptions = [
    { value: 'umeda', label: '梅田' },
    { value: 'nmba', label: '難波' },
    { value: 'shinsaibai', label: '心斎橋' },
    { value: 'tennouji', label: '天王寺' },
  ];

  const handleSelectAdditionalOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAdditionalOption(event.target.value);
  };

  const isValidSelection = selectedAdditionalOption !== null;

  return (
    <div className="container">
      <h2>結果画面</h2>

      {/* 既に選ばれているカテゴリとルーレット結果を表示 */}
      <div>
        <h3>選択したカテゴリ: {category?.label}</h3>
        <h3>ルーレットの結果(ジャンル): {rouletteResult}</h3>
      </div>

      {/* 新しい項目を選択するためのプルダウン */}
      <div className="dropdown">
        <label>場所</label>
        <select value={selectedAdditionalOption || ''} onChange={handleSelectAdditionalOption}>
          <option value="" disabled>選択してください</option>
          {additionalOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button onClick={()=> navigate ('/ShopResult')}>次へ進む</button>
    </div>
  );
};

export default NextScreen;
