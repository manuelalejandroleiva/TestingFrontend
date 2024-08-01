import type { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse } from './ApiResponse';

const returnApiCallData = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
    const { data, status, statusText } = response;

    return {
        data,
        status,
        statusText,
    };
};

export const HttpInstance = (instance: AxiosInstance) => {
    const get = async <T>(url: string): Promise<ApiResponse<T>> => {
        const response = await instance.get<T>(url);
        return returnApiCallData<T>(response);
    };

    const post = async <T, U>(
        url: string,
        payload: U,
    ): Promise<ApiResponse<T>> => {
        const response = await instance.post<T>(url, payload);
        return returnApiCallData<T>(response);
    };

    const put = async <T, U>(
        url: string,
        payload: U,
    ): Promise<ApiResponse<T>> => {
        const response = await instance.put<T>(url, payload);
        return returnApiCallData<T>(response);
    };

    const patch = async <T, U>(
        url: string,
        payload: U,
    ): Promise<ApiResponse<T>> => {
        const response = await instance.patch<T>(url, payload);
        return returnApiCallData<T>(response);
    };

    const remove = async (url: string): Promise<void> => {
        await instance.delete(url);
    };

    return {
        get,
        post,
        put,
        patch,
        delete: remove,
    };
};    