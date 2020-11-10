---
title: "Mastering mergeProps in Redux"
author: "Glenn Stovall"
published_at: "2020-08-26"
tags: ["redux"]
---

You can use mergeProps to simply connected components in your Redux application.

When you connect a component using Redux, most people are familiar with the first two arguments: [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate) and [mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapstate). You use mapStateToProps to pass parts of the state to the component via props. mapDispatchToProps passes functions as props that allow the component to interact with the redux store.

But did you know there is a 3rd function you can pass in? 

**mergeProps** is available and allows you to further control the props that the component receives. It’s not useful all of the time, but when it is it can enable you to adapt to any component structure, reduce component complexity, and improve performance. 

## What does mergeProps do?

mergeProps is a function that handles combining the props passed directly to a compoment, and from the two previous mapping functions. it takes three arguments:

- **ownProps** – which contains all of the props passed into the component outside of the connect function
- **mapProps** – the result of the mapStateToProps function
- **dispatchProps** – the result of the mapDispatchProps option.

Here’s what the default function looks like:

```js
const mergeProps = (ownProps, mapProps, dispatchProps) => ({
  ...ownProps,
  ...mapProps,
  ...dispatchProps,
})
```

## When should you use mergeProps? 

There are a few examples when mergeProps is useful. The first is when the interface of the component does not line up with the interface of your state. Another reason is when you have too many props coming from mapStateToProps that the component might non need to know about. By not passing those arguments in, you can increase performance. A third reason could be to simplify your components by moving logic out of them, and into pure functions outside of components. In this use case, you can keep your components simpler and your code more flexible. 

## Example: Connecting to a Third party component

Let's say you are using react-google-maps, and want to build an application using some of those components. A common use case would be to add click handlers to something. Let's look at this example of adding a click handler to a polygon, which performs different actions depending on state: 

```js
import Polygon from 'react-google-maps'
import { setEditMode, setSelectedMode } from './actions'

const ConnectedPolygon = ({ id, mode, setEdit, setSelected}) => {
  const onClick = (e) => {
    if(mode === 'browse') {
      setSelected(id)
    }    
    if(mode === 'edit') {
      setEdit(id)
    }
  }
  return (
    <Polygon onClick={onClick} />
  )
}

const mapStateToProps = state => ({
  mode: state.mode
})

const mapDisptchToProps = dispatch => ({
  setEdit: id => dispatch(setEditMode(id)),
  setSelected: id => dispatch(setSelectedMode(id)),
})

export default connect(mapStateToProps, mapDisptchToProps)(ConnectedPolygon)
```

The 3rd party component is only expecting one prop that we care about: onClick. But to get the click handler we want, we have to pass in four props. In this example, we have to build a new component from scratch.  

Instead, we could think of merge props as a version of the adapter pattern: it'll take in arguments based on __our__ implementation, and convert them to fit the 3rd party components __interface__.

If we do that, we don't have to create a new component at all! 

## Refactoring the component

```js
const mapStateToProps = state => ({
  mode: state.mode
})

const mapDisptchToProps = dispatch => ({
  setEdit: id => dispatch(setEditMode(id)),
  setSelected: id => dispatch(setSelectedMode(id)),
})

const mergeProps = (ownProps, mapProps, dispatchProps) => {
  const { id } = ownProps
  const { mode } = mapProps
  const { setEdit, setSelected } = dispatchProps
  return {
    onClick: () => {
      if(mode === 'browse') {
        setSelected(id)
      }    
      if(mode === 'edit') {
        setEdit(id)
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Polygon)
```

In this example, we've moved all of the logic into a mergeProps function. Now we don't need a custom component! 

## Reducing renders

In the first example, the polygon would re-render every time the 'mode' prop changed. We don't want that. It's not needed because we only care about what mode is when we click it. In the second example, **the component doesn't re-render**. Components re-render when props change, and in the second example, the component did not have any props change. onClick is still onClick. 

## Identifying when to use mergeProps

If you have ever had a component where you wished mapStatetoProps and mapDispatchToProps could pass data from one to the other, then you may have a good use case for mergeProps. 

If you have components that are re-rendering frequently because of prop changes that don't actually matter to that component, then mergeProps might help. Though I would warn about taking this advice to seriously, as it can lead to premature optimizations.

If you've built wrapper components for third party components just to connect them, mergeProps can help you reduce boilerplate and simplify your component tree. 