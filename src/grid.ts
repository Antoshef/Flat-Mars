enum CommandsEnum {
  FORWARD = "F",
  LEFT = "L",
  RIGHT = "R",
}
type IScent = {
  posX: number;
  posY: number;
  orientation: number;
};
type IOrientation = "N" | "E" | "S" | "W";

class Grid {
  xAxis: number;
  yAxis: number;
  scents: IScent[];
  constructor(xAxis = 0, yAxis = 0) {
    (this.xAxis = xAxis), (this.yAxis = yAxis), (this.scents = []);
  }

  isPresent(x: number, y: number) {
    return x <= this.xAxis && x >= 0 && y <= this.yAxis && y >= 0;
  }

  leaveScent({ posX, posY, orientation }: IScent) {
    this.scents.push({ posX, posY, orientation });
  }

  checkScents({ posX, posY, orientation }: IScent) {
    if (this.scents.length) {
      return Boolean(
        this.scents.find(
          (scent) =>
            scent.posX === posX &&
            scent.posY === posY &&
            scent.orientation === orientation
        )
      );
    } else {
      return false;
    }
  }
}

interface IRobot {
  name: number;
  posX: number;
  posY: number;
  orientation: number;
  commands: string[];
  isLost: boolean;
}

class Robot implements IRobot {
  name: number;
  posX: number;
  posY: number;
  orientation: number;
  commands: string[];
  isLost: boolean;
  constructor(name = 0, posX = 0, posY = 0, orientation = 0, isLost = false) {
    (this.name = name), (this.isLost = isLost);
    (this.posX = posX), (this.posY = posY), (this.orientation = orientation);
  }

  static orientationConverter(value: string): number {
    if ("NESW".indexOf(value) != -1) {
      return "NESW".indexOf(value);
    } else {
      throw new Error("Invalid orientation");
    }
  }

  static reverseOrientationConverter(value: number): string {
    if (value != -1) {
      return "NESW"[value];
    } else {
      throw new Error("Invalid orientation");
    }
  }

  turnLeft(): void {
    this.orientation <= 0 ? (this.orientation = 3) : this.orientation--;
  }

  turnRight(): void {
    this.orientation >= 3 ? (this.orientation = 0) : this.orientation++;
  }

  moveForward() {
    switch (this.orientation) {
      case 0:
        this.posY++;
        break;
      case 1:
        this.posX++;
        break;
      case 2:
        this.posY--;
        break;
      case 3:
        this.posX--;
        break;
      default:
        throw new Error("Invalid orientation!");
    }
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
