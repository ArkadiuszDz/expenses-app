import { singleton } from "tsyringe";
import ExpenseItemStore from "./expenseItem/ExpenseItemStore";
import ExchangeRateStore from "./exchangeRate/ExchangeRateStore";
import ExpenseItemsStore from "./expenseItems/ExpenseItemsStore";

@singleton()
class GlobalStore {
  expenseItemStore: ExpenseItemStore;
  expenseItemsStore: ExpenseItemsStore;
  exchangeRateStore: ExchangeRateStore

  constructor() {
    this.expenseItemStore = new ExpenseItemStore(this);
    this.expenseItemsStore = new ExpenseItemsStore(this);
    this.exchangeRateStore = new ExchangeRateStore(this);
  }
};

export default GlobalStore;