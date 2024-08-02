import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

export default class Task extends Component {
  state = {
    timeAgo: formatDistanceToNow(this.props.time, { includeSeconds: true }),
    title: this.props.title,
    timer: this.props.timer,
    isActive: false,
  }

  static defaultProps = {
    onPlay: () => {},
    onStop: () => {},
    onDeleted: () => {},
    onEdit: () => {},
    onSubmit: () => {},
    onScratched: () => {},
    title: '',
    status: '',
    timer: 0,
    num: 0,
  }

  static propTypes = {
    onPlay: PropTypes.func,
    onStop: PropTypes.func,
    onDeleted: PropTypes.func,
    onEdit: PropTypes.func,
    onSubmit: PropTypes.func,
    onScratched: PropTypes.func,
    title: PropTypes.string,
    status: PropTypes.string,
    timer: PropTypes.number,
    num: PropTypes.number,
  }

  componentDidMount() {
    this.updateTimeAgo()
  }

  updateTimeAgo = () => {
    const intervalId = setInterval(() => {
      this.setState((prevState) => {
        return {
          ...prevState,
          timeAgo: formatDistanceToNow(this.props.time, {
            includeSeconds: true,
          }),
        }
      })
    }, 5000)

    this.setState({ intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
    clearInterval(this.state.timerId)
  }
  handleChange = (event) => {
    this.setState((prevState) => {
      return {
        prevState,
        title: event.target.value,
      }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.title, this.props.num)
  }
  formatTimer = (min, sec) => {
    const minStr = Math.trunc(min / 10) ? `${min}` : `0${min}`
    const secStr = Math.trunc(sec / 10) ? `${sec}` : `0${sec}`
    return minStr + ':' + secStr
  }
  render() {
    const { title, status, timer, num, onScratched, onDeleted, onEdit, onPlay, onStop } = this.props
    const timeAgoText = 'created ' + this.state.timeAgo + ' ago'
    const id = 'checkbox-' + num
    const min = Math.trunc(timer / 60)
    const sec = timer - min * 60
    if (status !== 'editing') {
      return (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            id={id}
            onClick={onScratched}
            defaultChecked={status === 'completed'}
          />
          <label htmlFor={id}>
            <span className="title">{title}</span>
            <span className="description">
              <button className="icon icon-play" onClick={onPlay}></button>
              <button className="icon icon-pause" onClick={onStop}></button>
              {this.formatTimer(min, sec)}
            </span>
            <span className="description">{timeAgoText}</span>
          </label>
          <button className="icon icon-edit" onClick={onEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      )
    } else {
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
