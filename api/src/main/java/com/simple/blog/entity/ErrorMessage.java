package com.simple.blog.entity;

import org.joda.time.DateTime;

public class ErrorMessage {
    private String error;
    private int status;
    private long timestamp;

    public ErrorMessage(String error, int status) {
        this(error, status, DateTime.now().getMillis());
    }

    public ErrorMessage(String error, int status, long timestamp) {
        this.error = error;
        this.status = status;
        this.timestamp = timestamp;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
