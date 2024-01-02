document.getElementById('iniciar').addEventListener('click', function () {
    let inputArreglo = document.getElementById('inputArreglo').value;
    let arreglo = inputArreglo.split(',').map(Number);

    let iteracion = 1;
    let pausar = false;

    async function trasposicionParesNones(arr) {
        let intercambioNones, intercambioPares;

        mostrarEstadoInicial(arr);

        do {
            intercambioNones = false;
            intercambioPares = false;

            // Etapa 1: Comparar nones y hacer intercambios
            for (let i = 0; i < arr.length - 1; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    intercambioNones = true;
                }
            }
            await mostrarPaso(iteracion, 'Nones', arr);

            // Etapa 2: Comparar pares y hacer intercambios
            for (let i = 1; i < arr.length - 1; i += 2) {
                if (arr[i] > arr[i + 1]) {
                    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                    intercambioPares = true;
                }
            }
            await mostrarPaso(iteracion, 'Pares', arr);

            iteracion++;

            while (pausar) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        } while (intercambioNones || intercambioPares);
    }

    function mostrarEstadoInicial(arr) {
        document.getElementById('estadoInicial').innerText = `Estado inicial del arreglo: [${arr.join(', ')}]`;
    }

    function mostrarPaso(iteracion, tipo, arr) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Columna
                let columna = document.createElement('div');
                columna.classList.add('columna');
                columna.innerText = `Interacción ${iteracion} (${tipo}): [${arr.join(', ')}]`;

                // Agregar la columna al contenedor
                document.getElementById('columnas').appendChild(columna);

                resolve();
            }, 1000);
        });
    }

    // Limpiar resultados
    document.getElementById('iniciar').addEventListener('click', function () {
        document.getElementById('columnas').innerHTML = '';
    });

    trasposicionParesNones(arreglo);
});
