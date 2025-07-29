// Comprehensive crypto data - top 30 cryptocurrencies
const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43250, change24h: 2.4, volume: 28500000000, rsi: 65, macd: 'bullish', support: 42000, resistance: 45000, recommendation: 'buy' },
    { symbol: 'ETH', name: 'Ethereum', price: 2850, change24h: -1.2, volume: 12300000000, rsi: 45, macd: 'bearish', support: 2750, resistance: 2950, recommendation: 'hold' },
    { symbol: 'BNB', name: 'Binance Coin', price: 315, change24h: 3.1, volume: 890000000, rsi: 68, macd: 'bullish', support: 305, resistance: 325, recommendation: 'buy' },
    { symbol: 'SOL', name: 'Solana', price: 98.50, change24h: 5.7, volume: 2100000000, rsi: 72, macd: 'bullish', support: 92, resistance: 105, recommendation: 'buy' },
    { symbol: 'XRP', name: 'Ripple', price: 0.52, change24h: -2.1, volume: 1450000000, rsi: 38, macd: 'bearish', support: 0.48, resistance: 0.58, recommendation: 'sell' },
    { symbol: 'ADA', name: 'Cardano', price: 0.47, change24h: 4.2, volume: 850000000, rsi: 58, macd: 'bullish', support: 0.43, resistance: 0.52, recommendation: 'buy' },
    { symbol: 'AVAX', name: 'Avalanche', price: 36.80, change24h: 6.8, volume: 620000000, rsi: 75, macd: 'bullish', support: 34, resistance: 40, recommendation: 'buy' },
    { symbol: 'DOGE', name: 'Dogecoin', price: 0.085, change24h: 1.9, volume: 890000000, rsi: 52, macd: 'neutral', support: 0.081, resistance: 0.092, recommendation: 'hold' },
    { symbol: 'DOT', name: 'Polkadot', price: 7.45, change24h: 3.7, volume: 340000000, rsi: 61, macd: 'bullish', support: 7.1, resistance: 8.0, recommendation: 'buy' },
    { symbol: 'MATIC', name: 'Polygon', price: 0.89, change24h: 4.1, volume: 450000000, rsi: 64, macd: 'bullish', support: 0.85, resistance: 0.95, recommendation: 'buy' },
    { symbol: 'SHIB', name: 'Shiba Inu', price: 0.0000089, change24h: -3.2, volume: 280000000, rsi: 35, macd: 'bearish', support: 0.0000085, resistance: 0.0000095, recommendation: 'sell' },
    { symbol: 'LTC', name: 'Litecoin', price: 73.20, change24h: 2.8, volume: 620000000, rsi: 56, macd: 'bullish', support: 70, resistance: 78, recommendation: 'buy' },
    { symbol: 'UNI', name: 'Uniswap', price: 6.85, change24h: 5.3, volume: 190000000, rsi: 69, macd: 'bullish', support: 6.5, resistance: 7.5, recommendation: 'buy' },
    { symbol: 'LINK', name: 'Chainlink', price: 14.60, change24h: 3.9, volume: 380000000, rsi: 62, macd: 'bullish', support: 13.8, resistance: 15.8, recommendation: 'buy' },
    { symbol: 'ATOM', name: 'Cosmos', price: 9.75, change24h: 4.7, volume: 170000000, rsi: 66, macd: 'bullish', support: 9.2, resistance: 10.5, recommendation: 'buy' },
    { symbol: 'XLM', name: 'Stellar', price: 0.11, change24h: 2.3, volume: 95000000, rsi: 54, macd: 'neutral', support: 0.105, resistance: 0.12, recommendation: 'hold' },
    { symbol: 'ICP', name: 'Internet Computer', price: 12.45, change24h: -1.8, volume: 120000000, rsi: 42, macd: 'bearish', support: 11.5, resistance: 13.8, recommendation: 'hold' },
    { symbol: 'TRX', name: 'TRON', price: 0.102, change24h: 3.5, volume: 260000000, rsi: 59, macd: 'bullish', support: 0.095, resistance: 0.11, recommendation: 'buy' },
    { symbol: 'BCH', name: 'Bitcoin Cash', price: 245.60, change24h: 1.7, volume: 180000000, rsi: 53, macd: 'neutral', support: 235, resistance: 260, recommendation: 'hold' },
    { symbol: 'NEAR', name: 'NEAR Protocol', price: 3.45, change24h: 6.2, volume: 85000000, rsi: 71, macd: 'bullish', support: 3.2, resistance: 3.8, recommendation: 'buy' },
    { symbol: 'FTM', name: 'Fantom', price: 0.35, change24h: 8.1, volume: 75000000, rsi: 78, macd: 'bullish', support: 0.32, resistance: 0.40, recommendation: 'buy' },
    { symbol: 'ALGO', name: 'Algorand', price: 0.18, change24h: 4.9, volume: 65000000, rsi: 63, macd: 'bullish', support: 0.16, resistance: 0.21, recommendation: 'buy' },
    { symbol: 'VET', name: 'VeChain', price: 0.025, change24h: 2.1, volume: 55000000, rsi: 51, macd: 'neutral', support: 0.023, resistance: 0.028, recommendation: 'hold' },
    { symbol: 'XTZ', name: 'Tezos', price: 0.95, change24h: 3.8, volume: 45000000, rsi: 58, macd: 'bullish', support: 0.90, resistance: 1.05, recommendation: 'buy' },
    { symbol: 'SAND', name: 'The Sandbox', price: 0.42, change24h: 7.3, volume: 120000000, rsi: 74, macd: 'bullish', support: 0.38, resistance: 0.48, recommendation: 'buy' },
    { symbol: 'MANA', name: 'Decentraland', price: 0.38, change24h: 5.9, volume: 95000000, rsi: 67, macd: 'bullish', support: 0.35, resistance: 0.43, recommendation: 'buy' },
    { symbol: 'APE', name: 'ApeCoin', price: 1.25, change24h: -4.2, volume: 140000000, rsi: 32, macd: 'bearish', support: 1.15, resistance: 1.40, recommendation: 'sell' },
    { symbol: 'CRO', name: 'Cronos', price: 0.067, change24h: 2.9, volume: 35000000, rsi: 55, macd: 'neutral', support: 0.062, resistance: 0.075, recommendation: 'hold' },
    { symbol: 'HBAR', name: 'Hedera', price: 0.055, change24h: 4.1, volume: 40000000, rsi: 61, macd: 'bullish', support: 0.051, resistance: 0.062, recommendation: 'buy' },
    { symbol: 'FLOW', name: 'Flow', price: 0.72, change24h: 6.5, volume: 30000000, rsi: 69, macd: 'bullish', support: 0.68, resistance: 0.80, recommendation: 'buy' }
];

