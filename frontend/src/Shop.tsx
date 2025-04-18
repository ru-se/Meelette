import React, { useState } from 'react';
import Roulette from './Roulette';
import { useNavigate } from "react-router-dom";
import GoogleMapEmbed from './GoogleMap';
import "./Shop.css";

interface Shop {
  name: string;
  formatted_address: string;
  rating: number;
  business_status: string;
  photos?: string[];
}

const Shop: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showRoulette, setShowRoulette] = useState(true); // ルーレットの表示状態
  const navigate = useNavigate();
  const [shopResult, setShopResult] = useState<Shop[]>([]);
  const [place, setPlace] = useState<string>(''); // 入力式の場所
  const [genre, setGenre] = useState<string>(''); // 入力式のジャンル

  const handleSpinComplete = () => {
    if (!place || !genre) {
      console.error("場所とジャンルの入力が必要です");
      return;
    }

    const queryParams = new URLSearchParams({
      location: place,
      genre: genre,
    });

    fetch(`${process.env.REACT_APP_BACKEND_URL}/search-shops?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => {
        setShopResult(data); // 店名は翻訳せずそのまま使用
        setShowRoulette(false); // 検索結果が表示されるタイミングでルーレットを非表示に
      })
      .catch(error => console.error("リクエストエラー:", error));
  };

  const handleReset = () => {
    setShopResult([]);
    setShowRoulette(true); // ルーレットを再表示
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>ルーレット画面</h1>

      {/* 場所の入力 */}
      <div className="input-group">
        <label>場所</label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="例: 梅田"
        />
      </div>

      {/* ジャンルの入力 */}
      <div className="input-group">
        <label>ジャンル</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="例: ラーメン"
        />
      </div>

      {showRoulette && <Roulette onSpinComplete={handleSpinComplete} />}

      {shopResult.length > 0 ? (
        <>
          <div className="shop-card main">
            <div
              className="shop-background"
              style={{
                backgroundImage: `url(${shopResult[0].photos?.[0] || '/default-image.jpg'})`,
              }}
            >
              <h2>{shopResult[0].name}</h2>
              <p>評価: {shopResult[0].rating}</p>
              {/* 店名でマップを検索 */}
              <GoogleMapEmbed address={shopResult[0].name} />
            </div>
          </div>

          <div className="shop-row">
            {shopResult.slice(1).map((shop, index) => (
              <div className="shop-card" key={index}>
                <div
                  className="shop-background"
                  style={{
                    backgroundImage: `url(${shop.photos?.[0] || '/default-image.jpg'})`,
                  }}
                >
                  <h3>{shop.name}</h3>
                  <p>評価: {shop.rating}</p>
                  {/* 店名でマップを検索 */}
                  <GoogleMapEmbed address={shop.name} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleReset}>もう一度ルーレットを回す</button>
        </>
      ) : (
        <p>お店が見つかりませんでした。</p>
      )}
      <button onClick={() => navigate('/')}>トップへ</button>
    </div>
  );
};

export default Shop;