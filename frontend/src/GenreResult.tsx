import React from 'react'
import { useNavigate } from 'react-router-dom';

const GenreResult: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Home</h1>
            <button onClick={() => navigate('/Home')}>トップへ</button>
        </div>
    )
}

export default GenreResult