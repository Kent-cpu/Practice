import React, {useContext} from 'react';
import { Route, Routes} from "react-router-dom";
import {publicRoutes, userRoutes} from "../routes";
import {AuthContext} from "../contexts";

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext);

    return (
        <Routes>
            {isAuth ?
                userRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>
                )
                :
                publicRoutes.map(({path, element}) =>
                    <Route key={path} path={path} element={element} />
                )
            }
        </Routes>
    );
};

export default AppRouter;