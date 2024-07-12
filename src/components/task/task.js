import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends Component {
  state = {
    timeAgo: formatDistanceToNow(this.props.time, { includeSeconds: true }),
    description: this.props.description,
  }

  componentDidMount() {
    this.updateTimeAgo()
  }

  updateTimeAgo = () => {
    const intervalId = setInterval(() => {
      this.setState(({ description }) => {
        return {
          timeAgo: formatDistanceToNow(this.props.time, {
            includeSeconds: true,
          }),
          description,
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
        description: event.target.value,
      }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.description, this.props.num)
  }

  render() {
    const { description, status, num, onScratched, onDeleted, onEdit } = this.props
    const timeAgoText = 'created ' + this.state.timeAgo + ' ago'
    const id = 'checkbox-' + num
    if (status === 'completed') {
      return (
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onClick={onScratched} defaultChecked />
          <label htmlFor={id}>
            <span className="description">{description}</span>
            <span className="created">{timeAgoText}</span>
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
            <span className="description">{description}</span>
            <span className="created">{timeAgoText}</span>
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
            <input className="edit" onChange={this.handleChange} value={this.state.description} autoFocus></input>
          </form>
        </div>
      )
    }
  }
}
