type httpHeaderTypes = "content_json_accept_json" | "content_urlencoded_accept_json";

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


export const getHttpHeaders = (headerType: httpHeaderTypes): HeadersInit_ =>{ 
    const h = JSON.stringify(httpHeaders[headerType]);
    return { h };
};
