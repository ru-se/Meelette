import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Meelet(みーれっと)</h1>
            <button className = "startButton" onClick={() => navigate('/Select')}>Start</button>
            <div className="ex">
            <h3>＜説明＞</h3>
            <h3>①場所・カテゴリ・ジャンルを選択</h3>
            <h3>②ルーレットでランダムに決定</h3>
            </div>
        </div>
    )
}

export default Home