// Comprehensive stocks data - top 50 US stocks
const stockData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 192.45, change24h: 1.8, volume: 45000000, rsi: 58, macd: 'bullish', support: 185, resistance: 200, recommendation: 'buy' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.32, change24h: 2.1, volume: 28000000, rsi: 62, macd: 'bullish', support: 405, resistance: 425, recommendation: 'buy' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.75, change24h: -0.8, volume: 35000000, rsi: 52, macd: 'neutral', support: 135, resistance: 145, recommendation: 'hold' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 153.89, change24h: 1.5, volume: 42000000, rsi: 55, macd: 'bullish', support: 148, resistance: 160, recommendation: 'buy' },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.73, change24h: -3.2, volume: 78000000, rsi: 35, macd: 'bearish', support: 235, resistance: 265, recommendation: 'sell' },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.25, change24h: 4.1, volume: 32000000, rsi: 68, macd: 'bullish', support: 850, resistance: 900, recommendation: 'buy' },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.67, change24h: 0.9, volume: 25000000, rsi: 59, macd: 'bullish', support: 470, resistance: 500, recommendation: 'buy' },
    { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', price: 421.85, change24h: 0.3, volume: 8000000, rsi: 48, macd: 'neutral', support: 415, resistance: 430, recommendation: 'hold' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 178.92, change24h: -1.1, volume: 15000000, rsi: 43, macd: 'bearish', support: 172, resistance: 185, recommendation: 'hold' },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: 162.43, change24h: 0.7, volume: 12000000, rsi: 51, macd: 'neutral', support: 158, resistance: 168, recommendation: 'hold' },
    { symbol: 'V', name: 'Visa Inc.', price: 265.78, change24h: 1.3, volume: 18000000, rsi: 61, macd: 'bullish', support: 260, resistance: 275, recommendation: 'buy' },
    { symbol: 'PG', name: 'Procter & Gamble Co.', price: 152.19, change24h: -0.2, volume: 9000000, rsi: 49, macd: 'neutral', support: 148, resistance: 157, recommendation: 'hold' },
    { symbol: 'UNH', name: 'UnitedHealth Group Inc.', price: 523.45, change24h: 0.8, volume: 7000000, rsi: 54, macd: 'bullish', support: 515, resistance: 535, recommendation: 'buy' },
    { symbol: 'HD', name: 'Home Depot Inc.', price: 368.91, change24h: -0.6, volume: 11000000, rsi: 46, macd: 'neutral', support: 360, resistance: 380, recommendation: 'hold' },
    { symbol: 'MA', name: 'Mastercard Inc.', price: 452.33, change24h: 1.7, volume: 14000000, rsi: 63, macd: 'bullish', support: 445, resistance: 465, recommendation: 'buy' },
    { symbol: 'BAC', name: 'Bank of America Corp.', price: 34.56, change24h: -1.8, volume: 65000000, rsi: 38, macd: 'bearish', support: 32, resistance: 37, recommendation: 'sell' },
    { symbol: 'PFE', name: 'Pfizer Inc.', price: 28.74, change24h: 0.4, volume: 22000000, rsi: 47, macd: 'neutral', support: 27, resistance: 31, recommendation: 'hold' },
    { symbol: 'XOM', name: 'Exxon Mobil Corp.', price: 103.82, change24h: 2.3, volume: 19000000, rsi: 66, macd: 'bullish', support: 98, resistance: 110, recommendation: 'buy' },
    { symbol: 'KO', name: 'Coca-Cola Co.', price: 59.87, change24h: 0.1, volume: 16000000, rsi: 50, macd: 'neutral', support: 57, resistance: 63, recommendation: 'hold' },
    { symbol: 'DIS', name: 'Walt Disney Co.', price: 98.45, change24h: -2.1, volume: 24000000, rsi: 41, macd: 'bearish', support: 92, resistance: 105, recommendation: 'sell' },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 442.15, change24h: 3.4, volume: 16000000, rsi: 64, macd: 'bullish', support: 430, resistance: 460, recommendation: 'buy' },
    { symbol: 'ADBE', name: 'Adobe Inc.', price: 567.89, change24h: 2.7, volume: 9000000, rsi: 61, macd: 'bullish', support: 550, resistance: 585, recommendation: 'buy' },
    { symbol: 'CRM', name: 'Salesforce Inc.', price: 215.67, change24h: 1.9, volume: 13000000, rsi: 57, macd: 'bullish', support: 208, resistance: 225, recommendation: 'buy' },
    { symbol: 'ORCL', name: 'Oracle Corp.', price: 118.45, change24h: 1.2, volume: 12000000, rsi: 53, macd: 'neutral', support: 115, resistance: 125, recommendation: 'hold' },
    { symbol: 'WMT', name: 'Walmart Inc.', price: 167.23, change24h: 0.5, volume: 14000000, rsi: 49, macd: 'neutral', support: 162, resistance: 172, recommendation: 'hold' },
    { symbol: 'CVX', name: 'Chevron Corp.', price: 158.92, change24h: 1.8, volume: 8000000, rsi: 56, macd: 'bullish', support: 152, resistance: 165, recommendation: 'buy' },
    { symbol: 'LLY', name: 'Eli Lilly and Co.', price: 789.34, change24h: 2.9, volume: 5000000, rsi: 67, macd: 'bullish', support: 770, resistance: 810, recommendation: 'buy' },
    { symbol: 'TMO', name: 'Thermo Fisher Scientific', price: 542.18, change24h: 1.1, volume: 4000000, rsi: 52, macd: 'neutral', support: 535, resistance: 555, recommendation: 'hold' },
    { symbol: 'ABBV', name: 'AbbVie Inc.', price: 175.43, change24h: 0.8, volume: 6000000, rsi: 51, macd: 'neutral', support: 170, resistance: 182, recommendation: 'hold' },
    { symbol: 'COST', name: 'Costco Wholesale Corp.', price: 723.56, change24h: 1.4, volume: 3000000, rsi: 55, macd: 'bullish', support: 710, resistance: 740, recommendation: 'buy' },
    { symbol: 'ACN', name: 'Accenture plc', price: 345.67, change24h: 2.1, volume: 4000000, rsi: 58, macd: 'bullish', support: 338, resistance: 355, recommendation: 'buy' },
    { symbol: 'NKE', name: 'Nike Inc.', price: 78.92, change24h: -1.5, volume: 12000000, rsi: 44, macd: 'bearish', support: 75, resistance: 85, recommendation: 'hold' },
    { symbol: 'MRK', name: 'Merck & Co. Inc.', price: 108.45, change24h: 0.6, volume: 8000000, rsi: 50, macd: 'neutral', support: 105, resistance: 113, recommendation: 'hold' },
    { symbol: 'AVGO', name: 'Broadcom Inc.', price: 1245.78, change24h: 3.8, volume: 2000000, rsi: 69, macd: 'bullish', support: 1220, resistance: 1280, recommendation: 'buy' },
    { symbol: 'TXN', name: 'Texas Instruments Inc.', price: 187.34, change24h: 1.7, volume: 5000000, rsi: 56, macd: 'bullish', support: 182, resistance: 195, recommendation: 'buy' },
    { symbol: 'LOW', name: 'Lowe\'s Companies Inc.', price: 234.56, change24h: 0.9, volume: 6000000, rsi: 52, macd: 'neutral', support: 228, resistance: 242, recommendation: 'hold' },
    { symbol: 'MDT', name: 'Medtronic plc', price: 85.67, change24h: 1.3, volume: 7000000, rsi: 54, macd: 'bullish', support: 82, resistance: 90, recommendation: 'buy' },
    { symbol: 'UPS', name: 'United Parcel Service Inc.', price: 145.23, change24h: -0.8, volume: 8000000, rsi: 47, macd: 'neutral', support: 140, resistance: 152, recommendation: 'hold' },
    { symbol: 'PM', name: 'Philip Morris International', price: 118.89, change24h: 0.4, volume: 5000000, rsi: 49, macd: 'neutral', support: 115, resistance: 125, recommendation: 'hold' },
    { symbol: 'HON', name: 'Honeywell International Inc.', price: 206.45, change24h: 1.6, volume: 4000000, rsi: 55, macd: 'bullish', support: 200, resistance: 215, recommendation: 'buy' },
    { symbol: 'IBM', name: 'International Business Machines', price: 167.89, change24h: 2.2, volume: 6000000, rsi: 59, macd: 'bullish', support: 162, resistance: 175, recommendation: 'buy' },
    { symbol: 'QCOM', name: 'QUALCOMM Inc.', price: 156.78, change24h: 3.1, volume: 10000000, rsi: 65, macd: 'bullish', support: 150, resistance: 165, recommendation: 'buy' },
    { symbol: 'CAT', name: 'Caterpillar Inc.', price: 287.43, change24h: 2.8, volume: 7000000, rsi: 63, macd: 'bullish', support: 278, resistance: 298, recommendation: 'buy' },
    { symbol: 'GS', name: 'Goldman Sachs Group Inc.', price: 378.92, change24h: -0.9, volume: 9000000, rsi: 46, macd: 'bearish', support: 365, resistance: 390, recommendation: 'hold' },
    { symbol: 'AXP', name: 'American Express Co.', price: 189.67, change24h: 1.8, volume: 8000000, rsi: 57, macd: 'bullish', support: 183, resistance: 198, recommendation: 'buy' },
    { symbol: 'MMM', name: '3M Co.', price: 98.23, change24h: 0.7, volume: 6000000, rsi: 51, macd: 'neutral', support: 94, resistance: 104, recommendation: 'hold' },
    { symbol: 'VZ', name: 'Verizon Communications Inc.', price: 38.45, change24h: -0.3, volume: 20000000, rsi: 48, macd: 'neutral', support: 37, resistance: 41, recommendation: 'hold' },
    { symbol: 'BA', name: 'Boeing Co.', price: 198.34, change24h: -2.4, volume: 15000000, rsi: 39, macd: 'bearish', support: 185, resistance: 210, recommendation: 'sell' },
    { symbol: 'INTC', name: 'Intel Corp.', price: 43.67, change24h: 1.9, volume: 25000000, rsi: 56, macd: 'bullish', support: 41, resistance: 47, recommendation: 'buy' },
    { symbol: 'CCI', name: 'Crown Castle Inc.', price: 87.89, change24h: 0.8, volume: 3000000, rsi: 52, macd: 'neutral', support: 85, resistance: 92, recommendation: 'hold' }
];

