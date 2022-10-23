var CommandsEnum;
(function (CommandsEnum) {
    CommandsEnum["FORWARD"] = "F";
    CommandsEnum["LEFT"] = "L";
    CommandsEnum["RIGHT"] = "R";
})(CommandsEnum || (CommandsEnum = {}));
var Grid = /** @class */ (function () {
    function Grid(xAxis, yAxis) {
        if (xAxis === void 0) { xAxis = 0; }
        if (yAxis === void 0) { yAxis = 0; }
        (this.xAxis = xAxis), (this.yAxis = yAxis), (this.scents = []);
    }
    Grid.prototype.isPresent = function (x, y) {
        return x <= this.xAxis && x >= 0 && y <= this.yAxis && y >= 0;
    };
    Grid.prototype.leaveScent = function (_a) {
        var posX = _a.posX, posY = _a.posY, orientation = _a.orientation;
        this.scents.push({ posX: posX, posY: posY, orientation: orientation });
    };
    Grid.prototype.checkScents = function (_a) {
        var posX = _a.posX, posY = _a.posY, orientation = _a.orientation;
        if (this.scents.length) {
            return Boolean(this.scents.find(function (scent) {
                return scent.posX === posX &&
                    scent.posY === posY &&
                    scent.orientation === orientation;
            }));
        }
        else {
            return false;
        }
    };
    Grid.prototype.initRobot = function (posX, posY) {
        if (posX < 0 || posX > this.xAxis || posY < 0 || posY > this.yAxis) {
            throw new Error("Can't initializa a robot outside of the grid area!");
        }
    };
    return Grid;
}());
/**
 * Initialize a robot
 * @param name Robot's name
 * @param posX current robot's position at xAxis
 * @param posY current robot's position at yAxis
 * @param orientation (N, S, E, W)
 * @param commands a set of instruction "L", "R" and "F"
 * @param isLost boolean set to true if a robot is lost
 * @callback validateCoordinates validates the robot input coordinates
 */
var Robot = /** @class */ (function () {
    function Robot(name, posX, posY, orientation, isLost) {
        if (name === void 0) { name = 0; }
        if (posX === void 0) { posX = 0; }
        if (posY === void 0) { posY = 0; }
        if (orientation === void 0) { orientation = 0; }
        if (isLost === void 0) { isLost = false; }
        (this.name = name), (this.isLost = isLost);
        (this.posX = posX), (this.posY = posY), (this.orientation = orientation);
    }
    Robot.validateCoordinates = function (input) {
        var coordinateRegEx = /^[\d]{1,2}\s[\d]{1,2}\s[N,E,S,W]$/;
        var _a = input.split(" "), posX = _a[0], posY = _a[1], orientation = _a[2];
        if (coordinateRegEx.test(input) &&
            Number(posX) <= 50 &&
            Number(posY) <= 50) {
            return { posX: posX, posY: posY, orientation: orientation };
        }
        else {
            throw new Error("Invalid input coordinates!");
        }
    };
    Robot.validateCommands = function (input) {
        var commandRegEx = /^[L,R,F]{1,100}$/;
        if (commandRegEx.test(input)) {
            return input.split("");
        }
        else {
            throw new Error("Invalid input commands!");
        }
    };
    Robot.prototype.setCoordinates = function (_a) {
        var posX = _a.posX, posY = _a.posY, orientation = _a.orientation;
        this.posX = Number(posX);
        this.posY = Number(posY);
        this.orientation = Robot.orientationConverter(orientation);
    };
    Robot.prototype.setCommands = function (input) {
        this.commands = input;
    };
    Robot.orientationConverter = function (value) {
        if ("NESW".indexOf(value) != -1) {
            return "NESW".indexOf(value);
        }
        else {
            throw new Error("Invalid orientation");
        }
    };
    Robot.reverseOrientationConverter = function (value) {
        if (value != -1) {
            return "NESW"[value];
        }
        else {
            throw new Error("Invalid orientation");
        }
    };
    Robot.prototype.turnLeft = function () {
        this.orientation <= 0 ? (this.orientation = 3) : this.orientation--;
    };
    Robot.prototype.turnRight = function () {
        this.orientation >= 3 ? (this.orientation = 0) : this.orientation++;
    };
    Robot.prototype.moveForward = function () {
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
    };
    Robot.prototype.printResult = function () {
        var result = this.isLost
            ? "".concat(this.name, " ").concat(this.posX, " ").concat(this.posY, " ").concat(Robot.reverseOrientationConverter(this.orientation), " L")
            : "".concat(this.name, " ").concat(this.posX, " ").concat(this.posY, " ").concat(Robot.reverseOrientationConverter(this.orientation));
        console.log(result);
    };
    return Robot;
}());
// Define initial robots
var defineRobots = function (input) {
    var robots = [];
    while (input.length) {
        var _a = Robot.validateCoordinates(input.shift()), posX = _a.posX, posY = _a.posY, orientation_1 = _a.orientation;
        var commands = Robot.validateCommands(input.shift());
        var InitialRobot = new Robot();
        InitialRobot.setCoordinates({
            posX: Number(posX),
            posY: Number(posY),
            orientation: orientation_1
        });
        InitialRobot.setCommands(commands);
        InitialRobot.name = robots.length + 1;
        robots.push(InitialRobot);
        if (!input.length || input.shift().length === 0) {
            continue;
        }
        else {
            throw new Error("Missing divider between robot initialization!");
        }
    }
    return robots;
};
// Run main function
function MartianRobots(commands) {
    if (!commands.length)
        return;
    var mapCoordinates = commands.shift();
    var _a = mapCoordinates.split(" "), axisX = _a[0], axisY = _a[1];
    var Mars = new Grid(Number(axisX), Number(axisY));
    var Robots = defineRobots(commands);
    for (var _i = 0, Robots_1 = Robots; _i < Robots_1.length; _i++) {
        var CurrentRobot = Robots_1[_i];
        Mars.initRobot(CurrentRobot.posX, CurrentRobot.posY);
        for (var _b = 0, _c = CurrentRobot.commands; _b < _c.length; _b++) {
            var command = _c[_b];
            switch (command) {
                case CommandsEnum.FORWARD:
                    var posX = Number(CurrentRobot.posX);
                    var posY = Number(CurrentRobot.posY);
                    var scentFound = Mars.checkScents({
                        posX: posX,
                        posY: posY,
                        orientation: CurrentRobot.orientation
                    });
                    if (!scentFound) {
                        CurrentRobot.moveForward();
                        var isPresent = Mars.isPresent(CurrentRobot.posX, CurrentRobot.posY);
                        if (!isPresent) {
                            CurrentRobot.posX = posX;
                            CurrentRobot.posY = posY;
                            Mars.leaveScent({
                                posX: posX,
                                posY: posY,
                                orientation: CurrentRobot.orientation
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
            if (CurrentRobot.isLost)
                break;
        }
        CurrentRobot.printResult();
    }
}
var inputOne = [
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
var inputTwo = [
    "2 2",
    "0 0 N",
    "FLFLFRF",
    "",
    "0 0 N",
    "FLFFFRFF",
    "",
    "0 0 N",
    "FLFFFRFFRFF",
];
console.log("Init 1");
MartianRobots(inputOne);
console.log("\nInit 2");
MartianRobots(inputTwo);
