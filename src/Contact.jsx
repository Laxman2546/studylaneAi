import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./Sidebar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Form submitted Successfully");
    setFormData({ name: "", email: "", message: "" });
  };
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
  return (
    <>
      <Sidebar type="nav" onExpandChange={setIsSidebarExpanded} />
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <ToastContainer />
        <h1 className="text-3xl font-bold text-center mb-4">📩 Contact Us</h1>
        <p className="text-gray-600 text-center mb-6">
          Have questions or feedback? Feel free to reach out! Whether it's about
          Wastey AI, waste management, or collaboration opportunities, we're
          here to help. 🌿♻️
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-slate-600 text-white py-3 rounded-lg hover:bg-slate-500 cursor-pointer transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
