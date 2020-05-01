import React, { useState } from "react";

import Viewport from "./components/viewport";
import World from "./components/world";

const App = () => {
  const [library, setLibrary] = useState<typeof import("wave")>();

  const loadLibrary = async () => {
    try {
      const lib = await import("wave");
      setLibrary(lib);
    } finally {
    }
  };

  loadLibrary();

  if (!library) {
    return null;
  }

  return (
    <div className="App">
      <Viewport>
        <World library={library} />
      </Viewport>
    </div>
  );
};

export default App;
