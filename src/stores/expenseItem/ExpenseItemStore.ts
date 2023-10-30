import { singleton } from "tsyringe";
import { action, makeObservable, observable } from "mobx";
import { ExpenseItemType } from "../../domains/expenseItem/expenseItem.types";
import GlobalStore from "../GlobalStore";

@singleton()
class ExpenseItemStore {
  readonly id: string;
  amountPLN: string;
  title: string;
  globalStore: GlobalStore;

  constructor(globalStore: GlobalStore) {
    this.id = '';
    this.amountPLN = '';
    this.title = '';
    this.globalStore = globalStore;

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
      await this.globalStore.expenseItemsStore.getExpenseItemsRequest();
    } catch (e) {
      throw new Error('Something went wrong.')
    }
  }
}

export default ExpenseItemStore;
