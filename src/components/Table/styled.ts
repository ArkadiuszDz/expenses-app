import styled from 'styled-components';

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;

  &::after {
    content: attr(data-text);
    position: absolute;
    display: none;
  }


  &:hover {
    &::after {
      display: block;
      left: 40px;
      top: 5px;
      width: 75px;
      border: 1px solid black;
      border-radius: 10px;
      font-size: 10px;
      background-color: #fff498;
    }
  }

  svg {
    fill: red;
  }
`;

export const Table = styled.table`
  margin: 10px auto;
  border-spacing: 0;

  thead {
    background-color: #cecece;
    font-weight: bold;
    td {
      padding: 10px;
      border-top: 1px solid black;
    }
  }
  td {
    padding: 5px 10px;
    border: 1px solid black;
    border-top: none;
    border-right: none;
    &:last-of-type {
      border-right: 1px solid black;
    }

    button {
      display: block;
      margin: 0 auto;
    }
  }
  tbody {
    tr {
      &:nth-of-type(2n) {
        background-color: #f1f1f1;
      }
    }
  }
`;