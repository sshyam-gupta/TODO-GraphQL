import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { TodoList, AddTodo } from './Todo';
import Header from './Header';
import '../App.css';
import Actions from './Actions';

class App extends Component {
  render() {
    return (
			<div className="container">
				<Header />
				<Switch>
					<Route
						exact
						path="/"
						component={() => (
							<React.Fragment>
								<Actions />
								<TodoList />
							</React.Fragment>
						)}
					/>
					<Route
						path="/add"
						component={AddTodo}
					/>
				</Switch>
			</div>
    );
  }
}

export default App;
