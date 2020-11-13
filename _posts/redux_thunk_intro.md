---
title: "Intro To Redux-Thunk: making HTTP requests"
author: "Glenn Stovall"
published_at: "2018-11-05"
tags: ["testing", "redux"]
---

Async is one of the toughest problems in front-end development. It’s one of the reasons Redux and React were created. React all started when Facebook had what seemed like a trivial problem: Sometimes, the “unread messages” count in the header and the footer of the page would be different. This Skinner box is so important to Facebook’s business model, they decided to build a whole framework around it. By managing all changes in a global state, and rendering components based off of that state exclusively, you eliminate these kinds of problems. 

Most Async requests come from talking back and forth with the server. Let’s look at how we can make updates to our Redux state with HTTP requests.

## First, install the middleware

Redux doesn’t come with a way to handle this out of the box.  The typical model in Redux is that you call the dispatch function, passing in an action as an argument. The dispatch function gives that action to the reducer, which goes up to update the state. All of these are synchronous actions. What if we want to dispatch asynchronous actions? For that, we’ll be using middleware called “redux-thunk.” redux-thunk gives you the ability to dispatch functions or actions. These functions can then dispatch actions themselves, but more on that later. First, install the middleware:

```js
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initial state = {
  posts_loading: false,
  posts: [],
  posts_error: null,
}

const configureStore = () => createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)),
)

export default configureStore
```

## A couple quick thunk examples

A thunk is a special kind of action creator that returns a function. The function receives two arguments: dispatch and getState, which unsurprisingly is a function that returns the state. That’s another benefit of using thunk: it allows us to fire dispatches based on the current state, without passing in any arguments. Here are some examples:

```js
const slowDispatch = () => {
  return (dispatch, getState) => {
     return setTimeout(() =>
       dispatch(increment()), 1000)
     )
  )
}

const maybeDispatch = () => {
  return (dispatch, getState) => {
    if (getState().allowIncrement) dispatch(increment())
  }
}

// If you want to be terser, you can write these as one-liners

const slowDispatch = () => (dispatch) => setTimeout(() => dispatch(increment()),1000)

const maybeDispatch = () => (dispatch, getState) => getState().allowIncrement ? dispatch(increment()) : null
```

## Create the actions & action creators

aka good old Redux boilerplate. We’ll be following the [ducks pattern](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be) for this exercise.

First, there are three actions, one that will tell us when the request started, one for handling success, and one for handling errors. We’ll create types for these. You could just use the strings instead of declaring constants, but this strategy helps you more quickly identify typos when debugging. A mistyped action will throw an error instead of failing silently.

```js
// types.js
const LOAD_POSTS_REQUEST = 'tasks/history/request'
const LOAD_POSTS_SUCCESS = 'tasks/history/success'
const LOAD_POSTS_FAILURE = 'tasks/history/failure'

export default { 
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
}
```

Then, we’ll create our action creators. Again, we could do this inside of our thunk, but this helps keep the code clean. You can also use these when writing tests, and they will help you write them more efficiently.  We’ll create three: one to update the state when we are loading, one when we get a successful response, and one when we get an error.

```js
import types from './types'

const loadPostsRequest = () => ({ type: types.LOAD_POSTS_REQUEST })

const loadPostsSuccess = posts => ({
  type: types.LOAD_POSTS_SUCCESS,
  payload: posts,
})

const loadPostsFailure = error => ({
  type: types.LOAD_POSTS_FAILURE,
  payload: error,
  error: true,
})

export default {
  loadPostsRequest,
  loadPostsSuccess,
  loadPostsFailure,
}
```

## Updating the reducer

Now that we have actions, we need to handle them in our reducer. We’ll store three variables. First, a boolean to track the loading state. We can use this to toggle loading indicators in our interface. We’ll also store the results in an array, and store the error we get in response if there is a problem.

```js
port types from './types'

const postReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_POST_REQUEST:
      return {
        ...state,
        posts_loading: true,
      }
      case types.LOAD_POST_SUCCESS:
        return {
          ...state,
          posts_loading: false,
          posts: action.payload,
        }
        case types.LOAD_POST_FAILURE:
        return {
          ...state,
          posts_loading: false,
          posts_error: action.payload,
        }
        //...other actions
        default:
           return state 
        }
    }
}
```

## Who will dispatch the dispatches? Creating the thunk

In the ducks pattern, operations are higher-order action creators. Thunks are one category of operation. Another way to think of an operation is an action creator+. It will dispatch actions, sometimes more than one, and sometimes take care of other business logic. Again what makes thunks specific is that return a function instead of an action. 

In our operations, we’ll be deploying some combination of the three actions we defined earlier. We’ll be using Axios to make our HTTP request.

```js
const fetchPosts = () => {
  const url = '/our-app/posts.json'
  return (dispatch) => {
    dispatch(actions.loadPostsRequest())
    axios.get(url)
      .then((response) => {
        dispatch(actions.loadPostsSuccess(response.data))
      })
      .catch((error) => {
        dispatch(actions.loadTaskHistoryFailure(error))
      })
  }
}
```

And there you have it! Now that you’ve written your thunk, you want to make sure it’s well tested and resilient to change. In the next article, you’ll learn exactly [how to test redux thunks](/redux-thunk-intro).

