import { useSelector, useDispatch } from "react-redux";
import "./OrderHistory.css"
import { useEffect, useState } from "react";
import { fetchOrders } from "../../redux/order";
import Loading from "../Loading";

export default function OrderHistory() {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"})
    const orders = useSelector((state) => state.orders.orders);

    useEffect(() => {
        dispatch(fetchOrders()).then(setIsLoaded(true))
    }, [dispatch, setIsLoaded])

    if (!isLoaded) return <Loading />
    else return (
        <div className="order-history-page account-page-body">
            <h1>Order History</h1>
            <table>
                <thead>
                    <tr>
                        <th scope="col">Order Number</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Ticker</th>
                        <th scope="col">Cost Basis</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                {orders?.map((order, index) => (
                <tr key={index}>
                    <th scope="row">{order.order_number}</th>
                    <td>{order.placed_on.split(", ")[1].slice(0,11)}</td>
                    <td>{order.stock_ticker}</td>
                    <td>{currencyFormat.format(order.cost_basis)}</td>
                    <td>{order.quantity}</td>
                    <td>{currencyFormat.format(order.cost_basis * order.quantity)}</td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>

    )
}
