import React, { Component } from "react";
import "./new-task-form.css";

export default class NewTaskForm extends Component {
  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
        />
      </header>
    );
  }
}
