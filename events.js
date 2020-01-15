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