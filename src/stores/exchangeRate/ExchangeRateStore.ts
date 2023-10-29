import { singleton } from "tsyringe";
import { action, makeObservable, observable, runInAction } from "mobx";

import type { ExchangeRateType } from "../../domains/exchangeRate/exchangeRate.types";

@singleton()
class ExchangeRateStore {
  exchangeRate: ExchangeRateType;
  isValueSetManually: boolean;

  constructor(exchangeRate: ExchangeRateType) {
    this.exchangeRate = exchangeRate;
    this.isValueSetManually = false;

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
        this.valueSetManually(false);
      });
    } catch (e) {
      throw new Error('Something went wrong.')
    }
  }

  setExchangeRate(exchangeRate: ExchangeRateType) {
    this.exchangeRate = exchangeRate;
  }

  valueSetManually(isValueSetManually: boolean) {
    this.isValueSetManually = isValueSetManually;
  }
}

export default ExchangeRateStore;
