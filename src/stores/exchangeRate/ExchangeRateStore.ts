import { singleton } from "tsyringe";
import { action, makeObservable, observable, runInAction } from "mobx";
import GlobalStore from "../GlobalStore";

@singleton()
class ExchangeRateStore {
  exchangeRate: string;
  globalStore: GlobalStore;

  constructor(globalStore: GlobalStore) {
    this.exchangeRate = '';
    this.globalStore = globalStore;

    makeObservable(this, {
      exchangeRate: observable,
      setExchangeRate: action
    });
  }

  async getExchangeRateRequest() {
    try {
      const response = await fetch('http://localhost:3001/exchangeRate');
      const data = await response.json();
      runInAction(() => {
        this.setExchangeRate(data.value);
      });
    } catch (e) {
      throw new Error('Something went wrong.')
    }
  }

  setExchangeRate(exchangeRate: string) {
    this.exchangeRate = exchangeRate;
  }
}

export default ExchangeRateStore;
