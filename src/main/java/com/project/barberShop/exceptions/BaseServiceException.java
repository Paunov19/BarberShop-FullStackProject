package com.project.barberShop.exceptions;

public class BaseServiceException extends RuntimeException {
    private ErrorCode errorCode;

    public BaseServiceException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }


    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}

