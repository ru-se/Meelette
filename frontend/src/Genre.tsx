import React, { useState } from 'react';
import Roulette from './Roulette';

interface Value {
  genre: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<Value | null>(null); // データの型を指定
  const [isSpinning, setIsSpinning] = useState(false); // ルーレット回転中の状態

  const handleSpinComplete = () => {
    console.log('ルーレットが回転終了しました。データを取得中...');
    
    // 回転終了後にデータを取得
    fetch('http://localhost:8000/random-genre')
      .then((response) => {
        if (!response.ok) {
          throw new Error('サーバーエラー');
        }
        return response.json();
      })
      .then((data) => {
        console.log('取得したデータ:', data); // デバッグ用
        setData(data); // データを状態に保存
        setIsSpinning(false); // 回転中の状態を解除
      })
      .catch((error) => {
        console.error('エラーが発生:', error);
        setIsSpinning(false); // 回転中の状態を解除
      });
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>ルーレット画面</h1>
      {/* ルーレットは常に表示 */}
      <Roulette onSpinComplete={handleSpinComplete} />
      
      {/* 結果表示エリア */}
      {isSpinning ? (
        <p>ルーレットが回転中...</p>
      ) : data ? (
        <div>
          <h3>結果: {data.genre}</h3>
        </div>
      ) : (
        <p>データを取得中...</p>
      )}
    </div>
  );
};

export default App;
