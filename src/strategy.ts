import { State } from "./state";
export function decidirMovimiento(estado: State): Record<string, string> {
     const movimientos: Record<string, string> = {};
    for ( let fila = 0; fila < estado.tablero.length; fila++) {
        for (let columna = 0; columna < estado.tablero[fila].length; columna++) {

            const casilla = estado.tablero[fila][columna];

            if ( casilla.startsWith(estado.jugador)) {
                movimientos[casilla] = "N"
            }
        }
    }

    return movimientos;
} 