import Plot from "react-plotly.js";
import { useState } from "react";

export default function PortfolioChart({portfolio}) {
    if (portfolio.length < 1) return <h2>No Orders Placed</h2>
    const [returns, setReturns] = useState("$")
    const [x, dollars, percents] = [[],[],[]];
    portfolio.forEach(({ Date, cum_gl, cum_ret }) => {
        x.push(Date);
        dollars.push(Number(cum_gl));
        percents.push(Number(cum_ret) * 100);
    });
    const handleReturns = (e) => {
        setReturns(e.target.value)
    }
    return (
        <>
        { returns == "%" ? (
            <>
            <Plot
            className="portfolio-chart"
            data={[
                {
                    x,
                    y: percents,
                    line: {color: 'green'},
                    type: 'line',
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
                    ticksuffix: " %",
                    color: "white",
                    autorange: true,
                    fixedrange: false,
                    rangemode: "normal"
                }
            } }
        />
        <div className="range-selector">
            <button className={returns == "%" ? "selected" : ""}value={"%"} onClick={(e) => handleReturns(e)}>%</button>
            <button className={returns =="$" ? "selected" : ""}value={"$"} onClick={(e) => handleReturns(e)}>$</button>
        </div>
        </>
        ) :
        (
            <>
            <Plot
            className="portfolio-chart"
            data={[
                {
                    x,
                    y: dollars,
                    line: {color: 'green'},
                    type: 'line',
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
            <button className={returns == "%" ? "selected" : ""}value={"%"} onClick={(e) => handleReturns(e)}>%</button>
            <button className={returns =="$" ? "selected" : ""}value={"$"} onClick={(e) => handleReturns(e)}>$</button>
        </div>
        </>
        )}

        </>
        )
}
