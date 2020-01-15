React component for rendering svg graph based on [d3-force](https://github.com/d3/d3-force) with zoom, node dragging and other preferences.

## Usage

### Simple case

![simple-case](https://user-images.githubusercontent.com/33981244/65303668-42d78800-db87-11e9-8bae-05b7066b882a.png)

```
import React from 'react';
import Graph from 'react-graph-network';

const data = {
  nodes: [
    {id: "HkqEDLvxE"},
    {id: "011jVS4rb"},
    {id: "PXACjDxmR"},
    {id: "kuVISwh7w"},
    {id: "UIEjvLJMd"},
    {id: "ZVi8fWDBx"},
    {id: "H-06WvsfJ"},
    {id: "Fbc9iwnJl"},
  ],
  links: [
    {"source": "HkqEDLvxE", "target": "011jVS4rb"},
    {"source": "011jVS4rb", "target": "PXACjDxmR"},
    {"source": "PXACjDxmR", "target": "kuVISwh7w"},
    {"source": "PXACjDxmR", "target": "Fbc9iwnJl"},
    {"source": "PXACjDxmR", "target": "UIEjvLJMd"},
    {"source": "kuVISwh7w", "target": "UIEjvLJMd"},
    {"source": "UIEjvLJMd", "target": "ZVi8fWDBx"},
    {"source": "ZVi8fWDBx", "target": "H-06WvsfJ"},
    {"source": "H-06WvsfJ", "target": "Fbc9iwnJl"}
  ]
};

const App = () => (
  <div style={{ height: '100vh' }}>
    <Graph data={data} />
  </div>
);

export default App;
```

### Advanced case

Try different preferences on [demo page](https://alyonashadrina.github.io/react-graph-network-demo/build/index.html) with Leo Tolstoy family tree data.

## Props

| Name | Type | Default | Description | 
|---|---|---|---|
| `data`           | `object` |         | Must have `links` and `nodes` props. Each node must have `id` prop. Each link must have `source` and `target` props with `id` as values. |
| `nodeDistance`   | `number` | `100`   | The more value is, the more is distance between nodes. |
| `NodeComponent`  | `node`   |         | Has to be [svg element](https://developer.mozilla.org/docs/Web/SVG/Element). Will receive concrete `node` prop from your `data`. |
| `LineComponent`  | `node`   |         | Has to be `<line />` tag. Will receive concrete `link` prop from your `data` as id and as object it point to. |
| `enableDrag`     | `bool`   | `false` | Enable nodes dragging. |
| `pullIn`         | `bool`   | `false` | When `enableDrag`, stretch nodes back. |
| `zoomDepth`      | `number` | `0`     | Zooming on scroll wheel. `1` will just enable dragging graph area. |
| `hoverOpacity`   | `number` | `1`     | When hover on node all other nodes will have this value as opacity. Needs to be from 0 to 1. |

#### `LineComponent`
You need to apply all rest props on your `<line>` tag. If you have specific logic in your Line component be sure to handle link prop both as id and object. See [details and example on demo project](https://github.com/AlyonaShadrina/react-graph-network-demo#linecomponent-code).

### `data` example

```
const data = {
    nodes: [
        {id: "HkqEDLvxE"},
        {id: "011jVS4rb"},
        {id: "PXACjDxmR"},
        {id: "kuVISwh7w"},
    ],
    links: [
        {"source": "HkqEDLvxE", "target": "011jVS4rb"},
        {"source": "HkqEDLvxE", "target": "PXACjDxmR"},
        {"source": "kuVISwh7w", "target": "011jVS4rb"},
        {"source": "kuVISwh7w", "target": "PXACjDxmR"},
        {"source": "011jVS4rb", "target": "PXACjDxmR"}
    ]
};

```