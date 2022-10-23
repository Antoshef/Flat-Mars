var CommandsEnum;
(function (CommandsEnum) {
    CommandsEnum["FORWARD"] = "F";
    CommandsEnum["LEFT"] = "L";
    CommandsEnum["RIGHT"] = "R";
})(CommandsEnum || (CommandsEnum = {}));
class Grid {
    xAxis;
    yAxis;
    scents;
    constructor(xAxis = 0, yAxis = 0) {
        (this.xAxis = xAxis), (this.yAxis = yAxis), (this.scents = []);
    }
    isPresent(x, y) {
        return x <= this.xAxis && x >= 0 && y <= this.yAxis && y >= 0;
    }
    leaveScent({ posX, posY, orientation }) {
        this.scents.push({ posX, posY, orientation });
    }
    checkScents({ posX, posY, orientation }) {
        if (this.scents.length) {
            Boolean(this.scents.find((scent) => scent.posX === posX &&
                scent.posY === posY &&
                scent.orientation === orientation));
        }
        else {
            return false;
        }
    }
}
class Robot {
    name;
    posX;
    posY;
    orientation;
    commands;
    isLost;
    constructor(name = 0, posX = 0, posY = 0, orientation = 0, isLost = false) {
        (this.name = name), (this.isLost = isLost);
        (this.posX = posX), (this.posY = posY), (this.orientation = orientation);
    }
    static orientationConverter(value) {
        if ("NESW".indexOf(value) != -1) {
            return "NESW".indexOf(value);
        }
        else {
            throw new Error("Invalid orientation");
        }
    }
    static reverseOrientationConverter(value) {
        if (value != -1) {
            return "NESW"[value];
        }
        else {
            throw new Error("Invalid orientation");
        }
    }
    turnLeft() {
        this.orientation <= 0 ? (this.orientation = 3) : this.orientation--;
    }
    turnRight() {
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
// Initialize robots by amount of commands
const initRobots = (commands) => {
    const coordinateRegEx = /^[\d]{1,2}\s[\d]{1,2}\s[N,E,S,W]$/;
    const commandRegEx = /^[L,R,F]{1,100}$/;
    const returnValue = [];
    for (let i = 0; i < commands.length;) {
        if (!commands[i])
            break;
        const isCoorValid = coordinateRegEx.test(commands[i]);
        const isCommValid = commandRegEx.test(commands[i + 1]);
        if (isCoorValid && isCommValid) {
            const [axisX, axisY, orientation] = commands[i].split(" ");
            const robot = {
                name: (i % 3) + 1,
                posX: Number(axisX),
                posY: Number(axisY),
                orientation: Robot.orientationConverter(orientation),
                commands: commands[i + 1].split(""),
                isLost: false,
            };
            returnValue.push(robot);
            i += 2;
        }
        else {
            throw new Error("Commands are invalid!");
        }
        if (commands[i] != undefined && !commands[i].length) {
            i++;
        }
    }
    return returnValue;
};
// Run main function
function MartianRobots(commands) {
    if (!commands.length)
        return;
    const mapCoordinates = commands.shift();
    const [axisX, axisY] = mapCoordinates.split(" ");
    const Mars = new Grid(Number(axisX), Number(axisY));
    const robots = initRobots(commands);
    for (const robot of robots) {
        const InitialRobot = new Robot(robots.indexOf(robot) + 1, robot.posX, robot.posY, robot.orientation);
        for (const command of robot.commands) {
            switch (command) {
                case CommandsEnum.FORWARD:
                    const posX = Number(InitialRobot.posX);
                    const posY = Number(InitialRobot.posY);
                    const scentFound = Mars.checkScents({
                        posX,
                        posY,
                        orientation: InitialRobot.orientation,
                    });
                    if (!scentFound) {
                        InitialRobot.moveForward();
                        const isPresent = Mars.isPresent(InitialRobot.posX, InitialRobot.posY);
                        if (!isPresent) {
                            InitialRobot.posX = posX;
                            InitialRobot.posY = posY;
                            Mars.leaveScent({
                                posX,
                                posY,
                                orientation: InitialRobot.orientation,
                            });
                            InitialRobot.isLost = true;
                        }
                    }
                    break;
                case CommandsEnum.LEFT:
                    InitialRobot.turnLeft();
                    break;
                case CommandsEnum.RIGHT:
                    InitialRobot.turnRight();
                    break;
                default:
                    break;
            }
            if (InitialRobot.isLost)
                break;
        }
        const result = InitialRobot.isLost
            ? `${InitialRobot.name} ${InitialRobot.posX} ${InitialRobot.posY} ${Robot.reverseOrientationConverter(InitialRobot.orientation)} L`
            : `${InitialRobot.name} ${InitialRobot.posX} ${InitialRobot.posY} ${Robot.reverseOrientationConverter(InitialRobot.orientation)}`;
        console.log(result);
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
//# sourceMappingURL=grid.js.map