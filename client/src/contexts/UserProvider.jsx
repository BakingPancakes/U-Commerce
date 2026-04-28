import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({children}) => {
    const {isAuthenticated, isLoading, getAccessTokenSilently} = useAuth0();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (isLoading || !isAuthenticated) return;

        console.log("User has been authenticated.")

        const fetchProfile = async () => {
            try {
                const token = await getAccessTokenSilently();
                const res = await fetch(`/api/users`,{
                    headers: {Authorization: `Bearer ${token}`}
                });
                const data = await res.json();
                setProfile(data);
            } catch (err) {
                if (err.error === 'login_required') {
                    console.error('Refresh token is invalid, user should login again', err)
                } else {
                    console.error('Failed to fetch profile:', err);
                }
            }
        }
        fetchProfile();
    }, [isAuthenticated, isLoading, getAccessTokenSilently]);

    return (
        <UserContext.Provider value={profile}>
            {children}
        </UserContext.Provider>
    );
}
