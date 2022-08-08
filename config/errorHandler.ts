import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    if (isA400Error(error)) {
        return handle4xxError(error, response);
    }
    return handle5xxError(error, response);
};

function isA400Error(error: any): boolean {
    return typeof error === "string";
}

function handle4xxError(error: any, response: any) {
    return response.status(400).json({ message: error });
}

function handle5xxError(error: any, response: any) {
    return response.status(500).json({ message: error.message });
}
