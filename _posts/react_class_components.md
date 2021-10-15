---
title: "Why new React devs should learn about class components (but not write them)"
author: "Glenn Stovall"
published_at: "2020-05-06"
tags: ["beginner","components","react"]
---

You can write React components in two ways: As a function, or as a class. It can be confusing to understand which pattern you should use and why. For developers brand new to React, they may not understand the history and recent changes between the two. If you ask online, everyone says to use function components. However, almost every tutorial, even the official documentation, favors classes. Why the divide? 

## A brief history lesson

Today, class components and function components have the same functionality, but that wasn’t always the case. In earlier versions of React, 16.7 and below, class components were the only way to manage state. Function components were considered ideal if you kept your components simple. However, if you ever found yourself in a situation where you needed to add state to a component, you had to refactor your function into a class, which is a pain. If you ever refactored a class such that it no longer needed the additional features, you either had extra syntax or needed to do yet another refactor. Class components were also the only way to hook into the life-cycle of a component. 

In February 2019, The React team [released version 16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) and changed all of that. React added [hooks](https://reactjs.org/docs/hooks-intro.html). Hooks are a special kind of function you call inside of a function component that gives you additional functionality, such as state and lifecycle management. 

This change makes a lot of sense if you think what JavaScript classes are. A JavaScript class isn’t a true “class”, it’s just syntax over the existing JavaScript function & prototype functionality. There is nothing you can do with a class that you can’t do with functions. So why should you be able to have certain functionality in a class component that you can’t have in a function component? 

## Why prefer functions over classes? 

First, they have overall cleaner syntax. Here’s the simplest example compare a class component and a function component: 

```javascript
class ClassButton extends Component {
  render() {
    return <button>{this.props.children}</button>
  }
}
const FunctionButton = ({ children }) => (
  <button>{children}</button>
)
```

Now image you wanted to add state to the button. For example, click tracking. Let’s compare how that looks in a class component: 

```js
class CounterClassButton extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }; 
  }
  increment = () => { 
    this.setState(prevState => ({ count: prevState.count + 1}))
  }
  render() {
    return (
      <button onClick={this.increment}>
        {this.props.children} ({this.state.count}) 
      </button>
    )
  }
}
```

Compare to a function component with identical functionality:

```js
const CounterFuncButton = ({ children }) => {
  const [count, setCount ] = useState(0)
  const increment = () => setCount(prev => prev + 1)
  return (
    <button onClick={increment}>
      {children} ({count}) 
    </button>
  )
}
```

Some key differences: 

- We don’t need a constructor in the second version. 
- State is not required to be an object, so we can just store an integer as our state. 
- We don’t have to type this or worry about what “this” refers to in different contexts. 
- Overall, shorter lines and fewer of them. 

## Functions help you organize code by concern instead of timing

You can already see benefits in a trivial example. As your code grows more complex, you’ll see other benefits from an architectural standpoint. Another example comes with lifecycle methods in the class. When lifecycle methods, you are forced to organize your code by when it executes, instead of what it concerns. For example, let’s say you need to attach multiple event listeners.

In a class component, you’d have to organize all of the attachments, and then all of the detachments. With a function component, you can organize them by concern.  Here’s an example hooking into GoogleMaps events, first with a class, which also loads some data from the server when it mounts:

```js
class MapHandler extends Component {
  constructor(props) {
    this.state = { location: null }
  }
  onPanoChanged = () => { /* ... */ }
  onVisibleChanged = () => { /* ... */ }
  onPovChanged = () => { /* ... */}
  loadLocationFromServer = () => {
    // do some fetching here
    this.setState({ location: location })
  }
  componentDidMount = () => {
    loadDataFromServer()
    const { addListener } = window.google.maps.event
    const streetView = window.google.maps.getStreetView() 
    addListener(streetView, 'pano_changed', onPanoChanged)
    addListener(streetView, 'visible_changed', onVisibleChanged)
    addListener(streetView, 'pov_changed', onPovChanged)
  }
  componentDidUnmount = () => {
    const { clearInstanceListeners } = window.google.maps.event
    const streetView = window.google.maps.getStreetView() 
    clearInstanceListeners(streetView)
  }
} 
```

With a function component, instead we group by concern; all of the Google Maps gets a call, and the server code gets its own as well.

```js
const FunctionalMapHandler = () => {
  const [location, setLocation] = useState()
  // handle server logic here
  useEffect(() => {
   // location = do some fetching here...
   setLocation(location)
  },[])
  onPanoChanged = () => { /* ... */ }
  onVisibleChanged = () => { /* ... */ }
  onPovChanged = () => { /* ... */}
  //handle Google Maps logic
  useEffect(() => {
    const { addListener, clearInstanceListeners } = window.google.maps.event
    const streetView = window.google.maps.getStreetView() 
    addListener(streetView, 'pano_changed', onPanoChanged)
    addListener(streetView, 'visible_changed', onVisibleChanged)
    addListener(streetView, 'pov_changed', onPovChanged)
    return () => {
      clearInstanceListeners(streetView)
    }
  },[])
}
```

## Which leads to more reusable, composable code.

One of the benefits of hooks is that unlike class state logic, you can reuse it. You can combine hooks into custom hooks, and reuse state-based logic in more than one component. To accomplish this with class-based components you’d have to use inheritance, or use additional boilerplate to create a function-based alternative. As a general principle, [composition is preferred over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance). 

From the above example, we could create a useGoogleStreetView hook that we could use in any component, not just components that inherit from a single parent.

```js
const useGoogleStreetView = (onPanoChanged, onVisibleChanged, onPovChange, dependencies = []) => {
  useEffect(() => {
    const { addListener, clearInstanceListeners } = window.google.maps.event
    const streetView = window.google.maps.getStreetView() 

    addListener(streetView, 'pano_changed', onPanoChanged)
    addListener(streetView, 'visible_changed', onVisibleChanged)
    addListener(streetView, 'pov_changed', onPovChanged)

    return () => {
      clearInstanceListeners(streetView)
    }
  },[])
}
```

Because of these benefits, I’d recommend using function components when building new components whenever possible.

## Then why are there class components everywhere?

Hooks are still relatively new to React, and classes were much more useful before their existence. Since code tends to grow more complex, not less overtime, defaulting to classes was a sensible move. Most of the questions about React arose from its more complex bits. This means you’ll see a lot more of them in tutorials and documentation; There just wasn’t much to say about function components.

## How to work with classes in the wild

Most professional development work is done on existing codebases, so even though I advise against writing class components for newer developers, it’s still important to be familiar with them and know how they work. I also would not advise refactoring existing class components into function components. Most of the time, there isn’t enough value in making these kinds of updates to in-production, money-making code. Instead focus on using newer technologies with newer code, while still being familiar enough with classes to work with them on existing systems, and understand examples when you see them in search results or StackOverflow.
