// CryptoScan Pro - Advanced Cryptocurrency Scanner
let currentCryptos = [];
let lastUpdateTime = null;
let isRealDataMode = false;
let chartInstances = {};
let priceHistoryData = {};

// Configuration
const CONFIG = {
    UPDATE_INTERVAL: 30000, // 30 seconds
    MAX_HISTORY_POINTS: 50,
    COINGECKO_API: 'https://api.coingecko.com/api/v3'
};

// Crypto categories mapping
const CRYPTO_CATEGORIES = {
    top10: ['bitcoin', 'ethereum', 'binancecoin', 'solana', 'ripple', 'cardano', 'avalanche-2', 'dogecoin', 'polkadot', 'polygon'],
    defi: ['uniswap', 'chainlink', 'aave', 'compound-governance-token', 'curve-dao-token', 'makerdao', 'yearn-finance', 'pancakeswap-token'],
    gaming: ['axie-infinity', 'the-sandbox', 'decentraland', 'enjincoin', 'gala', 'illuvium', 'star-atlas', 'smooth-love-potion'],
    layer1: ['ethereum', 'solana', 'cardano', 'avalanche-2', 'polkadot', 'cosmos', 'near', 'fantom', 'algorand', 'tezos'],
    meme: ['dogecoin', 'shiba-inu', 'pepe', 'floki', 'bonk', 'dogwifcoin', 'mog-coin'],
    all: [] // Will be populated with top cryptos
};

// Real crypto symbols mapping (expanded)
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
    'cosmos': 'ATOM',
    'stellar': 'XLM',
    'internet-computer': 'ICP',
    'tron': 'TRX',
    'bitcoin-cash': 'BCH',
    'near': 'NEAR',
    'fantom': 'FTM',
    'algorand': 'ALGO',
    'vechain': 'VET',
    'tezos': 'XTZ',
    'the-sandbox': 'SAND',
    'decentraland': 'MANA',
    'apecoin': 'APE',
    'cronos': 'CRO',
    'hedera-hashgraph': 'HBAR',
    'flow': 'FLOW',
    'aave': 'AAVE',
    'compound-governance-token': 'COMP',
    'curve-dao-token': 'CRV',
    'makerdao': 'MKR',
    'yearn-finance': 'YFI',
    'pancakeswap-token': 'CAKE',
    'axie-infinity': 'AXS',
    'enjincoin': 'ENJ',
    'gala': 'GALA',
    'illuvium': 'ILV',
    'pepe': 'PEPE',
    'floki': 'FLOKI',
    'bonk': 'BONK',
    'immutable-x': 'IMX',
    'render-token': 'RNDR',
    'theta-token': 'THETA',
    'monero': 'XMR',
    'ethereum-classic': 'ETC',
    'zcash': 'ZEC',
    'dash': 'DASH',
    'neo': 'NEO'
};

// Crypto news data
const cryptoNews = [
    {
        title: 'ביטקוין שובר את רף ה-45,000 דולר עם עלייה של 8% השבוע',
        summary: 'המטבע הדיגיטלי הגדול ביותר ממשיך לעלות עם גידול באימוץ המוסדי ואופטימיות השוק. אנליסטים צופים המשך עלייה.'
    },
    {
        title: 'אתריום מתכונן ל-Shanghai Upgrade הגדול - מה זה אומר על המחיר?',
        summary: 'השדרוג הטכני החשוב יאפשר משיכת ETH מסטייקינג. מומחים מעריכים השפעה חיובית על הביקוש והמחיר.'
    },
    {
        title: 'סולאנה רושמת שיא בפעילות DeFi עם צמיחה של 400% ברבעון',
        summary: 'הרשת מושכת יותר פרויקטים ומשתמשים עם עמלות נמוכות ומהירות גבוהה. מחיר SOL עולה ב-15% השבוע.'
    },
    {
        title: 'Binance מכריזה על תמיכה חדשה ב-20 מטבעות נוספים',
        summary: 'הבורסה הגדולה בעולם מוסיפה תמיכה במטבעות DeFi וגיימינג חדשים. הודעה זו משפיעה חיובית על המחירים.'
    },
    {
        title: 'מטבעות המים חוזרים! DOGE ו-SHIB עולים בחדות',
        summary: 'הטרנד של מטבעות מים חוזר עם עליות של עד 25% השבוע. קהילות חזקות ותמיכת סלבריטאים מניעות את הרכישות.'
    },
    {
        title: 'חדשות DeFi: פרוטוקולי הלוואות רושמים שיאי נפח',
        summary: 'פלטפורמות כמו AAVE ו-Compound רושמות נפחי הלוואות שיא. התחום ממשיך לצמוח עם חדשנות טכנולוגית.'
    }
];

