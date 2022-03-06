export function book(res) {
    return {
        type: 'GETBOOK',
        payload: res
    };
};

export function carts(res) {
    return {
        type: 'GETCART',
        payload: res,
    };
};