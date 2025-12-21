import { useEffect } from "react";

interface BehavioralResults {
  [key: string]: unknown;
}

interface UserLog {
  init: (config: {
    processTime?: number;
    processData?: (results: BehavioralResults) => void;
  }) => void;
}

declare const userLog: UserLog;

export function useBehavioralTracking() {
  useEffect(() => {
    const studyActive = localStorage.getItem("studyActive");

    if (studyActive === "true" && typeof userLog !== "undefined") {
      userLog.init({
        processTime: 1, 

        processData: (results) => {
          localStorage.setItem(
            "behaviorLogs",
            JSON.stringify(results)
          );
        },
      });
    }
  }, []);
}
