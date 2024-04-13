import React, { useCallback, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navs from "../components/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import "../css/Login.css";
import Swal from 'sweetalert2';


function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      console.log(username)
      console.log(password)
      console.log("로그인 버튼이 클릭되었습니다.");

      let response = fetch("/api/adminlogin", {
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
            Swal.fire({
              icon: 'success',
              title: '로그인 성공!',
              text: `관리자 ${data.name}님 반갑습니다!`,
              confirmButtonText: '확인'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "../"; // 메인 페이지로 리다이렉트
              }
            });
          } else if (data === 2) {
            Swal.fire({
              icon: 'error',
              text: '정지된 회원입니다.',
              confirmButtonText: '확인'
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          } else if (data === 1) {
            Swal.fire({
              icon: 'warning',
              text: '여기는 관리자 페이지입니다. 일반회원은 회원용 로그인 페이지로 돌아가세요.',
              confirmButtonText: '확인'
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              text: '아이디 또는 비밀번호를 잘못 입력했습니다.',
              confirmButtonText: '확인'
            }).then((result) => {
              if (result.isConfirmed) {
              }
            });
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
                <br />
                <br />
                <br />
                <br />
                <Button variant="outline-dark" className="another-login-button" onClick={() => navigate("/Login")}>
                    회원 로그인으로 가기
                </Button>

                <br />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AdminLogin;