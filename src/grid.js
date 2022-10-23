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
    return Grid;
}());
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
    return Robot;
}());
// Initialize robots by amount of commands
var initRobots = function (commands) {
    var coordinateRegEx = /^[\d]{1,2}\s[\d]{1,2}\s[N,E,S,W]$/;
    var commandRegEx = /^[L,R,F]{1,100}$/;
    var returnValue = [];
    for (var i = 0; i < commands.length;) {
        if (!commands[i])
            break;
        var isCoorValid = coordinateRegEx.test(commands[i]);
        var isCommValid = commandRegEx.test(commands[i + 1]);
        if (isCoorValid && isCommValid) {
            var _a = commands[i].split(" "), axisX = _a[0], axisY = _a[1], orientation_1 = _a[2];
            var robot = {
                name: (i % 3) + 1,
                posX: Number(axisX),
                posY: Number(axisY),
                orientation: Robot.orientationConverter(orientation_1),
                commands: commands[i + 1].split(""),
                isLost: false
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
}
var sampleInput = [
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
