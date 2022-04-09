import { Request } from "express";

export type RequestParams = {
  [k in "headers" | "params" | "query" | "auth"]?: Record<string, string>;
} & {
  body?: Record<string, string | boolean | number>;
};

const getRequestMock = <T = Request>(params: RequestParams = {}) => ({
  auth   : params.auth ?? {},
  body   : params.body ?? {},
  headers: params.headers ?? {},
  params : params.params ?? {},
  query  : params.query ?? {},
} as unknown as T);

export default getRequestMock;
