import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addCash } from "../../redux/portfolio";
import "./Transfers.css"
function DepositModal() {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (amount <= 0) {
            return setErrors({
                funds: "Amount must be greater than 0"
            });
        };

        const response = await dispatch(addCash(amount));
        if (response) setErrors(response)
        else closeModal();
    };

    return (
        <div className="transfer-modal">
            <h1>Deposit Funds</h1>
            <label>
                Deposit Amount:
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
                <button onClick={handleSubmit}>Deposit</button>
            </div>
        </div>
    )
}

export default DepositModal;
