export const HTTP_STATUS: {
    OK: 200;
    CREATED: 201;
    BAD_REQUEST: 400;
    NOT_FOUND: 404;
    INTERNAL_SERVER_ERROR: 500;
} = {
    // Success responses
    OK: 200,
    CREATED: 201,

    // Client error responses
    BAD_REQUEST: 400,
    NOT_FOUND: 404,

    // Server error responses
    INTERNAL_SERVER_ERROR: 500,
} as const;