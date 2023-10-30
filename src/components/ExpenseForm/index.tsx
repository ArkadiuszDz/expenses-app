import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import * as Styled from './styled';
import ExpenseItemStore from '../../stores/expenseItem/ExpenseItemStore';


interface Props {
  expenseItemStore: ExpenseItemStore
}

const ExpenseForm = ({ expenseItemStore }: Props) => {

  const [amount, setAmount] = useState(expenseItemStore.amountPLN);
  const [amountError, setAmountError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const submitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (expenseItemStore.title.length < 5) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (expenseItemStore.amountPLN === '') {
      setAmountError(true);
    } else {
      setAmountError(false);
    }

    if (expenseItemStore.amountPLN !== '' && expenseItemStore.title.length >= 5) {
      expenseItemStore.saveExpenseItemRequest({ 
        amountPLN: expenseItemStore.amountPLN,
        title: expenseItemStore.title
      });
      expenseItemStore.setTitle('');
      setAmount('');
    }
  }

  useEffect(() => {
    expenseItemStore.setAmountPLN(amount)
  }, [amount]);

  return (
    <form>
      <Styled.InputWrapper>
        <label>Title of transaction</label>
        <div>
          <input
            name="title"
            value={expenseItemStore.title}
            onChange={e => expenseItemStore.setTitle(e.target.value)}
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
            value={expenseItemStore.amountPLN}
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