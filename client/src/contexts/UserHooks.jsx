import { useContext } from "react"
import { UserContext } from "./UserContext"

// allows any component using that context to retreive the context data
export const useUserProfile = () => useContext(UserContext)