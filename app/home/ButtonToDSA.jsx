'use client';
import { useRouter } from 'next/navigation'

const ButtonToDSA = () => {
    const router = useRouter()
    const handleClick = (href) => {
        router.push(href)
      }
    return (
        <button className="m-5 btn btn-outline" onClick={()=>handleClick('/dsaquestions')}>DSA Questions</button>
    )
}

export default ButtonToDSA