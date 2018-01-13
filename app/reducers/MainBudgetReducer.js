import { STORE_MAIN_BUDGET } from 'app/actions/MainBudgetActions';

const defaultState = {
    rows: []
};

export default function usersReducer(state = defaultState, { type, payload }) {
    switch(type) {
        case STORE_MAIN_BUDGET:
            return {
                ...state,
                rows: payload.rows
            };
        default:
            return state;
    }
}
