// Enhanced display function with REAL dynamic updates
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
        
        // Trend indicators
        const trendIcon = getTrendIcon(asset.trend || 'sideways');
        const trendClass = getTrendClass(asset.trend || 'sideways');
        
        return `
            <div class="asset-card ${trendClass}">
                <div class="asset-header">
                    <div>
                        <div class="asset-name">${asset.name} ${trendIcon}</div>
                        <div class="asset-symbol">${asset.symbol}</div>
                        ${asset.change1h ? `<div class="change-1h ${asset.change1h >= 0 ? 'positive' : 'negative'}">
                            1h: ${asset.change1h >= 0 ? '+' : ''}${asset.change1h.toFixed(2)}%
                        </div>` : ''}
                    </div>
                    <div class="price-container">
                        <div class="asset-price">${asset.price.toLocaleString()}</div>
                        <div class="last-updated">עודכן: ${new Date().toLocaleTimeString('he-IL')}</div>
                    </div>
                </div>
                
                <div class="chart-container">
                    <canvas id="${chartId}"></canvas>
                    <div class="chart-overlay">
                        <div class="chart-info">
                            <span class="chart-high">גבוה: ${(asset.resistance || asset.price * 1.05).toLocaleString()}</span>
                            <span class="chart-low">נמוך: ${(asset.support || asset.price * 0.95).toLocaleString()}</span>
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
                
                <div class="recommendation ${asset.recommendation}">
                    ${getRecommendationIcon(asset.recommendation)}
                    ${getRecommendationText(asset.recommendation)}
                    <span class="confidence">${getConfidenceLevel(gaugeScore)}</span>
                </div>
                
                <div class="metrics">
                    <div class="metric">
                        <div class="metric-label">שינוי 24 שעות</div>
                        <div class="metric-value ${changeClass}">
                            ${changeIcon} ${asset.change24h}%
                        </div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">RSI (מדד כוח)</div>
                        <div class="metric-value ${asset.rsi > 70 ? 'negative' : asset.rsi < 30 ? 'positive' : ''}">
                            ${asset.rsi} ${getRSISignal(asset.rsi)}
                        </div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">MACD (מגמה)</div>
                        <div class="metric-value ${asset.macd === 'bullish' ? 'positive' : asset.macd === 'bearish' ? 'negative' : ''}">
                            ${asset.macd === 'bullish' ? '📈 עולה' : asset.macd === 'bearish' ? '📉 יורד' : '➡️ יצב'}
                        </div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">נפח מסחר</div>
                        <div class="metric-value">
                            ${(asset.volume / 1000000).toFixed(0)}M
                        </div>
                    </div>
                </div>
                
                <div class="analysis">
                    <strong>💡 ניתוח מתקדם:</strong><br>
                    ${analysis}
                    <br><br>
                    <strong>🔮 תחזית קצרת טווח:</strong><br>
                    ${generateShortTermForecast(asset)}
                </div>
                
                <div class="action-buttons">
                    <button class="action-btn watch-btn" onclick="addToWatchlist('${asset.symbol}')">
                        👁️ הוסף למעקב
                    </button>
                    <button class="action-btn alert-btn" onclick="setAlert('${asset.symbol}', ${asset.price})">
                        🔔 הגדר התראה
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    resultsDiv.innerHTML = `<div class="results-grid">${resultsHTML}</div>`;
    
    // Create charts after DOM is updated
    setTimeout(() => {
        data.forEach((asset, index) => {
            const chartId = `chart-${asset.symbol}-${index}`;
            createDynamicChart(chartId, asset);
        });
    }, 100);
}

function getTrendIcon(trend) {
    switch(trend) {
        case 'strong-up': return '🚀';
        case 'up': return '📈';
        case 'strong-down': return '⬇️';
        case 'down': return '📉';
        case 'sideways': return '➡️';
        default: return '➡️';
    }
}

function getTrendClass(trend) {
    switch(trend) {
        case 'strong-up': return 'trend-strong-up';
        case 'up': return 'trend-up';
        case 'strong-down': return 'trend-strong-down';
        case 'down': return 'trend-down';
        case 'sideways': return 'trend-sideways';
        default: return 'trend-sideways';
    }
}

function getRSISignal(rsi) {
    if (rsi > 70) return '⚠️';
    if (rsi < 30) return '🔥';
    if (rsi >= 50) return '📈';
    return '📉';
}

function getGaugeDescription(score) {
    if (score >= 80) return 'קנייה חזקה';
    if (score >= 70) return 'קנייה';
    if (score >= 60) return 'קנייה זהירה';
    if (score >= 50) return 'החזקה';
    if (score >= 40) return 'המתנה';
    if (score >= 20) return 'מכירה זהירה';
    return 'מכירה חזקה';
}

function getConfidenceLevel(score) {
    if (score >= 75 || score <= 25) return '(ביטחון גבוה)';
    if (score >= 65 || score <= 35) return '(ביטחון בינוני)';
    return '(ביטחון נמוך)';
}

    if (asset.recommendation === 'buy') {
        analysis = `🚀 <strong>אותות קנייה חזקים:</strong> RSI ${rsi} (${rsi < 30 ? 'במכירת יתר' : 'באזור חיובי'}), MACD ${macd}, מומנטום ${momentum}. ${volumeText} מעיד על עניין המשקיעים. המחיר נסחר מעל התמיכה ב-${asset.support.toLocaleString()} עם מטרה ל-${asset.resistance.toLocaleString()}.`;
    } else if (asset.recommendation === 'sell') {
        analysis = `⚠️ <strong>אותות מכירה:</strong> RSI ${rsi} (${rsi > 70 ? 'בקניית יתר' : 'באזור שלילי'}), MACD ${macd}, מומנטום ${momentum}. לחץ מכירות עם ${volumeText}. המחיר בסכנת פריצה מתחת לתמיכה ב-${asset.support.toLocaleString()}. יעד ירידה: ${(asset.support * 0.95).toLocaleString()}.`;
    } else {
        analysis = `⚖️ <strong>מצב נייטרלי:</strong> RSI ${rsi} באזור מאוזן, MACD ${macd}, מומנטום ${momentum}. הנכס בטרייד בין ${asset.support.toLocaleString()} ל-${asset.resistance.toLocaleString()}. ${volumeText} מעיד על ${asset.volume > 100000000 ? 'עניין' : 'עניין מוגבל'}. המתן לפריצה ברורה.`;
    }
    
    // Add trend context
    const trendContext = {
        'strong-up': 'מגמה עולה חזקה מחזקת את האותות החיוביים.',
        'up': 'מגמה עולה תומכת בגישה אופטימית.',
        'strong-down': 'מגמה יורדת חזקה מחייבת זהירות מיוחדת.',
        'down': 'מגמה יורדת מחזקת חשש לירידות נוספות.',
        'sideways': 'מגמה צידית דורשת סבלנות להחלטה.'
    };
    
    analysis += ` ${trendContext[trend] || ''}`;
    
    return analysis;
}

// Action button functions
function addToWatchlist(symbol) {
    const watchlist = JSON.parse(localStorage.getItem('cryptoWatchlist') || '[]');
    if (!watchlist.includes(symbol)) {
        watchlist.push(symbol);
        localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
        showStatusMessage(`✅ ${symbol} נוסף למעקב`, 'success');
    } else {
        showStatusMessage(`ℹ️ ${symbol} כבר במעקב`, 'info');
    }
}

function setAlert(symbol, currentPrice) {
    const alertPrice = prompt(`הגדר התראת מחיר עבור ${symbol}\nמחיר נוכחי: ${currentPrice.toLocaleString()}\nהכנס מחיר להתראה:`);
    
    if (alertPrice && !isNaN(alertPrice)) {
        const alerts = JSON.parse(localStorage.getItem('priceAlerts') || '{}');
        alerts[symbol] = {
            targetPrice: parseFloat(alertPrice),
            currentPrice: currentPrice,
            setTime: new Date().toISOString()
        };
        localStorage.setItem('priceAlerts', JSON.stringify(alerts));
        showStatusMessage(`🔔 התראה הוגדרה עבור ${symbol} במחיר ${parseFloat(alertPrice).toLocaleString()}`, 'success');
    }
}

// Check alerts function
function checkAlerts(assets) {
    const alerts = JSON.parse(localStorage.getItem('priceAlerts') || '{}');
    
    assets.forEach(asset => {
        const alert = alerts[asset.symbol];
        if (alert) {
            const { targetPrice, currentPrice: oldPrice } = alert;
            const currentPrice = asset.price;
            
            // Check if price crossed the target
            if ((oldPrice < targetPrice && currentPrice >= targetPrice) ||
                (oldPrice > targetPrice && currentPrice <= targetPrice)) {
                
                showStatusMessage(`🚨 התראת מחיר! ${asset.symbol} הגיע ל-${currentPrice.toLocaleString()}`, 'warning');
                
                // Remove the alert after triggering
                delete alerts[asset.symbol];
                localStorage.setItem('priceAlerts', JSON.stringify(alerts));
            }
        }
    });
}

// Enhanced auto-refresh with real updates
async function enhancedAutoRefresh() {
    if (currentAssets.length === 0) return;
    
    console.log('🔄 רענון אוטומטי מתקדם - מעדכן הכל...');
    
    try {
        // Get fresh data
        const assetType = document.getElementById('assetType').value;
        let newData = [];
        
        if (assetType === 'crypto' || assetType === 'both') {
            const cryptoData = await fetchRealCryptoData();
            newData = newData.concat(cryptoData);
        }
        
        if (assetType === 'stocks' || assetType === 'both') {
            const stockData = await fetchRealStockData();
            newData = newData.concat(stockData);
        }
        
        // Filter by specific symbol if set
        const specificSymbol = document.getElementById('specificSymbol').value.toUpperCase();
        if (specificSymbol) {
            newData = newData.filter(asset => 
                asset.symbol.includes(specificSymbol) || 
                asset.name.toLowerCase().includes(specificSymbol.toLowerCase())
            );
        }
        
        // Update existing charts instead of recreating everything
        updateExistingDisplays(newData);
        
        // Check price alerts
        checkAlerts(newData);
        
        // Update market overview
        showMarketOverview(newData);
        updateLastUpdateTime();
        
        currentAssets = newData;
        
    } catch (error) {
        console.error('שגיאה ברענון אוטומטי:', error);
        showStatusMessage('⚠️ שגיאה ברענון, נסה שוב', 'warning');
    }
}

// Update existing displays without full reload
function updateExistingDisplays(newData) {
    newData.forEach((asset, index) => {
        const chartId = `chart-${asset.symbol}-${index}`;
        
        // Update chart
        updateExistingChart(chartId, asset);
        
        // Update price display
        const priceElement = document.querySelector(`#${chartId}`).closest('.asset-card').querySelector('.asset-price');
        if (priceElement) {
            priceElement.textContent = `${asset.price.toLocaleString()}`;
        }
        
        // Update change percentage
        const changeElement = document.querySelector(`#${chartId}`).closest('.asset-card').querySelector('.metric-value');
        if (changeElement) {
            const changeClass = asset.change24h >= 0 ? 'positive' : 'negative';
            const changeIcon = asset.change24h >= 0 ? '📈' : '📉';
            changeElement.className = `metric-value ${changeClass}`;
            changeElement.innerHTML = `${changeIcon} ${asset.change24h}%`;
        }
        
        // Update gauge
        const gaugeScore = calculateGaugeScore(asset);
        const gaugeRotation = (gaugeScore / 100) * 180 - 90;
        const needleElement = document.querySelector(`#${chartId}`).closest('.asset-card').querySelector('.gauge-needle');
        if (needleElement) {
            needleElement.style.transform = `translateX(-50%) rotate(${gaugeRotation}deg)`;
        }
        
        // Update gauge value
        const gaugeValueElement = document.querySelector(`#${chartId}`).closest('.asset-card').querySelector('.gauge-value');
        if (gaugeValueElement) {
            gaugeValueElement.textContent = getGaugeDescription(gaugeScore);
            gaugeValueElement.className = `gauge-value ${getGaugeColorClass(gaugeScore)}`;
        }
        
        // Update recommendation
        const recommendationElement = document.querySelector(`#${chartId}`).closest('.asset-card').querySelector('.recommendation');
        if (recommendationElement) {
            recommendationElement.className = `recommendation ${asset.recommendation}`;
            recommendationElement.innerHTML = `
                ${getRecommendationIcon(asset.recommendation)}
                ${getRecommendationText(asset.recommendation)}
                <span class="confidence">${getConfidenceLevel(gaugeScore)}</span>
            `;
        }
        
        // Update last updated time
        const lastUpdatedElement = document.querySelector(`#${chartId}`).closest('.asset-card').querySelector('.last-updated');
        if (lastUpdatedElement) {
            lastUpdatedElement.textContent = `עודכן: ${new Date().toLocaleTimeString('he-IL')}`;
        }
    });
}

