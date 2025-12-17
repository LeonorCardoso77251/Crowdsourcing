package com.crowdwellbeing.backend.dto;

public class BehaviorLogDTO {

    private Long userId;
    private Object logs;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Object getLogs() {
        return logs;
    }

    public void setLogs(Object logs) {
        this.logs = logs;
    }
}
