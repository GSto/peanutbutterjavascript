import Link from 'next/link'
export default function Header() {
  return (
    <header>
      <nav className="flex flex-row items-center bg-orange-700 text-white p-6">
        <Link href="/">
          <a class="font-semibold text-xl tracking-wider">PeanutButter JavaScript</a>
        </Link>
        <div class="w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto tracking-wider">
          <a href="#" className="ml-4 mr-4">React</a>
          <a href="#" className="mr-4">Redux</a>
          <a href="#" className="mr-4">VanillaJS</a>
        </div>
      </nav>
    </header>
  )
}