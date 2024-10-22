import React, { useState, useEffect, useRef } from "react";
import "./Header.css";

const Header = ({ viewState, setViewState }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="header" ref={menuRef}>
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <div className="display-button-content">
          <span className="icon">≡</span>
          <span>Display</span>
          <span className="icon">{isOpen ? "▲" : "▼"}</span>
        </div>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <div className="menu-row">
            <span className="menu-label">Grouping</span>
            <select
              value={viewState.grouping}
              onChange={(e) =>
                setViewState({
                  ...viewState,
                  grouping: e.target.value,
                })
              }
              className="menu-select"
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="menu-row">
            <span className="menu-label">Ordering</span>
            <select
              value={viewState.ordering}
              onChange={(e) =>
                setViewState({
                  ...viewState,
                  ordering: e.target.value,
                })
              }
              className="menu-select"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
