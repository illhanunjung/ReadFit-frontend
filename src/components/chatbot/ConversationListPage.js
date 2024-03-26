import React from "react";
import "./ConversationListPage.css"; // CSS 파일 임포트
import MessageIcon from "./Chat.png"; // 메시지 아이콘 파일 경로에 맞게 조정해야 합니다.

const ConversationListPage = ({ onNewConversationStart }) => {
  return (
    <div className="conversation-list-container">
      <div className="conversation-list-header">
        <h2>대화</h2>
      </div>
      <div className="conversation-list-content">
        <img className="chaticons" src={MessageIcon} alt="Start conversation" />
        <p>대화를 시작해보세요</p>
      </div>
      <div className="conversation-list-footer">
        <button
          className="start-conversation-button"
          onClick={onNewConversationStart} // 핸들러를 여기에 연결
        >
          새로운 대화하기
        </button>
      </div>
    </div>
  );
};

export default ConversationListPage;
