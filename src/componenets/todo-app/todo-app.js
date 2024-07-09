import React, { Component } from "react";
import "./todo-app.css";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

export default class TodoApp extends Component {
  maxId = 100;

  state = {
    todoData: [],
  };

  addTask = (description, time = "less than 5 seconds") => {
    this.setState((prevState) => {
      return {
        todoData: prevState.todoData.concat([
          {
            description,
            num: this.maxId++,
            created: "created " + time + " ago",
            status: "",
          },
        ]),
      };
    });
  };

  changeStatus = (targetNum) => {
    this.setState((prevState) => {
      return {
        todoData: prevState.todoData.map((todoItem) => {
          const todoItemCopy = { ...todoItem };
          const { num, status } = todoItemCopy;
          if (num === targetNum) {
            todoItemCopy.status = status ? "" : "completed";
          }
          return todoItemCopy;
        }),
      };
    });
  };

  deleteTask = (targetNum) => {
    this.setState((prevState) => {
      return {
        todoData: prevState.todoData.filter(({ num }) => {
          return num !== targetNum;
        }),
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const completedCount = todoData.filter(
      (el) => el.status === "completed"
    ).length;
    const todoCount = todoData.length - completedCount;

    return (
      <section className="todoapp">
        <NewTaskForm onSubmit={(description) => this.addTask(description)} />
        <section className="main">
          <TaskList
            todos={this.state.todoData}
            onScratched={this.changeStatus}
            onDeleted={this.deleteTask}
          />
          <Footer todo={todoCount} />
        </section>
      </section>
    );
  }
}
