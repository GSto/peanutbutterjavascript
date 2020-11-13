---
title: "Redux now has hooks: a before & after comparison"
author: "Glenn Stovall"
published_at: "2019-06-11"
tags: ["redux", "hooks"]
---

When the react-redux team released version 7.1.0, they added [hooks to react-redux](https://react-redux.js.org/api/hooks)! Here’s a quick comparison of how it could change how you write components.

## First, a brief overview of the new toys

- **useSelector**: Pass in a function that takes the state as an argument and returns a value. Used to get a single value from state. Can act as a replacement for **mapStateToProps**.
- **useDispatch**: returns a reference to the dispatch object. It can act as a replacement for **mapDispatchToProps**.
- **useStore**: returns an instance of the store. Generally not recommended.

## Old example: a search form

An example component that stores a query and when a form is submitted to search. I wanted to keep the example simple, so use your imagination for the part where it fetches results.

```js
import React from 'react'
import { connect } from 'react-redux'

const defaultSearchBar = ({ query, updateQuery, handleSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleChange = e => updateQuery(e.target.value)
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        value={query}
        onChange={handleChange}
      />
    </form>
  )
}

const mapStateToProps = state => ({
  query: state.query,
})

const mapDispatchToProps = dispatch => ({
  updateQuery: newQuery => dispatch({ type: 'UPDATE_QUERY', payload: newQuery }),
  handleSearch: newSearch => dispatch({ type: 'NEW_SEARCH', payload: newSearch }),
})

const connectedSearchBar = connect(
  mapStateToProps,
  mapDispatchToProps,
)(defaultSearchBar)
```

## The new component

In our new example, we have a few differences: We eliminate the connect function, mapStateToProps, and mapDispatchToProps entirely. This means our component no longer takes in props directly. Now, our form looks like this:

```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const hookedSearchBar = () => {
  const dispatch = useDispatch()
  const query = useSelector(state => state.query)
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'NEW_SEARCH', payload: query })
  }
  const handleChange = e => dispatch({ type: 'UPDATE_QUERY', payload: e.target.value })

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="search"
        value={query}
        onChange={handleChange}
      />
    </form>
  )
}
```

## Create your own custom hooks

If you have code that gets shared frequently between components, you can create a custom hook to keep all of that functionality together. Here’s an example of us isolating the redux-specific part of our form into its own hook:

```js
useSearchQuery = () => {
  const dispatch = useDispatch()
  const query = useSelector(state => state.query)
  const updateQuery = query => dispatch({ type: 'UPDATE_QUERY', payload: query })
  const updateSearch = search => dispatch({ type: 'NEW_SEARCH', payload: search })
  return { query, updateQuery, updateSearch }
}
```

## Should you make the switch?

The ability to create redux hooks above is interesting, but I am also concerned that it could make code harder to test, as testing these components is already dead simple. I’m not sold either way, but I hope this comparison makes it easier for you to make informed decisions about your code base.