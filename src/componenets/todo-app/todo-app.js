import React, { Component } from "react";
import "./todo-app.css";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";

export default class TodoApp extends Component {
  state = {
    todoData: [
      {
        num: "1k",
        status: "",
        description: "One task",
        created: "created 17 seconds ago",
      },
      {
        num: "2k",
        status: "editing",
        description: "Editing task",
        created: "created 5 minutes ago",
      },
      {
        num: "3k",
        status: "",
        description: "Another one task",
        created: "created 5 minutes ago",
      },
    ],
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
        todoData: prevState.todoData.filter((todoItem) => {
          return todoItem.num !== targetNum;
        }),
      };
    });
  };
  render() {
    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList
            todos={this.state.todoData}
            onScratched={this.changeStatus}
            onDeleted={this.deleteTask}
          />
          <Footer />
        </section>
      </section>
    );
  }
}
