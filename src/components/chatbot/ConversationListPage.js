import React from "react";
import "./ConversationListPage.css";
import MessageIcon from "./Chat.png"; // 메시지 아이콘 파일 경로에 맞게 조정해야 합니다.
import listIcon from "./logo1.png";

const ConversationListPage = ({ onNewConversationStart }) => {
  // 가상의 대화방 데이터
  const conversations = [
    {
      id: 1,
      title: "Alice",
      lastMessage: "모던한 수납 더보기",
      time: "오전 10:14",
      avatar: listIcon,
    },
    {
      id: 2,
      title: "The Office",
      lastMessage: "새로운 메시지",
      time: "오전 9:00",
      avatar: listIcon,
    },
    {
      id: 3,
      title: "The Office",
      lastMessage: "새로운 메시지",
      time: "오전 9:00",
      avatar: listIcon,
    },
    {
      id: 4,
      title: "The Office",
      lastMessage: "새로운 메시지",
      time: "오전 9:00",
      avatar: listIcon,
    },
    {
      id: 5,
      title: "The Office",
      lastMessage: "새로운 메시지",
      time: "오전 9:00",
      avatar: listIcon,
    },
    {
      id: 6,
      title: "The Office",
      lastMessage: "새로운 메시지",
      time: "오전 9:00",
      avatar: listIcon,
    },
    // 추가 대화방 데이터...
  ];

  return (
    <div className="conversation-list-container">
      <div className="conversation-list-header">
        <h2>대화</h2>
      </div>
      {conversations.length > 0 ? (
        <div className="conversation-list">
          {conversations.map((conv) => (
            <div key={conv.id} className="conversation-item">
              <img
                src={conv.avatar}
                alt={conv.title}
                className="conversation-avatar"
              />
              <div className="conversation-details">
                <h3 className="conversation-title">{conv.title}</h3>
                <p className="conversation-snippet">{conv.lastMessage}</p>
              </div>
              <span className="conversation-time">{conv.time}</span>
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
