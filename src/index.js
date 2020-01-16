import { select } from "d3-selection";
import { forceCenter, forceLink, forceManyBody, forceSimulation } from "d3-force";
import React, { useEffect } from 'react';

import { tick } from './events';
import { addDrag, addHoverOpacity, addZoom } from './interactions';

// TODO: make component independent of restProps
// TODO: handle error when line is not <line>
// TODO: add centering node on click
// TODO: split to separate useEffects and useState
// TODO: fix zoomDepth - not working at all

// if you'll try do develop package locally with 'npm link'
// probably you will get error 'Invalid hook call.'
// see https://github.com/facebook/react/issues/15315#issuecomment-479802153

// so better fork and/or use branch name in package.json dependencies like so:
// "react-graph-network": "github:AlyonaShadrina/react-graph-network#<branch>"
// dont't forget to `rm -rf ./node_modules/react-graph-network && npm i`

const Graph = ({
    data,
    nodeDistance,
    NodeComponent,
    LineComponent,
    pullIn,
    zoomDepth,
    enableDrag,
    hoverOpacity,
    ...restProps
}) => {
    useEffect(() => {

        if (!data) {
            return null
        }

        const svg = select("#GraphTree_container");
        const link = svg.selectAll("._graphLine").data(data.links);
        const node = svg.selectAll("._graphNode").data(data.nodes);

        const simulation = forceSimulation(data.nodes)
            .force("link", forceLink()                                 // This force provides links between nodes
                .id(function(d) { return d.id; })                      // This provide the id of a node
                .links(data.links)                                     // and this the list of links
            )
            .force("charge", forceManyBody().strength(-1 * nodeDistance))          // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force("center", forceCenter(
                svg._groups[0][0].parentElement.clientWidth / 2,
                svg._groups[0][0].parentElement.clientHeight / 2
            ))                                                         // This force attracts nodes to the center of the svg area
            .on("tick", () => tick(node, link));                       // https://github.com/d3/d3-force#simulation_tick

        // add interactions
        addZoom(svg, zoomDepth);
        addHoverOpacity(node, link, hoverOpacity);
        addDrag(node, simulation, enableDrag, pullIn);

    }, [data, nodeDistance, NodeComponent, LineComponent, pullIn, zoomDepth, enableDrag, hoverOpacity]);

    if (!data) {
        return null
    }

    return (
        <svg
            id="GraphTree_container"
            width="100%"
            height="100%"
            {...restProps}
        >
             <g className="_graphZoom">
                 {
                     data.links.map((link, i) => {
                         return LineComponent
                             ? <LineComponent link={link} key={i} className="_graphLine"/>
                             : <line stroke="grey" key={i} className="_graphLine" />
                     })
                 }
                 {
                     data.nodes.map((node, i) => {
                         return (
                             <g key={i} className="_graphNode">
                                 {
                                     NodeComponent
                                         ? <NodeComponent node={node}/>
                                         : <circle fill="black" r={10} />
                                 }
                             </g>
                         )
                     })
                 }
             </g>
        </svg>
    )
};

Graph.defaultProps = {
    nodeDistance: 100,
    zoomDepth: 0,
    hoverOpacity: 1,
};

export default Graph;