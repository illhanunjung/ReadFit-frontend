import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatBot from "react-simple-chatbot";
import ChatBotCard from "./ChatBotCard"; // ChatBotCard 컴포넌트를 import 합니다.
import "./ConversationPage.css";
import logo from "./logo1.png";
import CustomHeader from "./CustomHeader";

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

const DisplayResults = ({ steps, triggerNextStep }) => {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 요약 메시지를 사용하여 결과 데이터를 가져옵니다.
        const summaryMessage = steps.finalStep.message;
        const response = await axios.post(
          "http://127.0.0.1:5000/api/data/chatBot",
          {
            question: summaryMessage,
          }
        );
        setResultData(response.data);
        // triggerNextStep을 사용하여 다음 단계로 이동합니다.
        triggerNextStep();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [steps, triggerNextStep]);

  // // 결과 데이터를 렌더링합니다.
  // return resultData ? <ChatBotCard resultData={resultData} /> : <div>Loading...</div>;

  return resultData ? (
    <div className="displayResultsClass">
      {" "}
      {/* 이 부분을 수정 */}
      <ChatBotCard resultData={resultData} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const ConversationPage = ({ mem_id, conversationId, session_seq }) => {
  console.log("대화페이지", mem_id);
  const [conversationDetails, setConversationDetails] = useState([]);

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
      id: "1",
      message:
        "안녕하세요! 신발 쇼핑 도우미입니다. 원하시는 신발의 유형을 선택해주세요.",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        {
          value: "운동화/스니커즈",
          label: "운동화/스니커즈",
          trigger: "sportShoes",
        },
        { value: "구두", label: "구두", trigger: "formalShoes" },
        { value: "슬리퍼/실내화", label: "슬리퍼/실내화", trigger: "slippers" },
        {
          value: "모카신/털신",
          label: "모카신/털신",
          trigger: "keywordSelection",
        },
        { value: "워커/부츠", label: "워커/부츠", trigger: "boots" },
        { value: "보트슈즈", label: "보트슈즈", trigger: "keywordSelection" },
        {
          value: "드라이빙화",
          label: "드라이빙화",
          trigger: "keywordSelection",
        },
        { value: "샌들", label: "샌들", trigger: "keywordSelection" },
        { value: "기능화", label: "기능화", trigger: "functionalShoes" },
      ],
    },
    // 각 신발 유형에 따른 추가 옵션들
    {
      id: "sportShoes",
      message: "원하시는 종류를 선택해주세요.",
      trigger: "sportShoesType",
    },
    {
      id: "sportShoesType",
      options: [
        {
          value: "스니커즈",
          label: "스니커즈",
          trigger: "keywordSelection",
        },
        { value: "런닝화", label: "런닝화", trigger: "keywordSelection" },
        {
          value: "캔버스화",
          label: "캔버스화",
          trigger: "keywordSelection",
        },
        { value: "하이탑", label: "하이탑", trigger: "keywordSelection" },
        { value: "워킹화", label: "워킹화", trigger: "keywordSelection" },
        {
          value: "아쿠아슈즈",
          label: "아쿠아슈즈",
          trigger: "keywordSelection",
        },
        { value: "보드화", label: "보드화", trigger: "keywordSelection" },
        {
          value: "방수운동화",
          label: "방수운동화",
          trigger: "keywordSelection",
        },
        {
          value: "쿠셔닝운동화",
          label: "쿠셔닝운동화",
          trigger: "keywordSelection",
        },
      ],
    },
    {
      id: "formalShoes",
      message: "원하시는 종류를 선택해주세요.",
      trigger: "formalShoesType",
    },
    {
      id: "formalShoesType",
      options: [
        { value: "구두", label: "구두", trigger: "keywordSelection" },
        { value: "로퍼", label: "로퍼", trigger: "keywordSelection" },
        { value: "웰트화", label: "웰트화", trigger: "keywordSelection" },
        {
          value: "옥스포드화",
          label: "옥스포드화",
          trigger: "keywordSelection",
        },
      ],
    },
    {
      id: "slippers",
      message: "원하시는 종류를 선택해주세요.",
      trigger: "slippersType",
    },
    {
      id: "slippersType",
      options: [
        { value: "슬리퍼", label: "슬리퍼", trigger: "keywordSelection" },
        { value: "실내화", label: "실내화", trigger: "keywordSelection" },
      ],
    },

    {
      id: "boots",
      message: "원하시는 종류를 선택해주세요.",
      trigger: "bootsType",
    },
    {
      id: "bootsType",
      options: [
        { value: "워커", label: "워커", trigger: "keywordSelection" },
        { value: "부츠", label: "부츠", trigger: "keywordSelection" },
        { value: "레인부츠", label: "레인부츠", trigger: "keywordSelection" },
      ],
    },

    {
      id: "functionalShoes",
      message: "원하시는 종류를 선택해주세요.",
      trigger: "functionalShoesType",
    },
    {
      id: "functionalShoesType",
      options: [
        {
          value: "작업화/안전화",
          label: "작업화/안전화",
          trigger: "keywordSelection",
        },
        {
          value: "컴포트화",
          label: "컴포트화",
          trigger: "keywordSelection",
        },
        { value: "방한화", label: "방한화", trigger: "keywordSelection" },
      ],
    },
    // 공통적으로 사용되는 단계들
    {
      id: "keywordSelection",
      message: "원하시는 키워드를 입력해주세요.",
      trigger: "keywordType",
    },

    {
      id: "keywordType",
      options: [
        {
          value: "디자인",
          label: "디자인",
          trigger: "finalStep",
        },
        {
          value: "사이즈",
          label: "사이즈",
          trigger: "finalStep",
        },
        {
          value: "착화감",
          label: "착화감",
          trigger: "finalStep",
        },
        {
          value: "내구성",
          label: "내구성",
          trigger: "finalStep",
        },
        {
          value: "사용성",
          label: "사용성",
          trigger: "finalStep",
        },
        {
          value: "기능성",
          label: "기능성",
          trigger: "finalStep",
        },
        {
          value: "가격",
          label: "가격",
          trigger: "finalStep",
        },
        {
          value: "무게",
          label: "무게",
          trigger: "finalStep",
        },
        {
          value: "소재",
          label: "소재",
          trigger: "finalStep",
        },
        {
          value: "색상",
          label: "색상",
          trigger: "finalStep",
        },
        {
          value: "품질",
          label: "품질",
          trigger: "finalStep",
        },
        {
          value: "굽",
          label: "굽",
          trigger: "finalStep",
        },
      ],
    },
    // {
    //   id: "finalStep",
    //   user: true,
    //   trigger: "endMessage",
    // },
    {
      id: "finalStep",
      message: ({ steps }) => {
        // 선택 요약을 위한 배열
        let selectionsSummary = [];

        // 각 단계별로 선택된 값을 배열에 추가
        selectionsSummary.push(steps["2"].value);

        // 추가 선택 사항을 확인하고 배열에 추가
        // 운동화 유형 선택
        if (steps.sportShoesType && steps.sportShoesType.value) {
          selectionsSummary.push(steps.sportShoesType.value);
        }
        // 구두 유형 선택
        if (steps.formalShoesType && steps.formalShoesType.value) {
          selectionsSummary.push(steps.formalShoesType.value);
        }

        // 슬리퍼 유형 선택
        if (steps.slippersType && steps.slippersType.value) {
          selectionsSummary.push(steps.slippersType.value);
        }

        // 워커/부츠
        if (steps.boots && steps.boots.value) {
          selectionsSummary.push(steps.boots.value);
        }

        //
        if (steps.functionalShoes && steps.functionalShoes.value) {
          selectionsSummary.push(steps.functionalShoes.value);
        }

        // 키워드 선택
        if (steps.keywordType && steps.keywordType.value) {
          selectionsSummary.push(steps.keywordType.value);
        }

        let summaryMessage;

        // 추가 선택 사항이 없는 경우를 체크하여 메시지 생성
        if (selectionsSummary.length === 2) {
          // "신발 유형"이 없는 경우
          summaryMessage = `${selectionsSummary[0]} 중에서  ${selectionsSummary[1]} 이(가) 좋은 신발을 찾아볼게요.`;
        } else {
          // "신발 유형"이 있는 경우
          summaryMessage = `${selectionsSummary[0]} 중에서 ${selectionsSummary[2]} 이(가) 좋은 ${selectionsSummary[1]}를 찾아볼게요.`;
        }
        return summaryMessage;
      },
      // trigger: "saveInput",
      trigger: "fetchResults", // 다음 단계로 이동합니다.
    },
    {
      id: "fetchResults",
      component: <DisplayResults />,
      asMessage: true,
      waitAction: true, // 사용자의 행동을 기다립니다 (옵셔널)
      // trigger: "displayResults"
      trigger: "saveInput",
    },
    {
      id: "saveInput",
      component: <SaveUserInput session_seq={session_seq} />,
      end: true,
    },

    {
      id: "notFound",
      message:
        "죄송합니다, 해당하는 신발 유형을 찾을 수 없습니다. 다시 입력해주세요.",
      trigger: "1", // 첫 번째 단계로 돌아감
    },
  ];

  return (
    <div className="ConversationPage">
      <CustomHeader />
      <ChatBot
        steps={steps}
        botAvatar={logo}
        // headerComponent={<CustomHeader />}
      />
      {conversationDetails.map((detail, index) => (
        <div key={index}>{detail.message}</div> // 대화 내용을 UI에 표시
      ))}
    </div>
  );
};

export default ConversationPage;
