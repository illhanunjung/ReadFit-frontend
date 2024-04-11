import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConversationPage.css";
import "./Oldchat.css";
import listIcon from "./logo1.png";
import manicon from "./man.png";
import CustomHeader from "./CustomHeader";

// "년도-월-일" 형식으로 날짜를 포맷팅하는 함수
const formatDate = (dateTimeStr) => {
  const date = new Date(dateTimeStr);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

// "시:분" 형식으로 시간을 포맷팅하는 함수
const formatTime = (dateTimeStr) => {
  const time = new Date(dateTimeStr);
  return time.toLocaleString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Oldchat = ({ session_seq }) => {
  const mem_id = sessionStorage.getItem("mem_id");
  const [conversationDetails, setConversationDetails] = useState([]);
  const [startDateTime, setStartDateTime] = useState(""); // 대화 시작 날짜 및 시간 상태

  useEffect(() => {
    const fetchConversationDetails = async () => {
      try {
        const response = await axios.get(`/api/chat/${mem_id}/${session_seq}`);
        setConversationDetails(response.data);
        // 첫 번째 메시지의 시간으로 대화 시작 날짜 및 시간 설정
        if (response.data.length > 0 && response.data[0].creat_at) {
          const formattedDateTime = formatDate(response.data[0].creat_at);
          setStartDateTime(formattedDateTime); // 날짜 및 시간 정보 설정
        }
      } catch (error) {
        console.error("Error fetching conversation details:", error);
      }
    };

    if (session_seq) {
      fetchConversationDetails();
    }
  }, [session_seq, mem_id]);

  // 대화 내용 렌더링
  const renderConversation = () => {
    return (
      <>
        {startDateTime && (
          <div className="saved-date">
            <span>{startDateTime}</span>
          </div>
        )}
        {conversationDetails.map((detail, index) => (
          <div key={index} className="message-wrapper">
            {detail.contents && (
              <div className="user-message">
                <img src={manicon} alt="User" className="profile-image" />
                <span className="content-item">{detail.contents}</span>
                <span className="message-time">
                  {formatTime(detail.creat_at)}
                </span>
              </div>
            )}
            {detail.bot_answer && (
              <div className="bot-message">
                <img src={listIcon} alt="Bot" className="profile-image" />
                <span className="bot-item">{detail.bot_answer}</span>
                <span className="message-time">
                  {formatTime(detail.creat_at)}
                </span>
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="old-chat-page">
      <CustomHeader />
      <div className="conversation-content">{renderConversation()}</div>
    </div>
  );
};

export default Oldchat;
