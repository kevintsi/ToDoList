const ProgressBar = ({ width, color }) => {
    console.log(width, color)
    return (
        <div style={{ height: "25px", backgroundColor: "#E5E5E5", borderRadius: "30px", margin: "2%", marginLeft: "25%", marginRight: "25%" }}>
            <div style={{ height: "25px", width: width + "%", borderRadius: "30px", textAlign: "center", backgroundColor: color }}></div>
        </div>
    )
}

export default ProgressBar