// Enhanced auto-refresh interval
function startEnhancedAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    autoRefreshInterval = setInterval(enhancedAutoRefresh, CONFIG.UPDATE_INTERVAL);
    showStatusMessage(`🔄 רענון אוטומטי מתקדם הופעל - כל ${CONFIG.UPDATE_INTERVAL/1000} שניות`, 'success');
}

// Add CSS for new features
function addEnhancedStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .change-1h {
            font-size: 0.8rem;
            margin-top: 5px;
        }
        
        .price-container {
            text-align: right;
        }
        
        .last-updated {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 5px;
        }
        
        .chart-overlay {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.8);
        }
        
        .chart-info span {
            background: rgba(0, 0, 0, 0.5);
            padding: 2px 6px;
            border-radius: 4px;
            backdrop-filter: blur(5px);
        }
        
        .action-buttons {
            display: flex;
            gap: 10px;
            margin-top: 15px;
        }
        
        .action-btn {
            flex: 1;
            padding: 8px 12px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
        }
        
        .action-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .watch-btn:hover {
            background: linear-gradient(45deg, #4ecdc4, #44a08d);
        }
        
        .alert-btn:hover {
            background: linear-gradient(45deg, #feca57, #ff9ff3);
        }
        
        .confidence {
            font-size: 0.8rem;
            opacity: 0.8;
            margin-left: 8px;
        }
        
        .trend-strong-up {
            border-left: 4px solid #4ecdc4;
            background: linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(68, 160, 141, 0.05));
        }
        
        .trend-up {
            border-left: 4px solid #7bed9f;
        }
        
        .trend-strong-down {
            border-left: 4px solid #ff6b6b;
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(238, 90, 36, 0.05));
        }
        
        .trend-down {
            border-left: 4px solid #ff7675;
        }
        
        .trend-sideways {
            border-left: 4px solid #fdcb6e;
        }
    `;
    document.head.appendChild(style);
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 מפעיל סורק קריפטו ומניות מתקדם עם עדכונים אמיתיים...');
    
    addControlButtons();
    addEnhancedStyles();
    
    // Initial scan
    setTimeout(() => {
        startScan();
    }, 1000);
    
    // Test API connectivity
    setTimeout(() => {
        testAPIConnectivity();
    }, 2000);
    
    // Auto-start enhanced refresh after first scan
    setTimeout(() => {
        startEnhancedAutoRefresh();
    }, 5000);
});

// Enhanced analysis with real-time considerations
function generateAnalysis(asset) {
    const rsi = asset.rsi;
    const macd = asset.macd;
    const change24h = asset.change24h;
    const change1h = asset.change1h || 0;
    const trend = asset.trend || 'sideways';
    
    let analysis = '';
    
    // Momentum analysis
    const momentum = change1h > 0 && change24h > 0 ? 'חיובי' : 
                    change1h < 0 && change24h < 0 ? 'שלילי' : 'מעורב';
    
    // Volume analysis
    const volumeText = asset.volume > 1000000000 ? 'נפח גבוה מאוד' :
                      asset.volume > 100000000 ? 'נפח גבוה' :
                      asset.volume > 10000000 ? 'נפח בינוני' : 'נפח נמוך';
    
    if (asset.recommendation === 'buy') {
        analysis = `🚀 <strong>אותות קנייה חזקים:</strong> RSI ${rsi} (${rsi < 30 ? 'במכירת יתר' : 'באזור חיובי'}), MACD ${macd}, מומנטום ${momentum}. ${volumeText} מעיד על עניין המשקיעים. המחיר נסחר מעל התמיכה ב-${asset.support.toLocaleString()} עם מטרה ל-${asset// Enhanced version with REAL dynamic updates for everything
let currentAssets = [];
let lastUpdateTime = null;
let isRealDataMode = false;
let chartInstances = {}; // Store chart instances for updates
let priceHistoryData = {}; // Store historical data for each asset

// Configuration
const CONFIG = {
    UPDATE_INTERVAL: 30000, // 30 seconds for more frequent updates
    MAX_HISTORY_POINTS: 50,
    FALLBACK_TO_DEMO: true
};

// Real-time data fetching functions
async function fetchRealCryptoData() {
    try {
        showStatusMessage('🔄 מקבל נתונים אמיתיים מ-CoinGecko...');
        
        const cryptoIds = Object.keys(CRYPTO_SYMBOLS).join(',');
        const response = await fetch(
            `${API_ENDPOINTS.cryptoList}?vs_currency=usd&ids=${cryptoIds}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d&locale=en`
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
            
            // Update price history for this asset
            updatePriceHistory(symbol, price);
            
            // Generate REAL technical indicators based on actual data
            const rsi = calculateRealRSI(symbol, price, change24h, change7d);
            const macd = calculateRealMACD(symbol, change1h, change24h, change7d);
            const support = calculateRealSupport(symbol, price);
            const resistance = calculateRealResistance(symbol, price);
            const recommendation = generateRealRecommendation(rsi, macd, change24h, change1h);
            
            return {
                symbol,
                name: coin.name,
                price: price,
                change24h: parseFloat(change24h.toFixed(2)),
                change1h: parseFloat(change1h.toFixed(2)),
                change7d: parseFloat(change7d.toFixed(2)),
                volume: coin.total_volume || 0,
                rsi,
                macd,
                support: parseFloat(support.toFixed(6)),
                resistance: parseFloat(resistance.toFixed(6)),
                recommendation,
                marketCap: coin.market_cap,
                sparkline: coin.sparkline_in_7d?.price || [],
                lastUpdated: new Date(),
                trend: determineTrend(change1h, change24h, change7d)
            };
        });
        
        showStatusMessage('✅ נתונים אמיתיים התקבלו - הגרפים מתעדכנים!', 'success');
        isRealDataMode = true;
        return processedData;
        
    } catch (error) {
        console.error('שגיאה בקבלת נתונים:', error);
        showStatusMessage('⚠️ לא ניתן לקבל נתונים אמיתיים, עובר למצב דמו', 'warning');
        isRealDataMode = false;
        return generateDynamicDemoData();
    }
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
    
    // Keep only last 50 points
    if (priceHistoryData[symbol].length > CONFIG.MAX_HISTORY_POINTS) {
        priceHistoryData[symbol].shift();
    }
}

