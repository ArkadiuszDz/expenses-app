import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";

const ExchangeRate = (props: any) => {

  const [value, setValue] = useState(props.exchangeRate.exchangeRate)

  useEffect(() => {
    props.exchangeRate.getExchangeRateRequest();
  }, []);

  useEffect(() => {
    props.exchangeRate.setExchangeRate(value ?? '');
  }, [value]);

  const handleChange = (e: any) => {
    // props.exchangeRate.valueSetManually(true);
    setValue(e.target.value.match(/^\d+\.?\d{0,3}/)?.at(0));
  }

  const refreshExchangeRateHandler = () => {
    props.exchangeRate.getExchangeRateRequest();
  }

  return (
    <div>
      <input
        inputMode="numeric"
        value={props.exchangeRate.exchangeRate}
        onChange={handleChange}
      />
      {/* {
        props.exchangeRate.isValueSetManually &&
        <p>You set the value manually.</p>
      }
      <button onClick={refreshExchangeRateHandler}><RefreshIcon /></button> */}
    </div>
  );
};

export default observer(ExchangeRate);