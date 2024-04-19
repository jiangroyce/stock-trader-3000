import "./AccountSummary.css"
import { useSelector, useDispatch } from "react-redux"
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react"
import { fetchPortfolio } from "../../redux/portfolio";
import Loading from "../Loading";
export default function AccountSummary() {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch();
    const portfolio = useSelector((state) => state.portfolio.portfolio);
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    useEffect(() => {
        dispatch(fetchPortfolio()).then(setLoaded(true))
    }, [dispatch]);
    if (!loaded) return <Loading />
    else return (
        <div className="account-summary-page">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Ticker</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Last Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total $ Change</th>
                        <th scope="col">Total % Change</th>
                        <th scope="col">Current Value</th>
                        <th scope="col">% of Portfolio</th>
                        <th scope="col">Avg Cost Basis</th>
                    </tr>
                </thead>
                <tbody>
                    {portfolio?.map((order, index) => (
                        <tr key={index}>
                            <th scope="row">{order.ticker == "-" ? order.ticker : (<NavLink to={`/stocks/${order?.ticker}`}>{order.ticker}</NavLink>)}</th>
                            <td>{order.name}</td>
                            <td>{order.price? currencyFormat.format(order.price): "-"}</td>
                            <td>{order.quantity? order.quantity.toFixed(2) : "-"}</td>
                            <td>{order["GL%"] ? currencyFormat.format(order["GL$"]) : "-"}</td>
                            <td>{order["GL%"] ? (order["GL%"] * 100).toFixed(2) + "%": "-"}</td>
                            <td>{currencyFormat.format(order.value)}</td>
                            <td>{(order.portfolio_weight * 100).toFixed(2)}%</td>
                            <td>{order.cost_basis ? currencyFormat.format(order.cost_basis) : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
