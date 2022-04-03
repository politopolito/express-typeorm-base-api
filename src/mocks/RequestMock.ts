import { Request } from "express";

export interface RequestParams {
  body?: Record<string, string>;
  headers?: Record<string, string>;
  params?: Record<string, string>;
}

const getRequestMock = (params: RequestParams = {}) => ({
  body   : params.body,
  headers: params.headers,
  params : params.params,
} as unknown as Request);

export default getRequestMock;
