import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./Homepage";
import StatisticsPage from "./components/StatisticsPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white p-4 shadow-lg">
        <ul className="flex justify-start space-x-8 items-center">
          <li className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faHome} className="text-blue-600" />
            <Link
              to="/"
              className="text-gray-800 font-semibold text-lg hover:text-blue-600 transition"
            >
              Home
            </Link>
          </li>
          <li className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faChartBar} className="text-blue-600" />
            <Link
              to="/statistics"
              className="text-gray-800 font-semibold text-lg hover:text-blue-600 transition"
            >
              Statistics
            </Link>

            
          </li>


          <li className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faGithub} className="text-black" />
            <Link
              to="https://github.com/tanishq-khandelwal/roxiler-assignment/"
              className="text-gray-800 font-semibold text-lg hover:text-black-200 transition"
            >
              Repo Link
            </Link>

            
          </li>
        </ul>
      </nav>

      {/* Routes for Pages */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/statistics" element={<StatisticsPage />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 p-4 text-white text-center mt-auto">
        <div className="space-y-2">
          <p className="text-lg font-semibold">Connect with me:</p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/tanishq-khandelwal-19688321b/"
              className="hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
            </a>
            <a
              href="https://github.com/tanishq-khandelwal"
              className="hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} className="text-xl" />
            </a>
            <a
              href="mailto:tanishqkhandelwal2019@gmail.com"
              className="hover:text-blue-400"
            >
              <FontAwesomeIcon icon={faGoogle} className="text-xl" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
