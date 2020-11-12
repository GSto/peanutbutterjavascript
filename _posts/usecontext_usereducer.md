---
title: "Roll your Own Redux with useContext & useReducer"
author: "Glenn Stovall"
published_at: "2020-04-26"
tags: ["react","redux","hooks"]
---

> "Most projects aren't complex enough to require Redux."

I hear this refrain from the React community often. I’m not here to debate how valid it is. What I do know is that there are situations where you do want to share state between multiple components, and you may not want to bring Redux into your architecture.

In this tutorial, you’ll learn how to create your own mini-state management system. I call them **reducklings**

## Our Use Case: Flash Messages

By default Ruby on Rails includes flash messaging. Within your controller, you can easily dispatch a message to display on the screen. In our application, we want to something similar:

- Display one or more messages at the top of the screen.
- Be able to dismiss a single message.
- Have the ability to clear all of the messages.
- Any component should be able to dispatch a message.

## Step 1: Build Our Reducer

So for our messaging queue, it looks like we have a state that we want to perform several actions on. It’s a perfect use case for creating a reducer. Here’s what that looks like:

```js
const messageReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [

        ...state,
        action.payload,
      ]
    case 'CLEAR':
      return []
    case 'DISMISS':
      return state.filter((message, index) => index !== action.payload)
    default:
      return state
  }
}
```

## Step 2: Create a Context

In the next step, we’ll create a state array and dispatch function using useReducer. But first, we need a place to store them. This is where the magic happens. We are going to store both the state and dispatch in a context so we can access them from anywhere. Let’s being by creating our context:

```js
const MessageContext = React.createContext({
  state: [],
  dispatch: null,
})
```

## Step 3: Providing the Reducer

At the top level of our application, or the highest level where you want to have access to the duckling, you’ll want to pass the results of creating a reducer into the context.

```js
import React, { useReducer } from 'react'
import { messageReducer, MessageContext } from './message_duckling'

const App = () => {
  const [state, dispatch] = useReducer(messageReducer, [])
  return ( 
    <MessageContext.Provider value={{state, dispatch}}>
      {/* Your App Here */}
    </MessageContext>
  )
}
```

Now we have access to our state and dispatch functions anywhere in the application!

## Step 4: Accessing The Messages With UseContext

Let’s look at our first use case, reading the messages within a component.

```js
import React, { useContext } from 'react'
import { MessageContext } from './message_context'

const MessageContainer = () => {
  const { state, dispatch } = useContext(MessageContext)

  return (
    <div className="messages-container">
      {state.map((message, index) => (
        <div className={`message ${message.type}`}>
          <span>{message.text}</span>
        </div>
      ))}
    </div>
  )
}

export default MessageContainer
```

## Step 5: Dispatch Actions

In a similar fashion to redux, we can use the dispatch function to update the messages. Here’s a form component that will create a message:

```js
import React, { useState, useContext } from 'react'
import { MessageContext } from './message_context'

const MessageForm = () => {
  const [text, setText] = useState('')
  const { dispatch } = useContext(MessageContext)
  const createMessage = (e) => {
    e.preventDefault()
    const newMessage = { type: 'warning', text }
    dispatch({
      type: 'ADD',
      payload: newMessage
    })
  }

  return (
    <form onSubmit={createMessage}>
      <input type={text} onChange={e => setText(e.target.value)} />
      <input type="submit" value="post message" />
    </form>
  )
}

export default MessageForm
```

## Step 6: Create a Custom Hook For Flexibility

To make your code a bit more clear, you can wrap up your useReducer as its own custom hook. To make the code more extensible, you could also add an option to allow users to define their own initial state:

```js
const useMessageReducer = (initial_state = []) {
  return useReducer(messageReducer, initialState)
}
```
## Review: Features of A Duckling

What does a duckling include?

- A context that we can reference anywhere in our application.
- That context comes with a global **state** and a **dispatch** function that lets us edit that state via a - reducer.
- Optionally, it could include a **custom hook** and **higher-order component** to make it easier to implement.

Now, let’s look at some of the features that are included in Redux that we don’t have here.

## What A Duckling Isn’t

- A duckling does not provide **actions**, **types**, or **action creators**.
- A duckling does not bother with state and dispatch mapping. Every component gets the whole state and - the whole dispatch. No **mapStateToProps** or **mapDispatchToProps** here.
- As a consequence of that, we don’t really have selectors either. Though you could possibly build them.
- It has no concept of **middleware**.

If you are in a situation where believe that the problem you are trying to solve needs more of this functionality, then you know you have a stronger use case for using Redux! Don’t take this advice and re-invent the wheel when you don’t need to. Instead use it when you need smaller wheels for shorter, simpler trips.