const newsData = [
    {
        title: 'ביטקוין עובר את רף ה-43,000 דולר בעקבות אופטימיות המשקיעים',
        summary: 'מחירי הקריפטו ממשיכים לעלות עם שיפור ברגולציה ואימוץ מוסדי. משקיעים מצפים להמשך המגמה החיובית בחודשים הקרובים.'
    },
    {
        title: 'NVIDIA מכריזה על שבבי AI חדשניים למרכזי נתונים',
        summary: 'החברה חשפה דור חדש של מעבדים שיגדילו את יעילות הבינה המלאכותית פי 5. המניה זוכה להתעניינות רבה מהמשקיעים.'
    },
    {
        title: 'סולאנה רושמת שיא חדש בפעילות הרשת',
        summary: 'רשת הבלוקצ\'יין רושמת מספר עסקאות יומי חדש עם צמיחה של 300% בשימוש. מפתחים ממשיכים לבנות אפליקציות חדשות על הפלטפורמה.'
    },
    {
        title: 'אפל משיקה תכונות AI חדשות ב-iPhone 16',
        summary: 'החברה מציגה יכולות בינה מלאכותית מתקדמות שישנו את חווית המשתמש. אנליסטים חוזים עלייה במכירות בעקבות החדשנות.'
    },
    {
        title: 'אתריום מתכונן לשדרוג "Shanghai" הגדול',
        summary: 'השדרוג הטכני החשוב יאפשר משיכת ETH שהופקד בסטייקינג. מומחים צופים השפעה חיובית על המחיר והפעילות ברשת.'
    },
    {
        title: 'טסלה מדווחת על רבעון שיא במכירות רכבים חשמליים',
        summary: 'החברה העלתה את תחזיות הייצור ל-2025 עם הרחבת הייצור בסין ואירופה. מניית החברה מגיבה בחיוב לתוצאות החזקות.'
    }
];

