import React from "react";
import { useAppContext } from "../libs/contextLib";
import NewAnswer from "./NewAnswer";
import "./Home.css";

export default function Home() {
  const { isAuthenticated } = useAppContext();

  function renderLander() {
    return (
      <div className="lander">
        <h1>QA App</h1>
        <p className="text-muted">A BERT-powered Question Answering App</p>
      </div>
    );
  }

  function renderQuestionForm() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Ask a question</h2>
        <NewAnswer />
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderQuestionForm() : renderLander()}
    </div>
  );
}