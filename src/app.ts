import express from "express";
import { procesarMovimiento } from "./move";
import { State } from "./state";

const app = express();

app.use(express.json());

app.get("/profile", (req, res) => {
  return res.status(200).json({
   name: "Bot peroncho",
    colors: ["#61b1e3", "#ffffff"],
  });
});

app.post("/move", (req, res) => {
    console.log("Llego una peticion");

    const estado = req.body;

    if (
        !estado ||
        !["A", "B"].includes(estado.jugador) ||
        ![1, 2, 3].includes(estado.dado) ||
        !Array.isArray(estado.tablero) ||
        estado.tablero.length !== 10 ||
        !estado.tablero.every(
            (fila: unknown) =>
                Array.isArray(fila) &&
                fila.length === 10 &&
                fila.every((celda: unknown) => typeof celda === "string")
        )
    ) {
        return res.status(400).json({
            error: "Estado inválido"
        });
    }

    const respuesta = procesarMovimiento(estado as State);

    console.log("Estado:", estado);
    console.log("Respuesta:", respuesta);

    return res.json(respuesta);
});

export default app;