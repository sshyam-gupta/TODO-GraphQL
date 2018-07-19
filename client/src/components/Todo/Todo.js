import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  TOGGLE_TODO_STATUS,
  DELETE_TASK,
  EDIT_TASK,
} from '../../graphQL/mutation';
import { GET_TODOS } from '../../graphQL/query';
import Warning from '../Warning';

class Todo extends Component {
  state = {
    isEditing: false,
    title: null,
  };

  deleteTask = (deleteTask, todo) => {
    Warning({
      text: `${todo.title} will be deleted.`,
      callback: deleteTask,
    });
  };

  editTask = (editTask, todo) => {
    editTask();
    this.setState({
      isEditing: false,
    });
  };

  updateCache = (cache, { data: { destroy } }) => {
    try {
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: destroy },
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    const { todo } = this.props;

    return (
      <div className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
        {!this.state.isEditing ? (
          <div className="flex items-center mb2">
            <Mutation mutation={TOGGLE_TODO_STATUS} variables={{ id: todo.id }}>
              {(toggleStatus, { loading }) => {
                if (loading) {
                  return <div>Working on it...</div>;
                }
                return (
                  <React.Fragment>
                    <input
                      id={todo.id}
                      className="mr2"
                      onChange={toggleStatus}
                      type="checkbox"
                      checked={todo.completed}
                    />
                    <label htmlFor={todo.id} className="lh-copy">
                      {todo.title}
                    </label>
                  </React.Fragment>
                );
              }}
            </Mutation>
            <div style={{ marginLeft: 'auto' }}>
              <span className={todo.completed ? 'green tr' : 'gold tr'}>
                {todo.completed ? 'Completed' : 'Pending'}
              </span>
              <span
                className="bg-blue white pa2 ml2 pointer"
                onClick={() => {
                  this.setState({
                    isEditing: true,
                  });
                }}
              >
                Edit
              </span>
              <Mutation
                mutation={DELETE_TASK}
                variables={{ id: todo.id }}
                update={this.updateCache}
              >
                {(deleteStatus, { loading }) => {
                  return (
                    <span
                      className="bg-red white pa2 ml2 pointer"
                      onClick={() => {
                        this.deleteTask(deleteStatus, todo);
                      }}
                    >
                      {loading ? 'Deleting ...' : 'Delete'}
                    </span>
                  );
                }}
              </Mutation>
            </div>
          </div>
        ) : (
          <Mutation
            mutation={EDIT_TASK}
            variables={{ id: todo.id, title: this.state.title || todo.title }}
          >
            {(editTask, { loading }) => {
              if (loading) {
                return <div>Baking your changes ...</div>;
              }
              return (
                <div className="flex items-center mb2">
                  <input
                    id="todo"
                    className="input-reset ba b--black-20 pa2 mb2 db w-100"
                    type="text"
                    aria-describedby="Enter Todo"
                    placeholder="Enter Todo"
                    value={this.state.title || todo.title}
                    ref={node => {
                      this.todo = node;
                    }}
                    onChange={e => {
                      this.setState({
                        title: e.target.value,
                      });
                    }}
                    onBlur={() => {
                      this.editTask(editTask, todo);
                    }}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        this.editTask(editTask, todo);
                      }
                    }}
                  />
                </div>
              );
            }}
          </Mutation>
        )}
      </div>
    );
  }
}

export default Todo;
