import "./AccountSummary.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchCash, fetchValue } from "../../redux/portfolio";
export default function AccountSummary() {
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const buying_power = useSelector((state) => state.portfolio.purchasing_power);
    const portfolio_value = useSelector((state) => state.portfolio.portfolio_value);
    useEffect(() => {
        dispatch(fetchCash());
        dispatch(fetchValue());
    }, [dispatch]);
    return (
        <div className="account-summary-page">
            <div className="account-value">
                <h3>Total Portfolio Value</h3>
                <h2>{currencyFormat.format(portfolio_value)}</h2>
            </div>
            <div className="account-cash">
                <h3>Individual Cash</h3>
                <h2>{currencyFormat.format(buying_power)}</h2>
            </div>
        </div>
    )
}
