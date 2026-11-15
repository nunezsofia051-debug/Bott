"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const move_1 = require("../src/move");
describe("Pruebas del movimiento del bot", () => {
    test("el bot mueve sus propias fichas", () => {
        const estado = {
            jugador: "A",
            dado: 1,
            tablero: [
                ["A1", " ", "N", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
            ]
        };
        const resultado = (0, move_1.procesarMovimiento)(estado);
        expect(resultado).toEqual({ A1: "E" });
    });
    test("el bot no modifica el tablero original", () => {
        const estado = {
            jugador: "A",
            dado: 1,
            tablero: [
                ["A1", " ", "N", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
                [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
            ]
        };
        const tableroOriginal = structuredClone(estado.tablero);
        (0, move_1.procesarMovimiento)(estado);
        expect(estado.tablero).toEqual(tableroOriginal);
    });
});
