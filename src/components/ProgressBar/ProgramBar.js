import "./ProgressBar.css"

const ProgressBar = ({ barStyle: { width, color } }) => {
    return (
        <div className="progress-bar-container ">
            <div style={{ height: "20px", width: width + "%", borderRadius: "10px", textAlign: "center", backgroundColor: color, transition: "width 0.5s" }}></div>
        </div>
    )
}

export default ProgressBar