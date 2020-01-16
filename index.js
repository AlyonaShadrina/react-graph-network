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

// TODO: make component independent of restProps
// TODO: handle error when line is not <line>
// TODO: add centering node on click
// TODO: fix function with hook
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

  // const [count, setCount] = useState(0);
  //
  (0, _react.useEffect)(function () {
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
    console.log('bla');
  }, []); // }, [data, nodeDistance, NodeComponent, LineComponent, pullIn, zoomDepth, enableDrag, hoverOpacity,]);
  //
  //

  return _react["default"].createElement("svg", _extends({
    id: "GraphTree_container",
    width: "100%",
    height: "100%"
  }, restProps));
}; // Graph.defaultProps = {
//     nodeDistance: 100,
//     zoomDepth: 0,
//     hoverOpacity: 1,
// };


var _default = Graph; // class Graph extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = null;
//     }
//
//     renderGraph(props) {
//         const {
//             data,
//             nodeDistance,
//             pullIn,
//             zoomDepth,
//             enableDrag,
//             hoverOpacity,
//         } = props;
//
//         if (!data) {
//             return null
//         }
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
//     }
//
//     componentDidMount() {
//         this.setState(this.props);
//         this.renderGraph(this.props);
//     };
//
//     render() {
//         if (this.state) {
//             this.renderGraph(this.props)
//         }
//         const {
//             data,
//             nodeDistance,
//             NodeComponent,
//             LineComponent,
//             pullIn,
//             zoomDepth,
//             enableDrag,
//             hoverOpacity,
//             ...restProps
//         } = this.props;
//
//         if (!data) {
//             return null
//         }
//
//         return (
//             <svg
//                 id="GraphTree_container"
//                 width="100%"
//                 height="100%"
//                 {...restProps}
//             >
//                 <g className="_graphZoom">
//                     {
//                         data.links.map((link, i) => {
//                             return LineComponent
//                                 ? <LineComponent link={link} key={i} className="_graphLine"/>
//                                 : <line stroke="grey" key={i} className="_graphLine" />
//                         })
//                     }
//                     {
//                         data.nodes.map((node, i) => {
//                             return (
//                                 <g key={i} className="_graphNode">
//                                     {
//                                         NodeComponent
//                                             ? <NodeComponent node={node}/>
//                                             : <circle fill="black" r={10} />
//                                     }
//                                 </g>
//                             )
//                         })
//                     }
//                 </g>
//             </svg>
//         )
//     }
// };
//
// Graph.defaultProps = {
//     nodeDistance: 100,
//     zoomDepth: 0,
//     hoverOpacity: 1,
// };
//
// export default Graph;

exports["default"] = _default;