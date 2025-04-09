import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddShop: React.FC = () => {
  const [shopName, setShopName] = useState('');
  const [shopPosition, setShopPosition] = useState('');
  const [category, setCategory] = useState('');
  const [genre, setGenre] = useState('');
  const [place, setPlace] = useState('');
  const [shopInfo, setShopInfo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newShop = { shopName, shopPosition, category, genre, place, shopInfo };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/add-shop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newShop),
      });

      if (response.ok) {
        alert('Shop added successfully');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding shop:', error);
      alert('Error adding shop');
    }
  };

  return (
    <div>
      <h1>Add Shop</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Shop Name:</label>
          <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
        </div>
        <div>
          <label>Shop Position:</label>
          <select value={shopPosition} onChange={(e) => setShopPosition(e.target.value)} required>
            <option value="">Select Position</option>
            <option value="梅田">梅田</option>
            <option value="難波">難波</option>
            <option value="心斎橋">心斎橋</option>
            <option value="天王寺">天王寺</option>
          </select>
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="モーニング">モーニング</option>
            <option value="ランチ">ランチ</option>
            <option value="カフェタイム">カフェタイム</option>
            <option value="ディナー">ディナー</option>
          </select>
        </div>
        <div>
          <label>Genre:</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
            <option value="">Select Genre</option>
            <option value="洋食">洋食</option>
            <option value="和食">和食</option>
            <option value="中華">中華</option>
            <option value="ラーメン">ラーメン</option>
            <option value="カフェ">カフェ</option>
            <option value="韓国料理">韓国料理</option>
          </select>
        </div>
        <div>
          <label>Place:</label>
          <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} required />
        </div>
        <div>
          <label>Shop Info:</label>
          <textarea value={shopInfo} onChange={(e) => setShopInfo(e.target.value)} required />
        </div>
        <button type="submit">Add Shop</button>
      </form>
    </div>
  );
};

export default AddShop;
