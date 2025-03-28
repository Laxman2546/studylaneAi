import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Context } from "./context/context";
import edit from "./assets/edit.png";

const Sidebar = ({
  type,
  onExpandChange,
  recentchats,
  onNewchat,
  isNewchat,
  isExpanded,
  setIsExpanded,
}) => {
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  useEffect(() => {
    onExpandChange?.(isExpanded);
  }, [isExpanded, onExpandChange]);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };
  const handleNewchat = () => {
    newChat();
  };

  const sidebarVariants = {
    expanded: {
      width: "240px",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    collapsed: {
      width: "70px",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const contentVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    hidden: {
      opacity: 0,
      x: -10,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 h-full bg-white z-20 overflow-hidden"
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      variants={sidebarVariants}
    >
      <div className="flex flex-col h-full p-4">
        <motion.div
          className="flex items-center justify-between mb-8"
          variants={contentVariants}
        >
          <Link to="/" className="flex items-center gap-2 text-[#6F27E2]">
            <motion.div className="font-bold text-xl whitespace-nowrap" layout>
              {isExpanded ? "Studylane Jarvis" : "J"}
            </motion.div>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-4 border-none"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              style={{ cursor: "pointer" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <path d="M11.5 6C8.48 6 6 8.48 6 11.5v25C6 39.52 8.48 42 11.5 42h25c3.02 0 5.5-2.48 5.5-5.5v-25C42 8.48 39.52 6 36.5 6h-25zm0 3h25C37.9 9 39 10.1 39 11.5v25c0 1.4-1.1 2.5-2.5 2.5h-25C10.1 39 9 37.9 9 36.5v-25C9 10.1 10.1 9 11.5 9zm1 2A1.5 1.5 0 0011 12.5v23A1.5 1.5 0 0012.5 37h6A1.5 1.5 0 0020 35.5v-23A1.5 1.5 0 0018.5 11h-6zm1.5 3h3v20h-3V14z" />
            </motion.svg>
          </motion.button>
        </motion.div>
        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col gap-4 overflow-hidden"
            >
              {type === "nav" ? (
                <nav className="flex flex-col gap-3">
                  {["Home", "About", "Contact"].map((item, index) => (
                    <motion.div
                      key={item}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        className="block hover:bg-gray-100 p-2 rounded-lg transition-colors"
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              ) : (
                <div className="flex flex-col gap-4">
                  <motion.button
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNewchat}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors hover:cursor-pointer"
                  >
                    <img src={edit} alt="New chat" className="w-5 h-5" />
                    <span>New chat</span>
                  </motion.button>

                  <motion.div variants={itemVariants} className="mt-4">
                    <h3 className="font-medium mb-2">Recent</h3>
                    <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
                      {prevPrompts.map((prompt, index) => (
                        <motion.button
                          key={index}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, x: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => loadPrompt(prompt)}
                          className="text-left p-2 hover:bg-gray-100 rounded-lg transition-colors truncate cursor-pointer"
                        >
                          {prompt.slice(0, 20)}...
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Sidebar;