// Generate price history for charts
function generatePriceHistory(currentPrice, volatility = 0.02) {
    const history = [];
    let price = currentPrice * 0.9; // Start 10% lower
    
    for (let i = 0; i < 30; i++) {
        const change = (Math.random() - 0.5) * volatility;
        price = price * (1 + change);
        history.push({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
            price: parseFloat(price.toFixed(6))
        });
    }
    
    // Ensure the last price matches current price
    history[history.length - 1].price = currentPrice;
    return history;
}

function startScan() {
    const assetType = document.getElementById('assetType').value;
    const timeframe = document.getElementById('timeframe').value;
    const specificSymbol = document.getElementById('specificSymbol').value.toUpperCase();
    
    showLoading();
    
    setTimeout(() => {
        let dataToShow = [];
        
        if (assetType === 'crypto' || assetType === 'both') {
            dataToShow = dataToShow.concat(cryptoData);
        }
        
        if (assetType === 'stocks' || assetType === 'both') {
            dataToShow = dataToShow.concat(stockData);
        }
        
        if (specificSymbol) {
            dataToShow = dataToShow.filter(asset => 
                asset.symbol.includes(specificSymbol) || asset.name.toLowerCase().includes(specificSymbol.toLowerCase())
            );
        }
        
        displayResults(dataToShow);
        showMarketOverview(dataToShow);
        showNews();
    }, 2500);
}

