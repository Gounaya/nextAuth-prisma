import { getServerSession } from "next-auth"
import { authOptions } from "../../pages/api/auth/[...nextauth]"

export const getAuthSession = () => {
    return getServerSession(authOptions);
}

export const getRequiredAuthSession = async () => {
    const session = await getAuthSession();

    if(!session?.user){
        throw new Error('Session not found');
    }

    return session;
}

