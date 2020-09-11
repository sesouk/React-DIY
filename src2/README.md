# React-DIY

##Part 2

```
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
const container = document.getElementById("root")
ReactDOM.render(element, container)
```

In this part the createElement function will be remade. As a reminder an element (React element) is an object with type and props. We first change the JSX into React before changing into

```
const element = React.createElement(
  "div",
  { id: "foo" },
  React.createElement("a", null, "bar"),
  React.createElement("b")
)
```

The spread operator is used for the props and the rest parameter syntax for the children. This way the children prop will always be an array.

```
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  }
}
```

Examples of this in action would be:

```
createElement("div")
```

Would return:

```
{
  "type": "div",
  "props": { "children": [] }
}
```

and

```
createElement("div", null, a)
```

Would return:

```
{
  "type": "div",
  "props": { "children": [a] }
}
```

The children array could also contain values like strings or numbers. So everything that isn't an object inside it's own element is wrapped. A sepcial type for these are created: TEXT_ELEMENT.

```
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
      typeof child === "object"
      ? child
      : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    }
  }
}
```

React's createElement function is still being used, to replace it we have to name the library. In this case it will be renamed Kevact.

```
const Kevact = {
  createElement,
}

const element = Kevact.createElement(
  "div",
  { id: "foo" },
  Kevact.createElement("a", null, "bar"),
  Kevact.createElement("b")
)
```

Now to tell babel to use Kevact's createElement isntead of React's a comment like the following is needed to let babel know which function to use.

```
/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
)
```

Next the render functioln needs to be rewritten

```
ReactDOM.render(element, container)
```

First we will only work on adding things to the DOM. Below is the starting point. A render function is created and render is added to the Kevact object. The ReactDOM is replaced with Kevact.

```
function render(element, container) {

}

const Kevact = {
  createElement,
  render,
}

Kevact.render(element, container)
```

The first step is creating the DOM node usign the element type then that node is sppended to the new node container.

```
function render(element, container) {
  const dom = document.createElement(element.type)

  container.appendChild(dom)
}
```

Now the new render function is further edited to work when there are multiple children.

```
function render(element, container) {
  const dom = document.createElement(element.type)

  element.props.children.forEach(child =>
    render(child, dom)
  )

  container.appendChild(dom)
}
```

Text elements also need to be handled, if the element type is TEXT_ELEMENT a text node is created instead of a regular node.

```
function render(element, container) {
  const dom = element.type == "TEXT_ELEMENT"
  ? document.createTextNode("")
  : document.createElement(element.type)
}
```

The final step is to assign the element props to the node.

```
const isProperty = key => key !== "children"
Object.keys(element.props)
  .filter(isProperty)
  .forEach(name => {
    dom[name] = element.props[name]
  })
```

Now all together this library can now render JSX elements to the DOM similar to React.
