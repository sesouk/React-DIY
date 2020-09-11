# React-DIY

##Step 1

```
import React from 'react'
import ReactDOM from 'react-dom'

const element = <h1 title="foo">Hello World</h1>
const container = document.getElementById("root")
ReactDOM.render(element, container)
```

This React code is rendering "Hello World" to the page as an H1.

Line 1 is definining the React element using JSX. Line 2 is getting a node from the DOM and setting it as the container. Line 3 is rendering the element into the container.

To turn this into Vanilla JS the first thing to do is to change Line 1 from JSX to JS. JSX is changed to JS by replacing the code inside of the tags with a createElement call, passing the tag, props, and children as parameters.

This is done with React as follows. React.createElement creates an object with it's arguments

```
const element = React.createElement(
  "h1",
  { title: "foo" },
  "Hello"
)
```

An element is simply an object with two properties, type and props.

```
const element = {
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
}
```

Type is a string that specifies the type of DOM node being created (the tagName passed to document.createElement).

Props is an object that has all the keys and values from the JSX attributes with a children property.

Children is a string in this example but is typically an array with more elements (this is why elements are also trees).

```
ReactDOM.render(element, container)
```

The next piece of code that needs to be replaced is the ReactDOM.render call (render is how React changes the DOM).

A node (DOM element) needs to be created using the element (React element) type then the element props need ot be assigned to the node.

```
const node = document.createElement(element.type)
node["title"] = element.props.title
const text = document.createTextNode("")
text["nodeValue"] = element.props.children
```

Using textNode allows all elements to be treated in the same way in the future. "nodeValue" is the key for "Hello World".

The last step is to append the textNode to the h1 and the h1 to the container.
