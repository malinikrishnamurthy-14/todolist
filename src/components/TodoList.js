import React, { Component } from "react";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      count: 0,
    };
    this.input = React.createRef();
  }

  addTask(value) {
    if (value !== "") {
      this.setState({
        ...this.state,
        todo: [
          ...this.state.todo,
          {
            name: value,
            completed: false,
          },
        ],
        count: this.state.count + 1,
      });
      this.input.current.value = "";
    }
  }

  setCompletedStatus(key) {
    const updateTask = this.state.todo[key];
    updateTask.completed
      ? (updateTask.completed = false)
      : (updateTask.completed = true);

    const newtodos = [
      ...this.state.todo.slice(0, key),
      updateTask,
      ...this.state.todo.slice(key + 1),
    ];
    this.setState({ ...this.state, todo: newtodos });
  }

  renderTodos() {
    return (
      <ul>
        {this.state.todo.map((item, key) => {
          console.log(item);
          return (
            <li
              key={key}
              onClick={() => this.setCompletedStatus(key, item.name)}
              className={item.completed ? "is-done" : ""}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
    );
  }
  render() {
    const completedTasks = this.state.todo.reduce(
      (sum = 0, item) => (item.completed ? sum + 1 : sum),
      0
    );

    return (
      <>
        <pre>
          {`1. Enter a task description in the input field and click on add to add a task.`}     
          {`  \n2. Click on each task name in the list to mark as finished; Click again to mark as unfinished`}
        </pre>
        <div>
          <h2>Todo List</h2>
          <input type="text" ref={this.input}></input>
          <button onClick={() => this.addTask(this.input.current.value)}>
            Add
          </button>
          <p>
            {`${this.state.count - completedTasks} remaining out of ${
              this.state.count
            } tasks`}
          </p>
          {this.state.todo.length > 0 ? this.renderTodos() : ""}
        </div>
        <style>{`
                    .is-done {
                        text-decoration: line-through;
                    }
                `}</style>
      </>
    );
  }
}
