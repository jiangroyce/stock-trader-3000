import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addCash } from "../../redux/portfolio";
import "./Transfers.css"
function WithdrawModal({cash}) {
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (amount > cash) {
            return setErrors({
                funds: "Amount exceeds available cash"
            });
        };
        if (amount <= 0) {
            return setErrors({
                funds: "Amount must be greater than 0"
            });
        };

        const response = await dispatch(addCash(-amount));
        if (response) setErrors(response)
        else closeModal();
    };

    return (
        <div className="transfer-modal">
            <h1>Withdraw Funds</h1>
            <div>Available Cash: {currencyFormat.format(cash)}</div>
            <label>
                Withdrawal Amount:
                <input
                 type="number"
                 value={amount}
                 onChange={e => setAmount(e.target.value)}
                 min={0}
                 required
                />
            </label>
            {errors.funds && <p>{errors.funds}</p>}
            <div className="actions">
                <button onClick={handleSubmit}>Withdraw</button>
            </div>
        </div>
    )
}

export default WithdrawModal;