// Enhanced crypto data fetching
async function fetchRealCryptoData() {
    try {
        showStatusMessage('🔄 מקבל נתוני קריפטו אמיתיים...', 'info');
        
        const category = document.getElementById('cryptoCategory').value;
        let cryptoIds;
        
        if (category === 'all') {
            // Get top 50 cryptocurrencies
            cryptoIds = Object.keys(CRYPTO_SYMBOLS).slice(0, 50).join(',');
        } else {
            cryptoIds = CRYPTO_CATEGORIES[category].join(',');
        }
        
        const response = await fetch(
            `${CONFIG.COINGECKO_API}/coins/markets?vs_currency=usd&ids=${cryptoIds}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d,30d&locale=en`
        );
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        const processedData = data.map(coin => {
            const symbol = CRYPTO_SYMBOLS[coin.id] || coin.symbol.toUpperCase();
            const price = coin.current_price;
            const change24h = coin.price_change_percentage_24h || 0;
            const change1h = coin.price_change_percentage_1h || 0;
            const change7d = coin.price_change_percentage_7d || 0;
            const change30d = coin.price_change_percentage_30d || 0;
            
            // Update price history
            updatePriceHistory(symbol, price);
            
            // Generate technical indicators
            const rsi = calculateRealRSI(symbol, price, change24h, change7d);
            const macd = calculateRealMACD(symbol, change1h, change24h, change7d);
            const support = calculateRealSupport(symbol, price);
            const resistance = calculateRealResistance(symbol, price);
            const recommendation = generateRealRecommendation(rsi, macd, change24h, change1h);
            const trend = determineTrend(change1h, change24h, change7d);
            
            return {
                symbol,
                name: coin.name,
                price: price,
                change24h: parseFloat(change24h.toFixed(2)),
                change1h: parseFloat((change1h || 0).toFixed(2)),
                change7d: parseFloat((change7d || 0).toFixed(2)),
                change30d: parseFloat((change30d || 0).toFixed(2)),
                volume: coin.total_volume || 0,
                marketCap: coin.market_cap || 0,
                marketCapRank: coin.market_cap_rank || 999,
                rsi,
                macd,
                support: parseFloat(support.toFixed(8)),
                resistance: parseFloat(resistance.toFixed(8)),
                recommendation,
                sparkline: coin.sparkline_in_7d?.price || [],
                lastUpdated: new Date(),
                trend,
                category: getCryptoCategory(coin.id),
                ath: coin.ath || price,
                atl: coin.atl || price,
                athChangePercentage: coin.ath_change_percentage || 0,
                volumeRank: getVolumeRank(coin.total_volume || 0)
            };
        });
        
        showStatusMessage('✅ נתוני קריפטו אמיתיים התקבלו בהצלחה!', 'success');
        isRealDataMode = true;
        return processedData;
        
    } catch (error) {
        console.error('שגיאה בקבלת נתוני קריפטו:', error);
        showStatusMessage('⚠️ לא ניתן לקבל נתונים אמיתיים, עובר למצב דמו', 'warning');
        isRealDataMode = false;
        return generateDynamicDemoData();
    }
}

