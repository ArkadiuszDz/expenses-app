import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";

const ExchangeRate = ({ exchangeRateStore }: { exchangeRateStore: any }) => {

  const [value, setValue] = useState(exchangeRateStore.exchangeRate);

  useEffect(() => {
    exchangeRateStore.getExchangeRateRequest();
  }, []);

  useEffect(() => {
    exchangeRateStore.setExchangeRate(value ?? '');
  }, [value]);

  const handleChange = (e: any) => {
    // props.exchangeRate.valueSetManually(true);
    setValue(e.target.value.match(/^\d+\.?\d{0,3}/)?.at(0));
  }

  const refreshExchangeRateHandler = () => {
    exchangeRateStore.getExchangeRateRequest();
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