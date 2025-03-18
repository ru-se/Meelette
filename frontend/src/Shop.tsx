import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shop.css'; // 必要なスタイルを指定

interface Option {
  value: string;
  label: string;
}

const DropdownList: React.FC = () => {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: Option | null }>({
    place: null,
    category: null,
    genre: null,
  });

  const dropdownOptions: { [key: string]: Option[] } = {
    place: [
      { value: 'umeda', label: '梅田' },
      { value: 'nmba', label: '難波' },
      { value: 'shinsaibai', label: '心斎橋' },
      { value: 'tennouji', label: '天王寺' },
    ],
    category: [
      { value: 'morning', label: 'モーニング' },
      { value: 'lunch', label: 'ランチ' },
      { value: 'cafetime', label: 'カフェタイム' },
      { value: 'dinner', label: 'ディナー' },
    ],
    genre: [
      { value: 'western', label: '洋食' },
      { value: 'japanese', label: '和食' },
      { value: 'chinese', label: '中華' },
      { value: 'Ramen', label: 'ラーメン' },
      { value: 'cafe', label: 'カフェ' },
      { value: 'korea', label: '韓国料理' },
    ],
  };

  const handleSelectOption = (dropdownName: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selected = dropdownOptions[dropdownName].find((option) => option.value === selectedValue);
    setSelectedOptions((prev) => ({
      ...prev,
      [dropdownName]: selected || null,
    }));
  };

  const isValidSelection = Object.values(selectedOptions).every((option) => option !== null);

  const [rouletteResult, setRouletteResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleSpin = () => {
    if (!isValidSelection) return;

    setIsSpinning(true);
    setRouletteResult(null);

    const spinDuration = 5; // 秒
    const rotation = 360 * 5 + Math.floor(Math.random() * 360); // ランダムな回転角度

    setRotationAngle(rotation);

    setTimeout(() => {
      const options = ['勝ち', '負け', '再挑戦', 'チャンス'];
      const randomResult = options[Math.floor(Math.random() * options.length)];
      setRouletteResult(randomResult);
      setIsSpinning(false);
    }, spinDuration * 1000); // 3秒後に結果をセット
  };

  return (
    <div className="container">
      <h2>お店検索</h2>

      {Object.keys(dropdownOptions).map((dropdownName) => (
        <div key={dropdownName} className="dropdown">
          <label>{dropdownName === 'place' ? '場所' : dropdownName === 'category' ? 'カテゴリ' : 'ジャンル'}</label>
          <select value={selectedOptions[dropdownName]?.value || ''} onChange={(event) => handleSelectOption(dropdownName, event)}>
            <option value="" disabled>
              選択してください
            </option>
            {dropdownOptions[dropdownName].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={handleSpin} disabled={!isValidSelection || isSpinning}>
        回す
      </button>

      <div 
        className={`roulette-wheel ${isSpinning ? 'spinning' : ''}`} 
        style={{ transform: `rotate(${rotationAngle}deg)` }}
      >
        <div className="wheel">
          {/* 放射状に分割されたセクション */}
          <div className="segment" style={{ backgroundColor: 'red', transform: 'rotate(0deg)' }}></div>
          <div className="segment" style={{ backgroundColor: 'blue', transform: 'rotate(60deg)' }}></div>
          <div className="segment" style={{ backgroundColor: 'green', transform: 'rotate(120deg)' }}></div>
          <div className="segment" style={{ backgroundColor: 'yellow', transform: 'rotate(180deg)' }}></div>
          <div className="segment" style={{ backgroundColor: 'purple', transform: 'rotate(240deg)' }}></div>
          <div className="segment" style={{ backgroundColor: 'orange', transform: 'rotate(300deg)' }}></div>
        </div>
      </div>

      {isSpinning ? (
        <div className="roulette">ルーレットが回転中...</div>
      ) : rouletteResult ? (
        <div className="result">
          <h3>結果: {rouletteResult}</h3>
        </div>
      ) : (
        <div className="roulette">結果が表示されるまでお待ちください</div>
      )}
    </div>
  );
};

export default DropdownList;
