var Grid = /** @class */ (function () {
    function Grid(xAxis, yAxis) {
        if (xAxis === void 0) { xAxis = 0; }
        if (yAxis === void 0) { yAxis = 0; }
        (this.xAxis = xAxis), (this.yAxis = yAxis);
    }
    Grid.prototype.isPresent = function (x, y) {
        return x <= this.xAxis || x >= 0 || y <= this.yAxis || y >= 0;
    };
    return Grid;
}());
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
