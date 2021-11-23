import { createSelector } from "reselect";

const selectUser = state => state.user;


export const selecCurrentUser = createSelector(
    [selectUser],
    (user) => user.currentUser
)