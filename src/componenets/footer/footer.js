import React, { Component } from "react";
import "./footer.css";
import TasksFilter from "../tasks-filter";
export default class Footer extends Component {
  render() {
    const { todo, onClear, onChangeFilter } = this.props;

    return (
      <footer className="footer">
        <span className="todo-count">{todo} items left</span>
        <TasksFilter onChangeFilter={onChangeFilter} />
        <button className="clear-completed" onClick={onClear}>
          Clear completed
        </button>
      </footer>
    );
  }
}
