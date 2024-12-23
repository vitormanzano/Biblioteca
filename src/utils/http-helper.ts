import { HttpResponse } from "../models/http-response-model";

export const ok = async (data: any): Promise<HttpResponse> => {
    return {
        statusCode: 200,
        body: data
    };
};

export const created = async (): Promise<HttpResponse> => {
    return {
        statusCode: 201,
        body: {
            message: "Successful"
        }
    };
}

export const noContent = async(data: any): Promise<HttpResponse> => {
    return {
        statusCode: 204,
        body: data
    };
};

export const badRequest = async (data: any): Promise<HttpResponse> => {
    return {
        statusCode: 400,
        body: data
    };
};