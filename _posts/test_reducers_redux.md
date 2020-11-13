---
title: "How to thoroughly test Redux reducers"
author: "Glenn Stovall"
published_at: "2018-11-16"
tags: ["redux","testing"]
---

Redux may come with a lot of boilerplate, patterns, and libraries, but at its core it’s simple.  A current state and an action go in, new state comes out.

Just because the code is simple doesn’t mean it shouldn’t be tested. If you are using Redux in your application, that means your store is a core part of it. For that reason, you should have tests for every action your reducer could take, and every logic branch that they could take. But don’t fret! Since reducers aren’t complicated, neither is writing tests. With a little setup, you can follow this pattern and knock out reducer tests like a pro. 

## Setting Up For Reducer Tests

The only setup I use is to use the startState object if I need to have an initials state for every test. Unlike [testing thunks](/how-to-test-async-redux-thunks/), no mock stores necessary. Our initial state (and states we use in testing) will be plain objects.

```js
const startState = {} // initial state shape if needed
```

## The reducer

I’ll pull the reducer example from an earlier tutorial about [creating asynchronous actions](/redux-thunk-intro/). Code reuse, woohoo!

```js
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

And for quick reference, here are the action creators you can use to work with this reducer. We’ll need them shortly: 

```js
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

## The reducer test pattern

Every test I write for a reducer follows this pattern: 

1. I declare an initial state
1. I declare an expected result state
1. I create an action
1. I call the reducer with the action and the initial state
1. I compare the actual and expected state where I expect changes. 

Here’s the template, in code form: 

```js
it('should apply the updates as expected', () => {
  const start = { ...startState } // add or change fields as needed.
  const expected = {} // expected result state
  const action = actions.myActionCreator() //include arguments as needed
  const actual = reducer(start, action) 
  expect(actual).toEqual(expected)
})
```

Boom. done.  To keep things even simpler, if your application doesn’t have an initial state, you can declare start from scratch. As you’ll see below, you will want to tweak the formula for specific cases, but they will all follow this template. 

## Example 1: LOAD_POSTS_REQUEST

Let’s see it in action.  All our first action is responsible for is toggling a boolean value. Notice in this example, I’m not going to create an expected result state. Since we are only interested in one boolean, we can look at that value, and use Jest’s toBeTruthy() and toBeFalsy() matchers. If you’re not familiar with all of the matchers, here’s a quick list for reference: [Jest matchers](https://jestjs.io/docs/en/expect)

```js
describe('LOAD_POSTS_REQUEST', () => {
  it('marks the current task as not loaded', () => {
    const start = {
        ...startState,
        posts_loading: false,
      }
    const action = actions.loadPostsRequest()
    const actual = reducer(start, action).posts_loading
    expect(actual).toBeTruthy()
  })
})
```

## Example 2: LOAD_POSTS_SUCCESS

Here we’ll want to write two tests: one to confirm we load the posts into state, and one to confirm we have marked that the posts are no longer in a loading state.  Because of this, we can move some of our setup code into a before function.

```js
describe('LOAD_POSTS_SUCCESS', () => {
  let actual
  let expected
  beforeEach(() => {
    const start = {
      ...startState,
      posts: [],
      posts_loading: true
    }
    expected = ['some', 'posts']
    const action = actions.loadPostsSuccess(expected)
    actual = reducer(start, action)
  })

  it('marks posts as loaded', () => {
    expect(actual.posts_loading).toBeFalsy()
  })
  it('saves posts in state', () => {
    expect(actual.posts).toEqual(expected)
  })
})
```

## Example 3: LOAD_POSTS_FAILURE

Similar to our thunk example, our failure use case looks similar to our success case. Still, it’s good to be thorough. Few things are as frustrating as expecting a useful error message and instead finding nothing. 

```js
describe('LOAD_POSTS_FAILURE', () => {
  let actual
  let expected
  beforeEach(() => {
    const start = {
      ...startState,
      posts_error: null,
      posts_loading: true
    }
    expected = 'Posts not found!'
    const action = actions.loadPostsFailure(expected)
    actual = reducer(start, action)
  })

  it('marks posts as loaded', () => {
    expect(actual.posts_loading).toBeFalsy()
  })
  it('saves posts error in state', () => {
    expect(actual.posts_error).toEqual(expected)
  })
})
```

## Apply this to your codebase

If there are errors in how your reducer updates state, it can be difficult to debug. While the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) help, wouldn’t it be better if those bugs never even made it to the browser? To help prevent them from escaping, make sure your reducers are thoroughly tested. The pattern can easily adjust to other common reducer use cases: 

- Have conditional logic in your reducer? Write a test for each logic branch. 
- Have validation in your reducer? Throw valid and invalid actions at it, to make sure it handles both cases properly. 
- Transforming data within your reducer? Adjust the expected call to ensure the data comes out shaped just how you want. 

Still have a particular action that you are having a difficult time with? It could be a sign that you have a messy or overly complex action or state shape, and some refactoring may be in order. 

