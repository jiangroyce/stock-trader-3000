import Plot from "react-plotly.js";

export default function MiniChart({stock}) {
    const data = stock.history;
    const [x, y] = [[],[]];
    const color = stock.past_day_return > 0 ? "green" : "red";
    data.forEach(({ Date, Close }) => {
        x.push(Date);
        y.push(Number(Close));
    });

    return (
        <>
        <Plot
            className="mini-chart"
            config={{staticPlot: true}}
            data={[
                {
                    x,
                    y,
                    line: {color: color},
                    type: 'line',
                    xaxis: 'x',
                    yaxis: 'y'
                }]}
            layout={
                {
                    paper_bgcolor:"rgba(0,0,0,0)",
                    plot_bgcolor:"rgba(0,0,0,0)",
                    margin: {
                        t: 0,
                        b: 0,
                        l: 0,
                        r: 0
                    },
                    width: 60,
                    height: 20,
                    hovermode: false,
                    xaxis: {
                        visible: false,
                        rangebreaks: [
                        {bounds: ["sat", "mon"]},
                        {values: ["2022-01-17", "2022-02-21", "2022-04-15", "2022-05-30", "2022-06-20", "2022-07-04", "2022-09-05", "2022-11-24", "2022-12-26",
                                "2023-01-16", "2023-02-20", "2023-04-07", "2023-05-29", "2023-06-19", "2023-07-04", "2023-09-04", "2023-11-23", "2023-12-25",
                                "2024-01-01", "2024-01-15", "2024-02-19", "2024-03-29", "2024-05-27", "2024-06-19", "2024-07-04", "2024-09-02", "2024-11-28", "2024-12-25"]}
                        ]
                    },
                    yaxis: {
                        showgrid: false,
                        visible: false,
                        zeroline: false
                    }
                } }
        />
        </>
        )
}
