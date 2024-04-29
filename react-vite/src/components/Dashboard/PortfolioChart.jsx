import Plot from "react-plotly.js";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import { useState } from "react";

export default function PortfolioChart({portfolio, value, gl, ret}) {
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
    if (portfolio.length < 1) return <h2>No Orders Placed</h2>
    const [returns, setReturns] = useState("$")
    const [x, dollars, percents] = [[],[],[]];
    const percent_color = portfolio[portfolio.length-1].cum_ret > 0 ? "green" : "red";
    const dollar_color = portfolio[portfolio.length-1].cum_gl > 0 ? "green" : "red";
    const [selected, setSelected] = useState(1);
    const [dateRange, setDateRange] = useState(1.0);
    portfolio.forEach(({ Date, cum_gl, cum_ret }) => {
        if (Date != 0) {
            x.push(Date);
            dollars.push(Number(cum_gl));
            percents.push(Number(cum_ret) * 100);
        }
    });
    const handleReturns = (e) => {
        setReturns(e.target.value)
    };
    return (
        <>
        <h2>{currencyFormat.format(value)}</h2>
        { returns == "%" ? (
            <>
            <h3 className={"day-change " + (ret > 0 ? "win" : "lose")}>{ret > 0 ? <FaCaretUp /> : <FaCaretDown />}{Math.abs(ret * 100).toFixed(2)}% <span style={{"color": "white", "marginLeft": "5px", fontWeight: "normal"}}>Today</span></h3>
            <div className="portfolio-display">
                <h3>Display In: </h3>
                <div className="range-selector">
                    <button className={returns == "%" ? "selected" : ""}value={"%"} onClick={(e) => handleReturns(e)}>%</button>
                    <button className={returns =="$" ? "selected" : ""}value={"$"} onClick={(e) => handleReturns(e)}>$</button>
                </div>
            </div>
            <Plot
            className="portfolio-chart"
            data={[
                {
                    x,
                    y: percents,
                    line: {color: percent_color},
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
        </>
        ) :
        (
            <>
            <h3 className={"day-change " + ret > 0 ? "win" : "lose"}>{gl > 0 ? <FaCaretUp /> : <FaCaretDown />}{currencyFormat.format(Math.abs(gl))} <span style={{"color": "white", "marginLeft": "5px", fontWeight: "normal"}}>Today</span></h3>
            <div className="portfolio-display">
                <h3>Display In: </h3>
                <div className="range-selector">
                    <button className={returns == "%" ? "selected" : ""}value={"%"} onClick={(e) => handleReturns(e)}>%</button>
                    <button className={returns =="$" ? "selected" : ""}value={"$"} onClick={(e) => handleReturns(e)}>$</button>
                </div>
            </div>
            <Plot
            className="portfolio-chart"
            data={[
                {
                    x,
                    y: dollars,
                    line: {color: dollar_color},
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
        </>
        )}
        {/* <div className="range-selector">
            <button className={selected == 24 ? "selected" : ""}value={24} onClick={(e) => handleRange(e)}>1D</button>
            <button className={selected == 1 ? "selected" : ""}value={1} onClick={(e) => handleRange(e)}>MAX</button>
        </div> */}
        </>
        )
}
