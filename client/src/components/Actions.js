import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import { TOGGLE_ALL_TODO_STATUS, CLEAR_COMPLETED } from '../graphQL/mutation';
import { GET_TODOS } from '../graphQL/query';
import Warning from './Warning';

class Actions extends Component {
	clearCompleted = (clearCompleted) => {
		Warning({
			text: `Completed todo(s) will be cleared!`,
			callback: clearCompleted
		});
	}

	render () {
		return (
			<div className="flex justify-end-ns mb2">
			<Mutation mutation={TOGGLE_ALL_TODO_STATUS} variables={{ checked: true }}>
				{toggleStatus => (
					<div
						className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib mr1"
						onClick={toggleStatus}
					>
						Mark All Completed
					</div>
				)}
			</Mutation>
			<Mutation
				mutation={CLEAR_COMPLETED}
				update={(cache, { data: { clearCompleted } }) => {
					try {
						cache.writeQuery({
							query: GET_TODOS,
							data: { todos: clearCompleted }
						});
					} catch(ex) {
						console.log(ex);
					}
				}}
			>
				{clearCompleted => (
					<div
						className="b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
						onClick={() => {
							this.clearCompleted(clearCompleted)
						}}
					>
						Clear Completed
					</div>
				)}
			</Mutation>
			</div>
		)
	}
}

export default Actions;
