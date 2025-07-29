// Sample data - in real implementation, this would come from APIs
const cryptoData = [
    {
        symbol: 'BTC',
        name: 'Bitcoin',
        price: 43250,
        change24h: 2.4,
        volume: 28500000000,
        rsi: 65,
        macd: 'bullish',
        support: 42000,
        resistance: 45000,
        recommendation: 'buy'
    },
    {
        symbol: 'ETH',
        name: 'Ethereum',
        price: 2850,
        change24h: -1.2,
        volume: 12300000000,
        rsi: 45,
        macd: 'bearish',
        support: 2750,
        resistance: 2950,
        recommendation: 'hold'
    },
    {
        symbol: 'ADA',
        name: 'Cardano',
        price: 0.52,
        change24h: 5.7,
        volume: 850000000,
        rsi: 72,
        macd: 'bullish',
        support: 0.48,
        resistance: 0.58,
        recommendation: 'buy'
    }
];

const stockData = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 192.45,
        change24h: 1.8,
        volume: 45000000,
        rsi: 58,
        macd: 'bullish',
        support: 185,
        resistance: 200,
        recommendation: 'buy'
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corp.',
        price: 415.32,
        change24h: 2.1,
        volume: 28000000,
        rsi: 62,
        macd: 'bullish',
        support: 405,
        resistance: 425,
        recommendation: 'buy'
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        price: 138.75,
        change24h: -0.8,
        volume: 35000000,
        rsi: 52,
        macd: 'neutral',
        support: 135,
        resistance: 145,
        recommendation: 'hold'
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        price: 153.89,
        change24h: 1.5,
        volume: 42000000,
        rsi: 55,
        macd: 'bullish',
        support: 148,
        resistance: 160,
        recommendation: 'buy'
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        price: 248.73,
        change24h: -3.2,
        volume: 78000000,
        rsi: 35,
        macd: 'bearish',
        support: 235,
        resistance: 265,
        recommendation: 'sell'
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corp.',
        price: 875.25,
        change24h: 4.1,
        volume: 32000000,
        rsi: 68,
        macd: 'bullish',
        support: 850,
        resistance: 900,
        recommendation: 'buy'
    },
    {
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        price: 485.67,
        change24h: 0.9,
        volume: 25000000,
        rsi: 59,
        macd: 'bullish',
        support: 470,
        resistance: 500,
        recommendation: 'buy'
    },
    {
        symbol: 'BRK.B',
        name: 'Berkshire Hathaway Inc.',
        price: 421.85,
        change24h: 0.3,
        volume: 8000000,
        rsi: 48,
        macd: 'neutral',
        support: 415,
        resistance: 430,
        recommendation: 'hold'
    },
    {
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        price: 178.92,
        change24h: -1.1,
        volume: 15000000,
        rsi: 43,
        macd: 'bearish',
        support: 172,
        resistance: 185,
        recommendation: 'hold'
    },
    {
        symbol: 'JNJ',
        name: 'Johnson & Johnson',
        price: 162.43,
        change24h: 0.7,
        volume: 12000000,
        rsi: 51,
        macd: 'neutral',
        support: 158,
        resistance: 168,
        recommendation: 'hold'
    },
    {
        symbol: 'V',
        name: 'Visa Inc.',
        price: 265.78,
        change24h: 1.3,
        volume: 18000000,
        rsi: 61,
        macd: 'bullish',
        support: 260,
        resistance: 275,
        recommendation: 'buy'
    },
    {
        symbol: 'PG',
        name: 'Procter & Gamble Co.',
        price: 152.19,
        change24h: -0.2,
        volume: 9000000,
        rsi: 49,
        macd: 'neutral',
        support: 148,
        resistance: 157,
        recommendation: 'hold'
    },
    {
        symbol: 'UNH',
        name: 'UnitedHealth Group Inc.',
        price: 523.45,
        change24h: 0.8,
        volume: 7000000,
        rsi: 54,
        macd: 'bullish',
        support: 515,
        resistance: 535,
        recommendation: 'buy'
    },
    {
        symbol: 'HD',
        name: 'Home Depot Inc.',
        price: 368.91,
        change24h: -0.6,
        volume: 11000000,
        rsi: 46,
        macd: 'neutral',
        support: 360,
        resistance: 380,
        recommendation: 'hold'
    },
    {
        symbol: 'MA',
        name: 'Mastercard Inc.',
        price: 452.33,
        change24h: 1.7,
        volume: 14000000,
        rsi: 63,
        macd: 'bullish',
        support: 445,
        resistance: 465,
        recommendation: 'buy'
    },
    {
        symbol: 'BAC',
        name: 'Bank of America Corp.',
        price: 34.56,
        change24h: -1.8,
        volume: 65000000,
        rsi: 38,
        macd: 'bearish',
        support: 32,
        resistance: 37,
        recommendation: 'sell'
    },
    {
        symbol: 'PFE',
        name: 'Pfizer Inc.',
        price: 28.74,
        change24h: 0.4,
        volume: 22000000,
        rsi: 47,
        macd: 'neutral',
        support: 27,
        resistance: 31,
        recommendation: 'hold'
    },
    {
        symbol: 'XOM',
        name: 'Exxon Mobil Corp.',
        price: 103.82,
        change24h: 2.3,
        volume: 19000000,
        rsi: 66,
        macd: 'bullish',
        support: 98,
        resistance: 110,
        recommendation: 'buy'
    },
    {
        symbol: 'KO',
        name: 'Coca-Cola Co.',
        price: 59.87,
        change24h: 0.1,
        volume: 16000000,
        rsi: 50,
        macd: 'neutral',
        support: 57,
        resistance: 63,
        recommendation: 'hold'
    },
    {
        symbol: 'DIS',
        name: 'Walt Disney Co.',
        price: 98.45,
        change24h: -2.1,
        volume: 24000000,
        rsi: 41,
        macd: 'bearish',
        support: 92,
        resistance: 105,
        recommendation: 'sell'
    }
];

