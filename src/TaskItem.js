import React from "react";

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      task: this.props.task,
      date: this.props.date,
      taskEditMode: false,
      class: ""
    };
    this.switchToEditMode = this.switchToEditMode.bind(this);
    this.finishEditMode = this.finishEditMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeState = this.changeState.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  onChange(task) {
    this.setState({
      task: task
    });
  }

  handleKeyDown(e) {
    // on Enter
    if (e.keyCode === 13) {
      this.changeState(e);
    }
    // on Escape
    else if (e.keyCode === 27) {
      this.changeState(e);
    }
  }

  changeState(e) {
    if (this.state.taskEditMode) {
      this.finishEditMode(e);
    }
    this.setState({ taskEditMode: !this.state.taskEditMode });
  }

  switchToEditMode() {
    this.setState({
      taskEditMode: true
    });
  }
  finishEditMode(e) {
    this.setState({
      taskEditMode: false,
      date: new Date().toISOString().slice(0, 16)
    });
    const value = e.target.value;
    if (this.props.editTask) {
      this.props.editTask(this.props.id, value);
    }
  }

  render() {
    if (this.state.taskEditMode) {
      return (
        <div className="task-container" draggable="false">
          <input
            type="text"
            onChange={e => this.onChange(e.target.value)}
            defaultValue={this.state.task}
            onBlur={this.changeState}
            onKeyDown={e => this.handleKeyDown(e)}
          />
          <button
            type="button"
            className="delete-btn"
            onClick={this.props.deleteTask}
          >
            x
          </button>
        </div>
      );
    } else {
      return (
        <div
          className="task-container"
          draggable="true"
          id={this.props.id}
          onDragStart={this.props.onDragStart}
          onDragOver={e => {
            e.preventDefault();
          }}
        >
          <span onDoubleClick={this.switchToEditMode}>
            {this.state.task}{" "}
            <em className="taskDate">Created: {this.props.date}</em>
          </span>
          <button
            type="button"
            className="delete-btn"
            onClick={this.props.deleteTask}
          >
            x
          </button>
        </div>
      );
    }
  }
}
