import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import numeral from 'numeral';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Styled from './styled';
import ExpenseItemsStore from '../../stores/expenseItems/ExpenseItemsStore';
import { ExpenseItemResponseType } from '../../domains/expenseItem/expenseItem.types';

interface Props {
  expenseItemsStore: ExpenseItemsStore
}

const Table = ({ expenseItemsStore }: Props) => {

  useEffect(() => {
    expenseItemsStore.getExpenseItemsRequest();
  }, []);

  return (
    <div>
      <Styled.Table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Amount in PLN</td>
            <td>Amount in EUR</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {
            expenseItemsStore.itemsArray &&
            expenseItemsStore.itemsArray.map((item: ExpenseItemResponseType) => {
              return (
                <tr key={`${item.id}-${item.title}`} >
                  <td>{item.title}</td>
                  <td>{item.amountPLN}</td>
                  <td>
                    {numeral(Number(item.amountPLN) * Number(expenseItemsStore.exchangeRateStore.exchangeRate)).format('00.00')}
                  </td>
                  <td>
                    <Styled.DeleteButton
                      data-text="Remove this item."
                      onClick={() => expenseItemsStore.removeExpenseItemRequest(item.id)}>
                      <DeleteIcon />
                    </Styled.DeleteButton>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Styled.Table>
      <div>
        SUM {expenseItemsStore.sum} PLN ({numeral(expenseItemsStore.sum * Number(expenseItemsStore.exchangeRateStore.exchangeRate)).format('00.00')} EUR)
      </div>
    </div>
  );
};

export default observer(Table);