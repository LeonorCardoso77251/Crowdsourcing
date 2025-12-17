export {};

declare global {
  interface Window {
    startBehaviorLogging?: () => void;
    getBehaviorLogs?: () => unknown;
  }
}
