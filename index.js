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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// TODO: handle error when line is not <line>
// TODO: add centering node on click
// TODO: fix function with hook
// const Graph = ({
//     data,
//     nodeDistance,
//     NodeComponent,
//     LineComponent,
//     pullIn,
//     zoomDepth,
//     enableDrag,
//     hoverOpacity,
//     ...restProps
// }) => {
//
//     useEffect(() => {
//
//         const svg = select("#GraphTree_container");
//         const link = svg.selectAll("._graphLine").data(data.links);
//         const node = svg.selectAll("._graphNode").data(data.nodes);
//
//         const simulation = forceSimulation(data.nodes)
//             .force("link", forceLink()                                 // This force provides links between nodes
//                 .id(function(d) { return d.id; })                      // This provide the id of a node
//                 .links(data.links)                                     // and this the list of links
//             )
//             .force("charge", forceManyBody().strength(-1 * nodeDistance))          // This adds repulsion between nodes. Play with the -400 for the repulsion strength
//             .force("center", forceCenter(
//                 svg._groups[0][0].parentElement.clientWidth / 2,
//                 svg._groups[0][0].parentElement.clientHeight / 2
//             ))                                                         // This force attracts nodes to the center of the svg area
//             .on("tick", () => tick(node, link));                       // https://github.com/d3/d3-force#simulation_tick
//
//         // add interactions
//         addZoom(svg, zoomDepth);
//         addHoverOpacity(node, link, hoverOpacity);
//         addDrag(node, simulation, enableDrag, pullIn);
//
//     }, [data, nodeDistance, NodeComponent, LineComponent, pullIn, zoomDepth, enableDrag, hoverOpacity,]);
//
//
//     return (
//         <svg
//             id="GraphTree_container"
//             width="100%"
//             height="100%"
//             {...restProps}
//         >
//             <g className="_graphZoom">
//                 {
//                     data.links.map((link, i) => {
//                         return LineComponent
//                             ? <LineComponent link={link} key={i} className="_graphLine"/>
//                             : <line stroke="grey" key={i} className="_graphLine" />
//                     })
//                 }
//                 {
//                     data.nodes.map((node, i) => {
//                         return (
//                             <g key={i} className="_graphNode">
//                                 {
//                                     NodeComponent
//                                         ? <NodeComponent node={node}/>
//                                         : <circle fill="black" r={10} />
//                                 }
//                             </g>
//                         )
//                     })
//                 }
//             </g>
//         </svg>
//     )
// };
//
// Graph.defaultProps = {
//     nodeDistance: 100,
//     zoomDepth: 0,
//     hoverOpacity: 1,
// };
//
// export default Graph;
var Graph =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Graph, _React$Component);

  function Graph(props) {
    var _this;

    _classCallCheck(this, Graph);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Graph).call(this, props));
    _this.state = null;
    return _this;
  }

  _createClass(Graph, [{
    key: "renderGraph",
    value: function renderGraph(props) {
      var data = props.data,
          nodeDistance = props.nodeDistance,
          pullIn = props.pullIn,
          zoomDepth = props.zoomDepth,
          enableDrag = props.enableDrag,
          hoverOpacity = props.hoverOpacity;

      if (!data) {
        return null;
      }

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
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState(this.props);
      this.renderGraph(this.props);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state) {
        this.renderGraph(this.props);
      }

      var _this$props = this.props,
          data = _this$props.data,
          nodeDistance = _this$props.nodeDistance,
          NodeComponent = _this$props.NodeComponent,
          LineComponent = _this$props.LineComponent,
          pullIn = _this$props.pullIn,
          zoomDepth = _this$props.zoomDepth,
          enableDrag = _this$props.enableDrag,
          hoverOpacity = _this$props.hoverOpacity,
          restProps = _objectWithoutProperties(_this$props, ["data", "nodeDistance", "NodeComponent", "LineComponent", "pullIn", "zoomDepth", "enableDrag", "hoverOpacity"]);

      if (!data) {
        return null;
      }

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
    }
  }]);

  return Graph;
}(_react["default"].Component);

;
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
