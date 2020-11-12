---
title:  "Update arrays without mutating the original"
published_at: "2020-07-29"
tags: ["immutable", "array", "vanillaJS"]
---

When working with tools like React and Redux, they discourage making direct edits to the state. Why is this? It's more prone to errors. The less you mutate your data, the better, and the easier it will be to reason about your code. The concept of not changing values is known as **immutability**. It's one thing to handle immutability with primitive data types like strings or integers, but it can get more complex when you using data structures like arrays or objects. Here is how you can apply all the different possible changes to an array, without changing the original. 

## Add an element to the end of an array

Most of these example leverage the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to take the values of the original arrays and use them in the new one. In this example, we can use the entire array, then append the element to the end of the new array.

```js
const original = [1,2,3]
const el = 4
const newArray =  [...original, el]
```

## Add an element to the beginning of an array

This example is the same as above but reversed. This time, we put the element at the beginning.

```js
const original = [1,2,3]
const el = 4
const newArray =  [el, ...original]
```

## Combine two Arrays into a third

By using the spread operator on multiple arrays, we can combine them into a new one. We’ll use this technique in future examples to tackle modifications to specific elements.

```js
const first = [1,2]
const second = [3,4]
const third = [...first, ...second]
```

## Remove an element from the end of the array

Besides the spread operator, the other tool for this problem is the [Array.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method. When you pass in no arguments, it returns a copy of the array. It can take up to two arguments, a start index, and an end index. When given just a start, it will return the rest of the array from that index until the end of the array. So to remove the first element, we slice at 1, ignoring the first element at index 0.

```js
const original = [1,2,3]
const newArray = original.slice(1)
```

## Remove an element from the beginning of the array

Another trick with slice() is that if the end argument is negative, you can count backwards from the end of the array. So in this example, 0 does not change the beginning of the array, but we stop one short, so that newArray only contains the first two elements.

```js
const original = [1,2,3]
const newArray = original.slice(0,-1)
```

## Insert an element at a specific index

What if you don’t want to change the beginning or end of an array? Working in the middle gets a little more complicated. Think of this example like a sandwich. We are using slice to create each end of our sandwich, made of all the elements before the new entry, and those after. Then, we put our fillings in, and put it all together.

```js
const  original = [1,2,4]
const el = 3
const insertAt = 2
const newArray = [...original.slice(0,insertAt), el, ...arr.slice(insertAt)]
```

## Replace an element at a specific index

This example looks __almost__ identical, so pay close attention to the differences. In the previous example, there were three elements in the initial array and four in the result. Here there are four in both. The second slice is one shorter. We are throwing out one element and replacing it with another.

```js
const  original = [1,2,4,4]
const el = 3
const replaceAt = 2
const newArray = [...original.slice(0,replaceAt ), el, ...arr.slice(replaceAt + 1)]
```

## Delete an element at a specific index

This one is similar to above, only instead of replacing the element, we are only removing it.

```js
const  original = [1,2,'x',3]
const deleteAt = 2
const newArray = [...original.slice(0,deleteAt), ...arr.slice(deleteAt + 1)]
```

## Delete a specific element

If you want to remove a specific element from the array, you can do this by using the [Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method.

```js
const original = [1,2, 'x', 3]
const toDelete = 'x'
const newArray = original.filter(item => item !== toDelete)
```

I hope you found this resource useful when working with Immutable data in JavaScript. You can also check out the guide on [manipulating immutable objects](/posts/immutable_object_update). Bookmark this so can refer to it later.