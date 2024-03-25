import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";
import "../css/FindIDPW.css";
import Navs from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useState, useCallback } from "react";
const FindIDPW = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userphoneForId, setuserphoneForId] = useState("");
  const [userphoneForPw, setUserPhoneForPw] = useState(""); // 비밀번호 찾기용 휴대전화 상태
  const [userid, setUserId] = useState("");
  // 상태 추가
  const [findIdResult, setFindIdResult] = useState("");
  const [findPwResult, setFindPwResult] = useState("");

  const handleFindId = async (e) => {
    e.preventDefault();
    try {
      alert("아이디 찾기 버튼이 클릭되었습니다.");
      const response = await fetch("/api/findId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mem_name: username, mem_phone: userphoneForId }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("아이디 찾기 성공");
        setFindIdResult(`아이디 찾기 성공: ${data.mem_id}`); // 예제에서는 mb_id가 반환된다고 가정
        // window.location.href = "FindIDPW";
      } else {
        window.location.href = "FindIDPW";
        setFindIdResult("아이디 찾기 실패했습니다.");
        // alert("아이디 찾기 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleFindPw = async (e) => {
    e.preventDefault();
    try {
      alert("비밀번호 찾기 버튼이 클릭되었습니다.");
      const response = await fetch("/api/findPw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mem_id: userid, mem_phone: userphoneForPw }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("비밀번호 찾기 성공");
        setFindPwResult(`비밀번호 찾기 성공: ${data.mem_pw}`); // 예제에서는 mb_pw가 반환된다고 가정
        // window.location.href = "./";
      } else {
        // window.location.href = "./";
        alert("비밀번호 찾기 실패했습니다.");
        setFindPwResult("비밀번호 찾기 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="find-id-pw">
      <Navs />
      <Container className="my-custom-content py-5">
        <Row className="justify-content-center">
          <Col lg={6} md={8} sm={10} xs={12} className="text-center">
            {/* 로고 이미지 */}
            <img
              src="/img/logo1.png"
              alt="Read Fit 로고"
              className="login-logo mb-4"
            />
            {/* 아이디 찾기 폼 */}
            <Form
              onSubmit={handleFindId}
              className="mb-5 p-4 bg-white rounded shadow"
            >
              <h2 className="mb-3">아이디 찾기</h2>
              <Form.Control
                type="text"
                placeholder="이름"
                className="input-field mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="휴대전화"
                className="input-field mb-3"
                value={userphoneForId}
                onChange={(e) => setuserphoneForId(e.target.value)}
              />
              <Button className="w-100" variant="success" type="submit">
                아이디 찾기
              </Button>
              {/* 컴포넌트 내용
              폼 제출 결과 표시하기 */}
              {findIdResult && <div>{findIdResult}</div>}
              {/* {findPwResult && <div>{findPwResult}</div>} */}
            </Form>
            {/* 비밀번호 찾기 폼 */}
            <Form
              onSubmit={handleFindPw}
              className="p-4 bg-white rounded shadow"
            >
              <h2 className="mb-3">비밀번호 찾기</h2>
              <Form.Control
                type="text"
                placeholder="아이디"
                className="input-field mb-2"
                value={userid}
                onChange={(e) => setUserId(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="휴대전화"
                className="input-field mb-3"
                value={userphoneForPw}
                onChange={(e) => setUserPhoneForPw(e.target.value)}
              />
              <Button className="w-100" variant="success" type="submit">
                비밀번호 찾기
              </Button>

              {/* 컴포넌트 내용
              폼 제출 결과 표시하기 */}
              {/* {findIdResult && <div>{findIdResult}</div>} */}
              {findPwResult && <div>{findPwResult}</div>}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FindIDPW;