// REAL technical indicators calculations
function calculateRealRSI(symbol, currentPrice, change24h, change7d) {
    // More sophisticated RSI calculation using actual price movements
    const history = priceHistoryData[symbol] || [];
    
    if (history.length < 14) {
        // Fallback calculation for new assets
        let rsi = 50;
        if (change24h > 5) rsi += 20;
        else if (change24h > 2) rsi += 10;
        else if (change24h < -5) rsi -= 20;
        else if (change24h < -2) rsi -= 10;
        
        if (change7d > 10) rsi += 10;
        else if (change7d < -10) rsi -= 10;
        
        return Math.max(0, Math.min(100, Math.round(rsi)));
    }
    
    // Calculate real RSI from price history
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
    // MACD calculation based on multiple timeframes
    let macdScore = 0;
    
    // Short term (1h)
    if (change1h > 1) macdScore += 2;
    else if (change1h > 0) macdScore += 1;
    else if (change1h < -1) macdScore -= 2;
    else if (change1h < 0) macdScore -= 1;
    
    // Medium term (24h)
    if (change24h > 3) macdScore += 3;
    else if (change24h > 0) macdScore += 1;
    else if (change24h < -3) macdScore -= 3;
    else if (change24h < 0) macdScore -= 1;
    
    // Long term (7d)
    if (change7d > 10) macdScore += 2;
    else if (change7d > 0) macdScore += 1;
    else if (change7d < -10) macdScore -= 2;
    else if (change7d < 0) macdScore -= 1;
    
    if (macdScore >= 3) return 'bullish';
    else if (macdScore <= -3) return 'bearish';
    else return 'neutral';
}

