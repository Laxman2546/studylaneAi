import { createContext, useState } from "react";
import run from "../../config/gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setChatHistory([]);
  };

  const onSent = async (prompt) => {
    setShowResult(true);
    setResultData("");
    setLoading(true);

    let userMessage = prompt !== undefined ? prompt : input.trim();
    if (!userMessage) return;

    if (prompt === undefined) {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
    }

    setChatHistory((prev) => [...prev, { type: "user", text: userMessage }]);

    try {
      let recentdataResponse = await run(userMessage, chatHistory);
      let responseArray = recentdataResponse.split("**");
      let newResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        newResponse +=
          i % 2 !== 1 ? responseArray[i] : `<b>${responseArray[i]}</b>`;
      }

      let formattedResponse = newResponse.split("*").join("<br>");
      let responseWords = formattedResponse.split(" ");

      setChatHistory((prev) => [...prev, { type: "bot", text: "" }]);

      responseWords.forEach((word, i) => {
        setTimeout(() => {
          setChatHistory((prev) => {
            let updatedHistory = [...prev];
            let lastIndex = updatedHistory.length - 1;
            updatedHistory[lastIndex] = {
              ...updatedHistory[lastIndex],
              text: updatedHistory[lastIndex].text + " " + word,
            };
            return updatedHistory;
          });
        }, 75 * i);
      });
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          text: "⚠️ Oops! Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <Context.Provider
      value={{
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        chatHistory,
        onSent,
        newChat,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
