class Graph {
  points = [];
  segments = [];

  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(point) {
    if (!this.containsPoint(point)) {
      this.points.push(point);
      return true;
    }
    return false;
  }
  addSegment(segment) {
    if (!this.containsSegment(segment)) {
      this.segments.push(segment);
      return true;
    }
    return false;
  }

  containsPoint = (point) => this.points.find((p) => p.equals(point));

  containsSegment = (segment) => this.segments.find((s) => s.equals(segment));

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }

    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}

export default Graph;
