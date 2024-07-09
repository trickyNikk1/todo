import React, { Component } from "react";
import "./task.css";

export default class Task extends Component {
  render() {
    const { description, created, num, onScratched, onDeleted } = this.props;
    let id = "checkbox-" + num;
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={id}
          onClick={onScratched}
        />
        <label htmlFor={id}>
          <span className="description">{description}</span>
          <span className="created">{created}</span>
        </label>
        <button className="icon icon-edit" />
        <button className="icon icon-destroy" onClick={onDeleted} />
      </div>
    );
  }
}
