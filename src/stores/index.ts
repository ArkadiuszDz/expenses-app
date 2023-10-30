import ExpenseItemStore from "./expenseItem/ExpenseItemStore";
import ExpenseItemsStore from "./expenseItems/ExpenseItemsStore";
import ExchangeRateStore from "./exchangeRate/ExchangeRateStore";

export const exchangeRateStore = new ExchangeRateStore('');
export const expenseItemsStore = new ExpenseItemsStore(exchangeRateStore);
export const expenseItemStore = new ExpenseItemStore(expenseItemsStore);
