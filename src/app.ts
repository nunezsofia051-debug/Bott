import express from "express";
import { procesarMovimiento } from "./move";
import { State } from "./state";

const app = express();

app.use(express.json());

app.post("/move", (req, res) => {
    console.log("Llego una peticion");
    const estado = req.body as State;
    const respuesta = procesarMovimiento(estado);
   
    res.json(respuesta);
});

export default app;