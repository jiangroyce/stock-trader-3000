import Plot from "react-plotly.js";
import { useState } from "react";

export default function StockChart({stock}) {
    const [horizon, setHorizon] = useState(true)
    const [dateRange, setDateRange] = useState(1.0);
    const [selected, setSelected] = useState(1);
    const stockData = stock.history;
    const dataStart = stockData.length * dateRange;
    const data = stockData.slice(Math.floor(stockData.length - dataStart));
    const [x, open, high, low, close] = [[],[],[],[],[]];
    if (horizon) {
        data.forEach(({ Date, Open, High, Low, Close }) => {
            x.push(Date);
            open.push(Number(Open));
            high.push(Number(High));
            low.push(Number(Low));
            close.push(Number(Close));
        });
    } else {
        if (horizon == 0.1) {
            const daily = JSON.parse(stock["1d"])
            daily.forEach(({ Date, Open, High, Low, Close }) => {
                x.push(Date);
                open.push(Number(Open));
                high.push(Number(High));
                low.push(Number(Low));
                close.push(Number(Close));
            });
        } else {
            const weekly = JSON.parse(stock["1w"])
            weekly.forEach(({ Date, Open, High, Low, Close }) => {
                x.push(Date);
                open.push(Number(Open));
                high.push(Number(High));
                low.push(Number(Low));
                close.push(Number(Close));
            });
        }
    }

    const handleRange = (e) => {
        if (e.target.value >= 1) {
            setHorizon(true)
            setSelected(e.target.value);
            setDateRange(1/e.target.value);
        } else {
            setHorizon(false);
            setSelected(e.target.value);
        }
    }
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
                        x: -0.02,
                        y: -0.1,
                        buttons:
                        [{
                            step: 'month',
                            stepmode: 'backward',
                            count: 1,
                            label: "1M"
                        }]
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
            {/* <button className={selected == 0.1 ? "selected" : ""}value={0.1} onClick={(e) => handleRange(e)}>1D</button>
            <button className={selected == 0.5 ? "selected" : ""}value={0.5} onClick={(e) => handleRange(e)}>1W</button> */}
            <button className={selected == 24 ? "selected" : ""}value={24} onClick={(e) => handleRange(e)}>1M</button>
            <button className={selected == 8 ? "selected" : ""}value={8} onClick={(e) => handleRange(e)}>3M</button>
            <button className={selected == 4 ? "selected" : ""}value={4} onClick={(e) => handleRange(e)}>6M</button>
            <button className={selected == 2 ? "selected" : ""}value={2} onClick={(e) => handleRange(e)}>1Y</button>
            <button className={selected == 1 ? "selected" : ""}value={1} onClick={(e) => handleRange(e)}>MAX</button>
        </div>
        </>
        )
}
