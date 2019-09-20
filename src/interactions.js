import { drag } from 'd3-drag';
import { event, select } from 'd3-selection';
import { zoom } from 'd3-zoom';
import { dragended, dragged, dragstarted, dragsubject } from './events';


export const addZoom = (svg, zoomDepth) => {
    if (zoomDepth) {
        const svgHeight = svg._groups[0][0].clientHeight;
        const svgWidth = svg._groups[0][0].clientWidth;

        const zoomed = () => {
            svg.selectAll("._graphZoom").attr("transform", event.transform);
        };

        svg.call(zoom()
            .extent([[0, 0], [svgWidth, svgHeight]])
            .scaleExtent([1, zoomDepth])
            .on("zoom", zoomed));
    }
    return svg;
};
export const addHoverOpacity = (node, link, hoverOpacity) => {
    node
        .on('mouseover', function (d) {
            node.style('opacity', hoverOpacity);
            select(this).style('opacity', '1');
            link.style('opacity', link_d => link_d.source.id === d.id || link_d.target.id === d.id
                ? '1'
                : hoverOpacity);
        })
        .on('mouseout', function (d) {
            node.style('opacity', "1");
            link.style('opacity', '1')
        });
    return { node, link };
};
export const addDrag = (node, simulation, enableDrag, pullIn) => {
    if (enableDrag) {
        node.call(drag()
            .subject(() => dragsubject(simulation))
            .on("start", () => dragstarted(simulation))
            .on("drag", dragged)
            .on("end", pullIn ? () => dragended(simulation) : null),
        );
    } else {
        node.call(drag()
            .subject(() => dragsubject(simulation))
            .on("start", null)
            .on("drag", null)
            .on("end", null),
        );
    }
    return node;
};