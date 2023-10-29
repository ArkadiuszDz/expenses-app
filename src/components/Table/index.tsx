import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import numeral from 'numeral';
import DeleteIcon from '@mui/icons-material/Delete';
import * as Styled from './styled';

const Table = ({ items }: any) => {

  useEffect(() => {
    items.getExpenseItemsRequest();
  }, []);

  return (
    <Styled.Table>
      <thead>
        <tr>
          <td>Title</td>
          <td>Amount in PLN</td>
          <td>Amount in EUR</td>
          <td>Action</td>
        </tr>
      </thead>
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
                  <Styled.DeleteButton onClick={() => items.removeExpenseItemRequest(item.id)}>
                    <DeleteIcon />
                  </Styled.DeleteButton>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </Styled.Table>
  );
};

export default observer(Table);