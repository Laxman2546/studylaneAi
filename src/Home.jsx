import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Trybutton from "./components/Trybutton";
import "./home.css";
import Navbtn from "./components/Navbtn";
import Sidebar from "./Sidebar.jsx";

const Home = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const contentVariants = {
    expanded: {
      marginLeft: "240px",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    collapsed: {
      marginLeft: "80px",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white w-screen">
      <Sidebar type="nav" onExpandChange={setIsSidebarExpanded} />

      <motion.main
        className="flex-1 overflow-y-auto"
        variants={contentVariants}
        initial="collapsed"
        animate={isSidebarExpanded ? "expanded" : "collapsed"}
      >
        <div className="container mx-auto px-4 py-8 md:px-8 lg:px-12">
          <motion.div
            initial="initial"
            animate="animate"
            variants={textVariants}
          ></motion.div>

          <motion.div
            className="max-w-4xl mx-auto mt-8 flex flex-col gap-6 items-center text-center md:gap-8"
            initial="initial"
            animate="animate"
            variants={textVariants}
          >
            <motion.div className="heading" variants={textVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium font-serif">
                Introducing WasteyAI
              </h1>
            </motion.div>

            <motion.div className="button" variants={textVariants}>
              <Trybutton />
            </motion.div>

            <motion.div
              className="prose prose-lg max-w-3xl w-full"
              variants={textVariants}
            >
              <div className="flex flex-col gap-3 font-serif text-sm md:text-base lg:text-lg text-start">
                <motion.p className="leading-relaxed" variants={textVariants}>
                  I've developed an AI chatbot to assist with waste management
                  efforts. This chatbot is designed to interact
                  conversationally, providing guidance and information on
                  various aspects of waste disposal, recycling, and related
                  topics. The conversational format allows users to ask
                  follow-up questions, clarify their doubts, and receive
                  tailored advice.
                </motion.p>

                <motion.p className="leading-relaxed" variants={textVariants}>
                  This chatbot is built using the Gemini API, enabling it to
                  understand and respond to a wide range of queries related to
                  waste management best practices. We believe this tool can be a
                  valuable resource for individuals, communities, and
                  organizations looking to improve their waste management
                  strategies. We are eager to gather feedback on its performance
                  and identify areas for improvement.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Home;
