export const avg_volume = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.avg_volume < numCond[1]
        case ">":
            return (item) => item.avg_volume > numCond[1]
        default:
            return (item) => item
    }
}

export const price = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.price < numCond[1]
        case ">":
            return (item) => item.price > numCond[1]
        default:
            return (item) => item
    }
}

export const year_range = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.distance_to_52_low > -numCond[1]/100
        case ">":
            return (item) => item.distance_to_52_high < numCond[1]/100
        default:
            return (item) => item
    }
}

export const past_day_return = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.past_day_return < -numCond[1]/100
        case ">":
            return (item) => item.past_day_return > numCond[1]/100
        default:
            return (item) => item
    }
}

export const past_month_return = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.past_month_return < -numCond[1]/100
        case ">":
            return (item) => item.past_month_return > numCond[1]/100
        default:
            return (item) => item
    }
}

export const past_year_return = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.past_year_return < -numCond[1]/100
        case ">":
            return (item) => item.past_year_return > numCond[1]/100
        default:
            return (item) => item
    }
}

export const past_outperformance = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.past_outperformance < -numCond[1]/100
        case ">":
            return (item) => item.past_outperformance > numCond[1]/100
        default:
            return (item) => item
    }
}

export const market_cap = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.market_cap < numCond[1]
        case ">":
            return (item) => item.market_cap > numCond[1]
        case "[":
            return (item) => item.market_cap > numCond[1] && item.market_cap < numCond[2]
        default:
            return (item) => item
    }
}

export const sector = (cond) => {
    if (!cond) return (item) => item
    return (item) => item.sector == cond
}

export const shares_outstanding = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.shares_outstanding < numCond[1]/1000000
        case ">":
            return (item) => item.shares_outstanding > numCond[1]/1000000
        case "[":
            return (item) => item.shares_outstanding > numCond[1]/1000000 && item.shares_outstanding < numCond[2]/1000000
        default:
            return (item) => item
    }
}

export const short_interest = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.short_interest < numCond[1]/100
        case ">":
            return (item) => item.short_interest > numCond[1]/100
        case "[":
            return (item) => item.short_interest > numCond[1]/100 && item.short_interest < numCond[2]/100
        default:
            return (item) => item
    }
}

export const recommendation = (cond) => {
    if (!cond) return (item) => item
    return (item) => item.recommendation == cond
}

export const dividend_yield = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.dividend_yield < numCond[1]/100
        case ">":
            return (item) => item.dividend_yield > numCond[1]/100
        case "0":
            return (item) => !item.dividend_yield
        case "[":
            return (item) => item.dividend_yield > numCond[1]/100 && item.dividend_yield < numCond[2]/100
        default:
            return (item) => item
    }
}

export const trailing_pe = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.trailing_pe < numCond[1]
        case ">":
            return (item) => item.trailing_pe > numCond[1]
        case "0":
            return (item) => !item.trailing_pe
        case "[":
            return (item) => item.trailing_pe > numCond[1] && item.trailing_pe < numCond[2]
        default:
            return (item) => item
    }
}

export const forward_pe = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.forward_pe < numCond[1]
        case ">":
            return (item) => item.forward_pe > numCond[1]
        case "0":
            return (item) => !item.forward_pe
        case "[":
            return (item) => item.forward_pe > numCond[1] && item.forward_pe < numCond[2]
        default:
            return (item) => item
    }
}

export const pb = (cond=">") => {
    const numCond = cond.split(" ")
    switch (numCond[0]){
        case "<":
            return (item) => item.pb < numCond[1]
        case ">":
            return (item) => item.pb > numCond[1]
        case "0":
            return (item) => !item.pb
        case "[":
            return (item) => item.pb > numCond[1] && item.pb < numCond[2]
        default:
            return (item) => item
    }
}
