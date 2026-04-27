import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext"

export const UserProvider = ({children}) => {
    const {isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        console.log(isAuthenticated, isLoading)
        if (isLoading || !isAuthenticated) return;

        const fetchProfile = async () => {
            const token = getAccessTokenSilently()
            const res = await fetch("/api/users",{
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        const data = res.json()
        setProfile(data)
        }
        fetchProfile();
    }, [isAuthenticated, isLoading, getAccessTokenSilently])

    return (
        <UserContext.Provider value={profile}>
            {children}
        </UserContext.Provider>
    )
}
