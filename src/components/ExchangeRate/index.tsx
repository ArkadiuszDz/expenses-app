import React, { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import RefreshIcon from '@mui/icons-material/Refresh';

const ExchangeRate = (props: any) => {

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
      <input
        type="number"
        inputMode="numeric"
        //pattern="[-+]?[0-9]*[.,]?[0-9]+"
        value={props.exchangeRate.exchangeRate}
        onChange={handleChange}/>
      {
        props.exchangeRate.isValueSetManually &&
        <p>You set the value manually.</p>
      }
      <button onClick={refreshExchangeRateHandler}><RefreshIcon /></button>
    </div>
  );
};

export default observer(ExchangeRate);