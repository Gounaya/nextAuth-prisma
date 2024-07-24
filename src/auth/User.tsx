import { getRequiredAuthSession } from "@/lib/auth";
import { signOut } from "next-auth/react";
import { LogoutButton } from "./LogoutButton";

export const User = async () => {

    const session = await getRequiredAuthSession();

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="avatar">
                    <div className="w-24 rounded">
                        <img src={session.user.image ?? ""} alt="avatar" />
                    </div>
                </div>
                <h2 className="card-title">{session.user.name}</h2>
                <p>{session.user.email}</p>
                <p className="text-xs italic">{session.user.id}</p>
                <div className="card-actions justify-end">
                    <LogoutButton />
                </div>
            </div>
        </div >
    )
} 