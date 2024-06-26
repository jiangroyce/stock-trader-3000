import { useModal } from "../../context/Modal";
import { createOrder } from "../../redux/order";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./PreviewOrderModal.css";

export default function PreviewOrderModal({order, cash}) {
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const placeOrder = async (e) => {
        e.preventDefault();
        const payload = {
            stock_ticker: order.ticker,
            cost_basis: order.price,
            quantity: order.orderType == "Buy" ? order.quantity : -order.quantity
        }
        const response = await dispatch(createOrder(payload));
        if (response.errors) {
            setErrors(response.errors)
        } else {
            closeModal();
            navigate("/account/positions")
        }
    }
    return (
        <div className="preview-order">
            <h2>Preview Order</h2>
            <div>{order.orderType}: {order.quantity.toFixed(2)} shares of {order.ticker}</div>
            <div>at {currencyFormat.format(order.price)}</div>
            <div>Order Total: {currencyFormat.format(order.total)}</div>
            <div>Buying Power Before: {currencyFormat.format(cash)}</div>
            <div>Buying Power After: {currencyFormat.format(cash - (order.orderType == "Buy"? order.total : -order.total))}</div>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    )
}
