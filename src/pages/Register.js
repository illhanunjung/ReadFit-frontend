import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faCommentDots,
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../css/Login.css";
import Navs from "../components/Nav";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mem_id: "",
    mem_pw: "",
    confirm_pw: "",
    mem_name: "",
    mem_birth: "",
    mem_profile: "",
    mem_phone: "",
  });

  const [isVerified, setIsVerified] = useState(false);
  const [isIdValid, setIsIdValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "mem_id") {
      if (value.length < 8) {
        alert("아이디는 8글자 이상이어야 합니다.");
        setIsIdValid(false);
      } else {
        setIsIdValid(true);
      }
    }
  };

  const handleCheckDuplicate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/members/checkId/${formData.mem_id}`
      );
      const isDuplicate = response.data;
      setIsIdValid(!isDuplicate);
      if (isDuplicate) {
        alert("이미 사용 중인 아이디입니다.");
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
    }
  };

  useEffect(() => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("87fcd32c8be8f2ad27893ee83bb4bcc5"); // 앱 키
    }
  }, []);

  const handleKakaoLogin = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Auth.login({
        scope: "name, birthday, birthyear, profile_image_url, phone_number",
        success: (authObj) => {
          setIsVerified(true);
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              const kakao_account = res.kakao_account;
              setFormData({
                ...formData,
                mem_name: kakao_account.profile.nickname,
                mem_birth: `${kakao_account.birthyear}+${kakao_account.birthday}`,
                mem_profile: kakao_account.profile.profile_image_url,
                mem_phone: kakao_account.phone_number,
              });
            },
            fail: (error) => {
              console.log(error);
            },
          });
        },
        fail: (err) => {
          console.error(err);
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("본인인증을 해주세요.");
      return;
    }
    if (!isIdValid) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (formData.mem_pw !== formData.confirm_pw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 요청
    try {
      const response = await axios.post(
        "http://localhost:8081/api/members/register",
        {
          mem_id: formData.mem_id,
          mem_pw: formData.mem_pw,
          mem_name: formData.mem_name,
          mem_birth: formData.mem_birth,
          mem_profile: formData.mem_profile,
          mem_phone: formData.mem_phone,
        }
      );
      console.log("회원가입 성공:", response.data);
      navigate("/login"); // 회원가입 성공 후 로그인 페이지로 리디렉션
    } catch (error) {
      console.error("회원가입 실패:", error.response.data);
      alert("회원가입에 실패하였습니다: " + error.response.data.message);
    }
  };

  return (
    <div>
      <Navs />
      <div id="content" className="my-custom-content">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6} className="login-form-container">
              <div className="text-center mb-4">
                <img
                  src="/img/r1.png"
                  alt="Read Fit 로고"
                  className="login-logo"
                />
              </div>
              <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3 w-75">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="아이디"
                    className="input-field"
                    name="mem_id"
                    value={formData.mem_id}
                    onChange={handleInputChange}
                    onBlur={handleBlur} // 여기에 onBlur 이벤트 핸들러 추가
                  />
                  <Button variant="primary" onClick={handleCheckDuplicate}>
                    중복확인
                  </Button>
                  {isIdValid ? (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="ml-2 text-success"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      className="ml-2 text-danger"
                    />
                  )}
                </InputGroup>

                <InputGroup className="mb-3 w-75">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호"
                    className="input-field"
                    name="mem_pw"
                    value={formData.mem_pw}
                    onChange={handleInputChange}
                  />
                </InputGroup>

                <InputGroup className="mb-3 w-75">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호 확인"
                    className="input-field"
                    name="confirm_pw"
                    value={formData.confirm_pw}
                    onChange={handleInputChange}
                  />
                </InputGroup>

                <Button
                  variant="success"
                  type="submit"
                  className="login-button mb-3"
                >
                  회원가입
                </Button>

                <Button
                  variant="warning"
                  className="kakao-login-button mb-3"
                  onClick={handleKakaoLogin}
                >
                  <FontAwesomeIcon icon={faCommentDots} className="me-2" />
                  카카오로 본인인증
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Register;
