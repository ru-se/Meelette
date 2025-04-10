import React, { useState } from 'react';
import Roulette from './Roulette';
import { useNavigate } from "react-router-dom";
import GoogleMapEmbed from './GoogleMap';
import "./Shop.css";

interface Option {
  value: string;
  label: string;
}

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
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: Option | null }>({
    place: null,
    category: null,
    genre: null,
  });

  const dropdownOptions: { [key: string]: Option[] } = {
    place: [
      { value: "umeda", label: "梅田" },
      { value: "nmba", label: "難波" },
      { value: "shinsaibai", label: "心斎橋" },
      { value: "tennouji", label: "天王寺" },
    ],
    category: [
      { value: "morning", label: "モーニング" },
      { value: "lunch", label: "ランチ" },
      { value: "cafetime", label: "カフェタイム" },
      { value: "dinner", label: "ディナー" },
    ],
    genre: [
      { value: "western", label: "洋食" },
      { value: "japanese", label: "和食" },
      { value: "chinese", label: "中華" },
      { value: "ramen", label: "ラーメン" },
      { value: "cafe", label: "カフェ" },
      { value: "korea", label: "韓国料理" },
    ],
  };

  const handleSelectChange = (dropdownName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [dropdownName]: dropdownOptions[dropdownName].find((option) => option.value === value) || null,
    }));
  };

  const handleSpinComplete = () => {
    if (!selectedOptions.place || !selectedOptions.genre) {
      console.error("場所とジャンルの選択が必要です");
      return;
    }

    const queryParams = new URLSearchParams({
      location: selectedOptions.place.label,
      genre: selectedOptions.genre.label,
    });

   console.log(process.env.REACT_APP_BACKEND_URL);
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

      {Object.keys(dropdownOptions).map((dropdownName) => (
        <div key={dropdownName} className="dropdown">
          <label>
            {dropdownName === "place" ? "　場所　" : dropdownName === "category" ? "カテゴリ" : "ジャンル"}
          </label>
          <select
            value={selectedOptions[dropdownName]?.value || ""}
            onChange={(event) => handleSelectChange(dropdownName, event.target.value)}
          >
            <option value="" disabled>選択してください</option>
            {dropdownOptions[dropdownName].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}

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