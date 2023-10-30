import styled from 'styled-components';

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 0 10px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  h1 {
    margin-right: 30px;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;

  input {
    margin: 0 5px;
  }
  
  span, input {
    display: block;
  }
`;