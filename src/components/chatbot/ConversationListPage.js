import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConversationListPage.css";
import MessageIcon from "./Chat.png"; // 메시지 아이콘 파일 경로에 맞게 조정해야 합니다.
import listIcon from "./logo1.png";

const ConversationListPage = ({
  onNewConversationStart,
  onConversationSelect,
  mem_id,
}) => {
  const [conversations, setConversations] = useState([]);

  const handleConversationSelect = (session_seq) => {
    onConversationSelect(session_seq); // 상위 컴포넌트로 선택된 채팅방의 session_seq 전달
  };

  console.log("대화리스트페이지", mem_id);

  useEffect(() => {
    // 멤버 ID가 'tester7'인 대화 목록을 불러옵니다.
    // 실제 사용 시에는 로그인한 사용자의 멤버 ID를 동적으로 사용해야 합니다.
    fetchConversations(mem_id);
  }, []);

  const fetchConversations = async (mem_id) => {
    try {
      const response = await axios.get(`/api/chat/chatdata/${mem_id}`);
      setConversations(response.data);
      console.log("챗봇데이타", response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };
  return (
    <div className="conversation-list-container">
      <div className="conversation-list-header">
        <h2>대화</h2>
      </div>
      {conversations.length > 0 ? (
        <div className="conversation-list">
          {conversations.map((conv) => (
            <div
              key={conv.mem_id}
              className="conversation-item"
              onClick={() => handleConversationSelect(conv.session_seq)}
            >
              <img
                src={listIcon}
                alt={conv.contents}
                className="conversation-avatar"
              />
              <div className="conversation-details">
                <h3 className="conversation-title">{conv.contents}</h3>
                <p className="conversation-snippet">{conv.bot_answer}</p>
              </div>
              <span className="conversation-time">{conv.creat_at}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="conversation-list-content">
          <img
            className="chaticons"
            src={MessageIcon}
            alt="Start conversation"
          />
          <p>대화를 시작해보세요</p>
        </div>
      )}
      <div className="conversation-list-footer">
        <button
          className="start-conversation-button"
          onClick={onNewConversationStart}
        >
          새로운 대화하기
        </button>
      </div>
    </div>
  );
};

export default ConversationListPage;
