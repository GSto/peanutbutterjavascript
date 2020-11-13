---
title: "How to test async Redux Thunks"
author: "Glenn Stovall"
published_at: "2018-11-16"
tags: ["redux", "testing"]
---

In a previous post, you learned how to [make HTTP requests inside your redux application](). We use [redux-thunk](https://github.com/reduxjs/redux-thunk), a library that enables you to dispatch functions in addition to [flux-style actions](https://github.com/redux-utilities/flux-standard-action). With it, you can dispatch functions to handle more complex cases such as asynchronous operations. But then how do you test them? Testing can be more work than writing the functioning code itself. Dealing with server responses and timing was hard enough as it is. Luckily, there are tools and patterns you can apply to work, and make your codebase more reliable with ease.

First, we’ll take a look at the tools that we will be using for testing. Then, how to apply them to our operation. 

## Tools of the testing trade

- **Jest** – [Jest](https://jestjs.io/) is a JavaScript testing library from the Facebook development ecosystem, just like React. It’s designed to require no configuration and get out of your way you write tests easier and faster. 
- **Redux-mock-store **– Since the primary goal of the action is to update a redux store, you will need a way to mock the redux store. [redux-mock-store](https://github.com/dmitry-zaets/redux-mock-store) does just that.
- **Moxios** – [Moxios](https://github.com/axios/moxios) is a Javascript library that stubs out Axios requests. We’ll use this to decouple our code from the server so we can isolate our logic and test only

## Quick review: The HTTP action

Here’s the thunk from the previous tutorial: 

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

Now, let’s get to work on adding some tests to this code, so that we can make changes to code base without fear of causing a regression.

## 1. Create a mock store

First, we’ll set up our store. Since our redux application uses the thunk middleware, we’ll also need to apply that middleware when testing. Once we’ve done that we’ll create a function to help us set up our state for tests. Many applications have some kind of an initial state. Instead of creating that for every test, instead, we’ll create a helper function that takes a configured store, and combines the initial state with the state you pass as an argument.

```js
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

export const startState = {} //put initial state here

export const mockStore = configureMockStore([thunk])

export const makeMockStore = (state = {}) => { 
  return mockStore({
    ...startState,
    ...state,
  })
}
```

## 2. Create some moxios helpers

Next, let’s create a couple of helper functions for moxios. Axios & Moxios look at the status code to determine whether or not to resolve or reject the promise. These two functions will save us a bit of time when writing multiple API tests. These helper functions will save you quite a few keystrokes if your application has a lot of different HTTP-based thunks.

```js
const mockSuccess = data => ({ status: 200, response: { data } })
const mockError = error => ({ status: 500, response: error })
```

## 3. Configure setup and teardown for your tests

For our tests, we’ll need to set up and tear down the Moxios adapter. It intercepts outgoing HTTP requests, allowing you to control the response the function you are testing gets back.  Here’s what that looks like: 

```js
describe('fetchPosts', () => {
  beforeEach(() => moxios.install())
  afterEach(() => moxios.uninstall())
})
```

## 4. Write Your ‘on success’ test

What do we want to assert here?

You aren’t testing any of the server-side logic. You aren’t testing that state changed because that’s the reducer’s job. You should write separate reducer tests for that. The thunk is only responsible for deciding which actions to dispatch, so that’s what to focus on.

So the jobs our test needs to accomplish are:

1. create a mock instance of the store. You’ll be dispatching actions to it. 
1. create a mock server response. 
1. call your thunk, and assert that it dispatched the correct actions to your mock store.

Altogether, it looks like this. 

```js
  it('dispatches loadPostsSuccess with server data on success', () => {
    const response = ['some', 'posts']
    const store = makeMockStore()
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith(mockSuccess(response))
    })

    const expected = [
      actions.loadPostsRequest(),
      actions.loadPostsSuccess(response),
    ]

    store.dispatch(fetchPosts()).then(() => {
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })
  })
```

## 5. Do the same for the error response

Don’t just test the happy path. When writing tests it’s prudent to ask yourself, “what could go wrong?” Our server could throw an error response, so we want to test for that use case as well. In our example, the error test case looks almost identical to our success test case. 

```js
  it('dispatches loadPostsError with server data on success', () => {
    const response = 'error message'
    const store = makeMockStore()
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith(mockError(response))
    })

    const expected = [
      actions.loadPostsRequest(),
      actions.loadPostsError(response),
    ]

    store.dispatch(fetchPosts()).then(() => {
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })
  })
```

## Apply this to your applications

This is the purest example of how to test asynchronous operations in your application. Of course in the real world, it’s never quite that simple. If there are additional use cases that you can think of, be sure to write tests for those as well. For example, are there different kinds of successful or error responses you could expect from the server? Do you need additional logic to handle them? If so, it could be a use case for creating additional tests. 

Think through your different use cases and decide the best approach.
