import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Select: React.FC = () => {
     const navigate = useNavigate();
    return (
        <div>
            <h1>Select</h1>
            <button className="SelsectButton" onClick={() => navigate('/Genre')}>ジャンルを決める</button>
            <a>　　　</a>
            <button className="SelsectButton"onClick={() => navigate('/Shop')}>お店を決める</button>
        </div>
    )
}

export default Select