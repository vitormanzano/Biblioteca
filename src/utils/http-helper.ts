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

export const noContent = async(): Promise<HttpResponse> => {
    return {
        statusCode: 204,
        body: "Conteúdo não encontrado!"
    };
};

export const BadRequest = async (): Promise<HttpResponse> => {
    return {
        statusCode: 400,
        body: null
    };
};