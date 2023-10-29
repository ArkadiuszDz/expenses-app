import { observer } from 'mobx-react-lite';

interface ExpenseStore {
  amountPLN: number;
  title: string;
}

const ExpenseForm = ({test}: { test: any}) => {

  console.log(test, '--props test--');

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (test.amountPLN !== undefined && test.title !== '') {
      test.saveExpenseItemRequest({ 
        amountPLN: Number(test.amountPLN),
        title: test.title
      })
      test.setTitle('');
      test.setAmount(0);
    }
  }

  return (
    <form>
      <h2>{test.title}</h2>
      <h3>{test.amountPLN}</h3>
      <div>
        <input
          name="title"
          value={test.title}
          onChange={e => test.setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          name="amountPLN"
          value={test.amountPLN}
          onChange={e => test.setAmount(e.target.value)}
        />
      </div>
      <div>
        <button
          onClick={submitHandler}
        >
          SAVE
        </button>
      </div>
    </form>
  );
};

export default observer(ExpenseForm);