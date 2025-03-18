import React from 'react'
import { useNavigate } from 'react-router-dom';

const Select: React.FC = () => {
     const navigate = useNavigate();
    return (
        <div>
            <h1>Select</h1>
            <button onClick={() => navigate('/Genre')}>ジャンルを決める</button>
            <button onClick={() => navigate('/Shop')}>お店を決める</button>
        </div>
    )
}

export default Select