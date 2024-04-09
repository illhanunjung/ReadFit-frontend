import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatBot from "react-simple-chatbot";
import "./ConversationPage.css";

const SaveUserInput = ({ steps, session_seq }) => {
  const mem_id = sessionStorage.getItem("mem_id");
  useEffect(() => {
    const now = new Date().toISOString();
    const conversationData = [];

    Object.keys(steps).forEach((stepId) => {
      const step = steps[stepId];
      const userInput = step.value || ""; // 사용자 대답

      let botAnswer = ""; // 봇 대답
      if (!step.user && !userInput) {
        botAnswer = step.message; // 봇의 대답 저장
      }

      conversationData.push({
        mem_id: mem_id,
        session_seq: session_seq, // session_seq 추가
        contents: userInput, // 사용자 대답 저장
        bot_answer: botAnswer, // 봇 대답 저장
        creat_at: now,
      });
    });

    // 대화 데이터를 서버에 저장하는 로직 추가
    saveConversation(conversationData);
    console.log("Conversation data:", conversationData);
    console.log("대화페이지1", session_seq);
  }, [steps, mem_id, session_seq]);

  const saveConversation = async (conversationData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/chat/chats",
        conversationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data Saved Successfully:", response.data);
    } catch (error) {
      console.error("Failed to Save Conversation:", error);
      if (error.response) {
        console.log("Server Response:", error.response);
      }
    }
  };

  return null;
};

const ConversationPage = ({ mem_id, conversationId, session_seq }) => {
  console.log("대화페이지", mem_id);
  const [conversationDetails, setConversationDetails] = useState([]);

  const fetchConversationDetails = async () => {
    try {
      // 로그인한 사용자의 mem_id를 사용하여 대화 목록 요청
      const response = await axios.get(`/api/chat/chatdata/${mem_id}`);
      setConversationDetails(response.data);
      console.log("cvxzvzcxv", response.data);
    } catch (error) {
      console.error("Error fetching conversation details:", error);
    }
  };

  useEffect(() => {
    fetchConversationDetails();
  }, [mem_id]);
  console.log("대화페이지", session_seq);

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
      message:
        "샌들은 주로 어떤 계절에 착용하실 계획인가요? (예: 여름, 봄/가을)",
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
      trigger: "saveInput", // 대화 저장 스텝으로 연결
    },
    {
      id: "saveInput",
      component: <SaveUserInput session_seq={session_seq} />, // 대화 저장 로직을 처리하는 컴포넌트
      end: true, // 이후 대화를 종료
    },

    {
      id: "notFound",
      message:
        "죄송합니다, 해당하는 신발 유형을 찾을 수 없습니다. 다시 입력해주시겠어요?",
      trigger: "2",
    },
  ];

  return (
    <div className="ConversationPage">
      <ChatBot steps={steps} />
      {conversationDetails.map((detail, index) => (
        <div key={index}>{detail.message}</div> // 대화 내용을 UI에 표시
      ))}
    </div>
  );
};

export default ConversationPage;
