import { event } from 'd3-selection';


export const dragsubject = (simulation) => {
    return simulation.find(event.x, event.y);
};
export const dragstarted = (simulation) => {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
};
export const dragged = () => {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
};
export const dragended = (simulation) => {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
};

export const tick = (node, link) => {
    link.attr("x1", function (d) {
        return d.source.x;
    })
        .attr("y1", function (d) {
            return d.source.y;
        })
        .attr("x2", function (d) {
            return d.target.x;
        })
        .attr("y2", function (d) {
            return d.target.y;
        });
    node.style('transform', d => `translate(${d.x}px, ${d.y}px)`);
};