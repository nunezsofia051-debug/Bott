
import { procesarMovimiento } from "../src/move";
import { State } from "../src/state";

describe("Pruebas del movimiento del bot", () => {
  test("el bot mueve sus propias fichas", () => {
    const estado: State = {
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

    const resultado = procesarMovimiento(estado);

    expect(resultado).toEqual({ A1: "E" });
  });

  test("el bot no modifica el tablero original", () => {
    const estado: State = {
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

    procesarMovimiento(estado);

    expect(estado.tablero).toEqual(tableroOriginal);
  });
});
