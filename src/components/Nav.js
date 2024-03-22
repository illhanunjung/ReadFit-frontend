import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import "../css/Nav.css";

function Navs() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태

  // 페이지 이동 핸들러
  const navigateTo = useCallback((path) => navigate(path), [navigate]);

  // 로그아웃 핸들러
  const logout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // 로그아웃 성공 시 클라이언트에서 로컬 상태 등을 초기화하거나 필요한 작업을 수행합니다.
        console.log("로그아웃 성공");
        setIsLoggedIn(false);
        // 세션이 제거되었으므로 원하는 페이지로 이동합니다.
        navigateTo("../");
      } else {
        // 로그아웃 실패 시 에러 처리를 수행합니다.
        console.error("로그아웃 실패");
      }
    } catch (error) {
      // 네트워크 오류 등의 경우 에러 처리를 수행합니다.
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetch("/api/checkLoginStatus")
      .then((response) => response.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // 프로필 클릭 핸들러
  const handleProfileClick = () => {
    navigateTo("/profile");
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container style={{ maxWidth: "80%" }}>
        <Navbar.Brand onClick={() => navigateTo("/")}>
          <img
            src="/img/navlogo.png"
            alt="Read Fit 로고"
            className="navbar-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center">
            <Nav.Link onClick={() => navigateTo("/Main2")}>홈</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/Board")}>커뮤니티</Nav.Link>
            <Nav.Link onClick={() => navigateTo("/Category")}>
              카테고리
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            {isLoggedIn ? (
              <>
                <Nav.Link onClick={() => navigateTo("/profil")}>
                  마이페이지{" "}
                </Nav.Link>
                <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                <Image
                  src="/img/r1.png"
                  roundedCircle
                  className="navbar-logo mx-2 d-lg-inline d-none"
                  onClick={handleProfileClick}
                />
              </>
            ) : (
              <>
                {/* 로그인 페이지로 연결하는 링크 */}
                <Nav.Link onClick={() => navigateTo("/Login")}>로그인</Nav.Link>
                {/* 회원가입 페이지로 연결하는 링크 */}
                <Nav.Link onClick={() => navigateTo("/Register")}>
                  회원가입
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navs;
