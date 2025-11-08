import React, { useState } from 'react'
import '../css/currency.css'
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import axios from 'axios'
import { currencyCodes } from '../config/currencies'
import ReactCountryFlag from "react-country-flag"

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_JPV0HjnPf8fQGtsFccxDQPBcpdjAgJ7Iaxmc7u7Z";

function Currency() {

  const [amount , setAmount] = useState(1);
  const [fromCurrency , setFromCurrency] = useState('USD');
  const [toCurrency , setToCurrency] = useState('TRY');
  const [result , setResult] = useState(0); 

  const currencyToFlag = (currency) => currency.slice(0,2);

  const exchange = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
      );
      const result = (response.data.data[toCurrency] * amount).toFixed(2);
      setResult(result);
    } catch (error) {
      console.log("API Hatası:", error);
    }
  }

  return (
    <div className='currency-div'>

      <div className='header'>
        <h3>DÖVİZ KURU UYGULAMASI</h3>
      </div>

      <div style={{ marginTop: '20px' }}>
        
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className='amount'
        />

        <select
          onChange={(e) => setFromCurrency(e.target.value)}
          className='from-currency-option'
          value={fromCurrency}
        >
          {currencyCodes.map(code => (
            <option key={code} value={code}>
              <ReactCountryFlag countryCode={currencyToFlag(code)} /> {code}
            </option>
          ))}
        </select>

        <FaRegArrowAltCircleRight style={{ fontSize: '25px', color: 'black', marginRight: '10px', marginBottom: '-6px' }} />

        <select
          onChange={(e) => setToCurrency(e.target.value)}
          className='to-currency-option'
          value={toCurrency}
        >
          {currencyCodes.map(code => (
            <option key={code} value={code}>
              <ReactCountryFlag countryCode={currencyToFlag(code)} /> {code}
            </option>
          ))}
        </select>

        <input
          value={result}
          readOnly
          type="number"
          className='result'
        />
      </div>

      <button
        onClick={exchange}
        className='exchange-button'
      >
        Çevir
      </button>

    </div>
  )
}

export default Currency
