import Plot from "react-plotly.js";
import { useState } from "react";

export default function StockChart({stock}) {
    const [dateRange, setDateRange] = useState(1.0)
    const stockData = stock.history;
    const dataStart = stockData.length * dateRange;
    const data = stockData.slice(Math.floor(stockData.length - dataStart));
    const [x, open, high, low, close] = [[],[],[],[],[]];
    data.forEach(({ Date, Open, High, Low, Close }) => {
        x.push(Date);
        open.push(Number(Open));
        high.push(Number(High));
        low.push(Number(Low));
        close.push(Number(Close));
    })
    return (
        <>
        <Plot
            className="stock-chart"
            data={[
                {
                    x,
                    open,
                    high,
                    low,
                    close,
                    increasing: {line: {color: 'green'}},
                    decreasing: {line: {color: 'red'}},
                    line: {color: 'black'},
                    type: 'candlestick',
                    xaxis: 'x',
                    yaxis: 'y'
                }]}
            useResizeHandler={true}
            layout={ {
                margin: {
                    t: 0,
                    b: 0,
                    l: 50,
                    r: 0
                },
                paper_bgcolor:"black",
                plot_bgcolor:"black",
                hovermode: "x",
                xaxis: {
                    color: "white",
                    autorange: true,
                    rangeslider: {
                        visible: false
                    },
                    rangeselector: {
                        buttons: []
                    },
                    rangebreaks: [
                        {bounds: ["sat", "mon"]},
                        {values: ["2022-01-17", "2022-02-21", "2022-04-15", "2022-05-30", "2022-06-20", "2022-07-04", "2022-09-05", "2022-11-24", "2022-12-26",
                                "2023-01-16", "2023-02-20", "2023-04-07", "2023-05-29", "2023-06-19", "2023-07-04", "2023-09-04", "2023-11-23", "2023-12-25",
                                "2024-01-01", "2024-01-15", "2024-02-19", "2024-03-29", "2024-05-27", "2024-06-19", "2024-07-04", "2024-09-02", "2024-11-28", "2024-12-25"]}
                    ]
                },
                yaxis: {
                    tickprefix: "$ ",
                    color: "white",
                    autorange: true,
                    fixedrange: false,
                    rangemode: "normal"
                }
            } }
        />
        <div className="range-selector">
            {/* <button>1D</button>
            <button>1W</button> */}
            <button onClick={() => setDateRange(1/24)}>1M</button>
            <button onClick={() => setDateRange(1/8)}>3M</button>
            <button onClick={() => setDateRange(1/4)}>6M</button>
            <button onClick={() => setDateRange(1/2)}>1Y</button>
            <button onClick={() => setDateRange(1)}>MAX</button>
        </div>
        </>
        )
}