// Helper functions
function getCryptoCategory(coinId) {
    if (CRYPTO_CATEGORIES.defi.includes(coinId)) return 'DeFi';
    if (CRYPTO_CATEGORIES.gaming.includes(coinId)) return 'Gaming';
    if (CRYPTO_CATEGORIES.layer1.includes(coinId)) return 'Layer 1';
    if (CRYPTO_CATEGORIES.meme.includes(coinId)) return 'Meme';
    if (CRYPTO_CATEGORIES.top10.includes(coinId)) return 'Top 10';
    return 'Crypto';
}

function getVolumeRank(volume) {
    if (volume > 2000000000) return 'very-high';
    if (volume > 500000000) return 'high';
    if (volume > 100000000) return 'medium';
    return 'low';
}

function calculateMarketSentiment(cryptos) {
    const totalCryptos = cryptos.length;
    const positiveChanges = cryptos.filter(c => c.change24h > 0).length;
    const strongPositive = cryptos.filter(c => c.change24h > 5).length;
    const strongNegative = cryptos.filter(c => c.change24h < -5).length;
    
    let sentimentScore = (positiveChanges / totalCryptos) * 100;
    
    // Adjust for strong movements
    sentimentScore += (strongPositive * 2);
    sentimentScore -= (strongNegative * 2);
    
    // Clamp between 0-100
    sentimentScore = Math.max(0, Math.min(100, sentimentScore));
    
    let sentimentText = '';
    if (sentimentScore > 80) sentimentText = '🔥 תאוות בצע קיצונית';
    else if (sentimentScore > 60) sentimentText = '🤑 תאוות בצע';
    else if (sentimentScore > 40) sentimentText = '😐 נייטרלי';
    else if (sentimentScore > 20) sentimentText = '😰 פחד';
    else sentimentText = '😨 פחד קיצוני';
    
    return { score: sentimentScore, text: sentimentText };
}

// Price history management
function updatePriceHistory(symbol, newPrice) {
    if (!priceHistoryData[symbol]) {
        priceHistoryData[symbol] = [];
    }
    
    const now = new Date();
    priceHistoryData[symbol].push({
        time: now,
        price: newPrice
    });
    
    if (priceHistoryData[symbol].length > CONFIG.MAX_HISTORY_POINTS) {
        priceHistoryData[symbol].shift();
    }
}

// Technical indicators (same as before but optimized for crypto)
function calculateRealRSI(symbol, currentPrice, change24h, change7d) {
    const history = priceHistoryData[symbol] || [];
    
    if (history.length < 14) {
        let rsi = 50;
        if (change24h > 8) rsi += 25;
        else if (change24h > 3) rsi += 15;
        else if (change24h > 0) rsi += 5;
        else if (change24h < -8) rsi -= 25;
        else if (change24h < -3) rsi -= 15;
        else if (change24h < 0) rsi -= 5;
        
        if (change7d > 20) rsi += 10;
        else if (change7d < -20) rsi -= 10;
        
        return Math.max(0, Math.min(100, Math.round(rsi)));
    }
    
    let gains = 0;
    let losses = 0;
    
    for (let i = 1; i < Math.min(14, history.length); i++) {
        const change = history[i].price - history[i-1].price;
        if (change > 0) gains += change;
        else losses += Math.abs(change);
    }
    
    const avgGain = gains / 14;
    const avgLoss = losses / 14;
    
    if (avgLoss === 0) return 100;
    
    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));
    
    return Math.round(rsi);
}

