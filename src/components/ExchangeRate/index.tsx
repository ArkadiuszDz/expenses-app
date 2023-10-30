import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import ExchangeRateStore from '../../stores/exchangeRate/ExchangeRateStore';

interface Props {
  exchangeRateStore: ExchangeRateStore;
}

const ExchangeRate = ({ exchangeRateStore }: Props) => {

  const [value, setValue] = useState(exchangeRateStore.exchangeRate);

  useEffect(() => {
    exchangeRateStore.getExchangeRateRequest();
  }, []);

  useEffect(() => {
    exchangeRateStore.setExchangeRate(value ?? '');
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.match(/^\d+\.?\d{0,3}/)?.at(0) || '');
  }

  return (
    <div>
      <input
        inputMode="numeric"
        value={exchangeRateStore.exchangeRate}
        onChange={handleChange}
      />
    </div>
  );
};

export default observer(ExchangeRate);