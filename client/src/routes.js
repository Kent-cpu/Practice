import Registration from "./pages/Registration";
import {ADD_CHECK_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE, STATS_ROUTE} from "./utils/urls";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Stats from "./pages/Stats";
import AddCheck from "./pages/AddCheck";


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