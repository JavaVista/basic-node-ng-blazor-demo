const avKey = 'your_api_key'; // replace with your own API key from https://www.alphavantage.co/support/#api-key

function fetchStockData(symbol) {
    
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${avKey}`;
    return fetch(url).then(response => response.json()).then(data => {
        if (!data['Global Quote'] || !data['Global Quote']['05. price']) {
            throw new Error('Invalid symbol or no price data available');
        }
        return { price: +data['Global Quote']['05. price'] };
    });
}

function searchStocksData(keyword) {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=${avKey}`;
    return fetch(url).then(response => response.json()).then(data => {
        if (!data['bestMatches']) {
            throw new Error('No matches found');
        }
        return data['bestMatches'].map(match => ({
            symbol: match['1. symbol'],
            name: match['2. name']
        }));
    });
}

window.setAvApiServiceOnComponent = (componentSelector) => {
    const component = document.querySelector(componentSelector);
    if (component) {
        component.apiService = {
            fetchStockData: symbol => fetchStockData(symbol),
            searchStocksData: keyword => searchStocksData(keyword)
        };
    } else {
        console.error("Stencil component not found: ", componentSelector);
    }
}

