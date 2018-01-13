import { SET_VALUE, STORE_MAIN_BUDGET } from 'app/actions/MainBudgetActions';

const defaultState = {
    dataRows: [],
    headerRows: [],
    loading: true,
    rowsToShow: 50
};

export default function usersReducer(state = defaultState, { type, payload }) {
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
        default:
            return state;
    }
}
