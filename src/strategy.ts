import { State } from "./state";
export function decidirMovimiento(estado: State): Record<string, string> {
    const movimientos: Record<string, string> = {};
    const tablero = estado.tablero;

    const cantidadFilas = tablero.length;
    const cantidadColumnas = tablero[0].length;

    const casas: [number, number][] = [];

    function calcularDestino(
        fila: number,
        columna: number,
        direccion: "N" | "E" | "S" | "O", 
        dado: number,
        cantidadFilas: number,
        cantidadColumnas: number
    ): [number, number] {

        let nuevaFila = fila;
        let nuevaColumna = columna;

        for (let i = 0; i < dado; i++) {
            if (direccion === "N") {
                nuevaFila--;
                if (nuevaFila < 0) {
                    nuevaFila = cantidadFilas - 1;
                }
            }
            if (direccion === "E") {
                nuevaColumna++;
                if (nuevaColumna >= cantidadColumnas) {
                    nuevaColumna = 0;
                }
            }
            if (direccion === "S") {
                nuevaFila++;
                if (nuevaFila >= cantidadFilas) {
                    nuevaFila = 0;
                }
            }
            if (direccion === "O") {
                nuevaColumna--;
                if (nuevaColumna < 0) {
                    nuevaColumna = cantidadColumnas - 1;
                }
            }
        }
        return [nuevaFila, nuevaColumna];
    }
    //Buscamos las casas que todavia quedan en el tablero 
    for (let fila = 0; fila < cantidadFilas; fila++) {
        for (let columna = 0; columna < cantidadColumnas; columna++) {

            if (tablero[fila][columna] === "N") {
                casas.push([fila, columna]);
            }
        }
    }

    const fichas: { id: string, fila: number, columna: number }[] = [];
    // Buscamos las fichas de nuestro jugador
    for (let fila = 0; fila < cantidadFilas; fila++) {
        for (let columna = 0; columna < cantidadColumnas; columna++) {

            const ficha = tablero[fila][columna];
            if (!ficha.startsWith(estado.jugador)) {
                continue;
            }
            fichas.push({
                id: ficha,
                fila: fila,
                columna: columna
            });
        }
    }
    fichas.sort((a, b) =>
        a.id.localeCompare(b.id));

    const objetivos = new Map<string, [number, number]>();

    for (let i = 0; i < fichas.length; i++) {
        if (i < casas.length) {

            objetivos.set(fichas[i].id, casas[i]);
        }
    }

    //calcular distancia circular
    function distanciaCircular(
        posicion1: number,
        posicion2: number,
        limite: number
    ): number {
        const distanciaDirecta = Math.abs(posicion1 - posicion2);
        const distanciaCircular = limite - distanciaDirecta;
        return Math.min(distanciaDirecta, distanciaCircular);
    }

    for (const f of fichas) {
        const ficha = f.id;
        const fila = f.fila;
        const columna = f.columna;

        // Si no quedan casas, seguimoa hacia arriba 

        if (casas.length === 0) {
            movimientos[ficha] = "N";
        } else {
            const objetivo = objetivos.get(ficha);
            let mejorDireccion: "N" | "E" | "S" | "O" = "N";
            let menorDistancia = Infinity;

            //Analizamos cada casa
            if (objetivo) {
                const filaCasa = objetivo[0];
                const columnaCasa = objetivo[1];

                const direcciones: ("N" | "E" | "S" | "O")[] = ["N", "E", "S", "O"];

            for (const direccion of direcciones) {
            const destino = calcularDestino(
            fila,
            columna,
        direccion,
        estado.dado,
        cantidadFilas,
        cantidadColumnas
    );

    const distanciaFilas = distanciaCircular(
        destino[0],
        filaCasa,
        cantidadFilas
    );

    const distanciaColumnas = distanciaCircular(
        destino[1],
        columnaCasa,
        cantidadColumnas
    );

    const distanciaTotal = distanciaFilas + distanciaColumnas;

    if (distanciaTotal < menorDistancia) {
        menorDistancia = distanciaTotal;
        mejorDireccion = direccion;
    }
}

              
              
            }

            movimientos[ficha] = mejorDireccion;
        }
    }

    return movimientos;
}
