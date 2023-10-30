import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import numeral from 'numeral';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Styled from './styled';
import { ExpenseItemResponseType } from '../../domains/expenseItem/expenseItem.types';
import GlobalStore from '../../stores/GlobalStore';

interface Props {
  globalStore: GlobalStore
}

const Table = ({ globalStore }: Props) => {

  useEffect(() => {
    globalStore.expenseItemsStore.getExpenseItemsRequest();
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
            globalStore.expenseItemsStore.itemsArray &&
            globalStore.expenseItemsStore.itemsArray.map((item: ExpenseItemResponseType) => {
              return (
                <tr key={`${item.id}-${item.title}`} >
                  <td>{item.title}</td>
                  <td>{item.amountPLN}</td>
                  <td>
                    {numeral(Number(item.amountPLN) * Number(globalStore.exchangeRateStore.exchangeRate)).format('00.00')}
                  </td>
                  <td>
                    <Styled.DeleteButton
                      data-text="Remove this item."
                      onClick={() => globalStore.expenseItemsStore.removeExpenseItemRequest(item.id)}>
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
        Sum: {globalStore.expenseItemsStore.sum} PLN ({numeral(globalStore.expenseItemsStore.sum * Number(globalStore.exchangeRateStore.exchangeRate)).format('00.00')} EUR)
      </div>
    </div>
  );
};

export default observer(Table);