function calculateRealMACD(symbol, change1h, change24h, change7d) {
    let macdScore = 0;
    
    if (change1h > 2) macdScore += 3;
    else if (change1h > 0) macdScore += 1;
    else if (change1h < -2) macdScore -= 3;
    else if (change1h < 0) macdScore -= 1;
    
    if (change24h > 5) macdScore += 4;
    else if (change24h > 0) macdScore += 2;
    else if (change24h < -5) macdScore -= 4;
    else if (change24h < 0) macdScore -= 2;
    
    if (change7d > 15) macdScore += 3;
    else if (change7d > 0) macdScore += 1;
    else if (change7d < -15) macdScore -= 3;
    else if (change7d < 0) macdScore -= 1;
    
    if (macdScore >= 4) return 'bullish';
    else if (macdScore <= -4) return 'bearish';
    else return 'neutral';
}

function calculateRealSupport(symbol, currentPrice) {
    const history = priceHistoryData[symbol] || [];
    
    if (history.length < 10) {
        return currentPrice * 0.92; // 8% below current
    }
    
    const recentPrices = history.slice(-30).map(h => h.price);
    const minPrice = Math.min(...recentPrices);
    
    return Math.min(minPrice * 1.03, currentPrice * 0.95);
}

function calculateRealResistance(symbol, currentPrice) {
    const history = priceHistoryData[symbol] || [];
    
    if (history.length < 10) {
        return currentPrice * 1.08; // 8% above current
    }
    
    const recentPrices = history.slice(-30).map(h => h.price);
    const maxPrice = Math.max(...recentPrices);
    
    return Math.max(maxPrice * 0.97, currentPrice * 1.05);
}

function generateRealRecommendation(rsi, macd, change24h, change1h) {
    let score = 0;
    
    // RSI analysis (stronger weight for crypto)
    if (rsi < 25) score += 4; // Extreme oversold
    else if (rsi < 35) score += 2; // Oversold
    else if (rsi > 75) score -= 4; // Extreme overbought
    else if (rsi > 65) score -= 2; // Overbought
    
    // MACD analysis
    if (macd === 'bullish') score += 3;
    else if (macd === 'bearish') score -= 3;
    
    // Short term momentum
    if (change1h > 3 && change24h > 8) score += 3;
    else if (change1h > 1 && change24h > 3) score += 2;
    else if (change1h < -3 && change24h < -8) score -= 3;
    else if (change1h < -1 && change24h < -3) score -= 2;
    
    // Crypto volatility bonus
    if (Math.abs(change24h) > 10) score += Math.sign(change24h);
    
    if (score >= 4) return 'buy';
    else if (score <= -4) return 'sell';
    else return 'hold';
}

function determineTrend(change1h, change24h, change7d) {
    if (change1h > 2 && change24h > 5 && change7d > 10) return 'strong-up';
    else if (change24h > 3 && change7d > 5) return 'up';
    else if (change1h < -2 && change24h < -5 && change7d < -10) return 'strong-down';
    else if (change24h < -3 && change7d < -5) return 'down';
    else return 'sideways';
}

// Main scan function
async function startCryptoScan() {
    const timeframe = document.getElementById('timeframe').value;
    const specificSymbol = document.getElementById('specificSymbol').value.toUpperCase();
    const sortBy = document.getElementById('sortBy').value;
    
    showLoading();
    lastUpdateTime = new Date();
    
    try {
        let cryptoData = await fetchRealCryptoData();
        
        // Filter by specific symbol if set
        if (specificSymbol) {
            cryptoData = cryptoData.filter(crypto => 
                crypto.symbol.includes(specificSymbol) || 
                crypto.name.toLowerCase().includes(specificSymbol.toLowerCase())
            );
        }
        
        // Sort data
        cryptoData = sortCryptoData(cryptoData, sortBy);
        
        currentCryptos = cryptoData;
        displayCryptoResults(cryptoData);
        showCryptoMarketOverview(cryptoData);
        showCryptoNews();
        updateLastUpdateTime();
        
    } catch (error) {
        console.error('שגיאה בסריקת קריפטו:', error);
        showStatusMessage('❌ שגיאה בסריקה, נסה שוב', 'error');
    }
}

