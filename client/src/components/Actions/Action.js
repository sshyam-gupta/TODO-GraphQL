import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import {
  TOGGLE_ALL_TODO_STATUS,
  CLEAR_COMPLETED,
} from '../../graphQL/mutation';
import { GET_TODOS } from '../../graphQL/query';
import Warning from '../Warning';

class Actions extends Component {
  clearCompleted = clearCompleted => {
    Warning({
      text: `Completed todo(s) will be cleared!`,
      callback: clearCompleted,
    });
  };

  updateCache = (cache, { data: { clearCompleted } }) => {
    try {
      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: clearCompleted },
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <div className="flex justify-end-ns mb2">
        <Mutation
          mutation={TOGGLE_ALL_TODO_STATUS}
          variables={{ checked: true }}
        >
          {(toggleStatus, { loading }) => (
            <div
              className={`b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib mr1`}
              onClick={toggleStatus}
            >
              {loading ? 'Completing please wait...' : 'Mark All Completed'}
            </div>
          )}
        </Mutation>
        <Mutation mutation={CLEAR_COMPLETED} update={this.updateCache}>
          {(clearCompleted, { loading }) => (
            <div
              className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
              onClick={() => {
                this.clearCompleted(clearCompleted);
              }}
            >
              {loading ? 'Clearing please wait...' : 'Clear Completed'}
            </div>
          )}
        </Mutation>
      </div>
    );
  }
}

export default Actions;
