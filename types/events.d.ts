// Event API types

export {};

declare global {
  /**
   * EventTarget is the base interface for objects that can receive events
   * and have listeners for them.
   */
  interface EventTarget {
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
    ): void;

    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | EventListenerOptions
    ): void;

    dispatchEvent(event: Event): boolean;
  }

  /**
   * The Event interface represents an event which takes place on an EventTarget.
   */
  interface Event {
    /** The name of the event (case-insensitive). */
    readonly type: string;

    /** The element that triggered the event. */
    readonly target: EventTarget | null;

    /** The element that the event listener is attached to. */
    readonly currentTarget: EventTarget | null;

    /** Whether the event bubbles up through the DOM. */
    readonly bubbles: boolean;

    /** Whether the event can be cancelled. */
    readonly cancelable: boolean;

    /** Whether preventDefault() was called on this event. */
    readonly defaultPrevented: boolean;

    /** The time at which the event was created (in milliseconds). */
    readonly timeStamp: number;

    /** Cancels the event (if it is cancelable). */
    preventDefault(): void;

    /** Stops the propagation of the event to other listeners. */
    stopPropagation(): void;

    /** Stops both propagation and any other listeners on the same element. */
    stopImmediatePropagation(): void;
  }

  interface EventListenerOptions {
    capture?: boolean;
  }

  interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
    signal?: AbortSignal;
  }

  interface EventListener {
    (evt: Event): void;
  }

  interface EventListenerObject {
    handleEvent(object: Event): void;
  }

  type EventListenerOrEventListenerObject = EventListener | EventListenerObject;
}
