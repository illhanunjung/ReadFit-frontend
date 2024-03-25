import React from "react";
import ChatBot from "react-simple-chatbot";

const steps = [
  {
    id: "1",
    message: "대화를 시작합니다.",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "대화를 종료합니다.",
    end: true,
  },
];

const ConversationPage = () => {
  return <ChatBot steps={steps} />;
};

export default ConversationPage;