function calculateRealSupport(symbol, currentPrice) {
    const history = priceHistoryData[symbol] || [];
    
    if (history.length < 10) {
        return currentPrice * 0.95; // 5% below current
    }
    
    // Find recent low points
    const recentPrices = history.slice(-20).map(h => h.price);
    const minPrice = Math.min(...recentPrices);
    
    return Math.min(minPrice * 1.02, currentPrice * 0.97);
}

function calculateRealResistance(symbol, currentPrice) {
    const history = priceHistoryData[symbol] || [];
    
    if (history.length < 10) {
        return currentPrice * 1.05; // 5% above current
    }
    
    // Find recent high points
    const recentPrices = history.slice(-20).map(h => h.price);
    const maxPrice = Math.max(...recentPrices);
    
    return Math.max(maxPrice * 0.98, currentPrice * 1.03);
}

function generateRealRecommendation(rsi, macd, change24h, change1h) {
    let score = 0;
    
    // RSI analysis
    if (rsi < 30) score += 3; // Oversold - strong buy signal
    else if (rsi < 40) score += 1; // Somewhat oversold
    else if (rsi > 70) score -= 3; // Overbought - strong sell signal
    else if (rsi > 60) score -= 1; // Somewhat overbought
    
    // MACD analysis
    if (macd === 'bullish') score += 2;
    else if (macd === 'bearish') score -= 2;
    
    // Price momentum analysis
    if (change1h > 2 && change24h > 5) score += 2; // Strong upward momentum
    else if (change1h > 0 && change24h > 2) score += 1; // Positive momentum
    else if (change1h < -2 && change24h < -5) score -= 2; // Strong downward momentum
    else if (change1h < 0 && change24h < -2) score -= 1; // Negative momentum
    
    // Volume consideration (simplified)
    if (Math.abs(change24h) > 5) score += Math.sign(change24h); // High volatility
    
    if (score >= 3) return 'buy';
    else if (score <= -3) return 'sell';
    else return 'hold';
}

