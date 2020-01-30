import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import Loading from 'react-loading';
import Todos from "./components/Todos";
import Header from "./components/layouts/Header";
import AddTodo from "./components/AddTodo";
import About from './components/pages/About';
import "./App.css";

class App extends Component {
  state = {
    todos: [],
    loading: false
  };

  fetchData() {
    this.setState({ loading: true });
    axios.get('/api/todo')
      .then(res => this.setState({ todos: res.data, loading: false }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchData();
  }

  markComplete = id => {
    const todos = [...this.state.todos];
    const index = todos.indexOf(todos.filter(t => t._id === id)[0]);
    todos[index].taskStatus = !todos[index].taskStatus;
    this.setState({ todos });
    axios.put('/api/todo/' + id, {
      taskStatus: todos[index].taskStatus
    })
      .catch(err => console.log(err));
  };

  handleDeleteTodo = id => {
    const todos = [...this.state.todos];
    const modifiedTodos = todos.filter(t => t._id !== id);
    axios.delete(`/api/todo/${id}`)
      .catch(err => console.log(err))
    this.setState({ todos: modifiedTodos });
  };

  handleAddTodo = title => {
    const newTodo = {
      taskTitle: title,
      taskStatus: false
    };
    axios.post('/api/todo/add', newTodo)
      .then(() => this.fetchData())
      .catch(err => console.log(err));
  };

  render() {
    const { todos, loading } = this.state;
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route
              exact path="/" render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.handleAddTodo} {...props} />
                  <div className="todos ">
                    {loading ?
                      (
                        <Loading
                          delay={100}
                          type="spin"
                          color="#222"
                          className="loading"
                        />
                      ) : (
                        <Todos
                          todos={todos}
                          markComplete={this.markComplete}
                          delTodo={this.handleDeleteTodo}
                        />
                      )}
                  </div>
                </React.Fragment>
              )}
            />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;