function showLoading() {
    document.getElementById('results').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>🔍 סורק את השווקים ומנתח נתונים...</p>
            <p style="margin-top: 10px; opacity: 0.7;">מעבד ${cryptoData.length + stockData.length} נכסים</p>
        </div>
    `;
    document.getElementById('marketOverview').style.display = 'none';
}

function showMarketOverview(data) {
    const buyCount = data.filter(asset => asset.recommendation === 'buy').length;
    const sellCount = data.filter(asset => asset.recommendation === 'sell').length;
    const holdCount = data.filter(asset => asset.recommendation === 'hold').length;
    const avgScore = Math.round(data.reduce((sum, asset) => sum + calculateGaugeScore(asset), 0) / data.length);
    
    document.getElementById('buySignals').textContent = buyCount;
    document.getElementById('sellSignals').textContent = sellCount;
    document.getElementById('holdSignals').textContent = holdCount;
    document.getElementById('avgScore').textContent = avgScore;
    document.getElementById('totalAssets').textContent = `${data.length}+`;
    
    document.getElementById('marketOverview').style.display = 'block';
}

function createChart(canvasId, priceHistory, asset) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    const isPositive = asset.change24h >= 0;
    
    if (isPositive) {
        gradient.addColorStop(0, 'rgba(78, 205, 196, 0.3)');
        gradient.addColorStop(1, 'rgba(78, 205, 196, 0.05)');
    } else {
        gradient.addColorStop(0, 'rgba(255, 107, 107, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 107, 107, 0.05)');
    }
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: priceHistory.map((_, i) => `${30-i}d`),
            datasets: [{
                data: priceHistory.map(p => p.price),
                borderColor: isPositive ? '#4ecdc4' : '#ff6b6b',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: isPositive ? '#4ecdc4' : '#ff6b6b',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: isPositive ? '#4ecdc4' : '#ff6b6b',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        title: () => `${asset.symbol}`,
                        label: (context) => `מחיר: ${context.parsed.y.toLocaleString()}`
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                    grid: { display: false }
                },
                y: {
                    display: false,
                    grid: { display: false }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    
    if (data.length === 0) {
        resultsDiv.innerHTML = '<div class="loading"><p>❌ לא נמצאו נתונים עבור החיפוש שצוין</p></div>';
        return;
    }
    
    const resultsHTML = data.map((asset, index) => {
        const analysis = generateAnalysis(asset);
        const changeClass = asset.change24h >= 0 ? 'positive' : 'negative';
        const changeIcon = asset.change24h >= 0 ? '📈' : '📉';
        const gaugeScore = calculateGaugeScore(asset);
        const gaugeRotation = (gaugeScore / 100) * 180 - 90;
        const chartId = `chart-${asset.symbol}-${index}`;
        const priceHistory = generatePriceHistory(asset.price);
        
        return `
            <div class="asset-card">
                <div class="asset-header">
                    <div>
                        <div class="asset-name">${asset.name}</div>
                        <div class="asset-symbol">${asset.symbol}</div>
                    </div>
                    <div class="asset-price">${asset.price.toLocaleString()}</div>
                </div>
                
                <div class="chart-container">
                    <canvas id="${chartId}"></canvas>
                </div>
                
                <div class="gauge-container">
                    <div class="gauge-title">🎯 מדד השקעה</div>
                    <div class="gauge">
                        <div class="gauge-background"></div>
                        <div class="gauge-needle" style="transform: translateX(-50%) rotate(${gaugeRotation}deg);"></div>
                    </div>
                    <div class="gauge-labels">
                        <span class="sell-zone">מכור</span>
                        <span class="hold-zone">החזק</span>
                        <span class="buy-zone">קנה</span>
                    </div>
                    <div class="gauge-value ${getGaugeColorClass(gaugeScore)}">
                        ${gaugeScore}/100
                    </div>
                </div>
                
                <div class="recommendation ${asset.recommendation}">
                    ${getRecommendationIcon(asset.recommendation)}
                    ${getRecommendationText(asset.recommendation)}
                </div>
                
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-label">שינוי 24 שעות</div>
                        <div class="metric-value ${changeClass}">
                            ${changeIcon} ${asset.change24h}%
                        </div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">RSI</div>
                        <div class="metric-value ${asset.rsi > 70 ? 'negative' : asset.rsi < 30 ? 'positive' : ''}">
                            ${asset.rsi}
                        </div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">תמיכה</div>
                        <div class="metric-value">${asset.support.toLocaleString()}</div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">התנגדות</div>
                        <div class="metric-value">${asset.resistance.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="analysis">
                    <strong>💡 ניתוח טכני:</strong><br>
                    ${analysis}
                </div>
            </div>
        `;
    }).join('');
    
    resultsDiv.innerHTML = `<div class="results-grid">${resultsHTML}</div>`;
    
    // Create charts after DOM is updated
    setTimeout(() => {
        data.forEach((asset, index) => {
            const chartId = `chart-${asset.symbol}-${index}`;
            const priceHistory = generatePriceHistory(asset.price);
            createChart(chartId, priceHistory, asset);
        });
    }, 100);
}

function generateAnalysis(asset) {
    let analysis = '';
    
    if (asset.recommendation === 'buy') {
        analysis = `הנכס מציג מגמה חיובית חזקה עם RSI של ${asset.rsi} ו-MACD ${asset.macd}. המחיר נסחר מעל קו התמיכה ב-${asset.support.toLocaleString()} עם מומנטום עולה. הנפח הגבוה של ${(asset.volume/1000000).toFixed(0)}M מעיד על עניין משמעותי מצד המשקיעים והמוסדות.`;
    } else if (asset.recommendation === 'sell') {
        analysis = `הנכס מציג חולשה טכנית עם RSI של ${asset.rsi} ו-MACD ${asset.macd}. המחיר בלחץ ומתקרב לקו התמיכה ב-${asset.support.toLocaleString()}. מומלץ בחום לשקול מכירה או הגדרת הפסקת הפסד מתחת לרמת התמיכה.`;
    } else {
        analysis = `הנכס נמצא בטווח טרייד צר בין התמיכה ב-${asset.support.toLocaleString()} להתנגדות ב-${asset.resistance.toLocaleString()}. RSI של ${asset.rsi} מעיד על מצב נייטרלי יחסית. מומלץ להמתין לפריצה ברורה מהטווח או להיכנס בקרבת התמיכה.`;
    }
    
    return analysis;
}

function getRecommendationText(rec) {
    switch(rec) {
        case 'buy': return 'קנייה מומלצת';
        case 'sell': return 'מכירה מומלצת';
        case 'hold': return 'החזקה והמתנה';
        default: return 'נייטרלי';
    }
}

function getRecommendationIcon(rec) {
    switch(rec) {
        case 'buy': return '🚀';
        case 'sell': return '⬇️';
        case 'hold': return '⏸️';
        default: return '⚖️';
    }
}

function calculateGaugeScore(asset) {
    let score = 50; // נקודת התחלה נייטרלית
    
    // RSI Score (30 נקודות)
    if (asset.rsi < 30) score += 15; // oversold - טוב לקנייה
    else if (asset.rsi > 70) score -= 15; // overbought - לא טוב לקנייה
    else if (asset.rsi >= 40 && asset.rsi <= 60) score += 5; // אזור טוב
    
    // MACD Score (25 נקודות)
    if (asset.macd === 'bullish') score += 15;
    else if (asset.macd === 'bearish') score -= 15;
    
    // שינוי 24 שעות (20 נקודות)
    if (asset.change24h > 3) score += 10;
    else if (asset.change24h > 0) score += 5;
    else if (asset.change24h < -3) score -= 10;
    else if (asset.change24h < 0) score -= 5;
    
    // מיקום יחסית לתמיכה והתנגדות (15 נקודות)
    const pricePosition = (asset.price - asset.support) / (asset.resistance - asset.support);
    if (pricePosition < 0.3) score += 8; // קרוב לתמיכה - טוב לקנייה
    else if (pricePosition > 0.8) score -= 8; // קרוב להתנגדות - לא טוב לקנייה
    
    // נפח מסחר (10 נקודות)
    if (asset.volume > 50000000) score += 5; // נפח גבוה
    else if (asset.volume < 10000000) score -= 3; // נפח נמוך
    
    // וודא שהציון בטווח 0-100
    return Math.max(0, Math.min(100, Math.round(score)));
}

function getGaugeColorClass(score) {
    if (score >= 70) return 'buy-zone';
    else if (score >= 40) return 'hold-zone';
    else return 'sell-zone';
}

function showNews() {
    const newsSection = document.getElementById('newsSection');
    const newsList = document.getElementById('newsList');
    
    const newsHTML = newsData.map(news => `
        <div class="news-item">
            <div class="news-title">📰 ${news.title}</div>
            <div class="news-summary">${news.summary}</div>
        </div>
    `).join('');
    
    newsList.innerHTML = newsHTML;
    newsSection.style.display = 'block';
}

// Auto-refresh every 5 minutes
setInterval(() => {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv.innerHTML && !resultsDiv.innerHTML.includes('loading')) {
        console.log('🔄 רענון אוטומטי של הנתונים...');
        startScan();
    }
}, 300000);

// Initialize with default scan
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        startScan();
    }, 1000);
});
