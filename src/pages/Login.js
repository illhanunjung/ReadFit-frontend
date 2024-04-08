import {
  faLock,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
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
          // 서버로부터 JSON 데이터를 받아옴
          return res.json();
        })
        .then((data) => {
          console.log(data);

          if (data.name) {
            // 로그인 성공 시 처리
            // 예 : 세션에 로그인 정보 저장, 리다이렉트 등
            window.sessionStorage.setItem("mem_id", data.id);
            window.sessionStorage.setItem("mem_name", data.name);
            window.sessionStorage.setItem("mem_birth", data.birth);
            window.sessionStorage.setItem("mem_profile", data.profile);
            window.sessionStorage.setItem("mem_phone", data.phone);
            window.sessionStorage.setItem("mem_role", data.role);
            window.location.href = "../"; //메인 페이지로 이동
            console.log("로그인 성공");
            alert(data.name + "님 반갑습니다!")
          } else if (data === 2) {
            alert("정지된 회원입니다.");
          } else if (data === 0) {
            alert("관리자는 관리자 로그인 페이지로 로그인하시기 바랍니다.");
          } else {
            // 로그인 실패를 나타내는 알림 표시
            alert("로그인 실패");
            // window.location.href = "Login"; // 로그인 페이지로 이동
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
                    placeholder="아이디"
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
              </Form>
              <div className="text-center mt-4">
                <Nav className="me-auto justify-content-center">
                  <Nav.Link
                    onClick={() => navigateTo("/FindIDPW")}
                    className="nlink"
                  >
                    아이디/비밀번호 찾기
                  </Nav.Link>

                  <Nav.Link
                    onClick={() => navigateTo("/Register")}
                    className="nlink"
                  >
                    회원가입
                  </Nav.Link>
                </Nav>

                <br />
                <br />
                <br />
                <br />
                <Button variant="outline-dark" className="another-login-button" onClick={() => navigate("/AdminLogin")}>
                    관리자 로그인으로 가기
                </Button>

                <br />
              </div>
              {/*
              <Button variant="warning" className="kakao-login-button mb-3">
                <FontAwesomeIcon icon={faCommentDots} className="me-2" />{" "}
                카카오 로그인
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;