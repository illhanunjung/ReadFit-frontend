import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import EllipseImage from "../components/ellipse-126@2x.png";
import CameraIcon from "../components/CameraIcon.png";
import axios from "axios";

const Mypage = () => {
  const [member, setMember] = useState({
    mem_name: "",
    mem_phone: "",
    mem_id: "",
  });
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태

  const fileInputRef = useRef(null);

  // 비밀번호 모달
  const [showModal, setShowModal] = useState(false);
  const [phoneModal, setphoneModal] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");

  // 새 비밀번호를 위한 상태
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 세션 스토리지에서 'loginMember' 값을 가져옵니다.

        let storedMember = window.sessionStorage.getItem("mem_name");
        let storedMember2 = window.sessionStorage.getItem("mem_phone");
        let storedProfileImageName = window.sessionStorage.getItem(
          "mem_profile"
        );
        let profileImage = window.sessionStorage.getItem("profileImage");

        const userId = window.sessionStorage.getItem("mem_id");

        console.log(storedMember);

        if (storedMember != null) {
          setMember({
            mem_name: storedMember,
            mem_phone: storedMember2,
            mem_id: userId,
          });
          // const profileImagePath = storedProfileImageName
          //   ? `http://localhost:8081/img/uploads/profile/${storedProfileImageName}`
          //   : EllipseImage;

          const profileImagePath = profileImage
            ? `http://localhost:8081/img/uploads/profile/${profileImage}`
            : storedProfileImageName
            ? `http://localhost:8081/img/uploads/profile/${storedProfileImageName}`
            : EllipseImage;
          setProfileImage(profileImagePath);
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

  // 핸드폰 변경 처리를 위한 함수
  const handlePhoneChangeSubmit = (e) => {
    e.preventDefault();
    if (!newPhone.trim()) {
      alert("새 전화번호가 입력되지 않았습니다.");
      return;
    }

    axios
      .post(
        "/api/updatePhone",
        { newPhone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        window.sessionStorage.setItem("mem_phone", newPhone);
        setphoneModal(false);
        setMember({ ...member, mem_phone: newPhone });
      })
      .catch((error) => {
        console.error("핸드폰 변경에 실패했습니다:", error);
        alert("핸드폰 변경에 실패했습니다.");
      });
  };

  // 비밀번호 변경 입력란 변경 시 호출될 함수
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== newPassword1) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 데이터를 제대로 보내고 있는지 확인합니다.
    const payload = {
      newPassword: newPassword,
    };

    axios
      .post("/api/updatePassword", payload, {
        headers: {
          "Content-Type": "application/json",
          // 필요하다면 여기에 인증 토큰 등의 헤더를 추가합니다.
        },
      })
      .then((response) => {
        setShowModal(false);
        // 비밀번호 변경 성공 후 필요한 상태 업데이트나 네비게이션 로직
      })
      .catch((error) => {
        console.error("비밀번호 변경에 실패했습니다:", error.response);
        // 에러 응답의 내용을 통해 더 구체적인 에러 메시지를 표시할 수 있습니다.
        alert(`비밀번호 변경에 실패했습니다: ${error.response.data.message}`);
      });
  };

  // 카메라 아이콘 클릭 핸들러
  const handleCameraIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("image", file);
      formData.append("mem_id", member.mem_id);
      console.log("아이디", member.mem_id);

      try {
        const response = await axios.post("/api/img/upload/profile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const newImagePath = response.data; // 가정: 응답으로 이미지 경로(URL)를 받음
        setProfileImage(newImagePath); // 상태 업데이트
        window.sessionStorage.setItem("profileImage", newImagePath); // 세션 스토리지에 저장
        alert("프로필 이미지가 성공적으로 업로드되었습니다.");

        const fetchMemberData = async () => {
          try {
            // 세션 스토리지에서 'loginMember' 값을 가져옵니다.

            let storedMember = window.sessionStorage.getItem("mem_name");
            let storedMember2 = window.sessionStorage.getItem("mem_phone");
            let storedProfileImageName = window.sessionStorage.getItem(
              "profileImage"
            );
            const userId = window.sessionStorage.getItem("mem_id");

            if (storedMember != null) {
              setMember({
                mem_name: storedMember,
                mem_phone: storedMember2,
                mem_id: userId,
              });
              const profileImagePath = storedProfileImageName
                ? `http://localhost:8081/img/uploads/profile/${storedProfileImageName}`
                : EllipseImage;
              setProfileImage(profileImagePath);
            }
          } catch (error) {
            console.error(
              "회원 데이터를 가져오는데 에러가 발생했습니다:",
              error
            );
          }
        };

        fetchMemberData();
      } catch (error) {
        console.error("프로필 이미지 업로드에 실패했습니다:", error);
        alert("프로필 이미지 업로드에 실패했습니다."); // 사용자에게 오류 통지
      }
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
              src={profileImage || EllipseImage}
              className="rounded-circle mb-3"
              alt="프로필 이미지"
              style={{ width: "150px", height: "150px" }}
            />
            <img
              src={CameraIcon}
              onClick={() => fileInputRef.current.click()}
              style={{
                position: "relative",
                right: "3px",
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
                    readOnly
                  />
                </Col>
              </Form.Group>

              {/* 휴대전화 필드 */}
              <Form.Group as={Row} className="mb-3">
                <Col sm={12}>
                  <Form.Control
                    type="number"
                    placeholder="휴대전화"
                    value={member.mem_phone || ""}
                    onChange={handlePhoneChange}
                    readOnly
                  />
                </Col>
              </Form.Group>

              {/* 휴대전화 필드 */}
              <Form.Group as={Row} className="mb-3">
                <Col sm={6}>
                  <Button
                    onClick={() => setphoneModal(true)}
                    className="custom-button"
                  >
                    휴대전화 변경
                  </Button>
                </Col>
                <Col sm={6}>
                  {/* 휴대전화 변경 모달 */}
                  <Modal show={phoneModal} onHide={() => setphoneModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>휴대전화 변경</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {/* 휴대전화 변경 폼 */}
                      <Form onSubmit={handlePhoneChangeSubmit}>
                        <Form.Group controlId="formNewPhone">
                          <Form.Label>새로운 휴대전화</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="새로운 휴대전화를 입력하세요"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                          />
                        </Form.Group>
                        <Button className="custom-button">취소</Button>
                        <Button className="custom-button" type="submit">
                          확인
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>

                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>비밀번호 변경</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form onSubmit={handlePasswordChangeSubmit}>
                        <Form.Group controlId="newPassword">
                          <Form.Label>새 비밀번호</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="새로운 비밀번호를 입력하세요"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group controlId="newPassword">
                          <Form.Label>비밀번호 확인</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="비밀번호 확인하세요"
                            value={newPassword1}
                            onChange={(e) => setNewPassword1(e.target.value)}
                          />
                        </Form.Group>
                        {/* '입력 완료' 버튼을 추가합니다. */}
                        <Button className="custom-button" type="submit">
                          입력 완료
                        </Button>
                      </Form>
                    </Modal.Body>
                  </Modal>
                  <Button
                    onClick={() => setShowModal(true)}
                    className="custom-button"
                  >
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
