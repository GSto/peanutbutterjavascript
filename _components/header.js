import Link from 'next/link'
import styled from 'styled-components'

const StyledHeader = styled.header.attrs({
  className: "bg-orange-700 text-white w-screen p-4"
})``

const LinkContainer = styled.div.attrs({
  className: "w-full block flex-grow justify-end lg:flex lg:items-center lg:w-auto tracking-wider font-light"
})``

const LinkAnchor = styled.a.attrs({
  className: "mr-4 cursor-pointer"
})``

function NavLink({ href, children}) {
  return (
    <Link href={href}>
      <LinkAnchor>
        {children}
      </LinkAnchor>
    </Link>
  )
}

export default function Header() {
  return (
    <StyledHeader>
      <nav className="flex flex-row ml-12">
        <Link href="/">
          <a className="text-xl tracking-wider">PeanutButter JavaScript</a>
        </Link>
        <LinkContainer>
          <NavLink href="/tags/react">React</NavLink>
          <NavLink href="/tags/redux">Redux</NavLink>
          <NavLink href="/tags/vanillaJS">VanillaJS</NavLink>
          <NavLink href="/about">About</NavLink>
        </LinkContainer>
      </nav>
    </StyledHeader>
  )
}