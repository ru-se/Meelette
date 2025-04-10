import { useLocation, useNavigate,Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import "./Shop.css";
import GoogleMapEmbed from './GoogleMap';  // GoogleMapコンポーネントをインポート

interface Shop {
  name: string;
  formatted_address: string;
  rating: number;
  business_status: string;
  icon?: string;  // 写真が存在する場合
  // 必要に応じて他のフィールドも追加
}

interface MapProps {
  shop: Shop;
}

const NextScreen: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [category, setCategory] = useState<string | null>(null);
  const [rouletteResult, setRouletteResult] = useState<string | null>(null);
  const [selectedAdditionalOption, setSelectedAdditionalOption] = useState<string | null>(null);
  const [shopResult, setShopResult] = useState<Shop[]>([]); // 店のデータを格納
  const [loading, setLoading] = useState(false);

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
      genre: rouletteResult
    });
  
    if (!selectedAdditionalOption || !rouletteResult) {
      console.error("エラー: location と genre の両方が必要");
      return;
    }
  
    const queryParams = new URLSearchParams({
      location: selectedAdditionalOption || '',  // もしlocationが空であれば、空文字を送信
      genre: rouletteResult || '',  // もしgenreが空であれば、空文字を送信
    });
  
    const url = `${process.env.REACT_APP_BACKEND_URL}/search-shops?${queryParams.toString()}`;
    console.log("送信するURL:", url);
  
    fetch(url)  // 修正した部分
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            console.error("サーバーエラー:", err);
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
      });
  };
    
  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">結果画面</h2>

      <div className="mb-4">
        <h3 className="text-lg">選択したカテゴリ: {category ?? "未選択"}</h3>
        <h3 className="text-lg">ルーレットの結果(ジャンル): {rouletteResult ?? "未選択"}</h3>
      </div>

      <div className="mb-4">
        <label htmlFor="location" className="block mb-2">場所</label>
        <select 
          id="location"
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
        disabled={!selectedAdditionalOption || loading}
        className={`px-4 py-2 rounded text-white ${selectedAdditionalOption ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
      >
        {loading ? '読み込み中...' : '店を探す'}
      </button>

      {/* バックエンドからの結果表示 */}
      {shopResult.length > 0 ? (
      shopResult.map((shop, index) => (
        <div key={index}>
          <h3>{shop.name}</h3>
          <p>{shop.formatted_address}</p>
          <p>評価: {shop.rating}</p>
          {/* 住所からGoogleMapEmbedを表示 */}
          <GoogleMapEmbed address={shop.formatted_address} />

         
             <button onClick={() => navigate('/')}>トップへ</button>
       


        </div>
        
        
      ))
    ) : (
      <p>お店が見つかりませんでした。</p>
    )}

    </div>

    
  );
};

export default NextScreen;

