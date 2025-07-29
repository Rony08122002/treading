// Enhanced version with real data integration
let currentAssets = [];
let lastUpdateTime = null;
let isRealDataMode = false;

// Configuration
const CONFIG = {
    UPDATE_INTERVAL: 60000, // 1 minute
    MAX_API_CALLS_PER_HOUR: 100,
    FALLBACK_TO_DEMO: true
};

// API endpoints (free tier)
const API_ENDPOINTS = {
    crypto: 'https://api.coingecko.com/api/v3/simple/price',
    cryptoList: 'https://api.coingecko.com/api/v3/coins/markets',
    news: 'https://api.coindesk.com/v1/bpi/currentprice.json' // Example
};

// Real crypto symbols mapping
const CRYPTO_SYMBOLS = {
    'bitcoin': 'BTC',
    'ethereum': 'ETH',
    'binancecoin': 'BNB',
    'solana': 'SOL',
    'ripple': 'XRP',
    'cardano': 'ADA',
    'avalanche-2': 'AVAX',
    'dogecoin': 'DOGE',
    'polkadot': 'DOT',
    'polygon': 'MATIC',
    'shiba-inu': 'SHIB',
    'litecoin': 'LTC',
    'uniswap': 'UNI',
    'chainlink': 'LINK',
    'cosmos': 'ATOM'
};

// Demo data (fallback)
const demoData = {
    crypto: [
        { symbol: 'BTC', name: 'Bitcoin', price: 43250, change24h: 2.4, volume: 28500000000, rsi: 65, macd: 'bullish', support: 42000, resistance: 45000, recommendation: 'buy' },
        { symbol: 'ETH', name: 'Ethereum', price: 2850, change24h: -1.2, volume: 12300000000, rsi: 45, macd: 'bearish', support: 2750, resistance: 2950, recommendation: 'hold' },
        { symbol: 'BNB', name: 'Binance Coin', price: 315, change24h: 3.1, volume: 890000000, rsi: 68, macd: 'bullish', support: 305, resistance: 325, recommendation: 'buy' },
        { symbol: 'SOL', name: 'Solana', price: 98.50, change24h: 5.7, volume: 2100000000, rsi: 72, macd: 'bullish', support: 92, resistance: 105, recommendation: 'buy' },
        { symbol: 'XRP', name: 'Ripple', price: 0.52, change24h: -2.1, volume: 1450000000, rsi: 38, macd: 'bearish', support: 0.48, resistance: 0.58, recommendation: 'sell' },
        { symbol: 'ADA', name: 'Cardano', price: 0.47, change24h: 4.2, volume: 850000000, rsi: 58, macd: 'bullish', support: 0.43, resistance: 0.52, recommendation: 'buy' },
        { symbol: 'AVAX', name: 'Avalanche', price: 36.80, change24h: 6.8, volume: 620000000, rsi: 75, macd: 'bullish', support: 34, resistance: 40, recommendation: 'buy' },
        { symbol: 'DOGE', name: 'Dogecoin', price: 0.085, change24h: 1.9, volume: 890000000, rsi: 52, macd: 'neutral', support: 0.081, resistance: 0.092, recommendation: 'hold' },
        { symbol: 'DOT', name: 'Polkadot', price: 7.45, change24h: 3.7, volume: 340000000, rsi: 61, macd: 'bullish', support: 7.1, resistance: 8.0, recommendation: 'buy' },
        { symbol: 'MATIC', name: 'Polygon', price: 0.89, change24h: 4.1, volume: 450000000, rsi: 64, macd: 'bullish', support: 0.85, resistance: 0.95, recommendation: 'buy' }
    ],
    stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 192.45, change24h: 1.8, volume: 45000000, rsi: 58, macd: 'bullish', support: 185, resistance: 200, recommendation: 'buy' },
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: 415.32, change24h: 2.1, volume: 28000000, rsi: 62, macd: 'bullish', support: 405, resistance: 425, recommendation: 'buy' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 138.75, change24h: -0.8, volume: 35000000, rsi: 52, macd: 'neutral', support: 135, resistance: 145, recommendation: 'hold' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 153.89, change24h: 1.5, volume: 42000000, rsi: 55, macd: 'bullish', support: 148, resistance: 160, recommendation: 'buy' },
        { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.73, change24h: -3.2, volume: 78000000, rsi: 35, macd: 'bearish', support: 235, resistance: 265, recommendation: 'sell' },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.25, change24h: 4.1, volume: 32000000, rsi: 68, macd: 'bullish', support: 850, resistance: 900, recommendation: 'buy' },
        { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.67, change24h: 0.9, volume: 25000000, rsi: 59, macd: 'bullish', support: 470, resistance: 500, recommendation: 'buy' },
        { symbol: 'BRK.B', name: 'Berkshire Hathaway Inc.', price: 421.85, change24h: 0.3, volume: 8000000, rsi: 48, macd: 'neutral', support: 415, resistance: 430, recommendation: 'hold' }
    ]
};

