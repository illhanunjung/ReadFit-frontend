import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import ChatBotCard from "./ChatBotCard"; // ChatBotCard 컴포넌트를 import 합니다.
import "./ConversationPage.css";
import logo from "./logo1.png";
import CustomHeader from "./CustomHeader";

const SaveUserInput = ({ steps, session_seq }) => {
  const mem_id = sessionStorage.getItem("mem_id");
  const [isSaved, setIsSaved] = useState(false); // 저장 상태를 추적하는 상태 변수 추가

  useEffect(() => {
    if (!isSaved) {
      // 데이터가 저장되지 않았다면 실행
      const now = new Date().toISOString();
      const conversationData = [];

      Object.keys(steps).forEach((stepId) => {
        const step = steps[stepId];
        const userInput = step.value || ""; // 사용자 대답
        let botAnswer = ""; // 봇 대답
        if (!step.user && !userInput && step.message) {
          botAnswer = step.message; // 봇의 대답 저장
        }

        if (userInput || botAnswer) {
          conversationData.push({
            mem_id: mem_id,
            session_seq: session_seq,
            contents: userInput,
            bot_answer: botAnswer,
            creat_at: now,
          });
        }
      });

      if (conversationData.length > 0) {
        saveConversation(conversationData);
        setIsSaved(true); // 저장 후 저장 상태 업데이트
      }
    }
  }, []); // 의존성 배열을 비워 컴포넌트가 마운트될 때만 실행하도록 함

  const saveConversation = async (conversationData) => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/chat/chats",
        conversationData,
        { headers: { "Content-Type": "application/json" } }
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

const DisplayResults = ({ steps, triggerNextStep }) => {
  const [result, setResult] = useState(null);
  const [previousInput, setPreviousInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentInput = steps.userInput && steps.userInput.message.trim();

    if (currentInput && currentInput !== previousInput) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:5000/api/data/chatBot",
            { question: currentInput }
          );
          setResult(response.data);
          setLoading(false);
          triggerNextStep();
          setPreviousInput(currentInput);
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
          triggerNextStep();
        }
      };

      fetchData();
    }
  }, [steps.userInput, triggerNextStep, previousInput]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 결과가 있으면 결과 데이터를 사용하여 ChatBotCard 컴포넌트를 렌더링
  return result && result.data && result.data.length > 0 ? (
    <ChatBotCard resultData={result} />
  ) : (
    <div>죄송합니다, 고객님께서 원하는 유형의 신발을 찾을 수 없습니다.</div>
  );
};

const ConversationPage = ({ mem_id, conversationId, session_seq }) => {
  console.log("대화페이지", mem_id);
  const [conversationDetails, setConversationDetails] = useState([]);
  const [key, setKey] = useState(0); // 컴포넌트 키를 통한 강제 리렌더

  const resetChat = () => {
    setKey((prevKey) => prevKey + 1); // 키 값을 변경하여 컴포넌트 리셋
  };
  const fetchConversationDetails = async () => {
    try {
      // session_seq를 사용하여 특정 세션의 대화 목록 요청
      const response = await axios.get(`/api/chat/${mem_id}/${session_seq}`);
      setConversationDetails(response.data); // 불러온 대화 내용을 상태에 저장
      console.log("Fetched conversation details:", response.data);
    } catch (error) {
      console.error("Error fetching conversation details:", error);
    }
  };

  useEffect(() => {
    if (session_seq) {
      // session_seq가 있을 때만 대화 내용을 불러옵니다.
      fetchConversationDetails();
    }
  }, [session_seq]);
  console.log("대화페이지", session_seq);

  const steps = [
    {
      id: "start",
      message: "안녕하세요! 신발에 대해 무엇이든 물어보세요!",
      trigger: "userInput",
    },
    {
      id: "userInput",
      user: true,
      trigger: "fetchResults",
      waitAction: true,
    },
    {
      id: "fetchResults",
      component: <DisplayResults />,
      asMessage: true,
      waitAction: true, // 사용자의 행동을 기다립니다 (옵셔널)
      // trigger: "displayResults"
      trigger: "lm",
    },
    {
      id: "lm",
      message: "다른 상품을 찾아보시겠어요?",
      trigger: "choice", // 첫 번째 단계로 돌아감
    },
    {
      id: "choice",
      options: [
        {
          value: "네",
          label: "네, 있어요",
          trigger: () => {
            resetChat(); // 대화를 초기화
            return "start"; // 초기 단계로 돌아감
          },
        },
        {
          value: "아니요",
          label: "아니요, 감사합니다",
          trigger: "saveInput",
        },
      ],
    },
    {
      id: "saveInput",
      component: <SaveUserInput session_seq={session_seq} />,
      trigger: "endm",
    },
    {
      id: "endm",
      message: "감사합니다",
      end: true,
    },

    {
      id: "notFound",
      message:
        "죄송합니다, 해당하는 신발 유형을 찾을 수 없습니다. 다시 입력해주세요.",
      trigger: "start", // 첫 번째 단계로 돌아감
    },
  ];

  return (
    <div className="ConversationPage">
      <ChatBot
        key={key}
        steps={steps}
        botAvatar={logo}
        headerComponent={<CustomHeader />}
      />
      {conversationDetails.map((detail, index) => (
        <div key={index}>{detail.message}</div> // 대화 내용을 UI에 표시
      ))}
    </div>
  );
};

export default ConversationPage;
