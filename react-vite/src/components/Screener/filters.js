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
