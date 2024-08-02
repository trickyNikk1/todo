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

  addTask = ({ todo: title, min, sec }) => {
    const timeAdd = new Date()
    this.setState(({ todoData, filter }) => {
      const newTaskArr = [
        {
          title,
          num: this.maxId++,
          done: false,
          status: '',
          time: timeAdd,
          timer: +min * 60 + +sec,
          isActive: false,
          timerId: null,
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

  changeTitle = (targetNum, newTitle) => {
    this.setState(({ todoData, filter }) => {
      return {
        todoData: todoData.map((item) => {
          const { num } = item
          let newItem = { ...item }
          if (num === targetNum) {
            newItem.title = newTitle
          }
          return newItem
        }),
        filter,
      }
    })
  }

  onTaskSubmit = (title, num) => {
    this.changeTitle(num, title)
    this.changeStatus(num, true)
  }
  startTimer = (targetNum) => {
    const currentItem = this.state.todoData.find((item) => item.num === targetNum)
    if (currentItem.isActive) {
      return
    }
    this.setState((prevState) => {
      const newTodoData = [...prevState.todoData]
      newTodoData[index].isActive = true
      return {
        todoData: newTodoData,
      }
    })
    const index = this.state.todoData.findIndex((item) => item.num === targetNum)
    const timerId = setInterval(() => {
      this.setState((prevState) => {
        const newTodoData = [...prevState.todoData]
        if (newTodoData[index] === undefined) {
          clearInterval(timerId)
          return
        }
        newTodoData[index].timer -= 1
        if (newTodoData[index].timer <= 0) {
          clearInterval(timerId)
        }
        return {
          todoData: newTodoData,
        }
      })
    }, 1000)
    this.setState((prevState) => ({
      todoData: prevState.todoData.map((item) => {
        if (item.num === targetNum) {
          return { ...item, timerId }
        }
        return item
      }),
    }))
  }
  stopTimer = (targetNum) => {
    const index = this.state.todoData.findIndex((item) => item.num === targetNum)
    const currentItem = this.state.todoData.find((item) => item.num === targetNum && item.timerId)
    if (!currentItem) {
      return
    }

    clearInterval(currentItem.timerId)

    this.setState((prevState) => {
      const newTodoData = [...prevState.todoData]
      newTodoData[index].timerId = null
      newTodoData[index].isActive = false
      return {
        todoData: newTodoData,
      }
    })
  }
  render() {
    const { todoData, filter } = this.state
    const filteredTodoData = this.filterTodoData(todoData, filter)
    const completedCount = todoData.filter((el) => el.status === 'completed').length
    const todoCount = todoData.length - completedCount
    return (
      <section className="todoapp">
        <NewTaskForm onSubmit={(newTodo) => this.addTask(newTodo)} />
        <section className="main">
          <TaskList
            onPlay={this.startTimer}
            onStop={this.stopTimer}
            todos={filteredTodoData}
            onScratched={this.changeStatus}
            onDeleted={this.deleteTask}
            onEdit={this.changeStatus}
            onSubmit={(title, num) => this.onTaskSubmit(title, num)}
          />
          <Footer todoCount={todoCount} onClear={this.clearCompleted} onChangeFilter={this.changeFilter} />
        </section>
      </section>
    )
  }
}
