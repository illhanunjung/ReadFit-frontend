import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import EllipseImage from "../components/ellipse-126@2x.png";
import axios from "axios";

const Mypage = () => {
  const [member, setMember] = useState({ mem_name: "", mem_birthdate: "" });
  const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        // 세션 스토리지에서 'loginMember' 값을 가져옵니다.
        let storedMember = window.sessionStorage.getItem("mem_name");
        console.log(storedMember);

        if (storedMember != null) {
          setMember({ mem_name: storedMember, mem_phone: "" });
        }

        // try {
        //   // 세션에 'loginMember' 값이 있는 경우 파싱하여 사용합니다.
        //   loginMember = storedMember ? JSON.parse(storedMember) : null;
        //   console.log(loginMember);
        // } catch (parseError) {
        //   console.error('세션 스토리지의 "loginMember" 파싱 에러:', parseError);
        // }

        // if (loginMember && loginMember.mb_id) {
        //   // 사용자의 프로필 정보를 가져오는 요청
        //   const profileResponse = await axios.get(
        //     "http://localhost:8081/api/profile",
        //     {
        //       withCredentials: true,
        //     } // URL을 올바르게 수정합니다.
        //   );
        //   setMember({
        //     mb_name: profileResponse.data.mb_name, // 응답에서 mb_name 값을 가져옵니다.
        //     mb_birthdate: profileResponse.data.mb_birthdate, // 응답에서 mb_birthdate 값을 가져옵니다.
        //   });
        // } else {
        //   console.log(storedMember);
        //   console.log("로그인한 회원 정보가 세션 스토리지에 없습니다.");
        // }
      } catch (error) {
        console.error("회원 데이터를 가져오는데 에러가 발생했습니다:", error);
      }
    };

    fetchMemberData();
  }, []);
  // 입력 필드가 변경될 때 호출될 함수
  const handleNameChange = (e) => {
    setMember({ ...member, mb_name: e.target.value });
  };

  const handleBirthdateChange = (e) => {
    setMember({ ...member, mb_birthdate: e.target.value });
  };
  // 프로필 이미지 선택 시 핸들러
  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]); // 선택된 파일 상태에 저장
  };

  // 프로필 업데이트 제출 핸들러
  const handleProfileUpdate = async (e) => {
    e.preventDefault(); // 폼 제출 이벤트의 기본 동작 방지

    // FormData 객체를 생성하고 파일을 추가
    const formData = new FormData();
    formData.append("image", profileImage); // 'image' 키에 파일 추가

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
            <h1>마이페이지</h1>
            <img
              src={EllipseImage}
              className="rounded-circle mb-3"
              alt="프로필 이미지"
              style={{ width: "150px", height: "150px" }}
            />
            {/* 이미지 업로드를 위한 Form 추가 */}
            <Form onSubmit={handleProfileUpdate}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="이름"
                  value={member.mb_name || ""}
                  onChange={handleNameChange} // 이름 변경을 위한 핸들러
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="생년월일"
                  value={member.mb_birthdate || ""}
                  onChange={handleBirthdateChange}
                />
              </Form.Group>
              {/* 이미지를 선택하는 input 필드 */}
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={handleFileChange} />
              </Form.Group>
              <Button className="custom-button" type="submit">
                정보 변경 완료
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Mypage;
