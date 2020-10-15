/**
 * As we're using a wasm module later on, and because we want to
 * return something within our code from that wasm file (e.g. maps)
 * without having to make almost every function async, let's just
 * bootstrap/async splitpoint here so that we can simply import what
 * we want and use it.
 */
import("./index").catch((err) => console.log(err));

export {};
