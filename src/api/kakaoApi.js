import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081'; // 백엔드 서버 URL
const rest_api_key = '87fcd32c8be8f2ad27893ee83bb4bcc5'; // 카카오 JavaScript 키
const redirect_uri = 'http://localhost:3000/Register'; // 리다이렉트될 URI

// 카카오 SDK 초기화
if (window.Kakao && !window.Kakao.isInitialized()) {
  window.Kakao.init('87fcd32c8be8f2ad27893ee83bb4bcc5');
}

// 카카오 로그인 링크를 생성하는 함수
export const getKakaoLoginLink = () => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
};

// 카카오 인가 코드를 이용해 액세스 토큰을 얻는 함수
export const getAccessToken = async (authCode) => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: rest_api_key,
    redirect_uri: redirect_uri,
    code: authCode,
  });

  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(`https://kauth.kakao.com/oauth/token`, params.toString(), header);
    return response.data.access_token;
  } catch (error) {
    console.error('Unable to fetch access token:', error);
    throw error;
  }
};

// 아이디 중복
export const checkId = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/checkId/${userId}`);
    return response.data; // isAvailable이 true/false로 반환될 것임
  } catch (error) {
    console.error('Failed to check ID:', error);
    throw error;
  }
};


// 카카오 로그인 처리 함수
export const handleKakaoLogin = () => {
  window.location.href = getKakaoLoginLink();
};

export const registerUser = async (userData) => {
  try {
      const response = await axios.post('http://localhost:8081/api/members/register', userData, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      console.log("회원가입 성공:", response.data);
  } catch (error) {
      console.error("회원가입 실패:", error.response ? error.response.data : error.message);
  }
};



export const fetchKakaoUserInfo = async (accessToken) => {
  try {
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};