class Segment {
  p1;
  p2;

  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  equals = (segment) => this.includes(segment.p1) && this.includes(segment.p2);

  includes = (point) => this.p1.equals(point) || this.p2.equals(point);
  
  draw(ctx, width = 2, color = "black") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeColor = color;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }
}

export default Segment;
