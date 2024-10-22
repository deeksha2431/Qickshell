import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [viewState, setViewState] = useState(() => {
    const saved = localStorage.getItem("viewState");
    return saved
      ? JSON.parse(saved)
      : {
          grouping: "status",
          ordering: "priority",
        };
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("viewState", JSON.stringify(viewState));
  }, [viewState]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="app">
      <Header viewState={viewState} setViewState={setViewState} />
      <Board tickets={tickets} users={users} viewState={viewState} />
    </div>
  );
};

export default App;
