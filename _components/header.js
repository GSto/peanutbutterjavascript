import Link from 'next/link'
export default function Header() {
  return (
    <header>
      <nav className="flex flex-row items-center bg-orange-700 text-white p-4">
        <Link href="/">
          <a className="font-semibold text-xl tracking-wider">PeanutButter JavaScript</a>
        </Link>
        <div className="w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto tracking-wider">
          <Link href="/tags/react">
            <a className="ml-4 mr-4 cursor-pointer">React</a>
          </Link>
          <Link href="/tags/redux">
            <a className="mr-4 cursor-pointer">Redux</a>
          </Link>
          <Link href="/tags/vanillaJS">
            <a className="mr-4 cursor-pointer">VanillaJS</a>
          </Link>
          <Link href="/about">
            <a className="mr-4 cursor-pointer">About</a>
          </Link>
        </div>
      </nav>
    </header>
  )
}