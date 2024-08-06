import React, { useState } from 'react'
import { nanoid } from 'nanoid'

import './todo-app.css'
import NewTaskForm from '../new-task-form'
import TaskList from '../task-list'
import Footer from '../footer'

export default function TodoApp() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('all')

  const addTask = ({ todo: title, min, sec }) => {
    const timeAdd = new Date()
    setTodoData((todoData) => {
      const newTaskArr = [
        {
          title,
          num: nanoid(10),
          done: false,
          status: '',
          time: timeAdd,
          timer: +min * 60 + +sec,
          isActive: false,
          timerId: null,
        },
      ]
      return newTaskArr.concat(todoData)
    })
  }

  const toggleTaskStatus = (taskNum, isEditing = true) => {
    setTodoData((todoData) => {
      return todoData.map((task) => {
        const updatedTask = { ...task }
        const { num, done, status } = updatedTask

        if (num === taskNum && status !== 'editing' && isEditing && done) {
          updatedTask.done = false
          updatedTask.status = ''
        }

        if (num === taskNum && status !== 'editing' && isEditing && !done) {
          updatedTask.done = true
          updatedTask.status = 'completed'
          stopTimer(taskNum)
        }

        if (num === taskNum && status === 'editing' && isEditing && !done) {
          updatedTask.status = ''
        }

        if (num === taskNum && status === 'editing' && isEditing && done) {
          updatedTask.status = 'completed'
          stopTimer(taskNum)
        }

        if (num === taskNum && !isEditing) {
          updatedTask.status = 'editing'
        }

        return updatedTask
      })
    })
  }

  const deleteTask = (targetNum) => {
    stopTimer(targetNum)
    setTodoData((todoData) => {
      return todoData.filter(({ num }) => num !== targetNum)
    })
  }

  const clearCompleted = () => {
    setTodoData((todoData) => {
      return todoData.filter(({ status }) => status !== 'completed')
    })
  }

  const changeFilter = (filter) => {
    setFilter(filter)
  }

  const filterTodoData = (data, filter) => {
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

  const changeTitle = (targetNum, newTitle) => {
    setTodoData((todoData) => {
      return todoData.map((item) => {
        const { num } = item
        let newItem = { ...item }
        if (num === targetNum) {
          newItem.title = newTitle
        }
        return newItem
      })
    })
  }

  const onTaskSubmit = (title, num) => {
    changeTitle(num, title)
    toggleTaskStatus(num, true)
  }
  const startTimer = (targetNum) => {
    const currentItem = todoData.find(({ num }) => num === targetNum)
    if (currentItem.status === 'completed') return
    if (currentItem.isActive) return
    if (currentItem.timer <= 0) return
    currentItem.isActive = true
    currentItem.timerId = setInterval(() => {
      if (currentItem.timer <= 0) {
        stopTimer(targetNum)
      }
      setTodoData((todoData) => {
        return todoData.map((item) => {
          const { num, timer, isActive } = item
          if (num === targetNum && isActive) {
            item.timer = timer - 1
          }
          return item
        })
      })
    }, 1000)
  }

  const stopTimer = (targetNum) => {
    const currentItem = todoData.find(({ num }) => num === targetNum)
    if (!currentItem.isActive) return
    currentItem.isActive = false
    clearInterval(currentItem.timerId)
  }

  const filteredTodoData = filterTodoData(todoData, filter)
  const completedCount = todoData.filter((el) => el.status === 'completed').length
  const todoCount = todoData.length - completedCount
  return (
    <section className="todoapp">
      <NewTaskForm onSubmit={(newTodo) => addTask(newTodo)} />
      <section className="main">
        <TaskList
          onPlay={startTimer}
          onStop={stopTimer}
          todos={filteredTodoData}
          onScratched={toggleTaskStatus}
          onDeleted={deleteTask}
          onEdit={toggleTaskStatus}
          onSubmit={(title, num) => onTaskSubmit(title, num)}
        />
        <Footer todoCount={todoCount} onClear={clearCompleted} onChangeFilter={changeFilter} />
      </section>
    </section>
  )
}
