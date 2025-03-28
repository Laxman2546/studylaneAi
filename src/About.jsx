import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./home.css";
import Sidebar from "./Sidebar.jsx";

const About = () => {
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
                ABOUT WASTEYAI
              </h1>
            </motion.div>


            <motion.div
              className="prose prose-lg max-w-3xl w-full"
              variants={textVariants}
            >
              <div className="flex flex-col gap-3 font-serif text-sm md:text-base lg:text-lg text-start">
                <motion.p className="leading-relaxed" variants={textVariants}>
                  Wastey AI is an intelligent chatbot designed to enhance waste
                  management practices. It provides expert guidance on waste
                  disposal, recycling, and sustainability, offering clear and
                  informative responses to user queries. By enabling interactive
                  conversations, Wastey AI helps users make informed decisions
                  about reducing waste and adopting eco-friendly habits.
                </motion.p>

                <motion.p className="leading-relaxed" variants={textVariants}>
                  Traiuned using the Gemini API by Lakshman, Wastey AI ensures
                  accurate and insightful responses tailored to environmental
                  concerns. This project aims to support individuals,
                  communities, and organizations in developing effective waste
                  management strategies. Continuous improvements and user
                  feedback will help refine its capabilities and maximize its
                  impact on sustainability.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default About;
