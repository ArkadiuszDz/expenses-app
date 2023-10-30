import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import * as Styled from './styled';

interface ExpenseStore {
  amountPLN: number;
  title: string;
}

const ExpenseForm = ({test}: { test: any}) => {

  const [amount, setAmount] = useState(test.amountPLN);
  const [amountError, setAmountError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (test.title.length < 5) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (test.amountPLN === '') {
      setAmountError(true);
    } else {
      setAmountError(false);
    }

    if (test.amountPLN !== '' && test.title.length >= 5) {
      test.saveExpenseItemRequest({ 
        amountPLN: Number(test.amountPLN),
        title: test.title
      });
      test.setTitle('');
      test.setAmount('');
    }
  }

  useEffect(() => {
    test.setAmount(amount)
  }, [amount]);

  return (
    <form>
      <Styled.InputWrapper>
        <label>Title of transaction</label>
        <div>
          <input
            name="title"
            value={test.title}
            onChange={e => test.setTitle(e.target.value)}
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
            value={test.amountPLN}
            onChange={e => {
              setAmount(e.target.value.match(/^\d+\.?\d{0,2}/)?.at(0) ?? '');
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