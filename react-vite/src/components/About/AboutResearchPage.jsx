import "./About.css"
export default function AboutResearchPage() {
    return (
    <div className="about-page">
        <img src="https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg" alt="stonks-logo" />
        <h2>Research Features</h2>
        <div className="about-article">
            <h3>Stock Screeners</h3>
            <p>The stock screener feature in Stonk Trader 3000 is a powerful tool designed to help investors navigate the vast universe of stocks efficiently. With access to real historical data for all S&P 500 stocks, users can apply a variety of filters such as price, volume, market cap, dividend yield, and many other financial metrics to identify stocks that meet specific investment criteria. This functionality is particularly useful for users who want to conduct in-depth market research and refine their investment strategies. The intuitive interface allows for quick adjustments and comparisons, making it easy to explore different scenarios and discover potential investment opportunities.</p>
        </div>
        <div className="about-article">
            <h3>Watchlists</h3>
            <p>The watchlist feature in Stonk Trader 3000 allows users to keep a close eye on their favorite stocks. With full CRUD (Create, Read, Update, Delete) capabilities, users can easily add new stocks to their watchlists, update their preferences, or remove stocks as their investment focus changes. Each watchlist entry provides detailed information, including current stock prices, daily highs and lows, and percentage changes, all updated in real-time. This feature not only helps users monitor selected stocks but also aids in making timely investment decisions based on up-to-date market data. Users can manage multiple watchlists, making it simple to categorize stocks by investment themes or personal strategies.</p>
        </div>
    </div>
        )
}
