import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const NextScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState<string | null>(null);
  const [rouletteResult, setRouletteResult] = useState<string | null>(null);
  const [selectedAdditionalOption, setSelectedAdditionalOption] = useState<string | null>(null);
  const [shopResult, setShopResult] = useState<any>(null); // 店のデータを格納

  useEffect(() => {
    if (location.state) {
      console.log("受け取ったデータ:", location.state);
      setCategory(location.state.category);
      setRouletteResult(location.state.rouletteResult);
      localStorage.setItem("category", location.state.category);
      localStorage.setItem("rouletteResult", location.state.rouletteResult);
    } else {
      const savedCategory = localStorage.getItem("category");
      const savedRouletteResult = localStorage.getItem("rouletteResult");
      if (savedCategory && savedRouletteResult) {
        setCategory(savedCategory);
        setRouletteResult(savedRouletteResult);
      }
    }
  }, [location.state]);

  const additionalOptions = [
    { value: '梅田', label: '梅田' },
    { value: '難波', label: '難波' },
    { value: '心斎橋', label: '心斎橋' },
    { value: '天王寺', label: '天王寺' },
  ];

  const handleSelectAdditionalOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAdditionalOption(event.target.value);
  };

  const handleSubmit = () => {
    console.log("送信するデータ:", {
      location: selectedAdditionalOption,
      category: category,
      genre: rouletteResult
    });
  
    if (!selectedAdditionalOption && !category && !rouletteResult) {
      console.error("エラー: location, category, genre のいずれかが必要");
      return;
    }
  
    const queryParams = new URLSearchParams({
      location: selectedAdditionalOption || "",
      category: category || "",
      genre: rouletteResult || "",
    });
  
    console.log("送信するURL:", `http://localhost:8000/recommend-shop?${queryParams.toString()}`);
  
    fetch(`http://localhost:8000/recommend-shop?${queryParams}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            console.error("エラー:", err);
            throw new Error(err.error || "サーバーエラー");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("取得したお店:", data);
        setShopResult(data);
      })
      .catch((error) => {
        console.error("リクエストエラー:", error);
        setShopResult(null);
      });
  };

  useEffect(() => {
    console.log("受け取ったデータ:", location.state);
  }, [location.state]);
  
    
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">結果画面</h2>

      <div className="mb-4">
        <h3 className="text-lg">選択したカテゴリ: {category ?? "未選択"}</h3>
        <h3 className="text-lg">ルーレットの結果(ジャンル): {rouletteResult ?? "未選択"}</h3>
      </div>

      <div className="mb-4">
        <label className="block mb-2">場所</label>
        <select 
          value={selectedAdditionalOption || ''} 
          onChange={handleSelectAdditionalOption} 
          className="border p-2 rounded"
        >
          <option value="" disabled>選択してください</option>
          {additionalOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={handleSubmit}
        disabled={!selectedAdditionalOption}
        className={`px-4 py-2 rounded text-white ${selectedAdditionalOption ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        店を探す
      </button>

      {/* バックエンドからの結果表示 */}
      {shopResult && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-bold">おすすめの店</h3>
          <p>店名: {shopResult.shopName}</p>
          <p>ジャンル: {shopResult.genre}</p>
          <p>カテゴリ: {shopResult.category}</p>
          <p>場所: {shopResult.shopPosition}</p>
        </div>
      )}
    </div>
  );
};

export default NextScreen;
