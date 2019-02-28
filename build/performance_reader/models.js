"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RAM = /** @class */ (function () {
    function RAM() {
        this.totalMemory = 0;
        this.totalMemoryOnDisk = 0;
        this.usedMemory = 0;
        this.usedMemoryOnDisk = 0;
    }
    return RAM;
}());
exports.RAM = RAM;
var CPU = /** @class */ (function () {
    function CPU() {
        this.name = '';
        this.cores = [];
    }
    return CPU;
}());
exports.CPU = CPU;
var Core = /** @class */ (function () {
    function Core(clockSpeed) {
        this.clockSpeed = clockSpeed;
    }
    return Core;
}());
exports.Core = Core;
