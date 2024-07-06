import React from "react";
import Task from "../task/task";
import "./task-list.css";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    return (
      <li className={item.status} key={item.id}>
        <Task {...item} />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
};
export default TaskList;
