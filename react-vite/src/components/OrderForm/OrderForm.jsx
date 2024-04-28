import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCash } from "../../redux/portfolio";
import OpenModalButton from "../OpenModalButton";
import PreviewOrderModal from "./PreviewOrderModal";
import DepositModal from "../Transfers/DepositModal";
import "./OrderForm.css";

function OrderForm({stock, ownedShares}) {
    const dispatch = useDispatch();
    const currencyFormat = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});
    const buying_power = useSelector((state) => state.portfolio.purchasing_power);
    const [orderType, setOrderType] = useState("");
    const [quantityType, setQuantityType] = useState("Shares");
    const [quantity, setQuantity] = useState("");
    // const [orderLimit, setOrderLimit] = useState("Market");
    // const [orderConditions, setOrderConditions] = useState({});
    const [orderTotal, setOrderTotal] = useState(0);
    const [errors, setErrors] = useState({});
    const [order, setOrder] = useState({});

    const calcOrder = (orderType, quantity) => {
        let total = quantity * stock.price
        setErrors({})
        if (total > buying_power) setErrors({"funds": "Not Enough Funds"})
        if (orderType == "Sell" && ownedShares - quantity < 0) setErrors({"shares": "Not Enough Shares"})
        const payload = {
            orderType,
            ticker: stock.ticker,
            price: stock.price,
            quantity,
            total
        }
        setOrderTotal(total);
        setOrder(payload);
    };

    const calcOrderType = (str) => {
        setOrderType(str);
        setQuantity("")
    };

    const calcQuantityType = (q) => {
        setQuantityType(q);
        setQuantity("")
        calcOrder(orderType, 0);
    };

    const calcQuantity = (q) => {
        let quant;
        if (quantityType == "Dollars") quant = q / stock.price;
        else quant = q;
        setQuantity(q);
        calcOrder(orderType, quant)
    };

    const previewOrder = (e) => {
        e.preventDefault();
        setErrors({})
    };

    useEffect(() => {
        dispatch(fetchCash());
    }, [dispatch]);

    return (
        <form className="order-form" onSubmit={previewOrder}>
            <div className="order-header">
                <div className="order-info">
                    <h2>Trade {stock?.ticker}</h2>
                </div>
                <div><h4>Price: {currencyFormat.format(stock?.price)}</h4></div>
            </div>
            <div className="order-types">
                <div className={"order-type-button " + (orderType == "Buy" ? "selected" : "")} onClick={()=>calcOrderType("Buy")}>Buy</div>
                <div className={"order-type-button " + (orderType == "Sell" ? "selected" : "")} onClick={()=>calcOrderType("Sell")}>Sell</div>
            </div>
            <div className="order-quantity">
                <div className="order-types">
                    <div className={"order-type-button " + (quantityType == "Shares" ? "selected" : "")} onClick={()=>calcQuantityType("Shares")}>Shares</div>
                    <div className={"order-type-button " + (quantityType == "Dollars" ? "selected" : "")} onClick={()=>calcQuantityType("Dollars")}>Dollars</div>
                </div>
            </div>
            <div className="quantity-inputs">
                <label>
                {quantityType == "Shares" ? "# of Shares" : "$ Dollars"}:
                <input
                    type="number"
                    value={quantity}
                    min={0}
                    max={10000}
                    onChange={(e) => calcQuantity(Number(e.target.value))}
                    onBlur={(e) => e.target.value ? calcQuantity(Number(e.target.value)) : calcQuantity("")}
                    onFocus={() => calcQuantity("")}
                    required
                    />
                </label>
                <div>Shares Owned: {ownedShares}</div>
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
            {Object.keys(errors)?.length ?
            <div className="error-funds">
                {Object.values(errors).map((error, index) => <p className="errors" key={index}>* {error}</p>)}
                {errors.funds && <OpenModalButton buttonText="Deposit" modalComponent={<DepositModal />}/>}
            </div> :
                orderTotal && orderType && quantity ? (
                <OpenModalButton
                    type="submit"
                    buttonText="Preview Order"
                    modalComponent={<PreviewOrderModal order={order} cash={buying_power}/>}
                />
            ) : <div className="empty-space" />}
            <div className="order-buying-power">{buying_power ? currencyFormat.format(buying_power) : "-"} buying power available</div>
        </form>
    )
}

export default OrderForm
