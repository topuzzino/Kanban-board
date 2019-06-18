import React from "react";
import TaskItem from "./TaskItem";

export default function(props) {
  return (
    <div
      className="column-container"
      onDragOver={e => e.preventDefault()}
      onDrop={e => props.dropHandler(e, props.index)}
    >
      <div className="column-header">
        <h1>{props.name}</h1>
        <button
          className="btn-addTask"
          type="button"
          name="addTask"
          onClick={props.addTask}
        >
          +
        </button>
      </div>

      <div className="column-body">
        {props.tasks.map(({ task, id, date }) => (
          <TaskItem
            onDragStart={props.onDragStart}
            editTask={(id, task) => props.editTask(id, task, props.index)}
            deleteTask={() => props.deleteTask(id, props.index)}
            task={task}
            key={id}
            id={id}
            date={date}
          />
        ))}
      </div>
    </div>
  );
}
