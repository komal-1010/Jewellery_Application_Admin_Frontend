import React from "react";
import { Puff, TailSpin } from "react-loader-spinner";
const Loader = (props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9",
      }}
    >
      <Puff color="#00BFFF" height={100} width={100} visible={props.bal} />
    </div>
  );
};

export default Loader;
