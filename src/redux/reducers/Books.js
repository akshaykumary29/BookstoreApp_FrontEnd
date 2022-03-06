let initialState= {
    books: []
} 

export const getBookItem = (state=initialState, action) => {
    console.log(action);
    switch(action.type) {
        case "GETBOOK":
            return { ...state, books:action.payload };
        default: return state;
    }
};