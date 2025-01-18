import React from "react";
import TaskContextProvider from "./context/TaskContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import TaskDetailPage from "./pages/TaskDetailPage";
import Footer from "./components/Footer";

function App() {
  return (
    <TaskContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
        </Routes>
        <Footer />
      </Router>
    </TaskContextProvider>
  );
}

export default App;