function sortCryptoData(data, sortBy) {
    switch(sortBy) {
        case 'market_cap':
            return data.sort((a, b) => b.marketCap - a.marketCap);
        case 'price':
            return data.sort((a, b) => b.price - a.price);
        case 'volume':
            return data.sort((a, b) => b.volume - a.volume);
        case 'change':
            return data.sort((a, b) => b.change24h - a.change24h);
        case 'score':
            return data.sort((a, b) => calculateGaugeScore(b) - calculateGaugeScore(a));
        default:
            return data;
    }
}

function showCryptoMarketOverview(data) {
    const totalMarketCap = data.reduce((sum, crypto) => sum + crypto.marketCap, 0);
    const buyCount = data.filter(crypto => crypto.recommendation === 'buy').length;
    const sellCount = data.filter(crypto => crypto.recommendation === 'sell').length;
    const avgScore = Math.round(data.reduce((sum, crypto) => sum + calculateGaugeScore(crypto), 0) / data.length);
    
    document.getElementById('totalMarketCap').textContent = `${(totalMarketCap / 1000000000).toFixed(1)}B`;
    document.getElementById('buySignals').textContent = buyCount;
    document.getElementById('sellSignals').textContent = sellCount;
    document.getElementById('avgScore').textContent = avgScore;
    document.getElementById('totalCryptos').textContent = `${data.length}+`;
    
    // Market sentiment
    const sentiment = calculateMarketSentiment(data);
    document.getElementById('sentimentFill').style.width = `${sentiment.score}%`;
    document.getElementById('sentimentValue').textContent = sentiment.text;
    
    document.getElementById('marketOverview').style.display = 'block';
}

