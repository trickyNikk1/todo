import React, { Component } from 'react'

import './todo-app.css'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

export default class TodoApp extends Component {
  maxId = 100

  state = {
    todoData: [],
    filter: 'all',
  }

  addTask = (description) => {
    const timeAdd = new Date()
    this.setState(({ todoData, filter }) => {
      const newTaskArr = [
        {
          description,
          num: this.maxId++,
          done: false,
          status: '',
          time: timeAdd,
        },
      ]
      return {
        todoData: newTaskArr.concat(todoData),
        filter,
      }
    })
  }

  changeStatus = (targetNum, isEdited = true) => {
    this.setState(({ todoData, filter }) => {
      return {
        todoData: todoData.map((todoItem) => {
          const todoItemCopy = { ...todoItem }
          const { num, done, status } = todoItemCopy
          if (num === targetNum && status !== 'editing' && isEdited && done) {
            todoItemCopy.status = ''
            todoItemCopy.done = false
          }
          if (num === targetNum && status !== 'editing' && isEdited && !done) {
            todoItemCopy.status = 'completed'
            todoItemCopy.done = true
          }
          if (num === targetNum && status === 'editing' && isEdited && !done) {
            todoItemCopy.status = ''
          }
          if (num === targetNum && status === 'editing' && isEdited && done) {
            todoItemCopy.status = 'completed'
          }
          if (num === targetNum && !isEdited) {
            todoItemCopy.status = 'editing'
          }
          return todoItemCopy
        }),
        filter,
      }
    })
  }

  deleteTask = (targetNum) => {
    this.setState(({ todoData, filter }) => {
      return {
        todoData: todoData.filter(({ num }) => num !== targetNum),
        filter,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData, filter }) => {
      return {
        todoData: todoData.filter(({ status }) => status !== 'completed'),
        filter,
      }
    })
  }

  changeFilter = (filter) => {
    this.setState(({ todoData }) => {
      return {
        todoData,
        filter,
      }
    })
  }
  filterTodoData = (data, filter) => {
    if (filter === 'all') {
      return data
    }
    if (filter === 'completed') {
      return data.filter(({ status }) => status === 'completed')
    }
    if (filter === 'active') {
      return data.filter(({ status }) => status === '')
    }
  }
  changeDescription = (targetNum, newDescription) => {
    this.setState(({ todoData, filter }) => {
      return {
        todoData: todoData.map((item) => {
          const { num } = item
          let newItem = { ...item }
          if (num === targetNum) {
            newItem.description = newDescription
          }
          return newItem
        }),
        filter,
      }
    })
  }
  onTaskSubmit = (description, num) => {
    this.changeDescription(num, description)
    this.changeStatus(num, true)
  }
  render() {
    const { todoData, filter } = this.state
    const filteredTodoData = this.filterTodoData(todoData, filter)
    const completedCount = todoData.filter((el) => el.status === 'completed').length
    const todoCount = todoData.length - completedCount
    return (
      <section className="todoapp">
        <NewTaskForm onSubmit={(description) => this.addTask(description)} />
        <section className="main">
          <TaskList
            todos={filteredTodoData}
            onScratched={this.changeStatus}
            onDeleted={this.deleteTask}
            onEdit={this.changeStatus}
            onSubmit={(description, num) => this.onTaskSubmit(description, num)}
          />
          <Footer todoCount={todoCount} onClear={this.clearCompleted} onChangeFilter={this.changeFilter} />
        </section>
      </section>
    )
  }
}
