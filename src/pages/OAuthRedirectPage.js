import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OAuthRedirectPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 인증 코드 추출하기
    const code = new URLSearchParams(location.search).get('code');

    if (code) {
      // 인증 코드가 있으면, 여기서 백엔드로 인증 코드를 보내 토큰 교환을 수행합니다.
      // 예: axios.post('/api/auth/kakao', { code })
      console.log('Received code:', code);

      // 인증 과정이 끝난 후, 사용자를 메인 페이지로 리디렉션할 수 있습니다.
      navigate('/');
    } else {
      // 오류 처리: 인증 코드가 없는 경우
      console.error('Authorization code not found.');
    }
  }, [location, navigate]);

  return (
    <div>
      <h1>OAuth Redirect Page</h1>
      <p>Please wait...</p>
    </div>
  );
};

export default OAuthRedirectPage;