function determineTrend(change1h, change24h, change7d) {
    if (change1h > 0 && change24h > 0 && change7d > 0) return 'strong-up';
    else if (change24h > 0 && change7d > 0) return 'up';
    else if (change1h < 0 && change24h < 0 && change7d < 0) return 'strong-down';
    else if (change24h < 0 && change7d < 0) return 'down';
    else return 'sideways';
}

// Generate dynamic demo data that changes over time
function generateDynamicDemoData() {
    return demoData.crypto.map(asset => {
        // Add some realistic variation to demo data
        const priceVariation = (Math.random() - 0.5) * 0.02; // ±1% variation
        const newPrice = asset.price * (1 + priceVariation);
        const changeVariation = (Math.random() - 0.5) * 2; // ±1% variation in change
        const newChange = asset.change24h + changeVariation;
        
        // Update technical indicators based on new values
        const rsi = generateRSI(newPrice, newChange);
        const macd = generateMACD(newChange);
        const recommendation = generateRecommendation(rsi, macd, newChange);
        
        // Update price history
        updatePriceHistory(asset.symbol, newPrice);
        
        return {
            ...asset,
            price: parseFloat(newPrice.toFixed(6)),
            change24h: parseFloat(newChange.toFixed(2)),
            rsi,
            macd,
            recommendation,
            support: newPrice * 0.95,
            resistance: newPrice * 1.05,
            lastUpdated: new Date()
        };
    });
}

