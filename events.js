"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tick = exports.dragended = exports.dragged = exports.dragstarted = exports.dragsubject = void 0;

var _d3Selection = require("d3-selection");

var dragsubject = function dragsubject(simulation) {
  return simulation.find(_d3Selection.event.x, _d3Selection.event.y);
};

exports.dragsubject = dragsubject;

var dragstarted = function dragstarted(simulation) {
  if (!_d3Selection.event.active) simulation.alphaTarget(0.3).restart();
  _d3Selection.event.subject.fx = _d3Selection.event.subject.x;
  _d3Selection.event.subject.fy = _d3Selection.event.subject.y;
};

exports.dragstarted = dragstarted;

var dragged = function dragged() {
  _d3Selection.event.subject.fx = _d3Selection.event.x;
  _d3Selection.event.subject.fy = _d3Selection.event.y;
};

exports.dragged = dragged;

var dragended = function dragended(simulation) {
  if (!_d3Selection.event.active) simulation.alphaTarget(0);
  _d3Selection.event.subject.fx = null;
  _d3Selection.event.subject.fy = null;
};

exports.dragended = dragended;

var tick = function tick(node, link) {
  link.attr("x1", function (d) {
    return d.source.x;
  }).attr("y1", function (d) {
    return d.source.y;
  }).attr("x2", function (d) {
    return d.target.x;
  }).attr("y2", function (d) {
    return d.target.y;
  });
  node.style('transform', function (d) {
    return "translate(".concat(d.x, "px, ").concat(d.y, "px)");
  });
};

exports.tick = tick;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _d3Selection = require("d3-selection");

var _d3Force = require("d3-force");

var _react = _interopRequireWildcard(require("react"));

var _events = require("./events");

var _interactions = require("./interactions");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// TODO: handle error when line is not <line>
// TODO: add centering node on click
var Graph = function Graph(_ref) {
  var data = _ref.data,
      nodeDistance = _ref.nodeDistance,
      NodeComponent = _ref.NodeComponent,
      LineComponent = _ref.LineComponent,
      pullIn = _ref.pullIn,
      zoomDepth = _ref.zoomDepth,
      enableDrag = _ref.enableDrag,
      hoverOpacity = _ref.hoverOpacity,
      restProps = _objectWithoutProperties(_ref, ["data", "nodeDistance", "NodeComponent", "LineComponent", "pullIn", "zoomDepth", "enableDrag", "hoverOpacity"]);

  (0, _react.useEffect)(function () {
    var svg = (0, _d3Selection.select)("#GraphTree_container");
    var link = svg.selectAll("._graphLine").data(data.links);
    var node = svg.selectAll("._graphNode").data(data.nodes);
    var simulation = (0, _d3Force.forceSimulation)(data.nodes).force("link", (0, _d3Force.forceLink)() // This force provides links between nodes
    .id(function (d) {
      return d.id;
    }) // This provide the id of a node
    .links(data.links) // and this the list of links
    ).force("charge", (0, _d3Force.forceManyBody)().strength(-1 * nodeDistance)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
    .force("center", (0, _d3Force.forceCenter)(svg._groups[0][0].parentElement.clientWidth / 2, svg._groups[0][0].parentElement.clientHeight / 2)) // This force attracts nodes to the center of the svg area
    .on("tick", function () {
      return (0, _events.tick)(node, link);
    }); // https://github.com/d3/d3-force#simulation_tick
    // add interactions

    (0, _interactions.addZoom)(svg, zoomDepth);
    (0, _interactions.addHoverOpacity)(node, link, hoverOpacity);
    (0, _interactions.addDrag)(node, simulation, enableDrag, pullIn);
  }, [data, nodeDistance, NodeComponent, LineComponent, pullIn, zoomDepth, enableDrag, hoverOpacity]);
  return _react["default"].createElement("svg", _extends({
    id: "GraphTree_container",
    width: "100%",
    height: "100%"
  }, restProps), _react["default"].createElement("g", {
    className: "_graphZoom"
  }, data.links.map(function (link, i) {
    return LineComponent ? _react["default"].createElement(LineComponent, {
      link: link,
      key: i,
      className: "_graphLine"
    }) : _react["default"].createElement("line", {
      stroke: "grey",
      key: i,
      className: "_graphLine"
    });
  }), data.nodes.map(function (node, i) {
    return _react["default"].createElement("g", {
      key: i,
      className: "_graphNode"
    }, NodeComponent ? _react["default"].createElement(NodeComponent, {
      node: node
    }) : _react["default"].createElement("circle", {
      fill: "black",
      r: 10
    }));
  })));
};

Graph.defaultProps = {
  nodeDistance: 100,
  zoomDepth: 0,
  hoverOpacity: 1
};
var _default = Graph;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDrag = exports.addHoverOpacity = exports.addZoom = void 0;

var _d3Drag = require("d3-drag");

var _d3Selection = require("d3-selection");

var _d3Zoom = require("d3-zoom");

var _events = require("./events");

var addZoom = function addZoom(svg, zoomDepth) {
  if (zoomDepth) {
    var svgHeight = svg._groups[0][0].clientHeight;
    var svgWidth = svg._groups[0][0].clientWidth;

    var zoomed = function zoomed() {
      svg.selectAll("._graphZoom").attr("transform", _d3Selection.event.transform);
    };

    svg.call((0, _d3Zoom.zoom)().extent([[0, 0], [svgWidth, svgHeight]]).scaleExtent([1, zoomDepth]).on("zoom", zoomed));
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
  }

  return node;
};

exports.addDrag = addDrag;
