---
title: "Add hooks to class components with higher-order components"
author: "Glenn Stovall"
published_at: "2020-04-25"
tags: ["react","components"]
---

If you are using class components, but want to use hooks, you can’t do so directly. One strategy for adding them is to use [adapter components](). Another strategy is to use [higher-order components](https://reactjs.org/docs/higher-order-components.html) to pass along data from hooks as props.

## Example: create a message store

Here’s our sample custom hook: We want to build a flash messaging system, similar to what’s provided by Ruby on Rails.

```js
const useMessageStore = () => {
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
  const [state, dispatch] = useReducer(messageReducer, [])
  return [state, dispatch]
}
```

## Use the hook in a functional component

If we want to display or write messages to our queue from any functional component, we can do so by calling this hook:

```js
const MyMessagingComponent = () => {
  const [messageStore, messageDispatch] = useMessageStore()
  return messageStore.map(message => <span>message.text</span>)
}
```

And we want to add a message from a function component, we can do it like this:

```js
const MyButton = () => {
  const [messageStore, messageDispatch] = useMessageStore()
  const sendClickMessage = () => { 
    messageDispatch({ type: 'ADD', payload: 'Clicked the button'})
  }
  return (<button onClick={sendClickMessage}>Click Me!</button>)
}
```

## Create a higher-order component with the hook

Alternatively, we could create a component that passes the data from the hook along:

```js
const withMessageStore = (WrappedComponent) => (props) => {
  const { state, dispatch } = useContext(MessageContext)
  return (<WrappedComponent
    {...props}
    messageStore={state}
    messageDispatch={dispatch}
  />)
}
```

## Apply the higher-order component to class components

Using this method, we can now use our hooks in existing code, without having to refactor the whole thing:

```js
class OldStodgyComponent extends React.Component {
  render() {
    return this.props.messageStore.map(message => <span>message.text</span>)
  }
}

export default withMessageStore(OldStodgyComponent)
```