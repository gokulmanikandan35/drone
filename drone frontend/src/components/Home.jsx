import React from "react";
import ReactPlayer from "react-player";

const Home = () => {
  const streamUrl = "http://192.168.87.188:8080/video";
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Live Webcam Stream</h1>
      <iframe
        src={streamUrl}
        style={{
          width: "1000px",
          height: "900px",
          border: "none",
          borderRadius: "10px",
          overflow: "hidden",
          margin: "0 auto",

        }}
        title="Webcam Stream"
      ></iframe>
      <h3>Prediction: Predicted data</h3>
    </div>
  );
};

export default Home;
