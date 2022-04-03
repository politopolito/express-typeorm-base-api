import { Request } from "express";

export interface RequestParams {
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

const getRequestMock = (params: RequestParams = {}) => ({
  params : params.params,
  headers: params.headers,
} as unknown as Request);

export default getRequestMock;
