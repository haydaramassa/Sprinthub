package com.sprinthub.common;

import com.sprinthub.auth.exception.InvalidCredentialsException;
import com.sprinthub.project.exception.ProjectNotFoundException;
import com.sprinthub.task.exception.TaskNotFoundException;
import com.sprinthub.workspace.exception.WorkspaceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiErrorResponse handleValidationErrors(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return new ApiErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                "Validation failed",
                errors,
                Instant.now()
        );
    }
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiErrorResponse handleIllegalArgumentException(IllegalArgumentException exception) {
        return new ApiErrorResponse(
                HttpStatus.CONFLICT.value(),
                exception.getMessage(),
                Map.of(),
                Instant.now()
        );
    }
    @ExceptionHandler(InvalidCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiErrorResponse handleInvalidCredentialsException(InvalidCredentialsException exception) {
        return new ApiErrorResponse(
                HttpStatus.UNAUTHORIZED.value(),
                exception.getMessage(),
                Map.of(),
                Instant.now()
        );
    }
    @ExceptionHandler(WorkspaceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse handleWorkspaceNotFoundException(WorkspaceNotFoundException exception) {
        return new ApiErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                Map.of(),
                Instant.now()
        );
    }
    @ExceptionHandler(ProjectNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse handleProjectNotFoundException(ProjectNotFoundException exception) {
        return new ApiErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                Map.of(),
                Instant.now()
        );
    }
    @ExceptionHandler(TaskNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiErrorResponse handleTaskNotFoundException(TaskNotFoundException exception) {
        return new ApiErrorResponse(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                Map.of(),
                Instant.now()
        );
    }
}