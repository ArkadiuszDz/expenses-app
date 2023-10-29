import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";

const ExchangeRate = (props: any) => {
  console.log(props, '--props--');

  useEffect(() => {
    props.exchangeRate.getExchangeRateRequest();
  }, []);

  const handleChange = (e: any) => {
    props.exchangeRate.valueSetManually(true);
    props.exchangeRate.setExchangeRate(Number(e.target.value));
  }

  const refreshExchangeRateHandler = () => {
    // props.exchangeRate.valueSetManually(false); -- call it after successful fetch in the store
    props.exchangeRate.getExchangeRateRequest();
  }

  return (
    <div>
      <input value={props.exchangeRate.exchangeRate} onChange={handleChange}/>
      {
        props.exchangeRate.isValueSetManually &&
        <p>You set the value manually.</p>
      }
      <button onClick={refreshExchangeRateHandler}>Refresh</button>
    </div>
  );
};

export default observer(ExchangeRate);