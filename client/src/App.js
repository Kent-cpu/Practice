import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {AuthContext} from "./contexts";
import {useEffect, useState} from "react";
import {check} from "./http/userApi";


function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        check().then(userData => {
            setUser({
                id: userData.id,
                email: userData.email,
            });
            setIsAuth(true);
        }).catch(e => {
            console.log(e);
        }).finally(() => setLoading(false));
    }, []);



    return (
        <AuthContext.Provider value={{user, setUser, isAuth, setIsAuth}}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;