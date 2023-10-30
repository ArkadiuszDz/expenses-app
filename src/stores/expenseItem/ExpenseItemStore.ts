import { singleton } from "tsyringe";
import { action, makeObservable, observable } from "mobx";
import { ExpenseItemType } from "../../domains/expenseItem/expenseItem.types";
import ExpenseItemsStore from "../expenseItems/ExpenseItemsStore";

@singleton()
class ExpenseItemStore {
  readonly id: string;
  amountPLN: string;
  title: string;
  itemsStore: ExpenseItemsStore;

  constructor(itemsStore: ExpenseItemsStore) {
    this.id = '';
    this.amountPLN = '';
    this.title = '';
    this.itemsStore = itemsStore;

    makeObservable(this, {
      id: observable,
      amountPLN: observable,
      title: observable,
      setAmountPLN: action,
      setTitle: action,
      saveExpenseItemRequest: action
    });
  }
  setAmountPLN(amount: string) {
    this.amountPLN = amount;
  }
  setTitle(title: string) {
    this.title = title;
  }
  async saveExpenseItemRequest(expenseItem: ExpenseItemType) {
    try {
      await fetch('http://localhost:3001/expenses', {
        method: 'post',
        body: JSON.stringify({
          ...expenseItem
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      await this.itemsStore.getExpenseItemsRequest();
    } catch (e) {
      throw new Error('Something went wrong.')
    }
  }
}

export default ExpenseItemStore;
