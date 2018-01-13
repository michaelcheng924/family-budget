import { SET_VALUE, STORE_MAIN_BUDGET, STORE_SAVINGS } from 'app/actions';

const defaultState = {
    dataRows: [],
    headerRows: [],
    loading: true,
    rowsToShow: 50,
    savingsDataRows: [],
    savingsHeaderRows: [],
    savingsLoading: true
};

export default function appReducer(state = defaultState, { type, payload }) {
    switch(type) {
        case SET_VALUE:
            return {
                ...state,
                [payload.property]: payload.value
            };
        case STORE_MAIN_BUDGET:
            return {
                ...state,
                headerRows: payload.rows.slice(0, 2),
                dataRows: payload.rows.slice(2).reverse(),
                loading: false
            };
        case STORE_SAVINGS:
            return {
                ...state,
                savingsHeaderRows: payload.rows.slice(0, 2),
                savingsDataRows: payload.rows.slice(2).reverse(),
                savingsLoading: false
            };
        default:
            return state;
    }
}
