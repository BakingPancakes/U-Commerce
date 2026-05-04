import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { createUser, fetchUserByID } from "../api/userAPI";
import { getCollege } from "../utils";

export const UserProvider = ({children}) => {
    const {isAuthenticated, isLoading, getAccessTokenSilently, logout, user} = useAuth0();
    const [profile, setProfile] = useState(null);
    const [profileReady, setProfileReady] = useState(false);

    const handleNewUser = async (token, user) => {
        //console.log("creating user with data:", getCollege(user.email));
        const college_id = getCollege(user.email)
        const data = await createUser(
            token,
            user.sub,
            user.email,
            user.name,
            college_id
        );
        return data;
    }

    const refreshProfile = async () => {
        try {
            const token = await getAccessTokenSilently();
            const updated = await fetchUserByID(token);
            setProfile(updated);
        } catch (err) {
            console.error("Failed to refresh profile:", err);
        }
    };


    useEffect(() => {
        if (isLoading || !isAuthenticated) return;

        console.log("User has been authenticated.")

        const fetchProfile = async () => {
            try {
                const token = await getAccessTokenSilently();
                if (!token) return;
                const storedUser = await fetchUserByID(token);
                console.log(storedUser)
                const data = storedUser === null
                    ? await handleNewUser(token, user)
                    : storedUser
                console.log("Retrieved user data:", data);
                setProfile(data);
                setProfileReady(true);
            } catch (err) {
                if (err.error === 'login_required') {
                    logout();
                    console.error('Refresh token is invalid, user should login again', err);
                } else {
                    console.error('Failed to fetch profile:', err);
                }
            }
        }
        fetchProfile();
    }, [isAuthenticated, isLoading]);

    return (
        <UserContext.Provider value={{profile, profileReady, refreshProfile}}>
            {children}
        </UserContext.Provider>
    );
}
