function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

class App extends React.Component {
  state = {
    tasks: [],
    taskIds: []
  };

  constructor(...args) {
    super(...args);


    _defineProperty(this, "handleSubmit", (task) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "task": task,
          "isComplete": false
        })
      };
      fetch("http://localhost:60397/api/todo", requestOptions)
          .then(res =>  res.json())
          .then(
            (result) => {
              var taskItems = result.map(function(item){return item.task;});
              var taskItemIds = result.map(function(item){return item.id;})
              this.setState({
                tasks: taskItems,
                taskIds: taskItemIds
              });
              
              ReactDOM.render(
                React.createElement(Alerts, null), document.querySelector("#alert")
              );
              //
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              alert(error);
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    });

    _defineProperty(this, "handleDelete", (index) => {
      var taskid = this.state.taskIds[index];
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
      fetch("http://localhost:60397/api/todo?id=" + taskid, requestOptions)
          .then(res =>  res.json())
          .then(
            (result) => {
              var taskItems = result.map(function(item){return item.task;});
              var taskItemIds = result.map(function(item){return item.id;})
              this.setState({
                tasks: taskItems,
                taskIds: taskItemIds
              });

              ReactDOM.render(
                React.createElement(History, null), document.querySelector("#history")
              );
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              alert(error);
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
    });
  }

  componentDidMount() {
      fetch("http://localhost:60397/api/todo")
        .then(res =>  res.json())
        .then(
          (result) => {
            var taskItems = result.map(function(item){return item.task;});
            var taskItemIds = result.map(function(item){return item.id;})
            this.setState({
              tasks: taskItems,
              taskIds: taskItemIds
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            alert(error);
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "card frame" },
        React.createElement(Header, { numTodos: this.state.tasks.length }),
        React.createElement(TodoList, {
          tasks: this.state.tasks,
          onDelete: this.handleDelete,
        }),
        React.createElement(SubmitForm, { onFormSubmit: this.handleSubmit }),
        React.createElement("div", {
          id: "alert",
          className: "alert alert-success",
          role:"alert"
        })
      )
    );
  }
}

class SubmitForm extends React.Component {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "state", { term: "" });
    _defineProperty(
      this,
      "handleSubmit",

      (e) => {
        e.preventDefault();
        if (this.state.term === "") return;
        this.props.onFormSubmit(this.state.term);
        this.setState({ term: "" });
      }
    );
  }

  render() {
    return React.createElement(
      "form",
      { onSubmit: this.handleSubmit },
      React.createElement("input", {
        type: "text",
        className: "input",
        placeholder: "Add Item",
        value: this.state.term,
        onChange: (e) => this.setState({ term: e.target.value }),
      }),

      React.createElement("button", { className: "button" }, "Submit"),
    );
  }
}

const Header = (props) => {
  return React.createElement(
    "div",
    { className: "card-header" },
    React.createElement(
      "h1",
      { className: "card-header-title header" },
      "To Do List - ",
      props.numTodos,
      " Items"
    )
  );
};

const HistoryList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return React.createElement(Todo, {
      content: todo,
      key: index,
      id: index,
      onDelete: props.onDelete,
    });
  });
  return React.createElement(History, { className: "list-container" }, todos);
};

const TodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return React.createElement(Todo, {
      content: todo,
      key: index,
      id: index,
      onDelete: props.onDelete,
    });
  });
  return React.createElement("div", { className: "list-container" }, todos);
};

const Todo = (props) => {
  return React.createElement(
    "div",
    { className: "list-item" },
    props.content,
    React.createElement("button", {
      class: "delete is-pulled-right",
      onClick: () => {
        props.onDelete(props.id);
      },
    })
  );
};


ReactDOM.render(
  React.createElement(App, null),
  document.querySelector("#root")
);

class Alerts extends React.Component {
  render() {
  return React.createElement("div", {
    className: "alert alert-success",
    role: "alert"
  }, "Saved Successfully!");
}
}

class History extends React.Component {
  state = {
    tasks: [],
    taskIds: []
  };

  constructor(...args) {
    super(...args);

  }

  componentDidMount() {
      fetch("http://localhost:60397/api/todohistory")
        .then(res =>  res.json())
        .then(
          (result) => {
            var taskItems = result.map(function(item){return item.task;});
            var taskItemIds = result.map(function(item){return item.id;})
            this.setState({
              tasks: taskItems,
              taskIds: taskItemIds
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            alert(error);
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "card frame" },
        React.createElement(HistoryHeader, { numTodos: this.state.tasks.length }),
        React.createElement(HistoryTodoList, {
          tasks: this.state.tasks,
        }),
      )
    );
  }
}

const HistoryHeader = (props) => {
  return React.createElement(
    "div",
    { className: "card-header" },
    React.createElement(
      "h1",
      { className: "card-header-title header" },
      "View History - ",
      props.numTodos,
      " Items"
    )
  );
};

const HistoryTodoList = (props) => {
  const todos = props.tasks.map((todo, index) => {
    return React.createElement(HistoryTodo, {
      content: todo,
      key: index,
      id: index,
      onDelete: props.onDelete,
    });
  });
  return React.createElement("div", { className: "list-container" }, todos);
};

const HistoryTodo = (props) => {
  return React.createElement(
    "div",
    { className: "list-item" },
    props.content,
  );
};

ReactDOM.render(
  React.createElement(History, null),
  document.querySelector("#history")
);