// WebSocket API types (outgoing / client-side)

export {};

declare global {
  /**
   * Event delivered when a WebSocket receives a message.
   */
  interface WebSocketMessageEvent {
    /** The event type, always "message". */
    readonly type: "message";

    /** The message data (string for text frames, ArrayBuffer for binary). */
    readonly data: string | ArrayBuffer;
  }

  /**
   * Event delivered when a WebSocket connection is closed.
   */
  interface WebSocketCloseEvent {
    /** The event type, always "close". */
    readonly type: "close";

    /** The close code (e.g. 1000 for normal closure). */
    readonly code: number;

    /** The close reason string. */
    readonly reason: string;

    /** Whether the close was clean (proper close handshake). */
    readonly wasClean: boolean;
  }

  /**
   * Event delivered when a WebSocket encounters an error.
   */
  interface WebSocketErrorEvent {
    /** The event type, always "error". */
    readonly type: "error";

    /** The error message. */
    readonly message: string;
  }

  /**
   * Listener types for WebSocket events.
   */
  interface WebSocketEventMap {
    message: WebSocketMessageEvent;
    close: WebSocketCloseEvent;
    error: WebSocketErrorEvent;
    open: Event;
  }

  /**
   * A client-side WebSocket connection.
   *
   * Obtained from a fetch() response when using the `Upgrade: websocket` header.
   * Must call `accept()` before sending or receiving messages.
   *
   * @example
   * ```ts
   * const resp = await fetch("wss://echo.example.com", {
   *   headers: { Upgrade: "websocket" },
   * });
   *
   * const ws = resp.webSocket;
   * if (!ws) throw new Error("Server didn't accept WebSocket");
   *
   * ws.accept();
   * ws.send("hello");
   *
   * ws.addEventListener("message", (event) => {
   *   console.log("Received:", event.data);
   * });
   *
   * ws.addEventListener("close", (event) => {
   *   console.log("Closed:", event.code, event.reason);
   * });
   * ```
   */
  class WebSocket {
    /**
     * Accept the WebSocket connection and start receiving messages.
     * Must be called before `send()` or messages will be buffered.
     */
    accept(): void;

    /**
     * Send a message to the server.
     * @param data Text string or binary data to send.
     * @throws If `accept()` has not been called yet.
     */
    send(data: string | ArrayBuffer | ArrayBufferView): void;

    /**
     * Close the WebSocket connection.
     * @param code Close status code (default: 1000).
     * @param reason Human-readable close reason (default: "").
     */
    close(code?: number, reason?: string): void;

    /**
     * Register an event listener.
     * @param type The event type: "message", "close", "error", or "open".
     * @param listener The callback function.
     */
    addEventListener<K extends keyof WebSocketEventMap>(
      type: K,
      listener: (event: WebSocketEventMap[K]) => void
    ): void;

    /**
     * Remove a previously registered event listener.
     * @param type The event type.
     * @param listener The callback to remove.
     */
    removeEventListener<K extends keyof WebSocketEventMap>(
      type: K,
      listener: (event: WebSocketEventMap[K]) => void
    ): void;
  }

  interface Response {
    /**
     * The WebSocket connection, present when the response is a WebSocket upgrade
     * (status 101). `null` or `undefined` for normal HTTP responses.
     *
     * @example
     * ```ts
     * const resp = await fetch(url, { headers: { Upgrade: "websocket" } });
     * if (resp.webSocket) {
     *   resp.webSocket.accept();
     * }
     * ```
     */
    readonly webSocket?: WebSocket;
  }
}
