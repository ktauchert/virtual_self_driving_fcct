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
  tryAddSegment(segment) {
    if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.segments.push(segment);
      return true;
    }
    return false;
  }

  removePoint = (point) => {
    const segments_with_point = this.getSegmentsWithPoint(point);
    for(const segment of segments_with_point){
        this.removeSegment(segment);
    }
    this.points.splice(this.points.indexOf(point), 1);
  }

  removeSegment = (segment) => {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  containsPoint = (point) => this.points.find((p) => p.equals(point));

  containsSegment = (segment) => this.segments.find((s) => s.equals(segment));

  getSegmentsWithPoint(point){
    return this.segments.filter((seg) => seg.includes(point))
  }

  dispose(){
    this.points.length = 0;
    this.segments.length = 0;
  }

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
