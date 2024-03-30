import Point from "./primitives/points.js";
import Segment from "./primitives/segments.js";
import Graph from "./math/graph.js";
import GraphEditor from "./graphEditor.js";

// Elements
const addPointBtn = document.getElementById("addRandomPoint");
const addSegmentBtn = document.getElementById("addRandomSegment");
const removePointBtn = document.getElementById("removeRandomPoint");
const removeSegmentBtn = document.getElementById("removeRandomSegment");
const removeAllBtn = document.getElementById("removeAll");

// Canvas
myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

const graph = new Graph();
const graphEditor = new GraphEditor(myCanvas, graph);

animate();

function animate() {
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graphEditor.display();
  requestAnimationFrame(animate);
}


/* ----------------------- */
// helpers
const addRandomPoint = () => {
  const success = graph.addPoint(
    new Point(
      Math.round(Math.random() * myCanvas.width),
      Math.round(Math.random() * myCanvas.height)
    )
  );
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);

};
const addRandomSegment = () => {
  // wenn alle segme nte schon vergeben sind, dann nichts mehr machen

  const graph_length = graph.points.length;

  const index_1 = Math.floor(Math.random() * graph_length);
  const index_2 = Math.floor(Math.random() * graph_length);
  const success = graph.tryAddSegment(
    new Segment(graph.points[index_1], graph.points[index_2])
  );
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
};
const removeRandomPoint = () => {
  if (graph.points.length == 0) return;

  const index = Math.floor(Math.random() * graph.segments.length);
  graph.removePoint(graph.points[index]);

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
};
const removeRandomSegment = () => {
  if (graph.segments.length == 0) return;

  const index = Math.floor(Math.random() * graph.segments.length);
  graph.removeSegment(graph.segments[index]);

  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
};
const removeAll = () => {
  graph.dispose();
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);
};
// Event List eners
// addPointBtn.addEventListener("click", addRandomPoint);
// addSegmentBtn.addEventListener("click", addRandomSegment);
// removePointBtn.addEventListener("click", removeRandomPoint);
// removeSegmentBtn.addEventListener("click", removeRandomSegment);
// removeAllBtn.addEventListener("click", removeAll);
