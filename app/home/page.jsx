import Image from "next/image";
import LoginForm from "../../components/LoginForm";
import Logout from "../../components/Logout";
import { auth } from "../../auth";

import { redirect } from "next/navigation";
import ButtonToDSA from "./ButtonToDSA";

const HomePage = async () => {
    const session = await auth();
    if (!session?.user) redirect("/");
    console.log("session: ", session);
    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center max-w-md p-6 mx-4 rounded-lg shadow-lg">
            <h1 className="my-2 text-3xl font-semibold">Welcome, {session?.user?.name}</h1>
            <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full"
            />
            <ButtonToDSA />
            <Logout />
        </div>
    </div>
    
    );
};

export default HomePage;
