import Cookies from "js-cookie";
import * as React from "react";

const SessionContext = React.createContext();

const SessionProvider = ({children}) => {
    const [session, setSession] = React.useState(() => JSON.parse(Cookies.get("session")));
    return (
        <SessionContext.Provider value={[session, setSession]}>
            {children}
        </SessionContext.Provider>
    );
};

export {SessionProvider,SessionContext};