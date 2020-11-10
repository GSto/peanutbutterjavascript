---
title:  "A less painful way to tackle package dependency Yak Shaves"
published_at: "2020-09-06"
tags: ["npm", "dependency management"]
---

Ever have trouble updating your JavaScript dependencies? Try a LIFO approach: Figure out what is the dependency that is the lowest on the dependency tree that requires an update, and start there.

When I say lower on the dependency tree, I mean closer to the root, that more libraries depend on. For example, if you are building a React application, you probably have several libraries that depend on React. React would be lower in this example.

The challenge is you typically start at the top. There is library higher up the stack. If you try to start there, you’ll find yourself treating the symptoms of out of sync dependencies instead of the disease.

## Example: Updating React Testing Library

I recently wanted to update react-testing-library to the newer @testing-library/react (hat tip to [Kent C. Dodds](https://kentcdodds.com/) for putting together such a great library). But to do that I had to update Jest…

Which required an update to React…

Which required an update to Babel.

To fix this, I resetmy package.json using git and worked from the bottom up.

I updated Babel first, confirmed everything was working. I used an [auto-updater script](https://github.com/babel/babel-upgrade), which I would recommend if you can find a reliable one.

Then I updated React, then Jest, then finally the dependency that needing updating in the first place. I found this to be the most painless way to update dependencies with the fewest amount of errors.