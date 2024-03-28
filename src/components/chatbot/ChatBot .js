import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import ConversationPage from "./ConversationPage"; // 대화 페이지 컴포넌트 임포트
import CustomHeader from "./CustomHeader";
import ConversationListPage from "./ConversationListPage"; // 대화 리스트 페이지 컴포넌트 임포트
import "./Chatbot.css";
import "./ConversationListPage.css";

const theme = {
  background: "#ffffff",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#000000", // 검정색 배경
  headerFontColor: "#ffffff", // 흰색 글자
  headerFontSize: "15px",
  botBubbleColor: "#efefef",
  botFontColor: "#4a4a4a",
  userBubbleColor: "#4a4a4a",
  userFontColor: "#fff",
};

const Chatbot = ({ isOpen, toggleChat }) => {
  const [inConversation, setInConversation] = useState(false); // 대화 중인지 여부 상태
  const [showConversationList, setShowConversationList] = useState(false); // 대화 리스트 보기 상태

  // 대화 페이지로 이동하는 핸들러 함수
  const handleInquiry = () => {
    setInConversation(true); // 대화 중 상태로 변경
    setShowConversationList(false); // 대화 리스트를 숨김
  };

  // 홈 버튼 클릭 시 챗봇 첫 화면으로 이동하는 핸들러 함수
  const handleGoToHomePage = () => {
    setInConversation(false); // 대화 중인지 여부 상태를 false로 설정하여 챗봇 첫 화면으로 이동
    setShowConversationList(false); // 대화 리스트를 숨김
  };

  // 대화 리스트 페이지로 이동하는 핸들러 함수
  const handleShowConversationList = () => {
    setShowConversationList(true); // 대화 리스트 페이지를 보여줌
    setInConversation(false); // 대화 중 상태를 비활성화
  };

  const handleNewConversationStart = () => {
    console.log("Starting new conversation"); // 로그 추가
    setInConversation(true);
    setShowConversationList(false);
  };

  // 챗봇의 스텝 정의
  const steps = [
    {
      id: "intro",
      message:
        "이 사이트에서는 다양한 신발을 리뷰하고 추천해드립니다. 무엇을 도와드릴까요?",
      trigger: "inquiry-button",
    },
    {
      id: "inquiry-button",
      component: (
        <button className="inquiry-button" onClick={handleInquiry}>
          문의하기
        </button>
      ),
      end: true,
    },
    // 추가 스텝 정의는 여기에...
  ];

  const renderChatBody = () => {
    if (showConversationList) {
      // 대화 리스트 페이지에 새 대화 시작 이벤트를 처리할 핸들러를 전달합니다.
      return (
        <ConversationListPage
          onNewConversationStart={handleNewConversationStart}
        />
      );
    } else if (inConversation) {
      // 대화 페이지 컴포넌트를 렌더링합니다.
      return <ConversationPage />;
    } else {
      // 기본 챗봇 컴포넌트를 렌더링합니다.
      return (
        <ThemeProvider theme={theme}>
          <ChatBot steps={steps} />
        </ThemeProvider>
      );
    }
  };

  // 챗봇을 렌더링하는 함수
  const renderChatbot = () => {
    if (!isOpen) return null; // 챗봇이 닫혀있으면 null 반환
    return (
      <div className="chatbot-container">
        <CustomHeader />
        {renderChatBody()} {/* 동적으로 챗봇 바디 렌더링 */}
        <div className="chatbot-navigation">
          {/* 네비게이션 버튼들 */}
          <button onClick={handleGoToHomePage}>홈</button>
          <button onClick={handleShowConversationList}>대화</button>
          <button onClick={() => {}}>설정</button>{" "}
          {/* 설정 페이지로의 이동을 구현하려면 이 부분을 수정하세요. */}
        </div>
      </div>
    );
  };

  return renderChatbot();
};

export default Chatbot;
