export module Http {

    const header = {
        key: {
            accept:  "Accept",
            contentType: "Content-Type",
        },
        value: {
            json: "application/json",
            urlencoded: "application/x-www-form-urlencoded",
        }
    };

    export enum method {
        GET = "GET",
        POST = "POST",
        PUT = "PUT",
        DELETE = "DELETE"
    }

    type httpHeaderTypes = "content_json_accept_json" | "content_urlencoded_accept_json";

    const httpHeaders = {
        content_json_accept_json: {
            [header.key.contentType]: header.value.urlencoded,
            [header.key.accept]: header.value.json
        },
        content_urlencoded_accept_json : {
            [header.key.contentType]: header.value.urlencoded,
            [header.key.accept]: header.value.json
        }
    }

    export const getHeaders = (headerType: httpHeaderTypes): HeadersInit_ =>{ 
        const h = JSON.stringify(httpHeaders[headerType]);
        return { h };
    };

    export const statusCode = {
        success: {
            ok: 200, created: 201, accepted: 202, nonAuthoritativeInfo: 203, 
            noContent: 204, resetContent: 205, 
        },
        erro: {
            badRequest: 400, unauthorized: 401, forbidden: 403, notFound: 404,
            methodNotAllowed: 405, notAcceptable: 406, requestTimeout: 408, 
            conflict: 409, uriTooLong: 414
        }
    };
}