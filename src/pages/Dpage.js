import {
  faCommentDots,
  faEdit,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormControl,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navs from "../components/Nav";
import "../css/Dpage.css";

function Dpage() {
  const { board_seq } = useParams();
  const [boardDetail, setBoardDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태
  const loginMember = window.sessionStorage.getItem("mem_id");
  // alert("로그인한 멤버 : " + loginMember)

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/boards/${board_seq}`
        );
        console.log("게시물 정보", response.data);
        const boardData = response.data.board;
        const commentsData = response.data.comments;
        setBoardDetail(boardData);
        setComments(commentsData);
        console.log("잘지고와지니", boardData);
      } catch (error) {
        console.error("게시글 상세 정보를 가져오는 도중 오류 발생:", error);
      }
    };
    fetchBoardDetail();
  }, [board_seq]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/api/boards/${board_seq}/comments`, {
        board_seq: board_seq,
        comment: commentText,
        loginMember: loginMember,
      });
      if (response.status === 200) {
        //alert("댓글 등록이 완료되었습니다.");
        setCommentText(""); // 댓글 등록 후 입력 필드 비우기
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
        fetchBoardDetail(); // fetchBoardDetail 함수를 호출하여 최신 상태를 업데이트합니다.
      } else {
        alert("댓글 등록이 실패하였습니다.");
        window.location.href = "Dpage";
      }
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  };

  // 현재 로그인한 사용자를 나타내는 상태 (실제 애플리케이션에서는 서버에서 받아옵니다.)
  const [currentUser, setCurrentUser] = useState("tester1");

  // 게시물 또는 댓글의 작성자가 현재 로그인한 사용자와 동일한지 확인하는 함수
  // const isCurrentUser = (authorId) => {
  //   return authorId === currentUser;
  // };

  // isCurrentUser 함수 정의
  const isCurrentUser = () => {
    return loginMember !== "";
  };

  function handleDeleteComment(commentSeq) {
    fetch(`/api/deleteComment/${commentSeq}`, {
      method: "DELETE", // HTTP 메소드를 DELETE로 변경
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("댓글 삭제 성공");
          // 성공적으로 삭제 후 필요한 상태 업데이트 또는 UI 반영
          const fetchBoardDetail = async () => {
            try {
              const response = await axios.get(
                `http://localhost:8081/api/boards/${board_seq}`
              );
              setBoardDetail(response.data.board);
              console.log("게시물 정보", response.data);
              setComments(response.data.comments);
            } catch (error) {
              console.error(
                "게시글 상세 정보를 가져오는 도중 오류 발생:",
                error
              );
            }
          };
          fetchBoardDetail(); // fetchBoardDetail 함수를 호출하여 최신 상태를 업데이트합니다.
        } else {
          console.error("댓글 삭제 실패");
        }
      })
      .catch((error) => {
        console.error("댓글 삭제 요청 실패:", error);
      });
  }

  const handleDeletePost = () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      fetch(`/api/deletePost/${board_seq}`, {
        method: "DELETE", // HTTP 메소드를 DELETE로 변경
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("게시물 삭제 성공");
            // 게시물 삭제 후 페이지 이동
            window.location.href = "/board";
          } else {
            console.error("게시물 삭제 실패");
          }
        })
        .catch((error) => {
          console.error("게시물 삭제 요청 실패:", error);
        });
    }
  };

  // 댓글 수정 모드인지 여부를 나타내는 상태
  const [isEditingComment, setIsEditingComment] = useState(false);

  // 수정 중인 댓글 정보를 저장하는 상태
  const [editingComment, setEditingComment] = useState(null);

  // 댓글 수정 버튼 클릭 시 호출되는 함수
  const handleCommentEdit = (comment) => {
    // alert("댓글 수정 버튼 클릭됨, 댓글 comment_seq : " + comment.comment_seq);
    // alert("댓글 수정 버튼 클릭됨, 댓글 comment(댓글 내용) : " + comment.comment);
    setIsEditingComment(comment.comment_seq); // 수정 모드로 전환
    setEditingComment(comment); // 수정 중인 댓글 정보 설정
  };

  const handleCommentUpdate = async () => {
    // alert("댓글 수정 완료 버튼을 눌렀습니다 : " + editingComment.comment);
    // 댓글 내용이 없는 경우 함수를 종료합니다.
    if (!editingComment || !editingComment.comment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `/api/boards/${board_seq}/comments/edit`,
        {
          comment: editingComment.comment,
          comment_seq: editingComment.comment_seq,
        }
      );
      if (response.status === 200) {
        // alert("댓글 등록이 수정되었습니다.");

        // 수정 모드를 종료하고, 수정 중인 댓글 상태를 초기화합니다.
        setIsEditingComment(false);
        setEditingComment(null);

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
        fetchBoardDetail(); // fetchBoardDetail 함수를 호출하여 최신 상태를 업데이트합니다.
      } else {
        // 서버로부터 예상치 못한 응답이 온 경우, 사용자에게 알립니다.
        alert("댓글 수정에 실패하였습니다.");
      }
    } catch (error) {
      // 요청 중 오류가 발생한 경우, 오류 메시지를 출력합니다.
      console.error("댓글 수정 중 오류 발생:", error);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  const handleEditPost = () => {
    // Writepost.js 페이지로 이동
    if (window.confirm("게시물을 수정하시겠습니까?")) {
      fetch(`/api/Writepost/${board_seq}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("게시물 수정 버튼이 눌려서 Writepost로 이동");
            return response.json(); // JSON 형태의 응답을 반환합니다.
          } else {
            console.error("게시물 수정 버튼이 눌려도 Writepost로 이동 못함");
            throw new Error("게시물 수정 실패");
          }
        })
        .then((data) => {
          // 응답으로 받은 데이터를 sessionStorage에 저장합니다.
          window.sessionStorage.setItem("editPost", JSON.stringify(data));
          const editPost = sessionStorage.getItem("editPost");
          // const parsedData = JSON.parse(editPost);

          // alert("수정 버튼을 눌러서 가져온 것입니다."+parsedData.board_seq)
          // 게시물 수정 후 Writepost.js 페이지로 이동합니다.
          window.location.href = "/Writepost";
        })
        .catch((error) => {
          console.error("게시물 수정 요청 실패:", error);
        });
    }
  };

  const wrprofile = boardDetail
    ? `http://localhost:8081/img/uploads/profile/${boardDetail?.mem_profile}`
    : undefined;

  // const cmtprofile = comment
  //   ? `http://localhost:8081/img/uploads/profile/${comment.mem_profile}`
  //   : undefined;

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
                        src={wrprofile}
                        // roundedCircle
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
                  {loginMember === boardDetail.mem_id && (
                    <Col xs="auto">
                      <div className="post-actions">
                        <Button
                          variant="outline-secondary"
                          className="me-2 action-button"
                          onClick={handleEditPost} // 버튼 클릭 시 handleEditPost 함수 호출
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          className="action-button"
                          onClick={handleDeletePost}
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

          <ListGroup className="comments-list">
            {comments.map((comment) => (
              <ListGroup.Item
                key={comment.comment_seq}
                className="comment-item"
              >
                <Row className="align-items-start">
                  <Col xs={2} md={1} className="d-flex justify-content-center">
                    <Image
                      src={
                        comment
                          ? `http://localhost:8081/img/uploads/profile/${comment.mem_profile}`
                          : undefined
                      }
                      // roundedCircle
                      className="comment-img"
                    />
                  </Col>
                  <Col xs={8} md={10} className="comment-details">
                    <div className="comment-author">{comment.mem_id}</div>
                    {isEditingComment === comment.comment_seq ? (
                      <FormControl
                        as="textarea"
                        value={editingComment?.comment || ""}
                        onChange={(e) =>
                          setEditingComment({
                            ...editingComment,
                            comment: e.target.value,
                          })
                        }
                        style={{ marginBottom: "10px" }} // input창 아래 여백 추가
                      />
                    ) : (
                      <>
                        <div className="comment-content">{comment.comment}</div>
                        <div className="comment-date">{comment.comment_at}</div>
                      </>
                    )}
                  </Col>
                  <Col xs={2} md={1} className="d-flex justify-content-end">
                    {loginMember === comment.mem_id && !isEditingComment && (
                      // 수정 버튼 표시
                      <Button
                        variant="outline-secondary"
                        className="me-2 action-button"
                        onClick={() => handleCommentEdit(comment)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                    )}
                    {isEditingComment === comment.comment_seq ? (
                      // '수정완료' 버튼 표시
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleCommentUpdate()}
                        style={{
                          width: "100%",
                          maxWidth: "150px",
                          marginLeft: "auto",
                          height: "80px",
                          display: "inline-block",
                        }}
                      >
                        수정완료
                      </Button>
                    ) : (
                      (loginMember === comment.mem_id ||
                        window.sessionStorage.getItem("mem_role") === "0") && (
                        // 삭제 버튼 표시
                        <Button
                          variant="outline-danger"
                          className="action-button"
                          onClick={() =>
                            handleDeleteComment(comment.comment_seq)
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      )
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {loginMember !== null && isCurrentUser() && (
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
          )}
        </Card>
      </Container>
    </div>
  );
}

export default Dpage;
