import React from "react";
import "./App.css";
import Column from "./Column";
import uuid from "uuid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    try {
      this.state = JSON.parse(localStorage.getItem("kanban"));
    } catch (e) {
      this.state = {
        columns: [
          {
            columnId: 0,
            name: "To-Do",
            taskList: []
          },
          {
            columnId: 1,
            name: "In Progress",
            taskList: []
          },
          {
            columnId: 2,
            name: "Done",
            taskList: []
          }
        ]
      };
    }
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
  }

  handleAddTask = column => {
    this.setState(prevState => {
      const { columns } = this.state;

      column.taskList.push({
        id: uuid.v4(),
        task: "New task ...",
        date: new Date().toISOString().slice(0, 10)
      });
      return { columns };
    });
  };

  handleDeleteTask = (id, index) => {
    let columns = this.state.columns.slice();
    columns[index].taskList = columns[index].taskList.filter(
      task => task.id !== id
    );

    this.setState({
      columns
    });
  };

  //get id of item being dragged and list where it's coming from
  onDragStart(e, fromList) {
    console.log("e", e);
    console.log("fromList", fromList);

    this.setState({
      dragTaskId: e.currentTarget.id,
      dragFromList: fromList
    });
  }

  onDrop = (e, col) => {
    //get task cards array, get rid of moved card, and put a new card
    // in the list where it was dropped
    if (col === this.state.dragFromList) {
      return;
    }
    let columns = this.state.columns.slice();

    this.state.columns[col].taskList.push(
      columns[this.state.dragFromList].taskList.filter(
        task => this.state.dragTaskId === task.id
      )[0]
    );

    columns[this.state.dragFromList].taskList = columns[
      this.state.dragFromList
    ].taskList.filter(task => this.state.dragTaskId !== task.id);

    this.setState({
      columns
    });
  };

  handleEditTask = (id, newTask, index) => {
    let columns = this.state.columns.slice();
    columns[index].taskList = columns[index].taskList.map(task =>
      task.id === id ? Object.assign(task, { task: newTask }) : task
    );
    this.setState({ columns });
  };

  setState(o) {
    super.setState(o);
    localStorage.setItem("kanban", JSON.stringify(this.state));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>One more nano Kanban</h1>
        </header>

        <div className="main-container">
          {this.state.columns.map((column, index) => (
            <Column
              name={column.name}
              column={column}
              key={column.columnId}
              index={index}
              addTask={() => this.handleAddTask(column)}
              deleteTask={this.handleDeleteTask}
              editTask={this.handleEditTask}
              tasks={column.taskList}
              onDragStart={e => this.onDragStart(e, index)}
              dropHandler={this.onDrop}
            />
          ))}
        </div>
      </div>
    );
  }
}
