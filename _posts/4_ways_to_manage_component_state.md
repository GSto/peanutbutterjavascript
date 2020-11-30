---
title:  "4 ways to manage component state"
published_at: "2020-05-20"
tags: ["react", "classes to functions", "state management"]
---

In earlier versions of React, you were required to use a class component instead of a function component if a component needed to manage state. If you started with a function component that later needed to use state, you would have to rewrite the function as a class. For this reason, some developers would avoid function components altogether.

Now with hooks that isn’t the case.

However, how state works in class and function components isn’t a one-to-one mapping. Function components are more nuanced, which means you have more control over how you manage state. This article is for developers who are used to classes and want to move towards using hooks. You’ll see how you can replicate class state in a function component to ease transitions, and when and how to use the two primary state management hooks, [useState](https://reactjs.org/docs/hooks-reference.html#usestate), and [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer).

## How do useState and useReducer work?

useState and useReducer are both hooks available in function components you can use to manage state.

### useState

useState takes an initial state as an argument, and returns two values: the state variable, and a setter function used to update the state. Unlike a class function, your state doesn’t have to be an object, it can be a variable of any type.

```js
const [counter, setCounter] = useState(0)
console.log(counter) //  '0'
setCounter(1)
console.log(counter) // '1'
```

### useReducer

useReducer takes two arguments, an initial state and a reducer function. it returns two variables, the state and a dispatch function. A reducer function takes two arguments, the current state, and an action that is used to update the state. it returns a new updated version of the state. useReducer is useful when updating one part of your state is reliant on another.

```js
const incrementReducer = (state = 0, incrementBy) => state + incrementBy
const [counter, increment] = useReducer(0, incrementReducer)
console.log(counter) // '0' 
incrementBy(1)
console.log(counter) // '1'
```

## Simple state in class comoponents

Let’s start with a simple example, a button that keeps track of how many times it has been clicked: 

```js
 class CounterButton extends Component {
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

Here you see that we initialize state in the constructor. It has to be an object even though we only want to track a single integer. Let’s compare this to a component with the same functionality in a function component: 

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

A few key differences and similarities between these two versions: 

- With useState, state can be anything you want, a boolean, an integer, an object, and so on.
- With classes, you have a single ‘state.’ You can call useState multiple times and manage them independently.

Both `this.setState` and `setState`’s setters can take either a variable or a callback function. Both callback functions take the previous state as an argument, and are useful when you need to update the state based on its previous value. However, a difference worth noting is when you pass in a variable. this.setState would take in an object and patch the existing state with it. setState’s in a function replace.

Here’s a slightly more complex example to show the differences. A form with three fields, built in a class, and three different ways you could manage that state in a function component.

## Build a contact form in 4 different ways

### Method 1: with a class component

```js
class ClassContactForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        name: '',
        email: '',
        message: '',
    }
  }

  setName = (e) => this.setState({ name: e.target.value})
  setEmail = (e) => this.setState({ email: e.target.value})
  setMessage = (e) => this.setState({ message: e.target.value })

  onSubmit = (e) => {
      e.preventDefault()
      fetch('/messages/', {
        method: 'POST',
        body: JSON.stringify(this.state)
      })
  }

  render() {
      return (
          <form onSubmit={onSubmit}>
            <fieldset>
              <label for="name">Name</label> 
              <input name="name" type="text" value={this.state.name} onChange={setName} />
            </fieldset>

            <fieldset>
              <label for="email">Email</label> 
              <input name="email" type="text" value={this.state.email} onChange={setEmail} />
            </fieldset>

            <fieldset>
              <label for="message">Message</label> 
              <input name="namessage" type="text" value={this.state.message} onChange={setMessage} />
            </fieldset>

            <input type="submit">Send Message</input>
          </form>
      )
  }
}
```

What used to be the exclusive way to manage state within a component. You create a state object in the constructor and patch it using this.setState. However, it can at times feel clunky to mutate the entire state when you are only manipulating one field. Should the form data be an object or not? There are cases for either way, depending on your context. So let’s look at both of those examples, starting with breaking state down into primitives:

### Method 2: with useState
```js
const FuncStateForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const setNameFromForm = (e) => setName(e.target.value)
  const setEmailFromForm = (e) => setEmail(e.target.value)
  const setMessageFromForm = (e) => setMessage(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    fetch('/messages/', {
      method: 'POST',
      body: JSON.stringify({ name, email, message })
    })
  }

  return // same form as before, removed for brevity

}
```

Here, there are three state variables instead of one. This is the approach I tend to take with forms, unless there is a compelling reason to do otherwise. I base wether or not to use useState or useReducer based on the number of times I need to update interdependent parts of state. That’s not really the case here.

The following is an example of what not to do, but I wanted to demonstrate how useReducer can be a source of over-engineering if you aren’t careful. Here’s that form again, this time with a reducer using the Flux pattern. 

## Method 3: with a flux-style reducer
```js
const FuncFluxReducerForm = () => {
  const reducer = (state = {}, action) => {
    switch(action.type) {
      case 'SET_NAME':
        return {
          ...state, 
          name: action.payload,
        }
      case 'SET_EMAIL':
        return {
          ...state, 
          email: action.payload,
        }
      case 'SET_MESSAGE':
        return {
          ...state, 
          message: action.payload,
        }
      default: 
        return state
    }
  }

  const [state, dispatch] = useReducer({}, reducer)

  const setNameFromForm = (e) => dispatch({ type: 'SET_NAME', payload: e.target.value })
  const setEmailFromForm = (e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })
  const setMessageFromForm = (e) => dispatch({ type: 'SET_MESSAGE', payload: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    fetch('/messages/', {
      method: 'POST',
      body: JSON.stringify(state)
    })
  }

  return <form /> // same form as before, removed for brevity
}
```

This is our longest example to date. When your state is simple and localized, flux reducers only add boilerplate without providing any more value. However, flux style isn’t the only way to use reducers, though some seem to think so because its the pattern you see most often in tutorials. Here’s a third example using a simplified reducer, that more closely mimics the behavior of a class component.

### Method 4: Use a patch reducer & replicate this.setState
```js
const FluxClassReducerForm = () => {
  const reducer = (state = {}, patch = {}) => ({ ...state, ...patch })
  const [state, dispatch] = useReducer({}, reducer)

  const setName = e => dispatch({ name: e.target.value })
  const setEmail = e => dispatch({ email: e.target.value })
  const setMessage = e => dispatch({ message: e.target.value })

  onSubmit = (e) => {
    e.preventDefault()
    fetch('/messages/', {
      method: 'POST',
      body: JSON.stringify(state)
    })
}

  return <form /> // same form as before
}
```

The reducer, in this example, is what I call a “patch reducer.” It applies updates to an object. This pattern leaves you with a component that behaves similarly to class components. You can also use this pattern along with [useContext to share and update state between multiple components](/posts/usecontext-usereducer).

Take a moment to consider these ideas, and the pros and cons of each.

You are asked to add a new form to a React application. Which pattern would you choose, and why?
 
What factors influence your decision?  