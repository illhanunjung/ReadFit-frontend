import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import EllipseImage from "../components/ellipse-126@2x.png";
import CameraIcon from "../components/CameraIcon.png";
import axios from "axios";

const Mypage = () => {
  const [member, setMember] = useState({
    mem_name: "",
    mem_phone: "",
  });
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const fileInputRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호를 위한 상태

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 세션 스토리지에서 'loginMember' 값을 가져옵니다.
        let storedMember = window.sessionStorage.getItem("mem_name");
        let storedMember2 = window.sessionStorage.getItem("mem_phone");

        console.log(storedMember);
        console.log(storedMember2);
        if (storedMember != null) {
          setMember({ mem_name: storedMember, mem_phone: storedMember2 });
        }
      } catch (error) {
        console.error("회원 데이터를 가져오는데 에러가 발생했습니다:", error);
      }
    };

    fetchMemberData();
  }, []);
  // 입력 필드가 변경될 때 호출될 함수
  const handleNameChange = (e) => {
    setMember({ ...member, mem_name: e.target.value });
  };

  const handlePhoneChange = (e) => {
    setMember({ ...member, mem_phone: e.target.value });
  };

  // 비밀번호 변경 입력란 변경 시 호출될 함수
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    handleCloseModal();
  };

  // 프로필 이미지 선택 시 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      // TODO: 파일을 서버에 업로드 처리 로직
    }
  };

  // 프로필 업데이트 제출 핸들러
  const handleProfileUpdate = async (e) => {
    e.preventDefault(); // 폼 제출 이벤트의 기본 동작 방지

    // FormData 객체를 생성하고 파일을 추가
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]); // 'image' 키에 파일 추가

    try {
      // 서버에 프로필 이미지 업로드 요청
      // 서버의 실제 업로드 URL로 교체해야 합니다.
      const response = await axios.post(
        "http://localhost:8081/api/profile/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 업로드 완료 후 추가 동작이 필요한 경우 여기에 로직 추가
      console.log("업로드 성공:", response.data);
    } catch (error) {
      console.error("프로필 이미지 업로드에 실패했습니다:", error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="text-center">
            <h1 className="text">MY FIT</h1>
            <div
              style={{ position: "relative", display: "inline-block" }}
            ></div>
            <img
              src={EllipseImage}
              className="rounded-circle mb-3"
              alt="프로필 이미지"
              style={{ width: "150px", height: "150px" }}
            />
            <img
              src={CameraIcon}
              onClick={() => fileInputRef.current.click()}
              style={{
                position: "relative",
                right: "28px",
                bottom: "-35px",
                width: "50px",
                height: "32px",
              }}
            />
            <Form.Control
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />

            <Form>
              {/* 이름 필드 */}
              <Form.Group as={Row} className="mb-3">
                <Col sm={12}>
                  <Form.Control
                    type="text"
                    placeholder="이름"
                    value={member.mem_name || ""}
                    onChange={handleNameChange}
                  />
                </Col>
              </Form.Group>

              {/* 휴대전화 필드 */}
              <Form.Group as={Row} className="mb-3">
                <Col sm={12}>
                  <Form.Control
                    type="text"
                    placeholder="휴대전화"
                    value={member.mem_phone || ""}
                    onChange={handlePhoneChange}
                  />
                </Col>
              </Form.Group>

              {/* 비밀번호 필드 */}
              <Form.Group as={Row} className="mb-3">
                <Col sm={6}>
                  <Button className="custom-button" type="submit">
                    휴대전화 변경
                  </Button>
                </Col>
                <Col sm={6}>
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>비밀번호 변경</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handleChangePassword}>
                        <Form.Group controlId="newPassword">
                          <Form.Label>새 비밀번호</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="새로운 비밀번호를 입력하세요"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </Form.Group>
                        {/* '입력 완료' 버튼을 추가합니다. */}
                        <Button className="custom-button" type="submit">
                          입력 완료
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <Button className="custom-button" onClick={handleShowModal}>
                    비밀번호 변경
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Mypage;
