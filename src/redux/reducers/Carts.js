let initialState = {
    carts: []
}

export const getCartItem = (state = initialState, action) => {
    console.log(action);
    switch(action.type) {
        case "GETCART":
            return { ...state, carts:action.payload };

        default: return state;
    }
};