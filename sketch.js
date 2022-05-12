let sketch = function (p) {
  function startRunning() {
    p.loop();
  }

  function stopRunning() {
    p.noLoop();
  }

  let colors = [];

  let myFont;

  let totalOrbs = 4;
  let orbs = [];
  let maxRadius = 600;
  let minRadius = 300;

  p.setup = function () {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(1);
    p.ellipseMode(p.RADIUS);
    p.frameRate(30);

    canvas.mouseOver(startRunning);
    canvas.mouseOut(stopRunning);
    p.noLoop();

    let orange = p.color(246, 149, 29);
    colors.push(orange);
    // let white = color(255,255,255);
    // colors.push(white);
    let brightRed = p.color(255, 0, 12);
    colors.push(brightRed);
    let pink = p.color(242, 10, 255);
    colors.push(pink);
    let cobaltBlue = p.color(103, 45, 255);
    colors.push(cobaltBlue);

    createOrbs();
  };

  p.draw = function () {
    //orange background
    p.background(10);

    for (let i = 0; i < totalOrbs; i++) {
      orbs[i].draw(p.width, p.height);
    }
  };

  function createOrbs() {
    let colorIndex = 0;

    for (let i = 0; i < totalOrbs; i++) {
      if (colorIndex >= colors.length) {
        colorIndex = 0;
      }

      let orb = new Orb(
        p.random(p.width),
        p.random(p.height),
        p.random(minRadius, maxRadius),
        colors[colorIndex]
      );

      colorIndex++;

      orbs[i] = orb;
    }
  }

  class Orb {
    constructor(x, y, radius, col) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = col;

      this.vx = p.random() * 1.5;
      this.vy = p.random() * 1.5;

      this.sinValue = p.random();
    }

    draw(width, height) {
      this.sinValue += 0.01;

      this.radius += p.sin(this.sinValue);

      this.x += this.vx * (p.mouseX * 0.01);
      this.y += this.vy * (p.mouseY * 0.01);

      if (this.x < 0) {
        this.vx *= -1;
        this.x += 10;
      } else if (this.x > width) {
        this.vx *= -1;
        this.x -= 10;
      }

      if (this.y < 0) {
        this.vy *= -1;
        this.y += 10;
      } else if (this.y > height) {
        this.vy *= -1;
        this.y -= 10;
      }

      this.createGradient();
    }

    createGradient() {
      this.color.setAlpha(255);
      let c1 = this.color;
      this.color.setAlpha(5);
      let c2 = this.color;

      for (let r = this.radius; r > 0; r -= 7) {
        let inter = p.map(r, this.radius, 0, 0, 1);
        let c = p.lerpColor(c1, c2, inter);
        p.fill(c);
        p.noStroke();
        p.circle(this.x, this.y, r);
      }
    }
  }
};

new p5(sketch, "p5-container-1");
