import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import App from './components/App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  uri: 'https://react-graphql-express.herokuapp.com/',
  opts: {
    mode: 'no-cors',
  },
});

const MainApp = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<MainApp />, document.getElementById('root'));
registerServiceWorker();
