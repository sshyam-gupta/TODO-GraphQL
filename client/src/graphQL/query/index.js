import gql from 'graphql-tag';
import { TODO } from '../fragment';

const GET_TODOS = gql`
  {
    todos {
      ...Todo
    }
  }
  ${TODO}
`;
export { GET_TODOS };
