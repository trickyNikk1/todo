import React, { Component } from "react";
import Task from "../task/task";
import "./task-list.css";

export default class TaskList extends Component {
  render() {
    const { todos, onScratched, onDeleted } = this.props;
    const elements = todos.map(({ status, num, ...itemProps }) => {
      const props = {
        ...itemProps,
        num: num,
      };
      return (
        <li className={status} key={num}>
          <Task
            onDeleted={() => onDeleted(num)}
            onScratched={() => onScratched(num)}
            {...props}
          />
        </li>
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
