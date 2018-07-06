import gql from 'graphql-tag';
import { TODO } from '../fragment';

const TOGGLE_TODO_STATUS = gql`
  mutation ToggleTodoStatus($id: ID!) {
    toggle(id: $id) {
      ...Todo
    }
  }
  ${TODO}
`;

const TOGGLE_ALL_TODO_STATUS = gql`
  mutation ToggleAllTodoStatus($checked: Boolean!) {
    toggleAll(checked: $checked) {
      ...Todo
    }
  }
  ${TODO}
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    add(title: $title) {
      ...Todo
    }
  }
  ${TODO}
`;

const CLEAR_COMPLETED = gql`
  mutation ClearCompleted {
    clearCompleted {
      ...Todo
    }
  }
  ${TODO}
`;

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    destroy(id: $id) {
      ...Todo
    }
  }
  ${TODO}
`;

export {
  TOGGLE_TODO_STATUS,
  ADD_TODO,
  TOGGLE_ALL_TODO_STATUS,
  CLEAR_COMPLETED,
  DELETE_TASK,
};
