import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import GlobalStore from '../../stores/GlobalStore';

interface Props {
  globalStore: GlobalStore;
}

const ExchangeRate = ({ globalStore }: Props) => {

  const [value, setValue] = useState(globalStore.exchangeRateStore.exchangeRate);

  useEffect(() => {
    globalStore.exchangeRateStore.getExchangeRateRequest();
  }, []);

  useEffect(() => {
    globalStore.exchangeRateStore.setExchangeRate(value ?? '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.match(/^\d+\.?\d{0,3}/)?.at(0) || '');
  }

  return (
    <div>
      <input
        inputMode="numeric"
        value={globalStore.exchangeRateStore.exchangeRate}
        onChange={handleChange}
      />
    </div>
  );
};

export default observer(ExchangeRate);