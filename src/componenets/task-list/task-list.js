import React, { Component } from "react";
import Task from "../task/task";
import "./task-list.css";

export default class TaskList extends Component {
  render() {
    const { todos, onScratched, onDeleted, onEdit, onSubmit } = this.props;
    const elements = todos.map((itemProps) => {
      const { num, status } = itemProps;
      return (
        <li className={status} key={num}>
          <Task
            onDeleted={() => onDeleted(num)}
            onScratched={() => onScratched(num)}
            onEdit={() => onEdit(num, false)}
            onSubmit={(description, num) => onSubmit(description, num)}
            {...itemProps}
          />
        </li>
      );
    });
    return <ul className="todo-list">{elements}</ul>;
  }
}
