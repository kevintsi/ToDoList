import "./ProgressBar.css"

const ProgressBar = ({ barStyle: { width, color } }) => {
    return (
        <div className="progress-bar-container ">
            <div style={{ width: width + "%", backgroundColor: color }}></div>
        </div>
    )
}

export default ProgressBar