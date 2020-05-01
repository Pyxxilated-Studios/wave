import React, { useState } from "react";

import "./App.css";

const App = () => {
  const [wasm, setWasm] = useState<{
    compute: (a: BigInt, b: BigInt) => BigInt;
  }>();

  const loadWasm = async () => {
    try {
      const wasm = await import("wave");
      setWasm(wasm);
    } finally {
    }
  };

  loadWasm();

  return (
    <div className="App">
      {wasm && <p>{wasm.compute(BigInt(1), BigInt(2)).toString()}</p>}
    </div>
  );
};

export default App;
