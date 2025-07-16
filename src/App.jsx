import { useState } from 'react';
import useCurrencyInfo from './Hooks/useCurrency'
import InputBox from './components/InputBox.jsx'
import './index.css'


function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd"); // Fixed casing
  const [to, setTo] = useState("inr"); // Fixed casing
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    const result = amount * currencyInfo[to];
    setConvertedAmount(Number(result.toFixed(2))); // Ensure the result is a number with two decimal places
  }

  return (
    <>
      <div className='w-full h-screen flex flex-wrap 
     justify-center items-center bg-cover bg-no-repeat'
        style={{
          backgroundColor: 'black'
        }}
      >
        <div className='w-full'>
          <div className='w-full max-w-md mx-auto 
        border border-gray-60 rounded-lg p-5 
        backdrop-blur-sm bg-white/30'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className='w-full mb-1'>
              <InputBox
                label="From"
                amount={amount}
                currencyOption={options}
                onAmountChange={setAmount}
                selectCurrency={from}
                onCurrencyChange={(currency) => setFrom(currency)}
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button
                type='button'
                className='absolute left-1/2
            -translate-x-1/2 
            -translate-v-1/2 border-2
            border-white rounded-md
            bg-blue-600 text-white px-2 py-0.5'
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className='w-full mt-1 mb-4'>
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOption={options}
                onAmountChange={setConvertedAmount}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>
            <button type='submit'
              className='w-full bg-blue-600
          text-white px-4 py-4 rounded-lg'
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
          </div>
        </div>

      </div>

    </>
  )
}

export default App
