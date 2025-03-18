import React from 'react'
import { useNavigate } from 'react-router-dom';

const ShopResult: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>ルーレット結果(お店決定)</h1>
            <button onClick={() => navigate('/')}>トップへ</button>
        </div>
    )
}

export default ShopResult