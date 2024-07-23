import { signOut } from "next-auth/react"

export const Logout = async () => {

    return (
        <button className="btn btn-primary" onClick={async () => await signOut()}> Logout </button>
    )
} 