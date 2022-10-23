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

interface IRobot {
  name: number;
  posX: number;
  posY: number;
  orientation: number;
  commands: CommandsEnum[];
  isLost: boolean;
  moveForward: () => void;
  turnLeft: () => void;
  turnRight: () => void;
  printResult: () => void;
}

type ICoordinates = {
  orientation: string;
} & Pick<IRobot, "posX" | "posY">;

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

class Robot implements IRobot {
  name: number;
  posX: number;
  posY: number;
  orientation: number;
  commands: CommandsEnum[];
  isLost: boolean;
  constructor(name = 0, posX = 0, posY = 0, orientation = 0, isLost = false) {
    (this.name = name), (this.isLost = isLost);
    (this.posX = posX), (this.posY = posY), (this.orientation = orientation);
  }

  static validateCoordinates(input: string) {
    const coordinateRegEx = /^[\d]{1,2}\s[\d]{1,2}\s[N,E,S,W]$/;
    if (coordinateRegEx.test(input)) {
      const [posX, posY, orientation] = input.split(" ");
      return { posX, posY, orientation };
    } else {
      throw new Error("Invalid input coordinates!");
    }
  }

  static validateCommands(input: string) {
    const commandRegEx = /^[L,R,F]{1,100}$/;
    if (commandRegEx.test(input)) {
      return input.split("");
    } else {
      throw new Error("Invalid input commands!");
    }
  }

  setCoordinates({ posX, posY, orientation }: ICoordinates) {
    this.posX = Number(posX);
    this.posY = Number(posY);
    this.orientation = Robot.orientationConverter(orientation);
  }

  setCommands(input: string[]) {
    this.commands = input as CommandsEnum[];
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

  printResult() {
    const result = this.isLost
      ? `${this.name} ${this.posX} ${
          this.posY
        } ${Robot.reverseOrientationConverter(this.orientation)} L`
      : `${this.name} ${this.posX} ${
          this.posY
        } ${Robot.reverseOrientationConverter(this.orientation)}`;
    console.log(result);
  }
}

// Define initial robots
const defineRobots = (input: string[]) => {
  let robots: IRobot[] = [];
  while (input.length) {
    const { posX, posY, orientation } = Robot.validateCoordinates(
      input.shift()
    );
    const commands = Robot.validateCommands(input.shift());
    const InitialRobot = new Robot();
    InitialRobot.setCoordinates({
      posX: Number(posX),
      posY: Number(posY),
      orientation,
    });
    InitialRobot.setCommands(commands);
    InitialRobot.name = robots.length + 1;
    robots.push(InitialRobot);
    if (!input.length || input.shift().length === 0) {
      continue;
    } else {
      throw new Error("Missing divider between robot initialization!");
    }
  }
  return robots;
};

// Run main function
function MartianRobots(commands: string[]): void {
  if (!commands.length) return;
  const mapCoordinates = commands.shift()!;
  const [axisX, axisY] = mapCoordinates.split(" ");
  const Mars = new Grid(Number(axisX), Number(axisY));

  const Robots = defineRobots(commands);
  for (const CurrentRobot of Robots) {
    for (const command of CurrentRobot.commands) {
      switch (command) {
        case CommandsEnum.FORWARD:
          const posX = Number(CurrentRobot.posX);
          const posY = Number(CurrentRobot.posY);
          const scentFound = Mars.checkScents({
            posX,
            posY,
            orientation: CurrentRobot.orientation,
          });
          if (!scentFound) {
            CurrentRobot.moveForward();
            const isPresent = Mars.isPresent(
              CurrentRobot.posX,
              CurrentRobot.posY
            );
            if (!isPresent) {
              CurrentRobot.posX = posX;
              CurrentRobot.posY = posY;
              Mars.leaveScent({
                posX,
                posY,
                orientation: CurrentRobot.orientation,
              });
              CurrentRobot.isLost = true;
            }
          }
          break;
        case CommandsEnum.LEFT:
          CurrentRobot.turnLeft();
          break;
        case CommandsEnum.RIGHT:
          CurrentRobot.turnRight();
          break;
        default:
          break;
      }
      if (CurrentRobot.isLost) break;
    }
    CurrentRobot.printResult();
  }
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
