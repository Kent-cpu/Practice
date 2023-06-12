import Registration from "./pages/Registration";
import {
    ADD_CHECK_ROUTE,
    CHECK_COMPLETION_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    STATS_ROUTE
} from "./utils/urls";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import AddCheck from "./pages/AddCheck";
import Check from "./pages/Check";


export const userRoutes = [
    {
        path: MAIN_ROUTE,
        element: <Main/>
    },

    {
        path: STATS_ROUTE,
        element: <Stats/>
    },

    {
        path: ADD_CHECK_ROUTE,
        element: <AddCheck/>
    },

    {
        path: CHECK_COMPLETION_ROUTE,
        element: <Check/>
    },
];

export const publicRoutes = [
    {
        path: REGISTRATION_ROUTE,
        element: <Registration/>
    },

    {
        path: LOGIN_ROUTE,
        element: <Login/>
    },
]