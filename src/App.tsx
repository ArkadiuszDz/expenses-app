import { observer } from 'mobx-react-lite';

import './App.css';

import ExpenseForm from './components/ExpenseForm';
import Table from './components/Table';
import ExchangeRate from './components/ExchangeRate';

import { expenseItemStore, expenseItemsStore, exchangeRateStore } from './stores';

function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <ExchangeRate exchangeRate={exchangeRateStore} />
      <ExpenseForm test={expenseItemStore} />
      <Table items={expenseItemsStore}/>
    </div>
  );
}

export default observer(App);
