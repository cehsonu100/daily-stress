import { doSocialLogin } from "@/app/actions";

const LoginForm = () => {
    return (
        <form action={doSocialLogin}>
            <button className="p-1 m-1 text-lg rounded-md btn btn-outline" type="submit" name="action" value="google">
                Sign In With Google
            </button>

            {/* <button className="p-1 m-1 text-lg text-white bg-black rounded-md" type="submit" name="action" value="github">
                Sign In With GitHub
            </button> */}
        </form>
    );
};

export default LoginForm;
