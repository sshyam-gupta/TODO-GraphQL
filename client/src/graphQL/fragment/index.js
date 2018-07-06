import gql from 'graphql-tag';

const TODO = gql`
  fragment Todo on todo {
    id
    title
    completed
  }
`;

export { TODO };
