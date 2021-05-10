---
title: "When you should (& shouldn't) use Redux"
headline: "When you should (& shouldn't) use Redux"
description: "Redux solves for two problems, interdependent state changes and state with loose UI cohesion. If your app has both, then I would consider Redux."
author: "Glenn Stovall"
author_twitter: "Gsto"
published_at: "2021-05-09"
tags: ["redux"]
og_title: ""
og_image: "/images/when_to_use_redux.png"
og_url: ""
twitter_site: ""
twitter_title: ""
twitter_image: ""
twitter_description: ""
twitter_creator: "GSto"
---

![](/images/when_to_use_redux.png)

[Redux](https://www.peanutbutterjavascript.com/tags/redux) is a powerful library, but it is also opinionated and adds boilerplate code to your application. In exchange, you get power state management and debugging tools like time travel. How can you tell if the trade-offs will be worth it for your project? 

Redux solves for two problems, interdependent state changes and state with loose UI cohesion. If your app has both, then I would consider Redux. Otherwise, one of React's other built-in state management tools might make more sense for your use case. 

## Independent vs. Interdependent State Changes

What do I mean by interdependent state changes (AKA mutations)? let's look at the simplest example of state management: The [useState](https://reactjs.org/docs/hooks-state.html) hook. useState is optimal when you are managing independent elements of state. Simple booleans, text fields, arrays, etc. 

Interdependent changes are when some values of state rely on other values in state, or previous iterations of the state. For these cases, [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) makes more sense than useState. useReducer enables you to manage many values of an object with a single update. In some cases, this will also net you a performance boost.

The tradeoff is that you've moved the complexity of setting state into a function (your reducer), by removing it from other parts of the application. Kent C. Dodds does a great job of laying out these examples in his article [Should I use useState or useReducer?](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)

The other factor to consider is the amount of cohesion between your application's state and UI

## Low vs. High UI Cohesion
What do I mean by UI cohesion? It's how closely the structure of your state matches the shape of the JSX elements. React is designed to pass state from parent components to child components. When state is close together, we can pass state via props. But what about when it isn't?

Think of the header bar on a page like Facebook, where notifications happen from multiple places in the application and can be changed on many parts of the page. Another example is parts of state that don't map to a particular part of the UI. Think user information if a person is logged in, or location information in a mobile React Native App. This kind of state could be needed by many different components located all over the application.

When you have state scattered across your application, useContext makes sense. It gives you the ability to pass information between any components regardless of familial relationships. Redux relies heavily on context, but that's not the only reason you should consider it. 

## Interdependent Mutations + Low UI Cohesion = Redux

What if you have state that is interdependent among itself, and independent from the UI? then you have a case for using Redux. Redux is basically [useContext + useReducer](https://www.peanutbutterjavascript.com/posts/usecontext-usereducer), combined with a set of patterns and best practices.

## In summary: 
  - If you have simple state to manage, use useState. 
  - If you have state with lots of interdependent mutations, consider useReducer. 
  - If you have state with loose UI cohesion, consider useContext
  - If your state is with loose UI cohesion AND  many interdependent mutations, consider Redux.


