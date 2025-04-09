import React, { useState } from 'react';

interface RouletteProps {
  onSpinComplete: () => void; // 修正: 引数なし
}

const Roulette: React.FC<RouletteProps> = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleSpin = () => {
    setIsSpinning(true);

    // ルーレットの回転（最低5周）
    const rotation = 360 * 5 + Math.floor(Math.random() * 360);
    setRotationAngle(rotation);

    setTimeout(() => {
      setIsSpinning(false);
      onSpinComplete(); // 修正: 何も渡さず通知
    }, 5000);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={handleSpin} disabled={isSpinning}>
        {isSpinning ? 'ルーレット中...' : '回す'}
      </button>

      <div
  style={{
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    border: '5px solid black',
    margin: '20px auto',
    position: 'relative', // 相対位置
    overflow: 'hidden', // はみ出し防止
    clipPath: 'circle(50%)', // 円形クリッピング
    transform: `rotate(${rotationAngle}deg)`,
    transition: 'transform 5s ease-out',
  }}
>
  {/* ルーレットの模様 */}
  {['red', 'blue', 'green', 'yellow', 'purple', 'orange'].map((color, index) => (
    <div
      key={index}
      style={{
        position: 'absolute',
        width: '50%', // 円の半径分
        height: '50%', // 半径分
        backgroundColor: color,
        clipPath: 'polygon(100% 100%, 0 0, 100% 1)', // きれいな扇形
        transformOrigin: '100% 100%', // 扇形の回転軸
        transform: `rotate(${index * (360 / 6)}deg)`, // 各扇形を回転
      }}
    />
  ))}
</div>

    </div>
  );
};

export default Roulette;
