// Shop.tsx
import React, { useState } from 'react';
import Roulette from './Roulette';
import { useNavigate, Link } from "react-router-dom";
import GoogleMapEmbed from './GoogleMap';  // GoogleMapコンポーネントをインポート
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
  icon?: string;
}

const Shop: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
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

  // 🔹 選択肢を変更する関数
  const handleSelectChange = (dropdownName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [dropdownName]: dropdownOptions[dropdownName].find((option) => option.value === value) || null,
    }));
  };

  // 🔹 ルーレットが終了したらデータを取得
  const handleSpinComplete = () => {
    console.log("ルーレットの回転が終了しました。データを取得します。");

    if (!selectedOptions.place || !selectedOptions.genre) {
      console.error("エラー: 場所とジャンルの選択が必要です");
      return;
    }

    const queryParams = new URLSearchParams({
      location: selectedOptions.place.label,
      genre: selectedOptions.genre.label,
    });

    fetch(`http://localhost:8000/search-shops?${queryParams.toString()}`)
      .then(response => response.json())
      .then(data => setShopResult(data))
      .catch(error => console.error("リクエストエラー:", error));
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>ルーレット画面</h1>

      {/* 🔹 ドロップダウン選択 */}
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

      {/* 🔹 ルーレット表示 */}
      <Roulette onSpinComplete={handleSpinComplete} />

      {/* 🔹 結果表示エリア */}
      {isSpinning ? (
        <p>ルーレットが回転中...</p>
      ) : shopResult.length > 0 ? (
        shopResult.map((shop, index) => (
          <div key={index}>
            <h3>{shop.name}</h3>
            <p>{shop.formatted_address}</p>
            <p>評価: {shop.rating}</p>
            {/* 住所からGoogleMapEmbedを表示 */}
            <GoogleMapEmbed address={shop.formatted_address} />
            
          </div>
        ))
      ) : (
        <p>お店が見つかりませんでした。</p>
      )}
      <button onClick={() => navigate('/')}>トップへ</button>
    </div>
  );
};

export default Shop;
