import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import numeral from 'numeral';
import DeleteIcon from '@mui/icons-material/Delete';

const Table = ({ items }: any) => {

  useEffect(() => {
    items.getExpenseItemsRequest();
  }, []);

  return (
    <>
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
                  <td>{numeral(item.amountPLN * items.exchangeRate.exchangeRate).format('00.00')}</td>
                  <td>
                    <button onClick={() => items.removeExpenseItemRequest(item.id)}>
                      <DeleteIcon />
                    </button>
                  </td>
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