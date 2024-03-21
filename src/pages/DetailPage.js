import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/DetailPage.css";
import Navs from "../components/Nav";

const DetailPage = () => {
  const { board_seq } = useParams();
  const [boardDetail, setBoardDetail] = useState(null);

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/boards/${board_seq}`
        );
        // 서버에서 받아온 상세 정보를 상태에 저장

        setBoardDetail(response.data);
      } catch (error) {
        console.error("게시글 상세 정보를 가져오는 도중 오류 발생:", error);
      }
    };

    // review_idx가 변경될 때마다 fetchBoardDetail 함수 호출
    fetchBoardDetail();
  }, [board_seq]);

  return (
    <div>
      <Navs />
      <div id="content">
        <h2>게시글 상세 페이지</h2>

        {boardDetail ? (
          // 상세게시물이 존재하면 상세 정보를 표시
          <div>
            <h3>제목: {boardDetail?.board_title}</h3>
            <p>아이디: {boardDetail?.mem_id}</p>
            <p>날짜: {boardDetail?.board_at}</p>
            <p>내용: {boardDetail?.board_content}</p>
          </div>
        ) : (
          // 상세게시물이 존재하지 않으면 로딩 상태를 표시
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
