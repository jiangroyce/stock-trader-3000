import "./Loading.css"
export default function Loading() {
    return (
        <div className="loading">
            <h1>Loading</h1>
            <div className="animation-logo">
                <img src={"/favicon.ico"} alt="loading-logo" width="100px"/>
            </div>
        </div>
    )
}
