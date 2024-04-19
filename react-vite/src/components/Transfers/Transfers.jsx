import "./Transfers.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchCash } from "../../redux/portfolio";
import OpenModalButton from "../OpenModalButton"
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import { fetchTransfers } from "../../redux/portfolio";
export default function Transfers() {
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const buying_power = useSelector((state) => state.portfolio.purchasing_power);
    const transfers = useSelector((state) => state.portfolio.transfers)
    useEffect(() => {
        dispatch(fetchCash());
        dispatch(fetchTransfers());
    }, [dispatch]);
    return (
        <div className="transfers-page">
            <div className="transfer-actions">
                <h1>Start a Transfer</h1>
                <h2>Withdrawable Cash: {currencyFormat.format(buying_power)}</h2>
                <div className="actions">
                    <OpenModalButton
                        buttonText="Deposit"
                        modalComponent={<DepositModal />}
                    />
                    <OpenModalButton
                        modalComponent={<WithdrawModal cash={buying_power} />}
                        buttonText="Withdraw"
                    />
                </div>
            </div>
            <div className="transfer-history">
                <h2>Transfer History</h2>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Transfer Date</th>
                            <th scope="col">Transfer Type</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {transfers?.map((transfer, index) => (
                    <tr key={index}>
                        <th scope="row">{transfer.placed_on.split(", ")[1].slice(0,11)}</th>
                        <td>{transfer.quantity > 0 ? "Deposit" : "Withdrawal"}</td>
                        <td>{currencyFormat.format(Math.abs(transfer.quantity))}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
