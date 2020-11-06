export default function Header() {
  return (
    <header>
      <nav className="flex flex-row items-center bg-purple-700 text-white p-6">
        <span class="font-semibold text-xl">🥪PeanutButter JavaScript</span>
        <div class="w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto">
          <a href="#" className="ml-4 mr-4">React</a>
          <a href="#" className="mr-4">Redux</a>
          <a href="#" className="mr-4">VanillaJS</a>
        </div>
      </nav>
    </header>
  )
}