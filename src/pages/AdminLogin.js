import {
  faLock,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navs from "../components/Nav";
import "../css/Login.css"; // CSS 파일의 실제 경로로 확인하세요.




function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  function checkLoginStatus() {

    fetch('/api/checkLoginStatus')
      .then(res => res.json())
      .then(data => {
        if (data.isLoggedIn) {
          if (data.isAdmin) {
            console.log('User is an admin.');
            // 관리자 페이지로 리다이렉션 할 수 있습니다.
            
          } else {
            console.log('User is logged in but not an admin.');
            // 일반 사용자 대시보드 또는 메인 페이지로 리다이렉션 할 수 있습니다.
          }
        } else {
          console.log('User is not logged in.');
          
        }
      })
      .catch(error => console.error('Error:', error));
  }
  useEffect(() => {
    checkLoginStatus();
  }, [navigate]); // 의존성 배열이 비어 있으므로 컴포넌트 마운트 시에만 호출됩니다.
  

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      console.log(username)
      console.log(password)
      console.log("로그인 버튼이 클릭되었습니다.");

      let response = fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mem_id: username, mem_pw: password }),
      });

      response
      .then((res) => {
        // 서버로투버 JSON 데이터를 받아옴
        return res.json();
      })
      .then((data) => {
        console.log(data);

        if(data.mem_role === 1) {
          alert("회원용 로그인을 해주세요.");
          navigate("/Login"); // 관리자 로그인 페이지로 리다이렉션
        } else if (data.name) {
          window.sessionStorage.setItem("mem_id", data.id);
          window.sessionStorage.setItem("mem_name", data.name);
          window.sessionStorage.setItem("mem_birth", data.birth);
          window.sessionStorage.setItem("mem_profile", data.profile);
          window.sessionStorage.setItem("mem_phone", data.phone);
          window.sessionStorage.setItem("mem_role", data.role);
          window.location.href = "../"; //메인 페이지로 이동
          console.log("로그인 성공");
        } else{
          //로그인 실패 시 처리
          // 예 : 에러 메세지 표시, 로그인 페이지로 다시 이동 등
          console.log("로그인 실패")
          window.location.href = "Login"; //로그인 페이지로 이동
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const navigateTo = useCallback((path) => navigate(path), [navigate]);
  return (
    <div>
      <Navs />
      {/* 생략된 내용: Nav 컴포넌트가 있다면 여기에 포함시키세요. */}
      <div id="content" className="my-custom-content">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6} className="login-form-container">
              <div className="text-center mb-4">
                {/* 로고 이미지 */}
                <img
                  src="/img/logo1.png"
                  alt="Read Fit 로고"
                  className="login-logo"
                />
              </div>

              <Form onSubmit={handleLogin}>
                <InputGroup className="mb-3 w-75">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="관리자 아이디"
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </InputGroup>

                <InputGroup className="mb-3 w-75">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>

                <Button
                  variant="success"
                  type="submit"
                  className="login-button mb-3"
                >
                  Let's Fit!
                </Button>
                <br></br><br></br><br></br><br></br>
                <Button
                  variant="outline-dark" 
                  className="another-login-button"
                  onClick={() => navigate("/Login")}>
                   회원용
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
