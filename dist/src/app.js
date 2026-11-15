"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const move_1 = require("./move");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/profile", (req, res) => {
    return res.status(200).json({
        name: "Bot peroncho",
        colors: ["#61b1e3", "#f7eeeb"],
    });
});
app.post("/move", (req, res) => {
    console.log("Llego una peticion");
    const estado = req.body;
    const respuesta = (0, move_1.procesarMovimiento)(estado);
    console.log("Estado:", estado);
    console.log("Respuesta:", respuesta);
    res.json(respuesta);
});
exports.default = app;
