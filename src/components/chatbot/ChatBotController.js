import axios from 'axios';
import React, { useEffect, useState } from 'react';

// 신발 항목을 출력하기 위한 컴포넌트
const ShoeItem = ({ shoe }) => {
    return (
        <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <h2>{shoe.shoe}</h2>
            <img src={shoe.shoe_img} alt={shoe.shoe} style={{ width: '100px' }} />
            <p>카테고리: {shoe.parent_category_seq_name} ({shoe.parent_category_seq})</p>
            <p>가격: {shoe.shoe_price}원</p>
            <p>평점: {shoe.review_rating}</p>
        </div>
    );
};

function ChatBotController(props) {
    const [resultData, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const userQuestion = props.userQuestion; 
        const fetchData = async () => {
            try {
                const result = await axios.post('http://127.0.0.1:5000/api/data/chatBot', { question: userQuestion });
                setData(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [props.userQuestion]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>추천 신발 목록:</h1>
            {resultData && resultData.data.map((shoe, index) => (
                <ShoeItem key={index} shoe={shoe} />
            ))}
        </div>
    );
}

export default ChatBotController;