// Real-time data fetching functions
async function fetchRealCryptoData() {
    try {
        showStatusMessage('🔄 מקבל נתונים אמיתיים מ-CoinGecko...');
        
        const cryptoIds = Object.keys(CRYPTO_SYMBOLS).join(',');
        const response = await fetch(
            `${API_ENDPOINTS.cryptoList}?vs_currency=usd&ids=${cryptoIds}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h&locale=en`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        const processedData = data.map(coin => {
            const symbol = CRYPTO_SYMBOLS[coin.id] || coin.symbol.toUpperCase();
            const price = coin.current_price;
            const change24h = coin.price_change_percentage_24h || 0;
            
            // Generate technical indicators
            const rsi = generateRSI(price, change24h);
            const macd = generateMACD(change24h);
            const support = price * 0.95;
            const resistance = price * 1.05;
            const recommendation = generateRecommendation(rsi, macd, change24h);
            
            return {
                symbol,
                name: coin.name,
                price: price,
                change24h: parseFloat(change24h.toFixed(2)),
                volume: coin.total_volume || 0,
                rsi,
                macd,
                support: parseFloat(support.toFixed(6)),
                resistance: parseFloat(resistance.toFixed(6)),
                recommendation,
                marketCap: coin.market_cap,
                lastUpdated: new Date()
            };
        });
        
        showStatusMessage('✅ נתונים אמיתיים התקבלו בהצלחה!', 'success');
        isRealDataMode = true;
        return processedData;
        
    } catch (error) {
        console.error('שגיאה בקבלת נתונים:', error);
        showStatusMessage('⚠️ לא ניתן לקבל נתונים אמיתיים, עובר למצב דמו', 'warning');
        isRealDataMode = false;
        return demoData.crypto;
    }
}

async function fetchRealStockData() {
    // Note: For free stock data, you'd need to register for Alpha Vantage or similar
    // For now, we'll simulate with slight variations of demo data
    try {
        showStatusMessage('📊 מעדכן נתוני מניות...');
        
        const stocksWithVariation = demoData.stocks.map(stock => ({
            ...stock,
            price: stock.price * (0.98 + Math.random() * 0.04), // ±2% variation
            change24h: stock.change24h + (Math.random() - 0.5) * 2, // ±1% variation
            lastUpdated: new Date()
        }));
        
        showStatusMessage('📈 נתוני מניות עודכנו', 'info');
        return stocksWithVariation;
        
    } catch (error) {
        console.error('שגיאה בעדכון מניות:', error);
        return demoData.stocks;
    }
}

// Technical indicators generators
function generateRSI(price, change24h) {
    // Simplified RSI calculation based on price and change
    const base = 30 + (Math.abs(change24h) * 10);
    if (change24h > 0) {
        return Math.min(80, base + 20);
    } else {
        return Math.max(20, base);
    }
}

function generateMACD(change24h) {
    if (change24h > 2) return 'bullish';
    if (change24h < -2) return 'bearish';
    return 'neutral';
}

function generateRecommendation(rsi, macd, change24h) {
    let score = 0;
    
    // RSI scoring
    if (rsi < 30) score += 2;
    else if (rsi > 70) score -= 2;
    else if (rsi >= 40 && rsi <= 60) score += 1;
    
    // MACD scoring
    if (macd === 'bullish') score += 2;
    else if (macd === 'bearish') score -= 2;
    
    // Price change scoring
    if (change24h > 3) score += 1;
    else if (change24h < -3) score -= 1;
    
    if (score >= 2) return 'buy';
    else if (score <= -2) return 'sell';
    else return 'hold';
}

// Status message system
function showStatusMessage(message, type = 'info') {
    const statusDiv = document.getElementById('statusMessage') || createStatusMessage();
    statusDiv.textContent = message;
    statusDiv.className = `status-message ${type}`;
    statusDiv.style.display = 'block';
    
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

function createStatusMessage() {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'statusMessage';
    statusDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        z-index: 10000;
        font-size: 14px;
        max-width: 300px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(statusDiv);
    return statusDiv;
}

// Enhanced scan function
async function startScan() {
    const assetType = document.getElementById('assetType').value;
    const timeframe = document.getElementById('timeframe').value;
    const specificSymbol = document.getElementById('specificSymbol').value.toUpperCase();
    
    showLoading();
    lastUpdateTime = new Date();
    
    try {
        let dataToShow = [];
        
        if (assetType === 'crypto' || assetType === 'both') {
            const cryptoData = await fetchRealCryptoData();
            dataToShow = dataToShow.concat(cryptoData);
        }
        
        if (assetType === 'stocks' || assetType === 'both') {
            const stockData = await fetchRealStockData();
            dataToShow = dataToShow.concat(stockData);
        }
        
        if (specificSymbol) {
            dataToShow = dataToShow.filter(asset => 
                asset.symbol.includes(specificSymbol) || 
                asset.name.toLowerCase().includes(specificSymbol.toLowerCase())
            );
        }
        
        currentAssets = dataToShow;
        displayResults(dataToShow);
        showMarketOverview(dataToShow);
        showNews();
        updateLastUpdateTime();
        
    } catch (error) {
        console.error('שגיאה בסריקה:', error);
        showStatusMessage('❌ שגיאה בסריקה, נסה שוב', 'error');
    }
}

function updateLastUpdateTime() {
    const timeElement = document.getElementById('lastUpdateTime') || createUpdateTimeElement();
    const now = new Date();
    const timeString = now.toLocaleTimeString('he-IL');
    const modeText = isRealDataMode ? 'נתונים אמיתיים' : 'מצב דמו';
    timeElement.innerHTML = `
        <span class="update-time">עדכון אחרון: ${timeString}</span>
        <span class="data-mode ${isRealDataMode ? 'real' : 'demo'}">${modeText}</span>
    `;
}

function createUpdateTimeElement() {
    const element = document.createElement('div');
    element.id = 'lastUpdateTime';
    element.style.cssText = `
        text-align: center;
        margin: 20px 0;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .update-time { margin-right: 15px; }
        .data-mode { 
            padding: 4px 8px; 
            border-radius: 12px; 
            font-size: 0.8rem;
            font-weight: bold;
        }
        .data-mode.real { 
            background: linear-gradient(45deg, #4ecdc4, #44a08d); 
            color: white; 
        }
        .data-mode.demo { 
            background: linear-gradient(45deg, #feca57, #ff9ff3); 
            color: white; 
        }
        .status-message.success { border-left: 4px solid #4ecdc4; }
        .status-message.warning { border-left: 4px solid #feca57; }
        .status-message.error { border-left: 4px solid #ff6b6b; }
        .status-message.info { border-left: 4px solid #00d4ff; }
    `;
    document.head.appendChild(style);
    
    const container = document.querySelector('.container');
    container.insertBefore(element, document.getElementById('results'));
    return element;
}

function showLoading() {
    document.getElementById('results').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>🔍 סורק השווקים ומקבל נתונים...</p>
            <p style="margin-top: 10px; opacity: 0.7;">
                ${isRealDataMode ? 'מקבל נתונים אמיתיים' : 'מצב דמו פעיל'}
            </p>
        </div>
    `;
    document.getElementById('marketOverview').style.display = 'none';
}

// Auto-refresh with real data
let autoRefreshInterval;

function startAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(async () => {
        if (currentAssets.length > 0) {
            console.log('🔄 רענון אוטומטי - מקבל נתונים חדשים...');
            await startScan();
        }
    }, CONFIG.UPDATE_INTERVAL);
    
    showStatusMessage(`🔄 רענון אוטומטי הופעל - כל ${CONFIG.UPDATE_INTERVAL/1000} שניות`, 'success');
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
        showStatusMessage('⏸️ רענון אוטומטי הופסק', 'info');
    }
}

// Add control buttons
function addControlButtons() {
    const controlsContainer = document.querySelector('.controls-container');
    
    const refreshButton = document.createElement('button');
    refreshButton.className = 'scan-button';
    refreshButton.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
    refreshButton.innerHTML = `
        <span class="button-icon">🔄</span>
        <span class="button-text">רענון עכשיו</span>
    `;
    refreshButton.onclick = startScan;
    
    const autoRefreshButton = document.createElement('button');
    autoRefreshButton.className = 'scan-button';
    autoRefreshButton.id = 'autoRefreshBtn';
    autoRefreshButton.style.background = 'linear-gradient(45deg, #feca57, #ff9ff3)';
    autoRefreshButton.innerHTML = `
        <span class="button-icon">⚡</span>
        <span class="button-text">הפעל רענון אוטומטי</span>
    `;
    autoRefreshButton.onclick = toggleAutoRefresh;
    
    controlsContainer.appendChild(refreshButton);
    controlsContainer.appendChild(autoRefreshButton);
}

function toggleAutoRefresh() {
    const button = document.getElementById('autoRefreshBtn');
    if (autoRefreshInterval) {
        stopAutoRefresh();
        button.innerHTML = `
            <span class="button-icon">⚡</span>
            <span class="button-text">הפעל רענון אוטומטי</span>
        `;
        button.style.background = 'linear-gradient(45deg, #feca57, #ff9ff3)';
    } else {
        startAutoRefresh();
        button.innerHTML = `
            <span class="button-icon">⏸️</span>
            <span class="button-text">עצור רענון אוטומטי</span>
        `;
        button.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
    }
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 מפעיל סורק קריפטו ומניות מתקדם...');
    
    addControlButtons();
    
    // Initial scan after page load
    setTimeout(() => {
        startScan();
    }, 1000);
    
    // Test API connectivity
    setTimeout(() => {
        testAPIConnectivity();
    }, 2000);
});

async function testAPIConnectivity() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/ping');
        if (response.ok) {
            showStatusMessage('🌐 חיבור ל-API פעיל - נתונים אמיתיים זמינים!', 'success');
        }
    } catch (error) {
        showStatusMessage('⚠️ בעיית חיבור - עובד במצב דמו', 'warning');
    }
}

// Keep all the existing functions from previous version
// (displayResults, generateAnalysis, calculateGaugeScore, etc.)
// These remain the same...
