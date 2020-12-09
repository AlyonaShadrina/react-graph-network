"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDrag = exports.addHoverOpacity = exports.addZoom = void 0;

var _d3Drag = require("d3-drag");

var _d3Selection = require("d3-selection");

var _d3Zoom = require("d3-zoom");

var _events = require("./events");

var addZoom = function addZoom(svg, zoomDepth, enableZoomOut) {
  if (zoomDepth) {
    var svgHeight = svg._groups[0][0].clientHeight;
    var svgWidth = svg._groups[0][0].clientWidth;

    var zoomed = function zoomed() {
      svg.selectAll("._graphZoom").attr("transform", _d3Selection.event.transform);
    };
    var minZoomDepth = enableZoomOut ? 0 : 1;

    svg.call((0, _d3Zoom.zoom)().extent([[0, 0], [svgWidth, svgHeight]]).scaleExtent([minZoomDepth, zoomDepth]).on("zoom", zoomed));
  }

  return svg;
};

exports.addZoom = addZoom;

var addHoverOpacity = function addHoverOpacity(node, link, hoverOpacity) {
  node.on('mouseover', function (d) {
    node.style('opacity', hoverOpacity);
    (0, _d3Selection.select)(this).style('opacity', '1');
    link.style('opacity', function (link_d) {
      return link_d.source.id === d.id || link_d.target.id === d.id ? '1' : hoverOpacity;
    });
  }).on('mouseout', function (d) {
    node.style('opacity', "1");
    link.style('opacity', '1');
  });
  return {
    node: node,
    link: link
  };
};

exports.addHoverOpacity = addHoverOpacity;

var addDrag = function addDrag(node, simulation, enableDrag, pullIn) {
  if (enableDrag) {
    node.call((0, _d3Drag.drag)().subject(function () {
      return (0, _events.dragsubject)(simulation);
    }).on("start", function () {
      return (0, _events.dragstarted)(simulation);
    }).on("drag", _events.dragged).on("end", pullIn ? function () {
      return (0, _events.dragended)(simulation);
    } : null));
  } else {
    node.call((0, _d3Drag.drag)().subject(function () {
      return (0, _events.dragsubject)(simulation);
    }).on("start", null).on("drag", null).on("end", null));
  }

  return node;
};

exports.addDrag = addDrag;
