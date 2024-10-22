import React from "react";
import "./Card.css";

const Card = ({ ticket, user, viewState }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        {viewState.grouping !== "user" && (
          <div className="user-avatar">
            {user?.name.charAt(0)}
            <span
              className="availability-indicator"
              style={{
                backgroundColor: user?.available ? "#4CAF50" : "#FF5722",
              }}
            />
          </div>
        )}
      </div>

      <div className="card-title">
        {viewState.grouping !== "status" && (
          <span className="status-indicator">○</span>
        )}
        {ticket.title}
      </div>

      <div className="card-tags">
        {viewState.grouping !== "priority" && (
          <div className="priority-tag">
            <span className="tag-dot" />
            <span>{ticket.priority}</span>
          </div>
        )}
        <div className="feature-tag">
          <span className="tag-circle" />
          <span>Feature Request</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
