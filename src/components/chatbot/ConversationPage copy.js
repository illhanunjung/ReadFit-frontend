import React from "react";
import ChatBot from "react-simple-chatbot";
import "./ConversationPage.css";

const steps = [
  {
    id: "1",
    message:
      "안녕하세요! 신발 쇼핑 도우미입니다. 원하시는 신발의 유형을 말씀해주세요. (예: 운동화, 구두, 샌들)",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: ({ value }) => {
      if (value.includes("운동화")) {
        return "sportShoes";
      } else if (value.includes("구두")) {
        return "formalShoes";
      } else if (value.includes("샌들")) {
        return "sandals";
      } else {
        return "notFound";
      }
    },
  },
  {
    id: "sportShoes",
    message: "운동을 주로 어떤 환경에서 하시나요? (예: 실내, 실외, 트레킹)",
    trigger: "sportShoesType",
  },
  {
    id: "sportShoesType",
    user: true,
    trigger: "shoesRecommendation",
  },
  {
    id: "formalShoes",
    message:
      "구두는 어떤 행사에 착용하실 예정인가요? (예: 비즈니스 미팅, 결혼식, 평상시)",
    trigger: "formalShoesType",
  },
  {
    id: "formalShoesType",
    user: true,
    trigger: "shoesRecommendation",
  },
  {
    id: "sandals",
    message: "샌들은 주로 어떤 계절에 착용하실 계획인가요? (예: 여름, 봄/가을)",
    trigger: "sandalsType",
  },
  {
    id: "sandalsType",
    user: true,
    trigger: "shoesRecommendation",
  },
  {
    id: "shoesRecommendation",
    message:
      "고려해야 할 추가적인 요구 사항이 있나요? (색상, 브랜드, 가격대 등)",
    trigger: "finalStep",
  },
  {
    id: "finalStep",
    user: true,
    trigger: "endMessage",
  },
  {
    id: "endMessage",
    message:
      "추천해드릴 수 있는 최적의 신발을 찾았습니다! 검색 결과 페이지로 이동하시겠어요?",
    end: true,
  },
  {
    id: "notFound",
    message:
      "죄송합니다, 해당하는 신발 유형을 찾을 수 없습니다. 다시 입력해주시겠어요?",
    trigger: "2",
  },
];

const ConversationPage = () => {
  return (
    <div className="ConversationPage">
      <ChatBot steps={steps} />
    </div>
  );
};

export default ConversationPage;
