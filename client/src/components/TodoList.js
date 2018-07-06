import React, { Component } from 'react'
import { Query } from 'react-apollo';

import { GET_TODOS } from '../graphQL/query';
import Todo from './Todo';

class TodoList extends Component {
	render () {
		return (
			<Query query={GET_TODOS}>
				{({ loading, error, data }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

						return <React.Fragment>
							{

								data.todos && data.todos.length ?
									data.todos.map(todo => <Todo key={todo.id} todo={todo} />)
									: <div>No Todo(s) available</div>
							}
						</React.Fragment>
				}}
		</Query>
		)
	}
}

export default TodoList;
