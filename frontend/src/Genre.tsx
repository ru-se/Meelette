import React, { useState } from 'react';
import Roulette from './Roulette';
import { useNavigate } from 'react-router-dom';
import "./Genre.css";

interface Value {
  genre: string;
}

const Genre: React.FC = () => {
  const [data, setData] = useState<Value | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const navigate = useNavigate();
  const [selectedAdditionalOption, setSelectedAdditionalOption] = useState<string | null>(null);

  const additionalOptions = [
    { value: 'モーニング', label: 'モーニング' },
    { value: 'ランチ', label: 'ランチ' },
    { value: 'カフェ', label: 'カフェ' },
    { value: 'ディナー', label: 'ディナー' },
  ];

  const handleSelectAdditionalOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAdditionalOption(event.target.value);
  };

  const handleSpinComplete = async () => {
    console.log('ルーレットが回転終了しました。データを取得中...');
    setIsSpinning(false); // ここで回転状態を解除（すぐに次の操作が可能になる）

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/random-genre`);
      if (!response.ok) {
        throw new Error('サーバーエラー');
      }
      const result: Value = await response.json();
      console.log('取得したデータ:', result);
      setData(result);
    } catch (error) {
      console.error('エラーが発生:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>ルーレット画面</h1>

      {/* カテゴリ選択 */}
      <label>カテゴリ　</label>
      <select value={selectedAdditionalOption || ''} onChange={handleSelectAdditionalOption}>
        <option value="" disabled>選択してください</option>
        {additionalOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* ルーレット表示 */}
      <Roulette onSpinComplete={handleSpinComplete} />

      {/* 結果表示エリア */}
      {isSpinning ? (
        <p>ルーレットが回転中...</p>
      ) : data ? (
        <div>
          <h3>結果: {data.genre}</h3>
          <button 
                onClick={() => navigate('/ShopRoulette', { 
                  state: { category: selectedAdditionalOption, rouletteResult: data?.genre } 
                })}
                disabled={!selectedAdditionalOption || !data}
              >
                次へ
              </button>

        </div>
      ) : null}
    </div>
  );
};

export default Genre;
