import { singleton } from "tsyringe";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import ExpenseItemStore from "../expenseItem/ExpenseItemStore";
import { ExpenseItemResponseType } from "../../domains/expenseItem/expenseItem.types";
import GlobalStore from "../GlobalStore";

@singleton()
class ExpenseItemsStore {
  items: ExpenseItemStore[] = [];
  globalStore: GlobalStore;

  constructor(globalStore: GlobalStore) {
    this.items = [];
    this.globalStore = globalStore;
    makeAutoObservable(this);
  }

  async getExpenseItemsRequest() {
    const response = await fetch('http://localhost:3001/expenses');
    const data = await response.json();
    runInAction(() => this.setExpenseItems(data));
  }

  setExpenseItems(expenseItems: ExpenseItemStore[]) {
    this.items = [...expenseItems];
  }

  addExpenseItem(expenseItem: ExpenseItemStore) {
    this.items.push(expenseItem);
  }

  async removeExpenseItemRequest(id: string) {
    try {
      await fetch(`http://localhost:3001/expenses/${id}`, {
        method: 'delete',
      });
      runInAction(() => this.getExpenseItemsRequest());
    } catch (e) {
      throw new Error('Something went wrong.')
    }
  }

  get itemsArray() {
    return toJS(this.items);
  }

  get sum() {
    return this.items.reduce((total: number, num: ExpenseItemResponseType) => total + Number(num.amountPLN), 0)
  }
}

export default ExpenseItemsStore;
