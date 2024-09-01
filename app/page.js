import LoginForm from "../components/LoginForm";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/home");
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center max-w-md p-6 mx-4 rounded-lg shadow-lg">
        <h1 className="my-3 text-3xl font-semibold">Hey, time to Sign In</h1>
        <LoginForm />
      </div>
    </div>
  );
}
