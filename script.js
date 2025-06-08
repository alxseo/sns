
document.addEventListener('DOMContentLoaded', () => {
    // Selectarea elementelor DOM relevante pentru secțiunea de sortare
    const inputListaSortareEl = document.getElementById('inputListaSortare');
    const selectAlgoritmSortareEl = document.getElementById('selectAlgoritmSortare');
    const dimensiuneListaRandomEl = document.getElementById('dimensiuneListaRandom');
    const btnGenereazaListaEl = document.getElementById('btnGenereazaLista');
    const btnSorteazaEl = document.getElementById('btnSorteaza');
    const vizualizareContainerEl = document.getElementById('vizualizareSortareContainer');
    const nrPasiSortareEl = document.getElementById('nrPasiSortare');
    const nrComparatiiSortareEl = document.getElementById('nrComparatiiSortare');
    const nrSwapuriSortareEl = document.getElementById('nrSwapuriSortare');

    let listaCurenta = [];
    let generatorBubbleSort = null; // Pentru a rula sortarea pas cu pas
    let pasi = 0;
    let comparatii = 0;
    let swapuri = 0;

    // --- Funcții Utilitare ---
    function parseInputList(inputString) {
        if (!inputString.trim()) return [];
        return inputString.split(',')
            .map(item => parseInt(item.trim(), 10))
            .filter(num => !isNaN(num)); // Filtrează elementele care nu sunt numere
    }

    function genereazaListaAleatorie(dimensiune) {
        const lista = [];
        for (let i = 0; i < dimensiune; i++) {
            lista.push(Math.floor(Math.random() * 100) + 1); // Numere între 1 și 100
        }
        return lista;
    }

    function deseneazaLista(lista, indexActiv1 = -1, indexActiv2 = -1) {
        vizualizareContainerEl.innerHTML = ''; // Curăță containerul
        const maxVal = Math.max(...lista, 1); // Adaugă 1 pentru a evita împărțirea la zero dacă lista e goală sau max e 0

        lista.forEach((val, index) => {
            const bara = document.createElement('div');
            bara.style.height = `${(val / maxVal) * 90}%`; // Scalare relativă la valoarea maximă
            bara.style.width = `${Math.max(10, 100 / lista.length - 5)}px`; // Lățime ajustabilă, minim 10px
            bara.style.backgroundColor = '#79a2d8'; // O culoare de bază
            bara.style.margin = '0 2px';
            bara.style.display = 'inline-block';
            bara.style.verticalAlign = 'bottom';
            bara.textContent = val; // Afișează valoarea pe bară
            bara.style.color = 'white';
            bara.style.textAlign = 'center';
            bara.style.fontSize = '12px';
            bara.style.lineHeight = '20px'; // Pentru a centra textul vertical mai bine

            if (index === indexActiv1 || index === indexActiv2) {
                bara.style.backgroundColor = '#d87979'; // Culoare pentru elementele active/comparate
            }
            vizualizareContainerEl.appendChild(bara);
        });
    }
    
    function reseteazaStatistici() {
        pasi = 0;
        comparatii = 0;
        swapuri = 0;
        nrPasiSortareEl.textContent = pasi;
        nrComparatiiSortareEl.textContent = comparatii;
        nrSwapuriSortareEl.textContent = swapuri;
    }

    // --- Logica Bubble Sort (Generator pentru pas cu pas) ---
    function* bubbleSortGenerator(arr) {
        let n = arr.length;
        let newArr = [...arr]; // Lucrăm pe o copie
        let swapped;
        reseteazaStatistici();

        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                comparatii++;
                nrComparatiiSortareEl.textContent = comparatii;
                yield { lista: [...newArr], activ1: j, activ2: j + 1, msg: `Compar ${newArr[j]} cu ${newArr[j+1]}` };

                if (newArr[j] > newArr[j + 1]) {
                    // Swap
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1]], newArr[j]];
                    swapped = true;
                    swapuri++;
                    nrSwapuriSortareEl.textContent = swapuri;
                    yield { lista: [...newArr], activ1: j, activ2: j + 1, msg: `Swap ${newArr[j+1]} cu ${newArr[j]}` };
                }
            }
            pasi++; // Un pas complet al buclei exterioare
            nrPasiSortareEl.textContent = pasi;
            if (!swapped) {
                 yield { lista: [...newArr], msg: "Lista sortată (nu s-au făcut swap-uri în ultima parcurgere)." };
                return newArr; // Optimizare: dacă nu s-au făcut swap-uri, lista e sortată
            }
        }
        yield { lista: [...newArr], msg: "Sortare finalizată!" };
        return newArr;
    }
    
    // --- Event Listeners ---
    btnGenereazaListaEl.addEventListener('click', () => {
        const dimensiune = parseInt(dimensiuneListaRandomEl.value, 10);
        if (dimensiune > 0 && dimensiune <= 20) {
            listaCurenta = genereazaListaAleatorie(dimensiune);
            deseneazaLista(listaCurenta);
            inputListaSortareEl.value = listaCurenta.join(',');
            generatorBubbleSort = null; // Resetează generatorul
            btnSorteazaEl.disabled = false;
            reseteazaStatistici();
        } else {
            alert("Introduceți o dimensiune validă (1-20).");
        }
    });

    btnSorteazaEl.addEventListener('click', () => {
        if (!generatorBubbleSort) { // Dacă este prima rulare sau s-a resetat
            listaCurenta = parseInputList(inputListaSortareEl.value);
            if (listaCurenta.length === 0) {
                alert("Introduceți o listă validă de numere.");
                return;
            }
            // Aici vei adăuga selecția algoritmului
            if (selectAlgoritmSortareEl.value === 'bubbleSort') {
                generatorBubbleSort = bubbleSortGenerator(listaCurenta);
            } else if (selectAlgoritmSortareEl.value === 'quickSort') {
                // TODO: Implementează generator pentru QuickSort
                alert("QuickSort pas cu pas nu este încă implementat.");
                return;
            }
            deseneazaLista(listaCurenta); // Afișează lista inițială
            reseteazaStatistici();
        }

        const stareUrmatoare = generatorBubbleSort.next();
        if (!stareUrmatoare.done) {
            deseneazaLista(stareUrmatoare.value.lista, stareUrmatoare.value.activ1, stareUrmatoare.value.activ2);
            // Poți afișa stareUrmatoare.value.msg undeva dacă vrei detalii despre pas
            console.log(stareUrmatoare.value.msg);
        } else {
            deseneazaLista(stareUrmatoare.value.lista); // Afișează lista finală sortată
            alert(stareUrmatoare.value.msg || "Sortare completă!");
            btnSorteazaEl.disabled = true; // Dezactivează butonul după finalizare
            generatorBubbleSort = null; // Pregătește pentru o nouă sortare
        }
    });
    
    // Inițializare: generează o listă la încărcarea paginii
    btnGenereazaListaEl.click();

});
