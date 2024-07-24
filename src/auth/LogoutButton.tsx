'use client'

import { signOut } from "next-auth/react"

export const LogoutButton = async () => {

    return (
        <button className="btn btn-primary" onClick={async () => await signOut()}> Logout </button>
    )
} 