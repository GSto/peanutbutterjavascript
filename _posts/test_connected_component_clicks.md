---
title: "Test Redux components in under 10 lines of code"
author: "Glenn Stovall"
published_at: "2018-11-16"
tags: ["redux","testing"]
---

Here’s a fairly benign component, that can give developers pause when its time to write unit tests for your components: 

```js
const ClickableButton = props => (
  <button onClick={props.doSomething}>Click Me!</button>
)

const mapDispatchToProps () => ({
  doSomething: dispatch(someFancyAction())
})

export default connect(
  null, 
  mapDispatchToProps,
)(ClickableButton)
```

There is only one thing worth testing here: That when we click the button, the function we passed in as a prop gets called. That prop function could be a complex chain of actions & API calls. You don’t want to stress about that, at least not in these tests.  But to do this, are we going to have to create a mock store and a provider component just because it’s connected? Ugh!

There has to be a better way. 

## You can remove the redux connection entirely

While you want your component to be the default export, you can export the unconnected component, and just test that! Hat tip to Dave Ceddia for show me a better way to [export a connected component](https://daveceddia.com/redux-connect-export/).  All you have to do is change one line: 

```js
export const ClickableButton = props => (
```

As an additional trick, if you have any helper functions not attached to the component, you can export those as well for easy testing. 

## With Jest & Enzyme, the rest is easy

Inside our test, import the unconnected component. Then, you can create a [mock function using Jest](https://jestjs.io/docs/en/mock-functions), and [simulate the click using Enzyme](https://airbnb.io/enzyme/docs/api/ReactWrapper/simulate.html). Here’s what the test looks like all together: 

```js
describe('<ClickableButton />', () => {
  it('calls the doThing prop when the button is clicked', () => {
    const props = { doSomething: jest.fn() }
    const wrapper = shallow(<ClickableButton {...props} />)
    wrapper.find("button").first().simulate("click")
    expect(props.doSomething).toHaveBeenCalled()
  })
})
```

