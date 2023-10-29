import React from 'react';
import { observer } from 'mobx-react-lite';

const Table = ({ items }: any) => {
  console.log(items, '--items 88 test--');

  const clickHandler = () => {
    items.getExpenseItemsRequest();
  }

  return (
    <>
      <button onClick={clickHandler}>OK</button>
      <h2>{items.exchangeRate.exchangeRate}</h2>
      <table>
        <tbody>
          {
            items.itemsArray &&
            items.itemsArray.map((item: any) => {
              return (
                <tr key={`${item.id}-${item.title}`} >
                  <td>{item.title}</td>
                  <td>{item.amountPLN}</td>
                  <td>{item.amountPLN * items.exchangeRate.exchangeRate}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default observer(Table);