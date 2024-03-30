import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../../redux/order";
import { fetchCash } from "../../redux/portfolio";
import OpenModalButton from "../OpenModalButton";
import PreviewOrderModal from "./PreviewOrderModal";
import "./OrderForm.css";

function OrderForm({stock}) {
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const buying_power = useSelector((state) => state.portfolio.purchasing_power)
    const [orderType, setOrderType] = useState("Buy");
    const [quantityType, setQuantityType] = useState("Shares");
    const [quantity, setQuantity] = useState(0);
    // const [orderLimit, setOrderLimit] = useState("Market");
    // const [orderConditions, setOrderConditions] = useState({});
    const [orderTotal, setOrderTotal] = useState(0);
    const [errors, setErrors] = useState({});
    const [order, setOrder] = useState({});

    let total = quantityType == "Shares" ? quantity * stock?.price : quantity;
    const calcOrder = (total) => {
        setErrors({})
        if (total > buying_power) setErrors({"funds": "Not Enough Funds"})
        const payload = {
            orderType,
            ticker: stock.ticker,
            price: stock.price,
            quantity: quantityType == "Shares" ? quantity : quantity/stock.price,
            total: total
        }
        setOrderTotal(total);
        setOrder(payload);
    }

    const previewOrder = (e) => {
        e.preventDefault();
        setErrors({})
    }
    useEffect(() => {
        dispatch(fetchCash());
    }, [dispatch])
    return (
        <form className="order-form" onSubmit={previewOrder}>
                        <div className="order-header">
                            <h2>Trade {stock?.ticker}</h2>
                            <div>Buying Power: {buying_power ? currencyFormat.format(buying_power) : "-"}</div>
                        </div>
                        <div className="order-types">
                            <div className={"order-type-button " + (orderType == "Buy" ? "selected" : "")} onClick={()=>setOrderType("Buy")}>Buy</div>
                            <div className={"order-type-button " + (orderType == "Sell" ? "selected" : "")} onClick={()=>setOrderType("Sell")}>Sell</div>
                        </div>
                        <div className="order-quantity">
                            <div className="order-types">
                            <div className={"order-type-button " + (quantityType == "Shares" ? "selected" : "")} onClick={()=>setQuantityType("Shares")}>Shares</div>
                            <div className={"order-type-button " + (quantityType == "Dollars" ? "selected" : "")} onClick={()=>setQuantityType("Dollars")}>Dollars</div>
                            </div>
                            <input
                                type="number"
                                placeholder={quantityType == "Shares" ? "# of Shares" : "$ Dollars"}
                                onBlur={() => calcOrder(total)}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>
                        {/* <div className="order-limit">
                            <div className="order-types">
                                <div className={"order-type-button " + (orderLimit == "Market" ? "selected" : "")} onClick={()=>setOrderLimit("Market")}>Market</div>
                                <div className={"order-type-button " + (orderLimit == "Limit" ? "selected" : "")} onClick={()=>setOrderLimit("Limit")}>Limit</div>
                            </div>
                            <label>Time in Force<select/></label>
                            <label>Conditions<select/></label>
                        </div> */}
                        <div className="order-value">
                            Estimated Value: $ {orderTotal?.toFixed(2)}
                        </div>
                        {errors.funds ? <p>{errors.funds}</p> :(
                        <OpenModalButton
                            buttonText="Preview Order"
                            modalComponent={<PreviewOrderModal order={order} cash={buying_power}/>}
                        />
                        )}
                    </form>
    )
}

export default OrderForm
