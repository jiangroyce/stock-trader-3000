import "./Transfers.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchCash } from "../../redux/portfolio";
import OpenModalButton from "../OpenModalButton"
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
export default function Transfers() {
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const buying_power = useSelector((state) => state.portfolio.purchasing_power);

    useEffect(() => {
        dispatch(fetchCash());
    }, [dispatch]);
    return (
        <div className="transfers-page">
            <h1>Start a Transfer</h1>
            <h2>Withdrawable Cash: {currencyFormat.format(buying_power)}</h2>
            <div className="transfers-actions">
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
    )
}
