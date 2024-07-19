import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends Component {
  state = {
    timeAgo: formatDistanceToNow(this.props.time, { includeSeconds: true }),
    title: this.props.title,
  }

  componentDidMount() {
    this.updateTimeAgo()
  }

  updateTimeAgo = () => {
    const intervalId = setInterval(() => {
      this.setState(({ title }) => {
        return {
          timeAgo: formatDistanceToNow(this.props.time, {
            includeSeconds: true,
          }),
          title,
        }
      })
    }, 5000)

    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  handleChange = (event) => {
    this.setState(({ timeAgo }) => {
      return {
        timeAgo,
        title: event.target.value,
      }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.title, this.props.num)
  }

  render() {
    const { title, status, num, onScratched, onDeleted, onEdit } = this.props
    const timeAgoText = 'created ' + this.state.timeAgo + ' ago'
    const id = 'checkbox-' + num
    if (status === 'completed') {
      return (
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={onScratched} defaultChecked />
          <label htmlFor={id}>
            <span className="title">{title}</span>
            <span className="description">
              <button className="icon icon-play"></button>
              <button className="icon icon-pause"></button>
              12:25
            </span>
            <span className="description">{timeAgoText}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      )
    }
    if (status === '') {
      return (
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={onScratched} />
          <label htmlFor={id}>
            <span className="title">{title}</span>
            <span className="description">
              <button className="icon icon-play"></button>
              <button className="icon icon-pause"></button>
              12:25
            </span>
            <span className="description">{timeAgoText}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      )
    }
    if (status === 'editing') {
      return (
        <div>
          <form onSubmit={this.handleSubmit} onBlur={this.handleSubmit}>
            <input className="edit" onChange={this.handleChange} value={this.state.title} autoFocus></input>
          </form>
        </div>
      )
    }
  }
}
