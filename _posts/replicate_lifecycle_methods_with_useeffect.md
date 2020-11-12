---
title: "Replicate lifecycle methods with useEffect()"
author: "Glenn Stovall"
published_at: "2020-04-27"
tags: ["hooks","react","useEffect"]
---

In earlier versions of React, one of the biggest downsides to using function components over class components was that you could not use [lifecycle methods](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/). What if you need to do something when your component mounts, like fetch some data or set some initial state? Or what if you needed to do some teardown when you component unmounted? 

With hooks, now you can achieve the same effect, using the useEffect. hook. Think of **useEffect** as a **componentDidMount**, **componentWillReceiveProps**, and  **componentWillUnmount** combined. 

## Thinking In Effects

The useEffect function takes two arguments: a **didUpdate function**, and an **array of dependencies**. The didUpdate function can optionally return a **cleanUp** function. Whenever a component mounts or one or more dependencies change, the didUpdate function runs. When the component unmounts, or dependencies are updated, then the cleanUp functions run.

The benefit of this new approach is that it enables you to sort your code by concern rather than by point in the lifecycle method. For example, imagine you have a component that has to do multiple things on set up and tear down. It has to initialize a 3rd party library and attach some event listeners. In class components, you'd have a **componentDidMount** function handling the responsibilities for both concerns, and a **componentWillUnmount** function handling the teardown of both.  You were limited to one lifecycle method of each, so you didn't have a choice. Now, you can create a hook for each, and organize your code based on concern, making it easier to read and edit.

Here are some examples: 

## Attach and Detaching Event Listeners

### class component

```js
  componentWillMount = () => {
    /* attach listeners to google StreetView */
    const streetView = this.getStreetView()
    window.google.maps.event.addListener(streetView, 'zoomChanged', this.handlePovChanged())
  }

  componentWillUnmount = () => {
    window.google.maps.event.clearInstanceListeners()
  }

  getStreetView = () => { /* ... */ }
  handlePovChanged = () => { /* ... */ }
```

### function component

```js
  const getStreetView = () => { /* ... */ }
  const handlePovChanged = () => { /* ... */ }
  const { addListener, clearInstanceListeners } = window.google.maps.event
  
  useEffect(() => {
    const streetView = getStreetView()
    addListener(streetView, 'on', handlePovChanged())
    return clearInstanceListeners
  }, []) // empty dependency array = only called on mount and unmount
```

## Handle Changes to prop values

### class component

```js
  componentWillReceiveProps = (nextProps) => {
    if (nextProps.position !== this.props.position) {
      this.moveMap(nextProps.position)
    }
  }
```

### function component

```js
useEffect(() => { moveMap(position) }, [position])
```

Once you get used to thinking in effects, you'll begin to see how you can handle side effects in a way that's easier to read and use. That's one of the many benefits of moving from class components to function components.