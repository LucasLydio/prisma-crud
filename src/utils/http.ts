import { Request } from 'express'

export type IdParams = { id: string }

export type TypedRequest<
  Params = Record<string, string>,
  ReqBody = unknown,
  ReqQuery = Record<string, string | string[]>,
> = Request<Params, any, ReqBody, ReqQuery>

export type TypedRequestBody<ReqBody> = TypedRequest<Record<string, string>, ReqBody>

export type TypedRequestParams<Params> = TypedRequest<Params>

