import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import * as Styled from './styled';
import GlobalStore from '../../stores/GlobalStore';

interface Props {
  globalStore: GlobalStore;
}

const ExpenseForm = ({ globalStore }: Props) => {

  const [amount, setAmount] = useState(globalStore.expenseItemStore.amountPLN);
  const [amountError, setAmountError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (globalStore.expenseItemStore.title.length < 5) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (globalStore.expenseItemStore.amountPLN === '') {
      setAmountError(true);
    } else {
      setAmountError(false);
    }

    if (
      globalStore.expenseItemStore.amountPLN !== '' &&
      globalStore.expenseItemStore.title.length >= 5
      ) {
        globalStore.expenseItemStore.saveExpenseItemRequest({ 
        amountPLN: globalStore.expenseItemStore.amountPLN,
        title: globalStore.expenseItemStore.title
      });
      globalStore.expenseItemStore.setTitle('');
      setAmount('');
    }
  }

  useEffect(() => {
    globalStore.expenseItemStore.setAmountPLN(amount)
  }, [amount]);

  return (
    <form>
      <Styled.InputWrapper>
        <label>Title of transaction</label>
        <div>
          <input
            name="title"
            value={globalStore.expenseItemStore.title}
            onChange={e => globalStore.expenseItemStore.setTitle(e.target.value)}
          />
          {titleError && <div className="error">The title should have at least 5 characters.</div>}
        </div>
      </Styled.InputWrapper>
      <Styled.InputWrapper>
        <label>Amount (in PLN)</label>
        <div>
          <input
            name="amountPLN"
            inputMode="numeric"
            value={globalStore.expenseItemStore.amountPLN}
            onChange={e => {
              setAmount(e.target.value.match(/^\d+\.?\d{0,2}/)?.at(0) || '');
            }}
          />
           {amountError && <div className="error">You should provide the amount value.</div>}
        </div>
        <button
          onClick={submitHandler}
        >
          Add
        </button>
      </Styled.InputWrapper>
    </form>
  );
};

export default observer(ExpenseForm);