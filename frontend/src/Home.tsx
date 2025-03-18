import React from 'react'
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Meelet(みーれっと)</h1>
            <button onClick={() => navigate('/Select')}>Start</button>
            <h2>①場所・カテゴリ・ジャンルを選択</h2>
            <h2>②ルーレットでランダムに決定</h2>
            <h2>③お店探しにぜひ役立てて！</h2>
        </div>
    )
}

export default Home