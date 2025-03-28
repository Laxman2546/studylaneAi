import React, { useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import batteries from "./assets/batteries.png";
import household from "./assets/household.png";
import nearest from "./assets/recycle.png";
import recycle from "./assets/recycle2.png";
import user from "./assets/user.png";
import ai from "./assets/logo.png";
import "./Chat.css";
import { Context } from "./context/context";
import Loading from "./components/loading";
import Sidebar from "./Sidebar";

const Chat = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    chatHistory,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);
  const [isExpanded, setIsExpanded] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 100,
      },
    },
  };
  const keyHandler = (e) => {
    if (e.key === "Enter") {
      onSent();
      setInput("");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden w-screen">
      <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      <div
        className="flex-1 flex flex-col  relative ml-5"
        onClick={() => setIsExpanded(false)}
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex-1 p-8 md:p-12 w-screen align-middle">
                <motion.div
                  className="headings flex flex-col  gap-1 mb-12 pl-10"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="titleheading  select-none ">
                    Hi there! Welcome
                  </p>
                  <p className=" tiltesub text-xl mt-1 text-[#333333] font-bold">
                    If you need help with course recommendations or career
                    advice, feel free to ask!
                  </p>
                </motion.div>

                <div className="cards">
                  <motion.div
                    className="card"
                    variants={cardVariants}
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setInput(
                        "How do I balance studying with extracurricular activities?"
                      );
                      onSent(
                        "How do I balance studying with extracurricular activities?"
                      );
                    }}
                  >
                    <p className="cardsPara">
                      How do I balance studying with extracurricular activities?
                    </p>
                    <img
                      src={recycle}
                      alt="recycleimg"
                      width={30}
                      height={25}
                    />
                  </motion.div>

                  <motion.div
                    className="card"
                    variants={cardVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setInput(
                        "How can I build a strong resume for my first job after graduation?"
                      );
                      onSent(
                        "How can I build a strong resume for my first job after graduation?"
                      );
                    }}
                  >
                    <p className="cardsPara">
                      How can I build a strong resume for my first job after
                      graduation?
                    </p>
                    <img
                      src={batteries}
                      alt="recycleimg"
                      width={35}
                      height={25}
                    />
                  </motion.div>

                  <motion.div
                    className="card"
                    variants={cardVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setInput("How do I choose the right career path for me?");
                      onSent("How do I choose the right career path for me?");
                    }}
                  >
                    <p className="cardsPara">
                      How do I choose the right career path for me?
                    </p>
                    <img
                      src={household}
                      alt="recycleimg"
                      width={35}
                      height={25}
                    />
                  </motion.div>

                  <motion.div
                    className="card"
                    variants={cardVariants}
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setInput(
                        "How can I improve my chances of getting into a top university?"
                      );
                      onSent(
                        "How can I improve my chances of getting into a top university?"
                      );
                    }}
                  >
                    <p className="cardsPara">
                      How can I improve my chances of getting into a top
                      university?
                    </p>
                    <img
                      src={nearest}
                      alt="recycleimg"
                      width={35}
                      height={25}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-8 md:p-12"
            >
              <div className="chat-container flex-1 overflow-y-auto mt-11">
                <div className=" max-w-4xl mx-auto">
                  {chatHistory.map((message, index) => (
                    <div
                      key={`${message.text}-${index}`}
                      className={`message flex items-start gap-3 mb-6 ${
                        message.type === "user" ? "user-msg" : "bot-msg"
                      }`}
                    >
                      <img
                        src={message.type === "user" ? user : ai}
                        alt={message.type === "user" ? "User" : "Bot"}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <p
                          className=" botText text-lg leading-7"
                          dangerouslySetInnerHTML={{ __html: message.text }}
                        />
                      </div>
                    </div>
                  ))}
                  {loading && <Loading />}
                  <div ref={chatEndRef} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          className="bottomchat sticky bottom-10  left-0 border-t  border-gray-200 p-4 "
          style={{
            zIndex: isExpanded ? -1 : 40,
          }}
        >
          <div className="inputBox   max-w-3xl lg:mx-52 md:mx-20 sm:mx-9">
            <div className="relative w-full  flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => keyHandler(e)}
                placeholder="Ask Jarvis"
                className=" w-full relative p-4 pl-5 rounded-full border bg-slate-300 border-none   focus:outline-none focus:ring-2 focus:ring-[#5e06a8] "
              />
              <AnimatePresence>
                {input && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className=" right-4 absolute"
                    onClick={(e) => {
                      onSent();
                      setInput("");
                    }}
                  >
                    <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVR4nO3ULUvEQRCA8Z8oeiBoMAkWtVgsVo1XLWe/aDVajdbDDyAYrX4FMV04o+WCyeQLWETOE2EWtnj8xV003AMTlp2ZB2ZfmPID+uhiTiXGEUMcY7mWIMULelgrLejgOlu/4RzbpQSJHVzgPdv7Eu9jpoQgsY5TPGU5dzhCq4QgsRRN77PcB5xgRQNS0RYWJuTNx3UeZDWvOMNmE0GKx3gblzGiQ7SxkdXs4QofUTOKdfs3gtUGgt0/HVH1Q/7umj5nObcxsta/fGid2l/FuPZnN4zDXCzVOHGDA8yWbjzFJD4B3pVyKx3i0DkAAAAASUVORK5CYII="
                      alt="Send"
                      className="w-6 h-6 hover:cursor-pointer"
                    />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
