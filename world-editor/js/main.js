import Point from "./primitives/points.js";
import Segment from "./primitives/segments.js";
import Graph from "./math/graph.js";

// Elements
const addPointBtn = document.getElementById("addRandomPoint");
const addSegmentBtn = document.getElementById("addRandomSegment");

// Canvas
myCanvas.width = 600;
myCanvas.height = 600;

const ctx = myCanvas.getContext("2d");

// const p1 = new Point(200, 200);
// const p2 = new Point(500, 200);
// const p3 = new Point(400, 400);
// const p4 = new Point(100, 300);

// const s1 = new Segment(p1, p2);
// const s2 = new Segment(p1, p3);
// const s3 = new Segment(p1, p4);
// const s4 = new Segment(p2, p3);
//

const graph = new Graph();
// [p1, p2, p3, p4], [s1, s2, s3, s4]
graph.draw(ctx);

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

  console.log(success);
};
const addRandomSegment = () => {
  // wenn alle segmente schon vergeben sind, dann nichts mehr machen

  const graph_length = graph.points.length;

  const index_1 = Math.floor(Math.random() * graph_length);
  const index_2 = Math.floor(Math.random() * graph_length);

  if (index_1 === index_2) return false;

  const success = graph.addSegment(
    new Segment(graph.points[index_1], graph.points[index_2])
  );
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  graph.draw(ctx);

  console.log(success, graph.segments.length);
};

// Event Listeners
addPointBtn.addEventListener("click", addRandomPoint);
addSegmentBtn.addEventListener("click", addRandomSegment);
