import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Shop.css";
import Roulette from "./Roulette";

interface Shop {
  name: string;
  formatted_address: string;
  rating: number;
}

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

  const [rouletteResult, setRouletteResult] = useState<string | null>(null);
  const [shopResult, setShopResult] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleSelectOption = (dropdownName: string, event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const selected = dropdownOptions[dropdownName].find((option) => option.value === selectedValue);
    setSelectedOptions((prev) => ({
      ...prev,
      [dropdownName]: selected || null,
    }));
  };

  const isValidSelection = Object.values(selectedOptions).every((option) => option !== null);

  const handleSubmit = () => {
    if (!selectedOptions.place?.label || !rouletteResult) {
      console.error("エラー: location と genre の両方が必要");
      return;
    }

    setLoading(true);

    const queryParams = new URLSearchParams({
      location: selectedOptions.place?.label || "",
      genre: rouletteResult || "",
    });

    const url = `http://localhost:8000/search-shops?${queryParams.toString()}`;

    fetch(url)
      .then((response) => response.ok ? response.json() : Promise.reject(response))
      .then((data) => {
        setShopResult(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("リクエストエラー:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2>お店検索</h2>

      {Object.keys(dropdownOptions).map((dropdownName) => (
        <div key={dropdownName} className="dropdown">
          <label>{dropdownName === "place" ? "場所" : dropdownName === "category" ? "カテゴリ" : "ジャンル"}</label>
          <select value={selectedOptions[dropdownName]?.value || ""} onChange={(event) => handleSelectOption(dropdownName, event)}>
            <option value="" disabled>選択してください</option>
            {dropdownOptions[dropdownName].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* ルーレットコンポーネント */}
      {/* <Roulette options={dropdownOptions.genre} onSpinComplete={setRouletteResult} /> */}

      <div className="roulette">
        {rouletteResult ? `結果: ${rouletteResult}` : "結果を待機中"}
      </div>

      <button onClick={handleSubmit} disabled={!rouletteResult || loading}>
        {loading ? "検索中..." : "店を探す"}
      </button>

      <div className="shop-list">
        {shopResult.length > 0 ? (
          shopResult.map((shop, index) => (
            <div key={index} className="shop-item">
              <h3>{shop.name}</h3>
              <p>住所: <Link to={`/map?address=${encodeURIComponent(shop.formatted_address)}`}>{shop.formatted_address}</Link></p>
              <p>評価: {shop.rating}</p>
            </div>
          ))
        ) : (
          <p>お店が見つかりませんでした。</p>
        )}
      </div>
    </div>
  );
};

export default DropdownList;
