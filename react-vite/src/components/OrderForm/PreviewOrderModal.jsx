import { useModal } from "../../context/Modal";
import { createOrder } from "../../redux/order";
import { useDispatch } from "react-redux";
import "./PreviewOrderModal.css";
import { useNavigate } from "react-router-dom";

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
            window.alert("Order Successfully Placed, Redirecting to Dashboard")
            navigate("/dashboard")
        }
    }
    return (
        <div className="preview-order">
            <h2>Preview Order</h2>
            <div>{order.orderType}: {order.quantity.toFixed(2)} shares of {order.ticker} Stock at {currencyFormat.format(order.price)}</div>
            <div>Order Total: {currencyFormat.format(order.total)}</div>
            <div>Buying Power: {currencyFormat.format(cash)}</div>
            <div>Buying Power after Order: {currencyFormat.format(cash - Math.abs(order.total))}</div>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    )
}
