import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Image,
  Card,
  Button,
  Form,
  FormControl,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCommentDots,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Dpage.css";
import Navs from "../components/Nav";

function Dpage() {
  const { board_seq } = useParams();
  const [boardDetail, setBoardDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/boards/${board_seq}`
        );
        setBoardDetail(response.data.board);
        console.log("게시물 정보", response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error("게시글 상세 정보를 가져오는 도중 오류 발생:", error);
      }
    };

    fetchBoardDetail();
  }, [board_seq]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `http://localhost:8081/api/boards/${board_seq}/comments`,
        { content: commentText }
      );
      // 댓글 작성 후 새로고침 없이 댓글 목록 갱신
      const commentsResponse = await axios.get(
        `http://localhost:8081/api/boards/${board_seq}/comments`
      );
      setComments(commentsResponse.data);
      setCommentText(""); // 입력 폼 초기화
    } catch (error) {
      console.error("댓글을 작성하는 도중 오류 발생:", error);
    }
  };

  // 현재 로그인한 사용자를 나타내는 상태 (실제 애플리케이션에서는 서버에서 받아옵니다.)
  const [currentUser, setCurrentUser] = useState("tester1");

  // 게시물 또는 댓글의 작성자가 현재 로그인한 사용자와 동일한지 확인하는 함수
  const isCurrentUser = (authorId) => {
    return authorId === currentUser;
  };

  return (
    <div>
      <Navs />
      <Container id="contain">
        <Row className="my-5">
          <Col xs={12}>
            <div className="community-title">커뮤니티</div>
          </Col>
        </Row>
        <Card id="revBox my-5">
          {boardDetail ? (
            <>
              <Card.Header id="revTitle" className="bg-light">
                <Row className="justify-content-between">
                  <Col>
                    <h2 className="mb-2">{boardDetail.board_title}</h2>
                    <div className="user-info">
                      <Image
                        src="/img/r1.png"
                        roundedCircle
                        className="user-img"
                      />
                      <div className="user-text">
                        <strong>{boardDetail.mem_id}</strong>
                        <span className="text-muted">
                          {boardDetail.board_at}
                        </span>
                      </div>
                    </div>
                  </Col>
                  {isCurrentUser(boardDetail.mem_id) && (
                    <Col xs="auto">
                      <div className="post-actions">
                        <Button
                          variant="outline-secondary"
                          className="me-2 action-button"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="action-button"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
              </Card.Header>
              <Card.Body>
                {boardDetail.board_img && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <Image
                      src={boardDetail.board_img}
                      alt="Review"
                      style={{
                        maxWidth: "600px",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                )}
                <p>{boardDetail.board_content}</p>
                <p className="font-weight-bold">지역: {boardDetail.board_at}</p>
              </Card.Body>
            </>
          ) : (
            <p>Loading...</p>
          )}

          <Card.Footer className="d-flex justify-content-start align-items-center">
            <FontAwesomeIcon icon={faHeart} className="mr-2" />
            <span className="ml-2 mr-2">&nbsp;&nbsp;</span>
            <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
            <span className="ml-2 mr-2">&nbsp;&nbsp;</span>
            {comments.length}
          </Card.Footer>

          <Form className="my-3 d-flex" onSubmit={handleSubmit}>
            <FormControl
              as="textarea"
              placeholder="댓글을 입력해주세요"
              className="flex-grow-1 mr-2"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ resize: "none" }}
            />
            <Button variant="primary" type="submit" id="submitCommentButton">
              등록
            </Button>
          </Form>

          <ListGroup className="comments-list">
            {comments.map((comment) => (
              <ListGroup.Item key={comment.id} className="comment-item">
                <Row className="align-items-start">
                  <Col xs={2} md={1} className="d-flex justify-content-center">
                    <Image
                      src="/img/r1.png"
                      roundedCircle
                      className="comment-img"
                    />
                  </Col>
                  <Col xs={10} md={10} className="comment-details">
                    <div className="comment-author">{comment.mem_id}</div>
                    <div className="comment-content">{comment.comment}</div>
                    <div className="comment-date">{comment.comment_at}</div>
                  </Col>
                  <Col
                    xs={12}
                    md={1}
                    className="d-flex justify-content-end mt-2 mt-md-0"
                  >
                    <div className="comment-actions">
                      {isCurrentUser(comment.author) && (
                        <>
                          <Button
                            variant="outline-secondary"
                            className="action-button"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            className="action-button"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
}

export default Dpage;
