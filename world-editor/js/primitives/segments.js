class Segment {
  p1;
  p2;

  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  equals = (segment) =>
    (this.p1.equals(segment.p1) && this.p2.equals(segment.p2)) ||
    (this.p1.equals(segment.p2) && this.p2.equals(segment.p1));

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
