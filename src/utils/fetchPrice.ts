const API_URL = 'https://api.coindesk.com/v1/bpi/currentprice.json';

export async function fetchBitcoinPrice() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.bpi.USD.rate_float;
  } catch (error) {
    console.error(error);
    return 'Error fetching data';
  }
}
