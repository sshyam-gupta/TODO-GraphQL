import React, { Component } from 'react'

import { Mutation } from 'react-apollo';
import { ADD_TODO } from '../../graphQL/mutation';
import { GET_TODOS } from '../../graphQL/query';

class AddTodo extends Component {
	todo;
	componentDidMount () {
		this.todo.focus();
	}

	render () {
    return (
			<Mutation
        mutation={ADD_TODO}
        update={(cache, { data: { add } }) => {
          this.props.history.push('/')
					try {
						cache.writeQuery({
            query: GET_TODOS,
            data: { todos: add }
          });
					} catch(ex) {
						console.log(ex);
					}
        }}
      >
				{addTodo => (
					<form
						className="black-80"
						onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { title: this.todo.value } });
            }}
						>
						<div className="measure">
							<label htmlFor="name" className="f6 b db mb2">Todo</label>
							<input
								id="todo"
								className="input-reset ba b--black-20 pa2 mb2 db w-100"
								type="text"
								aria-describedby="Enter Todo"
								placeholder="Enter Todo"
                ref={node => {
                  this.todo = node;
                }}
							/>
						</div>

						<button
							className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
							type="submit"
						>
							Add Todo
						</button>
					</form>

			)}
			</Mutation>
		)
	}
}

export default AddTodo;
