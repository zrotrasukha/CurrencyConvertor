import { useEffect, useState } from "react";


function useCurrencyInfo(currency) {
    // here we use a hook for store json data value 
    const [data, setData] = useState({}) // here we give a empty object so it won't crash or return the whole method 

    useEffect(() => {
        // Currency Api and a Variable name currency injected for give any currency value
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency.toLowerCase()}.json`)

            /// note - most of the api are in the string formate so we have convert it into json 
            .then((res) => {
                const data = res.json();
                return data;
            })
            /// Here convert json data we need to store it into a variable 
            .then((res) => {
                // The API returns data in format: { date: "...", [currency]: { ... } }
                // We need to access the currency object, not the top level
                const currencyData = res[currency.toLowerCase()];
                setData(currencyData || {});
            })
            .catch((err) => {
                console.error("Error fetching currency data:", err);
                setData({}); // Reset data on error
            });
        //so in this we take setData and response value but we don't need to define value every time so we give currency as the value here 
        // so it take automatically 
    }, [currency])

    console.log(data);

    return data;

}

export default useCurrencyInfo;  /// we use this as a hook and return the method

