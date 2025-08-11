import Link from "next/link"

export const Navbar = () => {
 return(
    <>
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-5">
        <ul className="flex items-center">
            <Link href={'/form-action'}>
            <li className="py-1.5 px-6 text-amber-300 hover:bg-amber-300 hover:text-black transition-colors" >
                Add Comment
            </li>
            </Link>
            <Link href={'/comments'}>
            <li className="py-1.5 px-6 text-amber-300 hover:bg-amber-300 hover:text-black transition-colors" >
                Comment List
            </li>
            </Link>
        </ul>
    </nav>
    </>
 )
}