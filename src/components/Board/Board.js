import React from "react";
import "./Board.css";
import Card from "../Card/Card";

const PRIORITY_NAMES = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No priority",
};

const PRIORITY_ICONS = {
  4: "🔴",
  3: "🟡",
  2: "🟢",
  1: "⚪",
  0: "⚫",
};

const STATUS_ICONS = {
  Todo: "○",
  "In Progress": "◔",
  Done: "●",
  Backlog: "◌",
  Canceled: "⊘",
};

const Board = ({ tickets, users, viewState }) => {
  const groupTickets = () => {
    let grouped = {};

    switch (viewState.grouping) {
      case "status":
        tickets.forEach((ticket) => {
          if (!grouped[ticket.status]) {
            grouped[ticket.status] = [];
          }
          grouped[ticket.status].push(ticket);
        });
        break;

      case "user":
        tickets.forEach((ticket) => {
          const user = users.find((u) => u.id === ticket.userId);
          const userName = user ? user.name : "Unassigned";
          if (!grouped[userName]) {
            grouped[userName] = [];
          }
          grouped[userName].push(ticket);
        });
        break;

      case "priority":
        tickets.forEach((ticket) => {
          const priorityName = PRIORITY_NAMES[ticket.priority];
          if (!grouped[priorityName]) {
            grouped[priorityName] = [];
          }
          grouped[priorityName].push(ticket);
        });
        break;

      default:
        grouped = { All: tickets };
    }

    // Sort tickets within each group
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (viewState.ordering === "priority") {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const groupedTickets = groupTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([groupName, tickets]) => (
        <div key={groupName} className="board-column">
          <div className="column-header">
            <div className="column-header-left">
              <span className="column-icon">
                {viewState.grouping === "status"
                  ? STATUS_ICONS[groupName]
                  : viewState.grouping === "priority"
                  ? PRIORITY_ICONS[tickets[0]?.priority]
                  : "👤"}
              </span>
              <span className="column-title">{groupName}</span>
              <span className="ticket-count">{tickets.length}</span>
            </div>
            <div className="column-header-right">
              <button className="icon-button">+</button>
              <button className="icon-button">⋯</button>
            </div>
          </div>
          <div className="column-content">
            {tickets.map((ticket) => (
              <Card
                key={ticket.id}
                ticket={ticket}
                user={users.find((u) => u.id === ticket.userId)}
                viewState={viewState}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
