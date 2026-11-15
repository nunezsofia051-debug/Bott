"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.procesarMovimiento = procesarMovimiento;
const strategy_1 = require("./strategy");
function procesarMovimiento(estado) {
    return (0, strategy_1.decidirMovimiento)(estado);
}