function displayCryptoResults(data) {
    const resultsDiv = document.getElementById('results');
    
    if (data.length === 0) {
        resultsDiv.innerHTML = '<div class="loading"><p>❌ לא נמצאו מטבעות דיגיטליים עבור החיפוש</p></div>';
        return;
    }
    
    const resultsHTML = data.map((crypto, index) => {
        const analysis = generateCryptoAnalysis(crypto);
        const changeClass = crypto.change24h >= 0 ? 'positive' : 'negative';
        const changeIcon = crypto.change24h >= 0 ? '📈' : '📉';
        const gaugeScore = calculateGaugeScore(crypto);
        const gaugeRotation = (gaugeScore / 100) * 180 - 90;
        const chartId = `chart-${crypto.symbol}-${index}`;
        
        const trendIcon = getTrendIcon(crypto.trend);
        const trendClass = getTrendClass(crypto.trend);
        const categoryTag = getCategoryTag(crypto.category);
        const volumeClass = getVolumeClass(crypto.volumeRank);
        
        return `
            <div class="asset-card ${trendClass}">
                <div class="market-rank">#${crypto.marketCapRank}</div>
                <div class="price-change-indicator ${crypto.change24h >= 0 ? 'price-up' : 'price-down'}">
                    ${crypto.change24h >= 0 ? '+' : ''}${crypto.change24h.toFixed(2)}%
                </div>
                
                <div class="asset-header">
                    <div>
                        <div class="asset-name">
                            ${crypto.name} ${trendIcon}
                            ${categoryTag}
                        </div>
                        <div class="asset-symbol">${crypto.symbol}</div>
                        <div class="volume-indicator ${volumeClass}">
                            נפח: ${(crypto.volume / 1000000).toFixed(0)}M
                        </div>
                    </div>
                    <div class="price-container">
                        <div class="asset-price">${crypto.price.toLocaleString()}</div>
                        <div class="last-updated">עודכן: ${new Date().toLocaleTimeString('he-IL')}</div>
                    </div>
                </div>
                
                <div class="crypto-metrics">
                    <div class="advanced-metric">
                        <div class="metric-label">1 שעה</div>
                        <div class="percentage-change ${crypto.change1h >= 0 ? 'change-positive' : 'change-negative'}">
                            ${crypto.change1h >= 0 ? '+' : ''}${crypto.change1h.toFixed(2)}%
                        </div>
                    </div>
                    <div class="advanced-metric">
                        <div class="metric-label">7 ימים</div>
                        <div class="percentage-change ${crypto.change7d >= 0 ? 'change-positive' : 'change-negative'}">
                            ${crypto.change7d >= 0 ? '+' : ''}${crypto.change7d.toFixed(2)}%
                        </div>
                    </div>
                    <div class="advanced-metric">
                        <div class="metric-label">שווי שוק</div>
                        <div class="metric-value">${(crypto.marketCap / 1000000000).toFixed(2)}B</div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <canvas id="${chartId}"></canvas>
                    <div class="chart-overlay">
                        <div class="chart-info">
                            <span class="chart-high">גבוה: ${crypto.resistance.toLocaleString()}</span>
                            <span class="chart-low">נמוך: ${crypto.support.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="gauge-container">
                    <div class="gauge-title">🎯 מדד השקעה - ${gaugeScore}/100</div>
                    <div class="gauge">
                        <div class="gauge-background"></div>
                        <div class="gauge-needle" style="transform: translateX(-50%) rotate(${gaugeRotation}deg); transition: transform 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);"></div>
                    </div>
                    <div class="gauge-labels">
                        <span class="sell-zone">מכור (0-39)</span>
                        <span class="hold-zone">החזק (40-69)</span>
                        <span class="buy-zone">קנה (70-100)</span>
                    </div>
                    <div class="gauge-value ${getGaugeColorClass(gaugeScore)}">
                        ${getGaugeDescription(gaugeScore)}
                    </div>
                </div>
                
                <div class="recommendation ${crypto.recommendation}">
                    ${getRecommendationIcon(crypto.recommendation)}
                    ${getRecommendationText(crypto.recommendation)}
                    <span class="confidence">${getConfidenceLevel(gaugeScore)}</span>
                </div>
                
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-label">RSI (מדד כוח)</div>
                        <div class="metric-value ${crypto.rsi > 70 ? 'negative' : crypto.rsi < 30 ? 'positive' : ''}">
                            ${crypto.rsi} ${getRSISignal(crypto.rsi)}
                        </div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">MACD (מגמה)</div>
                        <div class="metric-value ${crypto.macd === 'bullish' ? 'positive' : crypto.macd === 'bearish' ? 'negative' : ''}">
                            ${crypto.macd === 'bullish' ? '📈 עולה' : crypto.macd === 'bearish' ? '📉 יורד' : '➡️ יצב'}
                        </div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">ATH משיא</div>
                        <div class="metric-value ${crypto.athChangePercentage >= -10 ? 'positive' : crypto.athChangePercentage >= -50 ? '' : 'negative'}">
                            ${crypto.athChangePercentage.toFixed(1)}%
                        </div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">דירוג נפח</div>
                        <div class="metric-value ${volumeClass}">
                            ${crypto.volumeRank === 'very-high' ? '🔥 גבוה מאוד' :
                              crypto.volumeRank === 'high' ? '📈 גבוה' :
                              crypto.volumeRank === 'medium' ? '📊 בינוני' : '📉 נמוך'}
                        </div>
                    </div>
                </div>
                
                <div class="analysis">
                    <strong>💡 ניתוח מתקדם:</strong><br>
                    ${analysis}
                    <br><br>
                    <strong>🔮 תחזית קצרת טווח:</strong><br>
                    ${generateCryptoForecast(crypto)}
                </div>
                
                <div class="action-buttons">
                    <button class="action-btn watch-btn" onclick="addToWatchlist('${crypto.symbol}')">
                        👁️ הוסף למעקב
                    </button>
                    <button class="action-btn alert-btn" onclick="setAlert('${crypto.symbol}', ${crypto.price})">
                        🔔 הגדר התראה
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    resultsDiv.innerHTML = `<div class="results-grid">${resultsHTML}</div>`;
    
    // Create charts
    setTimeout(() => {
        data.forEach((crypto, index) => {
            const chartId = `chart-${crypto.symbol}-${index}`;
            createDynamicChart(chartId, crypto);
        });
    }, 100);
}

// Helper functions for display
function getCategoryTag(category) {
    const tagClass = `tag-${category.toLowerCase().replace(' ', '')}`;
    return `<span class="crypto-tag ${tagClass}">${category}</span>`;
}

function getVolumeClass(volumeRank) {
    switch(volumeRank) {
        case 'very-high': return 'volume-high';
        case 'high': return 'volume-high';
        case 'medium': return 'volume-medium';
        case 'low': return 'volume-low';
        default: return 'volume-medium';
    }
}

function generateCryptoAnalysis(crypto) {
    const rsi = crypto.rsi;
    const macd = crypto.macd;
    const change24h = crypto.change24h;
    const change1h = crypto.change1h;
    const change7d = crypto.change7d;
    const trend = crypto.trend;
    
    const momentum = change1h > 0 && change24h > 0 ? 'חיובי' : 
                    change1h < 0 && change24h < 0 ? 'שלילי' : 'מעורב';
    
    const volumeText = crypto.volumeRank === 'very-high' ? 'נפח מסחר עצום' :
                      crypto.volumeRank === 'high' ? 'נפח מסחר גבוה' :
                      crypto.volumeRank === 'medium' ? 'נפח מסחר בינוני' : 'נפח מסחר נמוך';
    
    let analysis = '';
    
    if (crypto.recommendation === 'buy') {
        analysis = `🚀 <strong>הזדמנות קנייה מעולה:</strong> RSI ${rsi} ${rsi < 30 ? '(במכירת יתר קיצונית!)' : '(באזור חיובי)'}, MACD ${macd}, מומנטום ${momentum}. ${volumeText} מעיד על עניין משמעותי. המטבע נסחר מעל התמיכה ב-${crypto.support.toLocaleString()} עם יעד ל-${crypto.resistance.toLocaleString()}. מרחק מהשיא: ${crypto.athChangePercentage.toFixed(1)}%.`;
    } else if (crypto.recommendation === 'sell') {
        analysis = `⚠️ <strong>אזהרת מכירה:</strong> RSI ${rsi} ${rsi > 70 ? '(בקניית יתר!)' : '(באזור שלילי)'}, MACD ${macd}, מומנטום ${momentum}. לחץ מכירות חזק עם ${volumeText}. המטבע בסכנת פריצה מתחת לתמיכה ב-${crypto.support.toLocaleString()}. ממליץ על מכירה מיידית או הגדרת stop-loss.`;
    } else {
        analysis = `⚖️ <strong>מצב נייטרלי - זהירות:</strong> RSI ${rsi} באזור מאוזן, MACD ${macd}, מומנטום ${momentum}. המטבע בטרייד בין ${crypto.support.toLocaleString()} ל-${crypto.resistance.toLocaleString()}. ${volumeText}. המתן לאותות ברורים יותר לפני החלטה.`;
    }
    
    const trendContext = {
        'strong-up': 'מגמה עולה חזקה מאוד - רכבת עלייה!',
        'up': 'מגמה עולה יציבה - אופטימיות מוצדקת.',
        'strong-down': 'מגמה יורדת חזקה - סכנה רבה!',
        'down': 'מגמה יורדת - זהירות מומלצת.',
        'sideways': 'מגמה צידית - קונסולידציה לפני המהלך הבא.'
    };
    
    analysis += ` ${trendContext[trend] || ''}`;
    
    return analysis;
}

function generateCryptoForecast(crypto) {
    const rsi = crypto.rsi;
    const macd = crypto.macd;
    const change24h = crypto.change24h;
    const change7d = crypto.change7d;
    const trend = crypto.trend;
    const volume = crypto.volumeRank;
    
    let forecast = '';
    
    if (trend === 'strong-up' && rsi < 70 && volume === 'very-high') {
        forecast = '🚀 פוטנציאל פרץ מחירים! צפי לעלייה של 15-25% בטווח קצר עם נפח גבוה.';
    } else if (trend === 'up' && macd === 'bullish' && change7d > 10) {
        forecast = '📈 מגמה חיובית חזקה. יעד עלייה: 8-15% בשבוע הקרוב.';
    } else if (trend === 'strong-down' && rsi > 30) {
        forecast = '⬇️ סכנת קריסה! ירידה נוספת של 10-20% אפשרית. הגדר stop-loss מיידית!';
    } else if (rsi < 25 && macd !== 'bearish') {
        forecast = '💎 מטבע במבצע! פוטנציאל ריבאונד של 20-40% מרמות אלו.';
    } else if (rsi > 75 && change24h > 10) {
        forecast = '🔥 חם מדי! תיקון של 8-15% צפוי בימים הקרובים.';
    } else if (trend === 'sideways' && volume === 'high') {
        forecast = '⚡ קונסולידציה לפני פריצה. צפה לתנועה חדה של ±10-15%.';
    } else if (crypto.athChangePercentage > -20 && trend === 'up') {
        forecast = '🎯 קרוב לשיאים חדשים! פוטנציאל לשבירת ATH בקרוב.';
    } else {
        forecast = '🔍 מגמה לא ברורה. המתן לאותות חזקים יותר לפני כניסה.';
    }
    
    return forecast;
}

function showCryptoNews() {
    const newsSection = document.getElementById('newsSection');
    const newsList = document.getElementById('newsList');
    
    const newsHTML = cryptoNews.map(news => `
        <div class="news-item crypto-news">
            <div class="news-title">🚀 ${news.title}</div>
            <div class="news-summary">${news.summary}</div>
        </div>
    `).join('');
    
    newsList.innerHTML = newsHTML;
    newsSection.style.display = 'block';
}

// Continue with the rest of the functions (same as before but optimized for crypto)
function calculateGaugeScore(crypto) {
    let score = 50;
    
    // RSI (30 points)
    if (crypto.rsi < 25) score += 20;
    else if (crypto.rsi < 35) score += 10;
    else if (crypto.rsi > 75) score -= 20;
    else if (crypto.rsi > 65) score -= 10;
    else if (crypto.rsi >= 40 && crypto.rsi <= 60) score += 5;
    
    // MACD (25 points)
    if (crypto.macd === 'bullish') score += 15;
    else if (crypto.macd === 'bearish') score -= 15;
    
    // Price changes (25 points)
    if (crypto.change24h > 10) score += 15;
    else if (crypto.change24h > 5) score += 10;
    else if (crypto.change24h > 0) score += 5;
    else if (crypto.change24h < -10) score -= 15;
    else if (crypto.change24h < -5) score -= 10;
    else if (crypto.change24h < 0) score -= 5;
    
    // Volume factor (10 points)
    if (crypto.volumeRank === 'very-high') score += 8;
    else if (crypto.volumeRank === 'high') score += 5;
    else if (crypto.volumeRank === 'low') score -= 5;
    
    // ATH distance (10 points)
    if (crypto.athChangePercentage > -10) score += 5;
    else if (crypto.athChangePercentage < -70) score += 8; // Potential recovery
    
    return Math.max(0, Math.min(100, Math.round(score)));
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 מפעיל CryptoScan Pro...');
    
    addControlButtons();
    addEnhancedStyles();
    
    setTimeout(() => {
        startCryptoScan();
    }, 1000);
    
    setTimeout(() => {
        testAPIConnectivity();
    }, 2000);
    
    setTimeout(() => {
        startEnhancedAutoRefresh();
    }, 5000);
});

// Keep all the utility functions from before (showStatusMessage, createChart, etc.)
// ... (rest of the functions remain the same)
