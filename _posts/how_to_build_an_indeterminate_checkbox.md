---
title: "How to build an indeterminate checkbox in React"
author: "Glenn Stovall"
published_at: "2020-04-25"
tags: ["react","ui"]
---

Fun fact: Did you know that HTML checkboxes have three built-in states, not just two? In addition to the checked state, there is also an **indeterminate** state. You can’t set a checkbox to indeterminate with HTML, only with JavaScript. Here’s what they look like in the browser:

![](/images/indeterminate_checkbox.png)

## Why would you need an indeterminate checkbox?

As you can see, they can be useful for “select all” checkboxes that can be in a “some but not all selected” state. Let’s look at how we can build a react component for a three-state checkbox.

## How it works

You need more than props in this case. The only way to set a checkbox to indeterminate in HTML and Vanilla JavaScript is setting the prop in JavaScript like this:

```js
document.getElementById("my-checkbox").indeterminate = true
```

Instead of “checked={value}“, two hooks working together manage the visual state of the checkbox. First, [useRef](https://reactjs.org/docs/hooks-reference.html#useref) maintains a reference to the element, so that you can manage the indeterminate property directly. Then, the [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) hook manages the changes by executing code on the reference.

## First, the boilerplate

```js
import React, { useRef, useEffect } from 'react'
export const CHECKED = 1
export const UNCHECKED = 2
export const INDETERMINATE = -1 

const IndeterminateCheckbox = () => <input type="checkbox" />

export default IndeterminateCheckbox
```

We’ll need to define a trinary state here. I like using -1 for the third “maybe” state of this boolean operation.

## Modeling the props

We’ll only require one prop here, the value of the checkbox. To increase the flexibility of our component, we should pass other props down to the **input** element. This way, whoever uses our component has access to modify all other props, so they can set onClick handlers for example. Here’s a pattern you can use to handle certain props specifically while passing the rest down the component tree.

```js
const IndeterminateCheckbox = (props) => {
  const { value, ...otherProps } = props
  return (
    <input type="checkbox" {...otherProps} />
  )
}
```

## Manage the three states

Now we can use the value to manage the three states. Situations where we need to execute code every time a prop changes are perfect use cases for **useEffect**. Every time the component renders or the value changes, we need to adjust both the **checked** and **indeterminate** properties. **useRef** provides a reference for managing those changes inside of **useEffect**.

```js
const IndeterminateCheckbox = (props) => {
  const { value, ...otherProps } = props
  const checkRef = useRef();
  useEffect(() => {
    checkRef.current.checked = value === CHECKED
    checkRef.current.indeterminate = value === INDETERMINATE
  }, [status])
  return (
    <input
      type="checkbox"
      ref={checkRef}
      {...otherProps}
    />
  )
}
```

And there you have it! A way to manage a three-state checkbox with React. While there isn’t a ton of use cases for this kind of structure, I like this example because I feel like it gives a clear example of three React principles:

1. Making your components more flexible with the other props pattern.
1. Using **useRef** to modify elements in non-standard ways.
1. Using **useEffect** to trigger events based on prop values.