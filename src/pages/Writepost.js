import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navs from "../components/Nav";
import "../css/writepost.css"; // CSS 파일 임포트

const WritePost = () => {
  const editPostString = sessionStorage.getItem("editPost");
  const editPost = JSON.parse(editPostString);
  // editPost가 존재하면 해당 값을 초기값으로 사용하고, 그렇지 않으면 빈 문자열 사용
  const [title, setTitle] = useState(editPost ? editPost.board_title : "");
  const [content, setContent] = useState(editPost ? editPost.board_content : "");
  const loginMember = window.sessionStorage.getItem("mem_id");
  // ** 아래는 ** 아래는 여러개의 파일을 읽는 코드 1 전
  // const [images, setImages] = useState([]);
  // const [image, setImage] = useState(null); // 단일 이미지 상태로 변경
  // alert("writepost입니다. : "+editPost.board_seq); // editPost 값을 콘솔에 출력
  const [image, setImage] = useState(editPost ? editPost.board_img : null);

  // ** 아래는 ** 아래는 여러개의 파일을 읽는 코드 1 전
  // useEffect(() => {
  //   // 미리보기 URL 메모리 해제
  //   return () => {
  //     images.forEach((image) => URL.revokeObjectURL(image.preview));
  //   };
  // }, [images]);

  useEffect(() => {
    // 미리보기 URL 메모리 해제
    return () => {
      if (image) URL.revokeObjectURL(image.preview);
    };
  }, [image]);

  // ** 아래는 여러개의 파일을 읽는 코드 1
  // const handleImageChange = (e) => {
  //   if (e.target.files) {
  //     const filesArray = Array.from(e.target.files).map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     );

  //     setImages((prevImages) => prevImages.concat(filesArray));
  //   }
  // };

  // ** 아래는 한개의 파일만 제한한 코드 1
  // const handleImageChange = (e) => {
  //   if (e.target.files && e.target.files[0]) { // 첫 번째 선택된 파일만 처리
  //     const file = e.target.files[0];
  //     setImage({
  //       ...file,
  //       preview: URL.createObjectURL(file),
  //     });
  //   }
  // };

  // 아래는 이미지를 문자열 형태로 서버에 전송하기 위한 코드 : Base64 : FileReader API를 사용
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
        // 파일 읽기가 완료되면 이 부분이 실행됩니다.
        // e.target.result에 Base64 인코딩된 문자열이 담겨있습니다.
        setImage(e.target.result); // Base64 문자열 상태를 업데이트
      };
  
      reader.readAsDataURL(e.target.files[0]); // 파일을 Base64로 읽어옵니다.
    }
  };

  // **아래는 Base64 : FileReader API를 사용 전에 썼던 것 : 여러파일 하나의 파일 공통 코드
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post('/api/boards/boardWrite', {
  //       board_seq: editPost ? editPost.board_seq : 0,
  //       board_title: title,
  //       board_re_at: editPost ? editPost.board_re_at : "",
  //       mem_id: editPost ? editPost.mem_id : loginMember,
  //       board_content: content,
  //       board_at: editPost ? editPost.board_at : "",
  //       board_img: editPost ? editPost.board_img : "",
  //     }, {
  //       headers: {
  //         'Content-Type': 'application/json' // 이 부분은 Axios가 기본적으로 설정하지만, 명시적으로 추가할 수 있습니다.
  //       }
  //     });
  //     if (response.status === 200) { // 변경된 부분
  //       console.log("게시글 작성 성공");
  //       if(editPost != null){
  //         window.location.href = `/boards/${editPost.board_seq}`;
  //       }else{
  //         window.location.href = "/Board";
  //       }
  //     } else {
  //       console.error("게시글 작성 실패");
  //     }
  //   } catch (error) {
  //     console.error("게시글 작성 요청 실패:", error);
  //   }
  // };

  const handleSubmit = async (event) => {
    const wordGuide = editPost ? "수정" : "작성";
    if (window.confirm(`게시물을 ${wordGuide} 하시겠습니까?`)) {
      event.preventDefault();
    
      try {
        const response = await axios.post('/api/boards/boardWrite', {
          // 기존의 폼 데이터와 함께 이미지의 Base64 문자열을 전송
          board_seq: editPost ? editPost.board_seq : 0,
          board_title: title,
          board_re_at: editPost ? editPost.board_re_at : "",
          mem_id: editPost ? editPost.mem_id : loginMember,
          board_content: content,
          board_at: editPost ? editPost.board_at : "",
          board_img: image, // 여기에 Base64 문자열이 들어갑니다.
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.status === 200) {
          console.log("게시글 작성 성공");
          // 성공적으로 처리된 후의 로직
          if(editPost != null){
            window.location.href = `/boards/${editPost.board_seq}`;
          }else{
            window.location.href = "/Board";
          }
        } else {
          console.error("게시글 작성 실패");
        }
      } catch (error) {
        console.error("게시글 작성 요청 실패:", error);
      }
    }
  };
  
  // ** 아래는 여러개의 파일을 읽는 코드 2
  // const thumbs = images.map((file) => (
  //   <div key={file.name} className="thumb">
  //     <img src={file.preview} alt={file.name} />
  //   </div>
  // ));

  // ** 아래는 한 개의 파일을 읽는 코드 2
  // const thumb = image ? (
  //   <div className="thumb">
  //     <img src={image.preview} alt="preview" />
  //   </div>
  // ) : null;

  const thumb = image ? (
    <div className="thumb">
      <img src={image} alt="preview" /> {/* Base64 문자열을 src로 직접 사용 */}
    </div>
  ) : null;

  return (
    <div>
      <Navs />
      <Container className="writePostContainer">
      {editPost ? (
        <h2 className="mt-5">게시글 수정</h2>
      ) : (
        <h2 className="mt-5">게시글 작성</h2>
      )}
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={12}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="제목을 입력하세요."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                {/* <Form.Label>내용</Form.Label> */}
                <Form.Control
                  as="textarea"
                  style={{ height: "30rem" }}
                  // rows={8}
                  placeholder="내용을 입력하세요."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                {/* ** 아래는 여러개의 파일을 읽는 코드 3 */}
                {/* <div className="imageUploadContainer">
                  <label
                    htmlFor="image-upload-input"
                    className="imageUploadIcon"
                  >
                    <i className="fas fa-cloud-upload-alt"></i>{" "} */}
                    {/* FontAwesome 아이콘 예시 */}
                  {/* </label>
                  <input
                    id="image-upload-input"
                    type="file"
                    multiple
                    onChange={handleImageChange}
                  />
                  <p className="imageUploadText">
                    이미지를 업로드하려면 여기를 클릭하세요.
                  </p>
                </div>
                <div className="thumbsContainer">{thumbs}</div> */}

                <div className="imageUploadContainer">
                  <label
                    htmlFor="image-upload-input"
                    className="imageUploadIcon"
                  >
                    <i className="fas fa-cloud-upload-alt"></i>{" "}
                    {/* FontAwesome 아이콘 예시 */}
                  </label>
                  <input
                    id="image-upload-input"
                    type="file"
                    // multiple
                    onChange={handleImageChange}
                  />
                  <p className="imageUploadText">
                    이미지를 업로드하려면 여기를 클릭하세요.
                  </p>
                </div>
                <div className="thumbContainer">{thumb}</div>
              </Form.Group>
              <div className="buttonsContainer">
                <Link to={"/Board"}>
                  <Button variant="secondary" type="button">
                    취소
                  </Button>
                </Link>
                {/* <Link to={"/Board"}> */}
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    {editPost ? "수정" : "작성"}
                  </Button>
                {/* </Link> */}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WritePost;
