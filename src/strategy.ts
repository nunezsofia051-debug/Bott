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
        direccion: "N" | "E",
        dado: number,
        cantidadFilas: number,
        cantidadColumnas: number
        ): [number, number] {
     
        let nuevaFila = fila;
        let nuevaColumna = columna;

        for (let i = 0; i < dado; i++) {
            if (direccion === "N") {
                nuevaFila --;
                if (nuevaFila < 0) {
                    nuevaFila = cantidadFilas - 1;
                }
            }
            if (direccion === "E") {
                nuevaColumna ++;
                if (nuevaColumna >= cantidadColumnas) {
                    nuevaColumna = 0;
                }
            }
        }
        return [nuevaFila, nuevaColumna];
    }
     //Buscamos las casas que todavia quedan en el tablero 
    for ( let fila = 0; fila < cantidadFilas; fila++) {
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

            // Si no quedan casas, seguimoa hacia arriba 

            if (casas.length === 0) {
                movimientos[ficha] = "N";
                continue;
            }
            const objetivo = objetivos.get(ficha);
            let mejorDireccion: "N" | "E" = "N";
            let menorDistancia = Infinity;

            //Analizamos cada casa
            if (objetivo) {
                const casa = objetivo;
                const filaCasa = casa[0];
                const columnaCasa = casa[1];
            

                //calcular donde terminamos si usamos la direccion N
                const destinoN = calcularDestino(
                    fila,
                    columna,
                    "N",
                    estado.dado,
                    cantidadFilas,
                    cantidadColumnas
                );

                //Calculamos donde terminamos si usamos E
                const destinoE = calcularDestino(
                    fila,
                    columna,
                    "E",    
                    estado.dado,
                    cantidadFilas,
                    cantidadColumnas
                );
                
                // N termina exactamente sobre una casa
                if (destinoN[0] === filaCasa && destinoN[1] === columnaCasa) {
                    mejorDireccion = "N";
                    menorDistancia = 0;
                    
                }
                 
                // E termina exactamente sobre una casa 
                if (destinoE[0] === filaCasa && destinoE[1] === columnaCasa) {
                    mejorDireccion = "E";
                    menorDistancia = 0;
                }
            }
            
            movimientos[ficha] = mejorDireccion;
        
    
        return movimientos;
}
           