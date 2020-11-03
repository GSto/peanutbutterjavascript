export default function Header() {
  return (
    <header>
      <nav className="flex items-center bg-purple-700 text-white p-6">
        <span class="font-semibold text-xl">PeanutButter JavaScript</span>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <a href="#" className="ml-4 mr-4">React</a>
          <a href="#" className="mr-4">Redux</a>
          <a href="#" className="mr-4">VanillaJS</a>
          <a href="#" className="mr-4">NodeJS</a>
          <a href="#" className="mr-4">NextJS</a>
          <a href="#" className="mr-4">JS on AWS</a>
        </div>
      </nav>
      <div className="p-6">
        <h2 className="font-semibold text-2xl">JavaScript Solutions for the Real World</h2>
      </div>
    </header>
  )
}