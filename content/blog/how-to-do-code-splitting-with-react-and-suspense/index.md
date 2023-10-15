---
title: How to implement Code Splitting with React and Suspense
date: "2018-11-13T13:00:00.000Z"
description: Recently, the React team added the ability to dynamically import components using a method called "lazy", and then invoke them with Suspense. This new feature further simplifies code-splitting.
---

If you're reading this blog, you've probably noticed my particular attention for performance.
In fact, some time ago I published the
article: [How to implement Code Splitting with React and WebPack](/how-to-implement-code-splitting-with-react-and-webpack/).

**I was talking about the ability to "split" your application into small "chunks" to make it more performant.**

However, recently the **React** team added the ability to **dynamically import** components using `lazy`, and then
invoke them with `Suspense`. This new feature further simplifies the procedure examined in the previous article.

I'd like to clarify that this post refers to version **16.6** of React. **So, it may be necessary to update the library.**

Let's look in detail at how to use this new React feature.

First, we need to import `Suspense` into our component:

`import React, { Component, Suspense } from 'react';`

Imagine wanting to import a React component; as many of you know, the traditional syntax is:

`import Products from './containers/Products';`

But if we wanted to load it dynamically, we would use `lazy`. The syntax would then be:

`const Products = React.lazy(() => import('./containers/Products'));`

As you may have noticed, we've associated the component with a constant, passing it as an argument to `lazy`, which
allows us to import it dynamically.

Then, we can invoke the component (for example, inside a route with the `render` method) using `Suspense`:

```jsx
<Route
  path="/products"
  render={() => (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  )}
/>
```

Before `Suspense`, it was necessary to create an **HOC (higher-order component)** that "wrapped" the imported component.
Now, we can do it automatically, and it's also possible to display a loading message using a `fallback` directly managed
by `Suspense`.

Of course, it's also easy to invoke the component outside the routes:

```jsx
{
  this.state.products && (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  )
}
```

In short, for me, these updates make concepts like code splitting even more accessible, bringing them closer to users
who are new to these patterns.

**It's important to know that:** splitting the entire application into chunks can be counterproductive because it forces
users to make calls to other files without reason. The application will be smaller, but slower in terms of
loading due to the response.
