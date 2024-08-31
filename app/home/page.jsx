import Image from "next/image";
import LoginForm from "../../components/LoginForm";
import Logout from "../../components/Logout";
import { auth } from "../../auth";

import { redirect } from "next/navigation";

const HomePage = async () => {
    const session = await auth();
    if (!session?.user) redirect("/");
    console.log("session: ", session);
    return (
        <div className="flex flex-col items-center m-4">
            <h1 className="my-2 text-3xl">Welcome, {session?.user?.name}</h1>
            <Image
                src={session?.user?.image}
                alt={session?.user?.name}
                width={72}
                height={72}
                className="rounded-full"
            />
            <Logout />
        </div>
    );
};

export default HomePage;
