import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Navs from "../components/Nav";
import "../css/writepost.css"; // CSS 파일 임포트
import { Link } from "react-router-dom";

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    // 미리보기 URL 메모리 해제
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setImages((prevImages) => prevImages.concat(filesArray));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Images:", images);
    // 게시글 작성 후 추가 동작을 수행하거나 다른 페이지로 이동
  };

  const thumbs = images.map((file) => (
    <div key={file.name} className="thumb">
      <img src={file.preview} alt={file.name} />
    </div>
  ));

  return (
    <div>
      <Navs />
      <Container className="writePostContainer">
        <h2 className="mt-5">커뮤니티 글쓰기</h2>
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
                    multiple
                    onChange={handleImageChange}
                  />
                  <p className="imageUploadText">
                    이미지를 업로드하려면 여기를 클릭하세요.
                  </p>
                </div>
                <div className="thumbsContainer">{thumbs}</div>
              </Form.Group>
              <div className="buttonsContainer">
                <Link to={"/Board"}>
                  <Button variant="secondary" type="button">
                    취소
                  </Button>
                </Link>
                <Link to={"/Board"}>
                  <Button variant="primary" type="submit">
                    작성
                  </Button>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default WritePost;
