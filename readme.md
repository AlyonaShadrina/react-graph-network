React component for rendering svg graph based on [d3-force](https://github.com/d3/d3-force).

## Props

| Name | Type | Default | Description | 
|---|---|---|---|
| `data`           | `object` |         | Must have `links` and `nodes` props. Each node must have `id` prop. Each link must have `source` and `target` props with `id` as values. |
| `nodeDistance`   | `number` | `100`   | The more value is, the more is distance between nodes. |
| `NodeComponent`  | `node`   |         | Has to be [svg element](https://developer.mozilla.org/docs/Web/SVG/Element). Will receive concrete `node` prop from your `data`. |
| `LineComponent`  | `node`   |         | Has to be `<line />` tag. Will receive concrete `link` prop from your `data`. You need to apply all rest props on your `<line>` tag. |
| `enableDrag`     | `bool`   | `false` | Enable nodes dragging. |
| `pullIn`         | `bool`   | `false` | When `enableDrag`, stretch nodes back. |
| `zoomDepth`      | `number` | `0`     | Zooming on scroll wheel. `1` will just enable dragging graph area. |
| `hoverOpacity`   | `number` | `1`     | When hover on node all other nodes will have this value as opacity. Needs to be from 0 to 1. |

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