
class Grid {
  xAxis: number;
  yAxis: number;
  constructor(xAxis = 0, yAxis = 0) {
    (this.xAxis = xAxis), (this.yAxis = yAxis);
  }

  isPresent(x: number, y: number) {
    return x <= this.xAxis || x >= 0 || y <= this.yAxis || y >= 0;
  }
}

// Run main function
function MartianRobots(commands: string[]): void {
 
}

const sampleInput = [
  "5 3",
  "1 1 E",
  "RFRFRFRF",
  "",
  "3 2 N",
  "FRRFLLFFRRFLL",
  "",
  "0 3 W",
  "LLFFFLFLFL",
];

MartianRobots(sampleInput);
