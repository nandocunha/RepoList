import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form.attrs()`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  div {
    display: flex;
    flex-direction: column;
    flex: 1;

    span {
      display: flex;
      flex-direction: row;

      input {
        flex: 1;
        border: 1px solid #eee;
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
      }
    }
    p {
      display: none;
      margin-top: 5px;
      margin-left: 5px;
      font-size: 12px;
      color: #b22222;
    }

    ${props =>
      props.fail !== '' &&
      css`
        span > input {
          border: 1px solid #b22222;
        }
        p {
          display: flex;
        }
      `}
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    div {
      display: flex;
      align-items: center;
    }

    a {
      color: #7159c1;
      margin-right: 10px;
      text-decoration: none;
    }

    button {
      border: none;
      background-color: rgba(255, 255, 255, 0);
    }
  }
`;
