package com.sprinthub.common;

import java.time.Instant;
import java.util.Map;

public class ApiErrorResponse {

    private int status;
    private String message;
    private Map<String, String> errors;
    private Instant timestamp;

    public ApiErrorResponse() {
    }

    public ApiErrorResponse(int status, String message, Map<String, String> errors, Instant timestamp) {
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public Instant getTimestamp() {
        return timestamp;
    }
}