import "./About.css"
export default function ComingSoonPage() {
    return (
    <div className="about-page">
        <img src="https://i.kym-cdn.com/entries/icons/original/000/029/959/Screen_Shot_2019-06-05_at_1.26.32_PM.jpg" alt="stonks-logo" />
        <h2>Exciting Features Coming Soon</h2>
        <div className="about-article">
            <h3>Time Machine:</h3>
            <p>The Time Machine feature will allow users to travel back in time to test trading strategies on historical data. By setting a past date, users can simulate placing buy and sell orders as if they were trading on that day, enabling them to backtest the effectiveness of their strategies over different market conditions. This powerful tool aims to give users a deeper understanding of how their strategies would have performed historically, helping refine their approach and improve future outcomes.</p>
        </div>
        <div className="about-article">
            <h3>Retirement Planning:</h3>
            <p>Stonk Trader 3000 will offer a comprehensive retirement planning tool tailored to the user's financial needs and situations. This feature will guide users through the process of creating custom portfolios designed to meet their long-term financial goals, such as retirement. By inputting personal financial data, desired retirement age, and risk tolerance, the platform will suggest optimal asset allocations and projected outcomes. Additionally, the tool will incorporate strategies for optimizing dividend yields and tax efficiency, essential for maximizing retirement savings. It will consider various factors such as tax brackets, types of investment accounts, and the timing of withdrawals to help minimize tax liabilities and enhance income through dividends, thus ensuring a more financially secure retirement.</p>
        </div>
        <div className="about-article">
            <h3>Portfolio Optimization:</h3>
            <p>Leveraging machine learning and other advanced analytical techniques, the Portfolio Optimization feature will enhance the user’s ability to maximize returns while minimizing risk. This tool will analyze current portfolio holdings and market conditions to suggest adjustments that improve overall portfolio performance based on the user's specified objectives and risk preferences. It will be an essential tool for users seeking to maintain an edge in increasingly complex markets.</p>
        </div>
        <div className="about-article">
            <h3>Machine Learning Stock Recommendations:</h3>
            <p>This feature will utilize machine learning algorithms to analyze vast amounts of market data and generate personalized stock recommendations. By identifying patterns, trends, and correlations that may be invisible to human analysts, this tool will provide users with unique insights and investment opportunities, tailored to their investment style and risk profile.</p>
        </div>
        <div className="about-article">
            <h3>Advanced Portfolio Calculations:</h3>
            <p>The Advanced Portfolio Calculations feature will enhance the platform’s analytical capabilities, providing users with detailed metrics such as drawdowns, risk-adjusted returns, and comprehensive portfolio risk analysis. These tools are designed to give users a granular understanding of the performance and risk characteristics of their portfolios, enabling more informed decision-making and strategic planning.</p>
        </div>
        <div className="about-article">
            <h3>Support Chat Bot:</h3>
            <p>Stonk Trader 3000 will include an intelligent Support Chat Bot, powered by the advanced capabilities of ChatGPT, to assist users with any inquiries they might have while using the platform. This feature will provide real-time, conversational support, offering users immediate answers and guidance on various topics, from navigating the app’s features to understanding complex investment concepts. The chat bot will be designed to learn from interactions, improving its responses over time and ensuring that users receive not only quick but also accurate and contextually relevant information. Whether new to investing or experienced traders, users will find this tool incredibly helpful for resolving issues and enhancing their trading experience.</p>
        </div>
        <div className="about-article">
            <h3>WebSockets Implementation for Real-Time Streaming Data:</h3>
            <p>Stonk Trader 3000 will harness the power of WebSockets technology to provide real-time data streaming, ensuring that users receive immediate updates on stock prices, market changes, and news. This implementation will allow for a seamless and efficient data flow directly to the user’s interface without the need for constant page refreshes. By maintaining a persistent connection between the server and the client, WebSockets will enable the platform to push the latest market information instantly as it happens, enhancing the trading experience by providing up-to-the-minute data that is crucial for making informed trading decisions. This feature is essential for users who rely on timeliness and accuracy, such as day traders and those involved in fast-paced trading environments.</p>
        </div>
    </div>
        )
}