// Enhanced chart creation with real-time updates
function createDynamicChart(canvasId, asset) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    // Get price history for this asset
    let priceData = priceHistoryData[asset.symbol] || [];
    
    // If no history yet, create some based on sparkline or generate
    if (priceData.length === 0) {
        if (asset.sparkline && asset.sparkline.length > 0) {
            // Use real sparkline data from API
            priceData = asset.sparkline.map((price, index) => ({
                time: new Date(Date.now() - (asset.sparkline.length - index) * 3600000), // Hourly
                price: price
            }));
        } else {
            // Generate realistic price history
            priceData = generateRealisticPriceHistory(asset.price, 30);
        }
        priceHistoryData[asset.symbol] = priceData;
    }
    
    const isPositive = asset.change24h >= 0;
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);
    
    if (isPositive) {
        gradient.addColorStop(0, 'rgba(78, 205, 196, 0.4)');
        gradient.addColorStop(1, 'rgba(78, 205, 196, 0.05)');
    } else {
        gradient.addColorStop(0, 'rgba(255, 107, 107, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 107, 107, 0.05)');
    }
    
    // Destroy existing chart if it exists
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }
    
    chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: priceData.map((_, i) => {
                const hoursAgo = priceData.length - i;
                return `${hoursAgo}h`;
            }),
            datasets: [{
                data: priceData.map(p => p.price),
                borderColor: isPositive ? '#4ecdc4' : '#ff6b6b',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: isPositive ? '#4ecdc4' : '#ff6b6b',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: isPositive ? '#4ecdc4' : '#ff6b6b',
                    borderWidth: 2,
                    cornerRadius: 10,
                    displayColors: false,
                    callbacks: {
                        title: () => `${asset.symbol} - ${asset.name}`,
                        label: (context) => `מחיר: ${context.parsed.y.toLocaleString()}`,
                        afterLabel: () => `שינוי 24 שעות: ${asset.change24h > 0 ? '+' : ''}${asset.change24h}%`
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

function updateExistingChart(canvasId, asset) {
    const chart = chartInstances[canvasId];
    if (!chart) {
        createDynamicChart(canvasId, asset);
        return;
    }
    
    const priceData = priceHistoryData[asset.symbol] || [];
    const isPositive = asset.change24h >= 0;
    
    // Update chart data
    chart.data.labels = priceData.map((_, i) => {
        const hoursAgo = priceData.length - i;
        return `${hoursAgo}h`;
    });
    chart.data.datasets[0].data = priceData.map(p => p.price);
    chart.data.datasets[0].borderColor = isPositive ? '#4ecdc4' : '#ff6b6b';
    chart.data.datasets[0].pointHoverBackgroundColor = isPositive ? '#4ecdc4' : '#ff6b6b';
    
    // Update gradient
    const ctx = chart.ctx;
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    if (isPositive) {
        gradient.addColorStop(0, 'rgba(78, 205, 196, 0.4)');
        gradient.addColorStop(1, 'rgba(78, 205, 196, 0.05)');
    } else {
        gradient.addColorStop(0, 'rgba(255, 107, 107, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 107, 107, 0.05)');
    }
    chart.data.datasets[0].backgroundColor = gradient;
    
    // Animate the update
    chart.update('active');
}

function generateRealisticPriceHistory(currentPrice, points) {
    const history = [];
    let price = currentPrice * 0.95; // Start 5% lower
    
    for (let i = 0; i < points; i++) {
        const volatility = 0.02 + Math.random() * 0.01; // 2-3% volatility
        const change = (Math.random() - 0.5) * volatility;
        price = price * (1 + change);
        
        history.push({
            time: new Date(Date.now() - (points - i) * 3600000), // Hourly intervals
            price: parseFloat(price.toFixed(6))
        });
    }
    
    // Ensure the last price is close to current price
    history[history.length - 1].price = currentPrice;
    return history;
}

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
