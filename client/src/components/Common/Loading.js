import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
    const containerStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Set the height of the container to fill the entire viewport
    };

    return (
        <div style={containerStyles}>
            <HashLoader color="#f9ba48" size={100} duration={1000} />
        </div>
    );
};

export default Loading;
