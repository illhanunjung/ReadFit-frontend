import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Alert, Button, Table, Pagination } from "react-bootstrap";
import axios from "axios";
import Navs from "../components/Nav";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 6; // 한 페이지에 표시할 아이템 수 변경 (총 6개, 각 열에 3개씩)

const Admin = () => {
  const navigate = useNavigate();
  
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const [currentMemberPage, setCurrentMemberPage] = useState(1);
  const [boards, setBoards] = useState([]);
  const [currentBoardPage, setCurrentBoardPage] = useState(1);

  const navigateToBoard = (boardSeq) => {
    navigate(`/boards/${boardSeq}`); // 실제 앱의 라우트 경로에 맞게 조정 필요
  };

  useEffect(() => {
    const memRole = window.sessionStorage.getItem("mem_role");

        // 관리자(mem_role이 0)가 아니면 홈페이지로 리디렉트
        if (memRole !== "0") {
          navigate("../"); // 홈페이지 또는 로그인 페이지 경로로 변경 가능

        }
      }, [navigate]);

// 각 게시글의 댓글 상태
const [comments, setComments] = useState({});

// 선택된 게시글의 댓글을 불러오는 함수
const fetchComments = async (boardSeq) => {
  try {
    const response = await axios.get(`/api/boards/${boardSeq}/comments`);
    setComments({
      ...comments,
      [boardSeq]: response.data.comments
    });
  } catch (error) {
    console.error("There was an error fetching the comments:", error);
    setError("댓글을 불러오는 중 오류가 발생했습니다.");
  }
};

// 댓글 보기/숨기기 토글 함수
const toggleComments = (boardSeq) => {
  if (comments[boardSeq]) {
    setComments({ ...comments, [boardSeq]: undefined });
  } else {
    fetchComments(boardSeq);
  }
};

  const fetchMembers = useCallback(async () => {
    try {
      const response = await axios.get('/api/members');
      setMembers(response.data);
    } catch (error) {
      setError("회원 데이터를 불러오는 중 오류가 발생했습니다.");
    }
  }, []);

  const fetchBoards = useCallback(async () => {
    try {
      const response = await axios.get('/api/boards');
      setBoards(response.data.boardList);
    } catch (error) {
      setError("게시글 데이터를 불러오는 중 오류가 발생했습니다.");
    }
  }, []);

  useEffect(() => {
    fetchMembers();
    fetchBoards();
  }, [fetchMembers, fetchBoards]);

  const suspendMember = async (memberId) => {
    try {
      await axios.put(`/api/members/${memberId}/suspend`);
      fetchMembers(); // 상태 새로고침
    } catch (error) {
      setError("회원 영구정지 실패");
    }
  };

  const unsuspendMember = async (memberId) => {
    try {
      await axios.put(`/api/members/${memberId}/unsuspend`);
      fetchMembers(); // 상태 새로고침
    } catch (error) {
      setError("회원 정지해제 실패");
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await axios.delete(`/api/boards/${boardId}`);
      fetchBoards(); // 상태 새로고침
    } catch (error) {
      setError("게시글 삭제 실패");
    }
  };

   // 페이지네이션 아이템을 중앙 정렬하기 위한 추가 스타일
   const paginationStyles = {
    display: 'flex',
    justifyContent: 'center'
  };

  const getPaginationItems = (currentPage, totalPages, setPage) => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => setPage(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  };

  const totalMemberPages = Math.ceil(members.length / ITEMS_PER_PAGE);
  const totalBoardPages = Math.ceil(boards.length / ITEMS_PER_PAGE);
  const currentMembers = members.slice((currentMemberPage - 1) * ITEMS_PER_PAGE, currentMemberPage * ITEMS_PER_PAGE);

  // 회원 관리 목록을 두 열로 분리
  const firstColMembers = currentMembers.slice(0, currentMembers.length / 2);
  const secondColMembers = currentMembers.slice(currentMembers.length / 2);

  return (
    <div>
      <Navs />
      <Container>
        <h1>관리자 페이지</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <br></br>
        <Row>
          <Col xs={12}>
            <h2>회원 관리</h2>
            <Row>
              {/* 첫 번째 열 */}
              <Col md={6}>
                <Table striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>상태</th>
                      <th>관리</th>
                      {/* <th style={{ width: '20%' }}>관리</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {firstColMembers.map((member) => (
                      <tr key={member.mem_id}>
                        <td>{member.mem_id}</td>
                        <td>{member.mem_role === 0 ? "관리자" : member.mem_role === 1 ? "일반 회원" : "정지 회원"}</td>
                        <td>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button style={{ flex: 1, margin: '0 4px' }} size="sm" onClick={() => suspendMember(member.mem_id)} variant="danger">정지</Button>
                            <Button style={{ flex: 1, margin: '0 4px' }} size="sm" onClick={() => unsuspendMember(member.mem_id)} variant="success">해제</Button>
                        </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              {/* 두 번째 열 */}
              <Col md={6}>
                <Table striped bordered size="sm">
                  <thead>
                    <tr>
                      <th> ID</th>
                      <th>상태</th>
                      <th>관리</th>
                      {/* <th style={{ width: '20%' }}>관리</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {secondColMembers.map((member) => (
                      <tr key={member.mem_id}>
                        <td>{member.mem_id}</td>
                        <td>{member.mem_role === 0 ? "관리자" : member.mem_role === 1 ? "일반 회원" : "정지 회원"}</td>
                        <td>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button style={{ flex: 1, margin: '0 4px' }} size="sm" onClick={() => suspendMember(member.mem_id)} variant="danger">정지</Button>
                            <Button style={{ flex: 1, margin: '0 4px' }} size="sm" onClick={() => unsuspendMember(member.mem_id)} variant="success">해제</Button>
                        </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <br></br>
            <div style={paginationStyles}>
              <Pagination>{getPaginationItems(currentMemberPage, totalMemberPages, setCurrentMemberPage)}</Pagination>
            </div>
          </Col>
        </Row>
        <br></br>
        <br></br>
        <br></br>
        <Row>
          <Col xs={12}>
            <h2>게시글 관리</h2>
            <Table striped bordered size="sm">
            <thead>
                <tr>
                <th style={{ width: '5%' }}>번호</th>
                <th>제목</th>
                <th style={{ width: '0%' }}>관리</th>
                </tr>
            </thead>
            <tbody>
                {boards.slice((currentBoardPage - 1) * ITEMS_PER_PAGE, currentBoardPage * ITEMS_PER_PAGE).map((board) => (
                <tr key={board.board_seq}>
                    <td>{board.board_seq}</td>
                    <td style={{ cursor: 'pointer' }} onClick={() => navigateToBoard(board.board_seq)}>
                {board.board_title}
                </td>
                    <td>
                    <Button size="sm" onClick={() => deleteBoard(board.board_seq)} variant="danger">삭제</Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
            <br></br>
            <div style={paginationStyles}>
            <Pagination>
                {getPaginationItems(currentBoardPage, totalBoardPages, setCurrentBoardPage)}
            </Pagination>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
