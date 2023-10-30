import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0;
  margin-bottom: 20px;

  label {
    display: block;
    margin-right: 20px;
    width: 150px;
  }

  input {
    width: 250px;
    padding: 5px 10px;
  }

  button {
    margin-left: 20px;
    width: 100px;
  }

  .error {
    font-size: 10px;
    color: red;
    margin-top: 5px;
  }
`;