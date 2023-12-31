import { observer } from 'mobx-react-lite';

import './App.css';

import ExpenseForm from './components/ExpenseForm';
import Table from './components/Table';
import ExchangeRate from './components/ExchangeRate';
import ErrorBoundary from './components/ErrorBoundary';
import * as Styled from './styled';
import { globalStore } from './stores';
// import { expenseItemStore, expenseItemsStore, exchangeRateStore } from './stores';

function App() {

  return (
    <div className="App">
      <main>
      <header className="App-header">
      </header>
        <Styled.Container>
          <ErrorBoundary>
            <Styled.Title>
              <h1>List of Expenses</h1>
              <Styled.InputWrapper>
                <span>1EUR = </span>
                <ExchangeRate globalStore={globalStore} />
                <span>PLN</span>
              </Styled.InputWrapper>
            </Styled.Title>
            <ExpenseForm globalStore={globalStore} />
            <Table globalStore={globalStore}/>
          </ErrorBoundary>
        </Styled.Container>
      </main>
    </div>
  );
}

export default observer(App);
