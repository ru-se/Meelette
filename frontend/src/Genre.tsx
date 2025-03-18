import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Shop.css'; 

interface Option {
  value: string;
  label: string;
}

const DropdownList: React.FC = () => {
  const navigate = useNavigate();

  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: Option | null }>({
    category: null,
  });

  const dropdownOptions: { [key: string]: Option[] } = {
    category: [
      { value: 'morning', label: 'モーニング' },
      { value: 'lunch', label: 'ランチ' },
      { value: 'cafetime', label: 'カフェタイム' },
      { value: 'dinner', label: 'ディナー' },
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
    }, spinDuration * 1000); 
  };

  const handleNavigateToNextScreen = () => {
    // 選択したカテゴリとルーレット結果を state で渡す
    navigate('/ShopRoulette', {
      state: { 
        category: selectedOptions.category, 
        rouletteResult 
      },
    });
  };

  return (
    <div className="container">
      <h2>ジャンル検索</h2>

      <div className="dropdown">
        <label>カテゴリ</label>
        <select value={selectedOptions.category?.value || ''} onChange={(event) => handleSelectOption('category', event)}>
          <option value="" disabled>
            選択してください
          </option>
          {dropdownOptions.category.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

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
          {/* 結果が表示された後に次の画面へ遷移ボタンを表示 */}
          <button onClick={handleNavigateToNextScreen}>
            次の画面へ
          </button>
        </div>
      ) : (
        <div className="roulette">結果が表示されるまでお待ちください</div>
      )}
    </div>
  );
};

export default DropdownList;
