import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { TOGGLE_TODO_STATUS, DELETE_TASK } from '../../graphQL/mutation';
import { GET_TODOS } from '../../graphQL/query';
import Warning from '../Warning';

class Todo extends Component {
  deleteTask = (deleteTask, todo) => {
    Warning({
      text: `${todo.title} will be deleted.`,
      callback: deleteTask,
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
        <div className="flex items-center mb2">
          <Mutation mutation={TOGGLE_TODO_STATUS} variables={{ id: todo.id }}>
            {toggleStatus => (
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
            )}
          </Mutation>
          <div style={{ marginLeft: 'auto' }}>
            <span className={todo.completed ? 'green tr' : 'gold tr'}>
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
            <Mutation
              mutation={DELETE_TASK}
              variables={{ id: todo.id }}
              update={this.updateCache}
            >
              {deleteStatus => (
                <span
                  className="bg-red white pa2 ml2 pointer"
                  onClick={() => {
                    this.deleteTask(deleteStatus, todo);
                  }}
                >
                  Delete
                </span>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
