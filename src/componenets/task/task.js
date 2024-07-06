import React from "react";
import "./task.css";

const Task = ({ description, created }) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{description}</span>
        <span className="created">{created}</span>
      </label>
      <button className="icon icon-edit" />
      <button className="icon icon-destroy" />
    </div>
  );
};

export default Task;