const newsData = [
    {
        title: 'ביטקוין עולה בעקבות החלטת הפד על הריבית',
        summary: 'מחירי הקריפטו עולים לאחר הודעת הפדרל ריזרב על שמירה על הריבית הנוכחית. השוק מגיב בחיוב לחוסר הוודאות.'
    },
    {
        title: 'אפל מכריזה על מוצרים חדשים בתחום הבינה המלאכותית',
        summary: 'החברה חשפה תוכניות להשקעה של 10 מיליארד דולר בפיתוח טכנולוגיות AI חדשות. המניה עולה ב-3% בשעות המסחר המורחבות.'
    },
    {
        title: 'אתריום מתכונן לעדכון טכני משמעותי',
        summary: 'השדרוג הטכני הצפוי עשוי לשפר את יעילות הרשת ולהוריד עמלות. מומחים חוזים עלייה במחיר ETH.'
    }
];

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
                asset.symbol.includes(specificSymbol)
            );
        }
        
        displayResults(dataToShow);
        showNews();
    }, 2000);
}

function showLoading() {
    document.getElementById('results').innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>סורק את השווקים ומנתח נתונים...</p>
        </div>
    `;
}

function displayResults(data) {
    const resultsDiv = document.getElementById('results');
    
    if (data.length === 0) {
        resultsDiv.innerHTML = '<div class="loading"><p>לא נמצאו נתונים עבור הסמל שצוין</p></div>';
        return;
    }
    
    const resultsHTML = data.map(asset => {
        const analysis = generateAnalysis(asset);
        const changeClass = asset.change24h >= 0 ? 'positive' : 'negative';
        const changeIcon = asset.change24h >= 0 ? '📈' : '📉';
        const gaugeScore = calculateGaugeScore(asset);
        const gaugeRotation = (gaugeScore / 100) * 180 - 90; // -90 to 90 degrees
        
        return `
            <div class="asset-card">
                <div class="asset-header">
                    <div class="asset-name">${asset.symbol} - ${asset.name}</div>
                    <div class="asset-price">$${asset.price.toLocaleString()}</div>
                </div>
                
                <div class="gauge-container">
                    <div class="gauge-title">מדד השקעה</div>
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
                    ${getRecommendationText(asset.recommendation)} ${getRecommendationIcon(asset.recommendation)}
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
                        <div class="metric-value">$${asset.support.toLocaleString()}</div>
                    </div>
                    
                    <div class="metric">
                        <div class="metric-label">התנגדות</div>
                        <div class="metric-value">$${asset.resistance.toLocaleString()}</div>
                    </div>
                </div>
                
                <div class="analysis">
                    <strong>ניתוח טכני:</strong><br>
                    ${analysis}
                </div>
            </div>
        `;
    }).join('');
    
    resultsDiv.innerHTML = `<div class="results-grid">${resultsHTML}</div>`;
}

function generateAnalysis(asset) {
    let analysis = '';
    
    if (asset.recommendation === 'buy') {
        analysis = `הנכס מציג מגמה חיובית עם RSI של ${asset.rsi} ו-MACD ${asset.macd}. המחיר נסחר מעל קו התמיכה ב-$${asset.support.toLocaleString()}. הנפח הגבוה של $${(asset.volume/1000000000).toFixed(1)}B מעיד על עניין רב מצד המשקיעים.`;
    } else if (asset.recommendation === 'sell') {
        analysis = `הנכס מציג חולשה טכנית עם RSI של ${asset.rsi} ו-MACD ${asset.macd}. המחיר מתקרב לקו התמיכה ויכול לפרוץ מטה. מומלץ לשקול מכירה או הגדרת הפסקת הפסד.`;
    } else {
        analysis = `הנכס בטווח טרייד בין התמיכה ($${asset.support.toLocaleString()}) להתנגדות ($${asset.resistance.toLocaleString()}). RSI של ${asset.rsi} מעיד על מצב נייטרלי. מומלץ להמתין לפריצה ברורה.`;
    }
    
    return analysis;
}

function getRecommendationText(rec) {
    switch(rec) {
        case 'buy': return 'קנייה';
        case 'sell': return 'מכירה';
        case 'hold': return 'החזקה';
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
            <div class="news-title">${news.title}</div>
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
        startScan();
    }
}, 300000);
