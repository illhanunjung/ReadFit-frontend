import React from 'react';

const ChatBotCard = ({ resultData }) => {
  if (!resultData) {
    return <p>Loading...</p>;
  }
  console.log(resultData)
  // 스크롤 가능한 컨테이너 스타일
  const containerStyle = {
    display: 'flex',
    overflowX: 'auto', // 가로 스크롤 가능하도록
    padding: '0 10px', // 양쪽에 여백
  };

  // 각 카드의 스타일
  const cardStyle = {
    minWidth: '160px', // 카드의 최소 너비
    margin: '10px', // 카드 주변 여백
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)', // 그림자 효과
    borderRadius: '8px', // 둥근 모서리
    overflow: 'hidden', // 내용이 넘칠 경우 숨김
    background: '#fff', // 배경색
  };

  // 이미지 스타일
  const imageStyle = {
    width: '100%', // 이미지 너비
    height: '120px', // 이미지 높이
    objectFit: 'cover', // 이미지 비율 유지
  };

  // 카드 내용 스타일
  const contentStyle = {
    padding: '10px', // 내용 주변 여백
  };

  return (
    <div style={containerStyle}>
      {/* 결과 데이터를 사용하여 커스텀 카드 형태로 출력 */}
      {resultData.data.map((shoe, index) => (
        <div key={index} style={cardStyle}>
          <img src={shoe.shoe_img} alt={shoe.shoe} style={imageStyle} />
          <div style={contentStyle}>
            <h2 style={{ fontSize: '1rem', margin: '5px 0' }}>{shoe.shoe}</h2>
            <p style={{ margin: '5px 0', color: '#555' }}>
              이름: {shoe.shoe}
            </p>
            <p style={{ margin: '5px 0', color: '#555' }}>
              카테고리: {shoe.parent_category_seq_name}
            </p>
            <p style={{ margin: '5px 0', color: '#555' }}>가격: {shoe.shoe_price}원</p>
            <p style={{ margin: '5px 0', color: '#555' }}>평점: {shoe.review_rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBotCard;
