import React, { useState } from 'react';
import './Roulette.css';

interface RouletteProps {
  onSpinComplete: () => void;
}

const Roulette: React.FC<RouletteProps> = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleSpin = () => {
    setIsSpinning(true);

    // ルーレットの回転（最低5周 + ランダムな角度）
    const rotation = 360 * 5 + Math.floor(Math.random() * 360);
    setRotationAngle(rotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete();
    }, 5000); // 回転時間を5秒に設定
  };

  return (
    <div className="roulette-container">
      <div
        className={`roulette-wheel ${isSpinning ? 'spinning' : ''}`}
        style={{
          transform: `rotate(${rotationAngle}deg)`,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="roulette-section" />
        ))}
      </div>
      <button onClick={handleSpin} disabled={isSpinning} className="roulette-button">
        {isSpinning ? 'ルーレット中...' : '回す'}
      </button>
    </div>
  );
};

export default Roulette;