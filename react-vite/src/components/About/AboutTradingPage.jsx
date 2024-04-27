import "./About.css"
export default function AboutTradingPage() {
    return (
    <div className="about-page">
        <img src="https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg" alt="stonks-logo" />
        <h2>Mock Trading Features</h2>
        <div className="about-article">
            <h3>Placing Buy and Sell Orders:</h3>
            <p>Stonk Trader 3000 offers a robust mock trading environment where users can simulate buying and selling all S&P 500 stocks without any financial risk. This feature enables users to practice trading strategies and make investment decisions based on available market data and provides a realistic trading experience that mirrors real-world trading platforms.</p>
        </div>
        <div className="about-article">
            <h3>Mock Deposit and Withdrawals</h3>
            <p>To enhance the realism of the trading simulation, Stonk Trader 3000 includes features for mock deposits and withdrawals, allowing users to manage their virtual cash balances as they would in an actual brokerage account. This functionality helps users understand cash flow management in trading, including the impact of buying power and margin requirements on their trading strategies. Users can experiment with different levels of capital to see how it would potentially affect their trading decisions and risk management practices.</p>
        </div>
        <div className="about-article">
            <h3>Advanced Portfolio Metrics</h3>
            <p>One of the standout features of Stonk Trader 3000 is its ability to provide advanced calculations of portfolio metrics. This includes more accurate and detailed assessments of total return. Users also have the option to view these metrics in dollar amounts or percentage terms, offering flexibility in how financial performance is assessed and understood. This advanced analysis helps users refine their investment strategies by providing deeper insights into the strengths and weaknesses of their mock portfolios.</p>
        </div>
    </div>
        )
}
