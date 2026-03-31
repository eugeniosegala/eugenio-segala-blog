---
title: How to Do Code Splitting with React and Suspense
date: "2018-11-13T13:00:00.000Z"
description: The React team recently added the ability to dynamically import components with a method called "lazy" and render them with Suspense. This new feature makes code splitting even simpler.
---

If you read this blog, you have probably noticed how much attention I pay to client-side application performance. Some
time ago I published the article: [How to Do Code Splitting with React and Webpack](/how-to-do-code-splitting-with-react-and-webpack/).

**I was talking precisely about the possibility of splitting an application into small chunks to make it more
performant.**

Recently, however, the **React** team added the ability to **dynamically import** components with `lazy`, and then
render them with `Suspense`. This new feature makes the procedure covered in the previous article even simpler.

I want to point out that this post refers to React version **16.6**, so you may need to update the library.

Let's take a closer look at how to use this new React feature.

First of all, we need to import `Suspense` into our component:

`import React, { Component, Suspense } from 'react';`

Let's imagine we want to import a React component. As many of you already know, the traditional syntax is:

`import Products from './containers/Products';`

If we wanted to load it dynamically instead, we would use `lazy`. At that point the syntax would be:

`const Products = React.lazy(() => import('./containers/Products'));`

As you can see, we assigned the component to a constant by passing it as an argument to `lazy`, which lets us import it
dynamically.

After that we can render the component, for example inside a route with the `render` method, thanks to `Suspense`:

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

Before `Suspense`, it was necessary to create an **HOC (higher-order component)** that wrapped the imported component.
Now we can do it automatically, and we can also show a loading message in a `fallback` handled directly by `Suspense`.

Naturally, it is also easy to render the component outside routes:

```jsx
{this.state.products &&
  <Suspense fallback={<div>Loading...</div>}>
    <Products />
  </Suspense>
}
```

In short, from my perspective these additions make concepts like code splitting much more accessible, even for users who
are new to this library.

**It is important to know that:** splitting your entire application into chunks is counterproductive, because you end up
forcing the user to request additional files for no reason. The app becomes smaller in size, but slower to load because
of the extra round trips.
