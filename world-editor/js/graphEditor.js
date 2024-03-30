import Point from "./primitives/points.js";
import { getNearestPoint } from "./math/utils.js";
import Segment from "./primitives/segments.js";

class GraphEditor {
  canvas;
  graph;
  ctx;

  pointSelected = null;
  pointHovered = null;
  pointDragging = false;
  drawSegment = false;

  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = this.canvas.getContext("2d");

    this.#addEventListeners();
  }

  display = () => {
    this.graph.draw(this.ctx);
    if (this.pointHovered) {
      this.pointHovered.draw(this.ctx, { fill: true });
    }
    if (this.pointSelected) {
      const intent = this.pointHovered ?? this.mouse;
      new Segment(this.pointSelected, intent).draw(this.ctx, { dash: [3, 3] });
      this.pointSelected.draw(this.ctx, { outline: true });
    }
  };

  #selectPoint(point) {
    if (this.pointSelected) {
      this.graph.tryAddSegment(new Segment(this.pointSelected, point));
    }
    this.pointSelected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.pointHovered = false;
    if (this.pointSelected == point) {
      this.pointSelected = false;
    }
  }

  #addEventListeners = () => {
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this));

    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this));

    this.canvas.addEventListener("mouseup", this.#handleMouseUp.bind(this));

    this.canvas.addEventListener("contextmenu", (event) =>
      event.preventDefault()
    );
  };

  #handleMouseMove = (event) => {
    this.mouse = new Point(event.offsetX, event.offsetY);
    this.pointHovered = getNearestPoint(this.mouse, this.graph.points, 15);

    if (this.pointDragging) {
      this.pointSelected.x = this.mouse.x;
      this.pointSelected.y = this.mouse.y;
    }
  };
  #handleMouseDown = (event) => {
    if (event.button === 2) {
      // Rightclick
      if (this.pointSelected) {
        this.pointSelected = null;
      } else {
        this.#removePoint(this.pointHovered);
      }
    }

    if (event.button === 0) {
      if (this.pointHovered) {
        this.#selectPoint(this.pointHovered);
        this.pointDragging = true;
        return;
      }
      this.graph.addPoint(this.mouse);
      this.#selectPoint(this.mouse);
      this.pointHovered = this.mouse;
    }
  };
  #handleMouseUp = () => {
    this.pointDragging = false;
  };
}

export default GraphEditor;
