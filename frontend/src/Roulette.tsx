import React, { useState } from 'react';

interface RouletteProps {
  onSpinComplete: () => void;
}

const Roulette: React.FC<RouletteProps> = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false); // 回転中の状態
  const [rotationAngle, setRotationAngle] = useState(0); // 回転角度

  const handleSpin = () => {
    setIsSpinning(true); // 回転中の状態をセット

    // ランダムな回転角度を生成（最低5周回る）
    const rotation = 360 * 5 + Math.floor(Math.random() * 360);
    setRotationAngle(rotation);

    // 回転が完了するまでの時間（5秒間）
    setTimeout(() => {
      setIsSpinning(false); // 回転を停止
      onSpinComplete(); // 親コンポーネントに回転終了を通知
    }, 5000); // 5秒後に処理
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isSpinning ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
        }}
      >
        {isSpinning ? 'ルーレット中...' : '回す'}
      </button>

      <div
        className="roulette-wheel"
        style={{
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          position: 'relative',
          overflow: 'hidden',
          border: '5px solid black',
          margin: '0 auto',
          transform: `rotate(${rotationAngle}deg)`,
          transition: 'transform 5s ease-out',
        }}
      >
        {['red', 'blue', 'green', 'yellow', 'purple', 'orange'].map((color, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: color,
              clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)',
              transformOrigin: '50% 50%',
              transform: `rotate(${index * (360 / 6)}deg)`,
            }}
          />
        ))}
      </div>

      <div
        className="indicator"
        style={{
          width: '0',
          height: '0',
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '30px solid black',
          position: 'absolute',
          top: 'calc(50% - 160px)',
          left: 'calc(50% - 15px)',
        }}
      />
    </div>
  );};

export default Roulette;
