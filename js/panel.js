const allCryptocurrencies = [
  { symbol: '1INCH', name: '1inch' },
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'BUSD', name: 'Binance USD' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'XRP', name: 'Ripple' },
  { symbol: 'LTC', name: 'Litecoin' },
  { symbol: 'XLM', name: 'Stellar' },
  { symbol: 'DOT', name: 'Polkadot' }
];

let displayedCryptocurrencies = allCryptocurrencies.slice(0, 5);
let showAll = false;

const cryptoList = document.getElementById('cryptoList');
const button = document.querySelector('.list__btn');

async function fetchCryptoData() {
  try {
    const symbols = displayedCryptocurrencies.map(crypto => crypto.symbol).join(',');
    const response = await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbols}&tsyms=USD`);
    const data = await response.json();

    displayedCryptocurrencies.forEach((crypto, index) => {
      const cryptoData = data.RAW[crypto.symbol].USD;
      const price = cryptoData.PRICE;
      const change = cryptoData.CHANGEPCT24HOUR;
      const volume = cryptoData.TOTALVOLUME24HTO;

      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="list__row">
          <div class="list__asset">
            <div class="list__asset-inner">
              <img class="list__asset-img" src="images/list/${crypto.symbol.toLowerCase()}.png" alt="list__asset" width="36" height="36">
              <div class="list__asset-name">${crypto.name}</div>
              <span class="list__asset-val">${crypto.symbol}</span>
            </div>
          </div>
          <div class="list__price">
            <div class="list__text-wrap">$ ${price.toFixed(3)}</div>
          </div>
          <div class="list__change">
            <div class="list__text-wrap ${change >= 0 ? '_green' : '_red'}">${change.toFixed(2)} %</div>
          </div>
          <div class="list__volume">
            <div class="list__text-wrap">$ ${(volume / 1000).toLocaleString().replace(',', ' ')}</div>
          </div>
          <div class="list__btn-column">
            <a class="list__btn-column-btn" href="#">Trade</a>
          </div>
        </div>
      `;

      cryptoList.appendChild(listItem);



      if (index < displayedCryptocurrencies.length - 1) {
        const divider = document.createElement('div');
        divider.className = 'crypto-divider';
        cryptoList.appendChild(divider);
      }
    });
  } catch (error) {
    console.error('obser sluchils9', error);
  }
}

function toggleAssets() {
  if (showAll) {
    displayedCryptocurrencies = allCryptocurrencies.slice(0, 5);
    button.textContent = 'All assets';
    showAll = false;
    cryptoList.innerHTML = '';
    fetchCryptoData();
  } else {
    displayedCryptocurrencies = allCryptocurrencies;
    button.textContent = 'Hide assets';
    showAll = true;
    displayAllCryptocurrencies();
  }
}

function displayAllCryptocurrencies() {
  cryptoList.innerHTML = '';
  fetchCryptoData();
}

fetchCryptoData();