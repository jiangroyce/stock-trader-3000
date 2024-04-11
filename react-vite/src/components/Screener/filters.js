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
