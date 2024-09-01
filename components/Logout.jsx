
import { doLogout } from "@/app/actions"

const Logout = () => {
  return (
    <form action={doLogout}>
        <button className="btn btn-outline" type="submit">Logout</button>
    </form>
  )
}

export default Logout