import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styleSheets/TodoItem.css";
import Checkbox from "./common/Checkbox";

class TodoItem extends Component {

  paraStyle = () => {
    return {
      textDecoration: this.props.todo.taskStatus ? "line-through" : "none",
      display: 'inline-block',
      width: '250px',
      padding: '10px'
    };
  };

  render() {
    const { _id, taskTitle } = this.props.todo;
    return (
      <div className='containar'>
        <Checkbox checked={this.props.markComplete} id={_id} />
        <div style={this.paraStyle()}>
          <p>
            {taskTitle}
          </p>
        </div>
        <div onClick={() => this.props.delTodo(_id)} style={{ cursor: 'pointer' }}>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoItem;
