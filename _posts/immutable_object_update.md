---
title: "Update objects without mutating the original"
author: "Glenn Stovall"
published_at: "2020-04-29"
tags: ["immutable", "vanillaJS"]
---

The less you mutate your data, the better, and the easier it will be to reason about your code. The concept of not changing values is known as **immutability**. Handling immutability with objects can be tricky. Here are some examples for handling various use cases. 

## Add or replace an element to an object

Similar to [adding elements to arrays without mutating them]('/posts/immutable_array_state'), You can use the spread operator to copy the existing object into a new one, with an additional value.  If a value already exists at the specified key,  it will be overwritten. Otherwise, a new field is added. Note that order is important here; If you were to put the new variable before the spread operator, the original value at the key would still exist. 

```js
const original = {
  street_address: '123 Main Street',
  city: 'Nashville', 
  state: 'TN', 
  zip: '37201'
}

// add a new field
const withAdditionalInfo = { 
   ...original,
  'street_address_2' : 'Apt 456',
}

//replace an existing field
const with9Zip = {
   ...original,
   'zip_code' : '37201-1546',
}
```

## Combine two objects

You can use the spread operator to combine two objects. The same principle about ordering applies here. You can use this pattern for situations where you have many defaults for an object, or you need to replace multiple fields on an object at once. 

```js
const defaults = {
  street_address: '',
  street_address_2: '',
  city: '',
  state: '',
  zip: '',
}

const updates = {
    city: 'Nashville', 
    state: 'TN', 
}

const newRecord = { ...defaults, ...updates } 
```

## Remove an element from an object

You can also use the spread operator to remove elements, by using it on the assignment side. Here's what that looks like. Note that order is important; the rest element must be last or you will get a syntax error. 

```js
const original = {
  street_address: '123 Main Street',
  city: 'Nashville', 
  state: 'TN', 
  zip: '37201'
}
// create a version of the object that does not have 'street_address'
const { streetAddress, ...withoutStreetAddress,  } = original
```

You can combine these techniques for nested objects and other complex structures. Depending on the complexity, you may want to consider using a tool such as [Immer](https://immerjs.github.io/immer/docs/introduction). 