import React, { Component } from "react";
import Task from "../task/task";
import "./task-list.css";

export default class TaskList extends Component {
  render() {
    const { todos, onScratched } = this.props;
    const elements = todos.map(({ status, num, ...itemProps }) => {
      const props = {
        ...itemProps,
        num: num,
      };
      return (
        <li className={status} key={num}>
          <Task onScratched={() => onScratched(num)} {...props} />
        </li>
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
