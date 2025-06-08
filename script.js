document.addEventListener('DOMContentLoaded', () => {
    // --- Început Secțiune VizualizitmSortareEl = document.getElementById('selectAlgoritmSortare');
    const dimensiuneListaRandomElator Algoritmi de Sortare ---
    const inputListaSortareEl = document.getElementById('inputListaSort = document.getElementById('dimensiuneListaRandom');
    const btnGenereazaListaEl = document.getElementByIdare');
    const selectAlgoritmSortareEl = document.getElementById('selectAlgoritmSortare');('btnGenereazaLista');
    const btnSorteazaEl = document.getElementById('btnSorteaza');
    const vizualizareContainerEl = document.getElementById('vizualizareSortareContainer');
    const
    const dimensiuneListaRandomEl = document.getElementById('dimensiuneListaRandom');
    const btnGenereazaListaEl = document.getElementById('btnGenereazaLista');
    const btnSorteazaEl = nrPasiSortareEl = document.getElementById('nrPasiSortare');
    const nrComparatiiSort document.getElementById('btnSorteaza');
    const vizualizareContainerEl = document.getElementById('vizualareEl = document.getElementById('nrComparatiiSortare');
    const nrSwapuriSortareEl = documentizareSortareContainer');
    const nrPasiSortareEl = document.getElementById('nrPasiSortare');
    const nrComparatiiSortareEl = document.getElementById('nrComparatiiSortare');
    const.getElementById('nrSwapuriSortare');

    let listaCurentaSortare = [];
    let generatorSort nrSwapuriSortareEl = document.getElementById('nrSwapuriSortare');

    let listaCurentaareCurent = null;
    let pasiSortare = 0;
    let comparatiiSortare = 0;
    let swapuriSortare = 0;

    function parseInputList(inputString) {
        if (!inputSortare = [];
    let generatorSortareCurent = null;
    let pasiSortare = 0;
    let comparatiiSortare = 0;
    let swapuriSortare = 0;

    function parseString.trim()) return [];
        return inputString.split(',')
            .map(item => parseInt(itemInputList(inputString) {
        if (!inputString.trim()) return [];
        return inputString..trim(), 10))
            .filter(num => !isNaN(num));
    }

    function genereazaListaAleatorie(dimensiune) {
        const lista = [];
        for (let i =split(',')
            .map(item => parseInt(item.trim(), 10))
            .filter(num => !isNaN(num));
    }

    function genereazaListaAleatorie(dimensiune) {
 0; i < dimensiune; i++) {
            lista.push(Math.floor(Math.random() * 100) + 1);
        }
        return lista;
    }

            const lista = [];
        for (let i = 0; i < dimensiune; i++) {
function deseneazaLista(lista, detaliiPas = {}) {
        vizualizareContainerEl.innerHTML =            lista.push(Math.floor(Math.random() * 100) + 1);
 '';
        if (!lista || lista.length === 0) return;
        const maxVal = Math.max        }
        return lista;
    }

    function deseneazaListaSortare(lista, detaliiPas =(...lista, 1);
        const { activ1, activ2, pivotIndex, comparareIndex, iIndex, swap {}) {
        vizualizareContainerEl.innerHTML = '';
        if (!lista || lista.length === 0) return;
        const maxVal = Math.max(...lista, 1);
        const { activ1, activ2Index1, swapIndex2, pivotFinalIndex, partitieLow, partitieHigh } = detaliiPas;

        lista.forEach((val, index) => {
            const bara = document.createElement('div');
            , pivotIndex, comparareIndex, iIndex, swapIndex1, swapIndex2, pivotFinalIndex, partbara.style.height = `${(val / maxVal) * 90}%`;
            bara.styleitieLow, partitieHigh, sortedIndices } = detaliiPas;

        lista.forEach((val, index) => {
            const bara = document.createElement('div');
            bara.style.height = `${(val / max.width = `${Math.max(10, (100 / lista.length) - 2)}%Val) * 90}%`;
            bara.style.width = `${Math.max(10, 100 / lista.length - 5)}px`;
            bara.style.backgroundColor = '#7`; // Folosim procente pentru lățime
            bara.style.backgroundColor = 'var(--primary-focus9a2d8';
            bara.style.margin = '0 2px';
            bara.style.display = 'inline-block';
            bara.style.verticalAlign = 'bottom';
            bara.textContent =, #1e88e5)'; // Folosim variabile CSS Pico sau un default
            bara.style.margin = '0 1px';
            bara.style.display = 'inline-block';
            bara.style val;
            bara.style.color = 'white';
            bara.style.textAlign = 'center';
            bara.style.fontSize = '12px';
            bara.style.lineHeight = '2.verticalAlign = 'bottom';
            bara.textContent = val;
            bara.style.color = 'white';
            bara.style.textAlign = 'center';
            bara.style.fontSize = '120px';
            bara.style.transition = 'height 0.3s ease, background-color px';
            bara.style.lineHeight = '20px';
            bara.style.boxSizing = '0.3s ease'; // Pentru animații

            if (sortedIndices && sortedIndices.includes(index))border-box'; // Important pentru ca padding/border să nu mărească lățimea

            if (part {
                bara.style.backgroundColor = '#5cb85c'; // Verde pentru elementele sortate finalitieLow !== undefined && index >= partitieLow && index <= partitieHigh) {
                bara.style.
            } else if (partitieLow !== undefined && index >= partitieLow && index <= partitieHigh)border = '1px dotted var(--muted-border-color, #e0e0e0)';
            }
             {
                bara.style.border = '1px dotted #cccccc';
                if (index === pivotIndex) bara.style.backgroundColor = '#f0ad4e'; // Portocaliu pentru pivotul curent
                elseif (index === pivotIndex) {
                bara.style.backgroundColor = 'var(--pico-color-green-500, #4caf50)';
            }
            if (index === comparareIndex) if (index === comparareIndex) bara.style.backgroundColor = '#eea236'; // O nuanță de {
                bara.style.backgroundColor = 'var(--pico-color-amber-500, #ffc portocaliu
                else if (index === iIndex) bara.style.outline = '2px solid yellow107)';
            }
            if (index === iIndex) {
                bara.style.outline';
            }
            
            if (index === activ1 || index === activ2 || index === swapIndex1 = '2px solid var(--pico-color-yellow-400, #ffeb3b)';
            } || index === swapIndex2) {
                 bara.style.backgroundColor = '#d9534f'; // Roș
            if (index === swapIndex1 || index === swapIndex2 || (activ1 !== undefined && (index === activ1 || index === activ2) && pivotIndex === undefined)) {
                 bara.style.backgroundColor = 'var(--picou pentru swap/comparații active
            }
            if (index === pivotFinalIndex) {
                bara.style.backgroundColor = '#4CAF50'; 
                bara.style.border = '2px-color-red-500, #f44336)';
            }
             if ( solid black';
            }
            vizualizareContainerEl.appendChild(bara);
        });
    }index === pivotFinalIndex) {
                bara.style.backgroundColor = 'var(--pico-color-green
    
    function reseteazaStatisticiSortare() {
        pasiSortare = 0;
        comparatiiSortare = 0;
        swapuriSortare = 0;
        nrPasi-600, #43a047)';
                bara.style.border = '2px solid var(--pico-color-green-700, #388e3c)';
            SortareEl.textContent = pasiSortare;
        nrComparatiiSortareEl.textContent = comparatiiSort}
            vizualizareContainerEl.appendChild(bara);
        });
    }
    
    functionare;
        nrSwapuriSortareEl.textContent = swapuriSortare;
    }

    function reseteazaStatisticiSortare() {
        pasiSortare = 0;
        comparatiiSort* bubbleSortGenerator(arr) {
        let n = arr.length;
        let newArr = [...are = 0;
        swapuriSortare = 0;
        nrPasiSortareEl.arr];
        let swapped;
        reseteazaStatisticiSortare();
        let sortedCount = 0;

        for (let i = 0; i < n - 1; i++) {
            swappedtextContent = pasiSortare;
        nrComparatiiSortareEl.textContent = comparatiiSortare;
        nrSwapuriSortareEl.textContent = swapuriSortare;
    }

    function* bubbleSortGenerator(arr) {
        let n = arr.length;
        let newArr = [...arr];
         = false;
            for (let j = 0; j < n - 1 - i; j++) {
                comparatiiSortare++;
                nrComparatiiSortareEl.textContent = comparatiiSortare;
                let swapped;
        // reseteazaStatisticiSortare(); // Se resetează la inițierea sortyield { lista: [...newArr], activ1: j, activ2: j + 1, sortedIndices: Array.from({length: sortedCount}, (_, k) => n - 1 - k) };

                if (newArr[ării

        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            for (let j = 0; j < n - i - 1; jj] > newArr[j + 1]) {
                    [newArr[j], newArr[j++) {
                comparatiiSortare++;
                nrComparatiiSortareEl.textContent = comparatiiSortare + 1]] = [newArr[j + 1], newArr[j]];
                    swapped =;
                yield { lista: [...newArr], activ1: j, activ2: j + 1, true;
                    swapuriSortare++;
                    nrSwapuriSortareEl.textContent = swapuriSortare msg: `Compar ${newArr[j]} cu ${newArr[j+1]}` };

                if;
                    yield { lista: [...newArr], activ1: j, activ2: j + 1, sortedIndices: Array.from({length: sortedCount}, (_, k) => n - 1 - k) }; (newArr[j] > newArr[j + 1]) {
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                    swapped = true;
                    swapuriSortare++;
                    nrSwapuriSortareEl.textContent =
                }
            }
            pasiSortare++;
            nrPasiSortareEl.textContent = pasiSortare;
            sortedCount++; // La fiecare pas al buclei exterioare, un element aj swapuriSortare;
                    yield { lista: [...newArr], activ1: j, activ2: j + 1, msg: `Swap ${newArr[j+1]} cu ${newArr[j]}` };
                }
            }
            pasiSortare++;
            nrPasiSortareEl.textContentunge la locul lui
            if (!swapped) {
                yield { lista: [...newArr], msg: "Lista = pasiSortare;
            if (!swapped) {
                 yield { lista: [...newArr], msg: "Lista sortată (optimizare).", sortedIndices: Array.from({length: n}, (_, k) => k) };
                return newArr;
            }
        }
        yield { lista: [...newArr], msg: "Sortare BubbleSort finalizată!", sortedIndices: Array.from({length: n}, (_, k) => k sortată (Bubble Sort)." };
                return newArr;
            }
        }
        yield { lista: [...newArr], msg: "Sortare Bubble Sort finalizată!" };
        return newArr;
    }

    function* partitionLomutoGenerator(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        yield { lista: [...arr], pivotIndex: high) };
        return newArr;
    }
    
    function* partitionLomutoGenerator(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        yield { lista: [...arr], pivotIndex: high, partitieLow: low, partitieHigh: high, i, partitieLow: low, partitieHigh: high, msg: `Pivot: ${pivot}. Partiționez [${low}-${high}]`};

        for (let j = low; j < high; j++) {Index: i, msg: `Pivot: ${pivot}` };

        for (let j = low; j < high; j++) {
            comparatiiSortare++;
            nrComparatiiSortareEl.textContent = compar
            comparatiiSortare++;
            nrComparatiiSortareEl.textContent = comparatiiSortare;
atiiSortare;
            yield { lista: [...arr], pivotIndex: high, comparareIndex: j,            yield { lista: [...arr], pivotIndex: high, comparareIndex: j, iIndex: i, iIndex: i, partitieLow: low, partitieHigh: high, msg: `Compar ${arr[j]} cu partitieLow: low, partitieHigh: high, msg: `Compar ${arr[j]} cu pivot ${ pivot ${pivot}` };
            if (arr[j] < pivot) {
                i++;
                [arrpivot}`};
            if (arr[j] < pivot) {
                i++;
                [arr[[i], arr[j]] = [arr[j], arr[i]];
                swapuriSortare++;i], arr[j]] = [arr[j], arr[i]];
                swapuriSortare++;

                nrSwapuriSortareEl.textContent = swapuriSortare;
                yield { lista: [...arr                nrSwapuriSortareEl.textContent = swapuriSortare;
                yield { lista: [...arr], pivotIndex: high, swapIndex1: i, swapIndex2: j, iIndex: i, partitieLow:], swapIndex1: i, swapIndex2: j, pivotIndex: high, iIndex: i, partitieLow: low, partitieHigh: high, msg: `Swap ${arr[j]} cu ${arr[i]}` low, partitieHigh: high, msg: `Swap ${arr[j]} cu ${arr[i]}` };
            }
        }
        [arr[i + 1], arr[high]] = [arr};
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swapuriSortare++;
        nrSwapuriSortare[high], arr[i + 1]];
        swapuriSortare++;
        nrSwapuriSortareEl.textContent = swapuriSortare;
        let pivotFinalIndex = i + 1;
        yieldEl.textContent = swapuriSortare;
        let pivotFinalIdx = i + 1;
        yield { lista: { lista: [...arr], pivotFinalIndex: pivotFinalIndex, partitieLow: low, partitieHigh: high, msg: `Pivot ${pivot} plasat la ${pivotFinalIndex}` };
        return pivotFinalIndex;
     [...arr], pivotFinalIndex: pivotFinalIdx, partitieLow: low, partitieHigh: high, msg: `Pivot ${pivot} așezat la ${pivotFinalIdx}`};
        return pivotFinalIdx;
    }

    function* quickSortGenerator(arr, initialLow = 0, initialHigh = arr.length - 1) {}

    function* quickSortGenerator(arr) {
        let newArr = [...arr];
        let stack = [];
        stack.push(0);
        stack.push(newArr.length - 1);
        resete
        let stack = [{ low: initialLow, high: initialHigh }];
        // reseteazaStatisticiSortare(); // Se resetează la inițierea sortării

        while (stack.length > 0) {
            const {azaStatisticiSortare();
        let sortedRanges = []; // Pentru a urmări ce părți sunt deja sortate

        while (stack.length > 0) {
            let high = stack.pop();
            let low = stack. low, high } = stack.pop();
             pasiSortare++;
             nrPasiSortareEl.textContent = pasiSortare;

            if (low < high) {
                let partitionGen = partitionLompop();
            pasiSortare++;
            nrPasiSortareEl.textContent = pasiSortare;utoGenerator(arr, low, high);
                let result;
                while (!(result = partitionGen.next

            if (low < high) {
                let partitionGen = partitionLomutoGenerator(newArr, low, high);
                let result;
                while (!(result = partitionGen.next()).done) {
()).done) {
                    yield { ...result.value, stackState: JSON.stringify(stack) };
                }
                let pi = result.value;

                if (pi - 1 > low) {
                    yield { ...result.value, lista: [...newArr], stackState: [...stack], sortedIndices: sorted                    stack.push({ low: low, high: pi - 1 });
                }
                if (pi + 1 < high) {
                    stack.push({ low: pi + 1, high: high });
                Ranges.flat() };
                }
                let pi = result.value;

                // Marcam elementul pivot ca fiind "sortat" (la locul lui final în această partiție)
                // sortedRanges.push(}
                 yield { lista: [...arr], msg: `Sub-partiții adăugate la stivă. Stivă: ${stack.length}`, stackState: JSON.stringify(stack)};
            }
        }
        yield { listapi); // Aceasta e o simplificare, QuickSort nu sortează un element per iterație ca Bubble

                if (pi - 1 > low) {
                    stack.push(low);
                    stack.push(pi: [...arr], msg: "Sortare QuickSort finalizată!" };
        return arr;
    }
    
    btnGenereazaListaEl.addEventListener('click', () => {
        const dimensiune = parseInt(dimensiuneListaRandomEl.value, 10);
        if (dimensiune > 0 - 1);
                } else if (pi - 1 >= low) { // Dacă sub-array-ul are 0 sau 1 element, e sortat
                    for(let k=low; k<=pi-1 && dimensiune <= 20) {
            listaCurentaSortare = genereazaListaAleatorie(dimensiune);
            deseneazaLista(listaCurentaSortare);
            inputListaSortareEl.value = lista; k++) if(!sortedRanges.includes(k)) sortedRanges.push(k);
                }

                if (piCurentaSortare.join(',');
            generatorSortareCurent = null;
            btnSorteazaEl.disabled + 1 < high) {
                    stack.push(pi + 1);
                    stack.push(high = false;
            reseteazaStatisticiSortare();
        } else {
            alert("Introduceți);
                } else if (pi + 1 <= high) { // Dacă sub-array-ul are 0 o dimensiune validă (1-20).");
        }
    });

    btnSorteaza sau 1 element, e sortat
                     for(let k=pi+1; k<=high; k++) ifEl.addEventListener('click', () => {
        if (!generatorSortareCurent) {
            listaC(!sortedRanges.includes(k)) sortedRanges.push(k);
                }
                 // Adaugăm pivotul laurentaSortare = parseInputList(inputListaSortareEl.value);
            if (listaCurent zonele sortate
                if(!sortedRanges.includes(pi)) sortedRanges.push(pi);

                yield { listaaSortare.length === 0) {
                alert("Introduceți o listă validă de numere.");
                : [...newArr], msg: `Partiționat. Stivă: ${JSON.stringify(stack.mapreturn;
            }
            reseteazaStatisticiSortare(); // Resetează aici, la începutul unei noi sortări
            if (selectAlgoritmSortareEl.value === 'bubbleSort') {
                generatorSortareCurent = bubbleSortGenerator([...listaCurentaSortare]);
            } else if (selectAlgor((_,idx) => idx % 2 === 0 ? `L=${stack[idx]}`: `H=${stack[idx]}`))}`, sortedIndices: sortedRanges.flat() };
            } else if (low === high) { //itmSortareEl.value === 'quickSort') {
                generatorSortareCurent = quickSortGenerator([...lista Un singur element în range, e sortat
                 if(!sortedRanges.includes(low)) sortedRanges.CurentaSortare], 0, listaCurentaSortare.length - 1);
            }
            deseneazaLista(listaCurentaSortare, {});
        }

        const stareUrmatoare =push(low);
            }
        }
        // La final, toate elementele ar trebui să fie în generatorSortareCurent.next();
        if (!stareUrmatoare.done && stareUrmatoare sortedRanges
        yield { lista: [...newArr], msg: "Sortare QuickSort finalizată!", sortedIndices: Array.from({length: newArr.length}, (_, k) => k) };
        return new.value) {
            // Actualizăm listaCurentaSortare cu starea din generator pentru consistențăArr;
    }
    

    btnGenereazaListaEl.addEventListener('click', () => {
        const dimensiune = parseInt(dimensiuneListaRandomEl.value, 10);
        if ( internă
            // Deși generatorul lucrează pe o copie, pentru desenare folosim ce ne ddimensiune > 0 && dimensiune <= 20) {
            listaCurentaSortare = genereazaListaAleatorie(dimensiune);
            deseneazaListaSortare(listaCurentaă el
            if (stareUrmatoare.value.lista) {
                 listaCurentaSortareSortare);
            inputListaSortareEl.value = listaCurentaSortare.join(',');
             = [...stareUrmatoare.value.lista]; // Reflectă starea internă a generatorului
            }
            deseneazaLista(stareUrmatoare.value.lista, stareUrmatoare.valuegeneratorSortareCurent = null;
            btnSorteazaEl.disabled = false;
            reseteazaStatisticiSortare();
        } else {
            alert("Introduceți o dimensiune validă (1-20).");
        }
    });

    btnSorteazaEl.addEventListener('click', () => {
        ); 
            console.log(stareUrmatoare.value.msg, "Detalii pas:", stareUrmatoare.value);
        } else {
            if(stareUrmatoare.value && stareUrmatoareif (!generatorSortareCurent) {
            listaCurentaSortare = parseInputList(inputListaSortareEl.value);
            if (listaCurentaSortare.length === 0) {
.value.lista) {
                deseneazaLista(stareUrmatoare.value.lista, stareUrmatoare.value);
            } else {
                // Dacă .value e undefined la final, desenăm lista original                alert("Introduceți o listă validă de numere.");
                return;
            }
            reseteazaStatisticiSortare();
            if (selectAlgoritmSortareEl.value === 'bubbleSortă (care ar trebui să fie sortată)
                deseneazaLista(listaCurentaSortare, {});') {
                generatorSortareCurent = bubbleSortGenerator(listaCurentaSortare);
            }
            }
            alert( (stareUrmatoare.value && stareUrmatoare.value.msg) || " else if (selectAlgoritmSortareEl.value === 'quickSort') {
                generatorSortareCSortare completă!");
            btnSorteazaEl.disabled = true;
            generatorSortareCurent = null;urent = quickSortGenerator([...listaCurentaSortare]);
            }
            deseneazaListaSortare(listaCurentaSortare, {});
        }

        const stareUrmatoare = generatorSortareCurent.next();
        }
    });
    
    btnGenereazaListaEl.click(); // Generează o
        if (!stareUrmatoare.done && stareUrmatoare.value) {
            desene listă la încărcare
      
    // --- SECȚIUNEA CALCULATOR METRICI RANKARE ---
    const inputItemiRelevantiEl = document.getElementById('inputItemiRelevanti');
    const inputazaListaSortare(stareUrmatoare.value.lista, stareUrmatoare.value);
            console.log(stareUrmatoare.value.msg, stareUrmatoare.value);
        }ItemiReturnatiEl = document.getElementById('inputItemiReturnati');
    const valoareKEl = else {
            if (stareUrmatoare.value && stareUrmatoare.value.lista) { document.getElementById('valoareK');
    const btnCalculeazaMetriciEl = document.getElementById('btn
                deseneazaListaSortare(stareUrmatoare.value.lista, stareUrmatoare.CalculeazaMetrici');
    const rezultatMetriciEl = document.getElementById('rezultatMetrici');

value);
            }
            alert((stareUrmatoare.value && stareUrmatoare.value.msg    function precisionAtK(relevanti, returnati, k) {
        if (k <= 0) return 0;
        const topKReturnati = returnati.slice(0, k);
        let) || "Sortare completă!");
            btnSorteazaEl.disabled = true;
            generatorSort gasitiRelevantiInTopK = 0;
        topKReturnati.forEach(item => {
areCurent = null;
        }
    });
    
    if (btnGenereazaListaEl) { //            if (relevanti.includes(item)) {
                gasitiRelevantiInTopK++;
 Verifică dacă elementul există înainte de a apela click
        btnGenereazaListaEl.click();
            }
        });
        return topKReturnati.length > 0 ? gasitiRelevantiInTopK / topKReturnati.length : 0;
    }

    function averagePrecision(relev    }
    // --- Sfârșit Secțiune Vizualizator Algoritmi de Sortare ---


    // --- Început Secțiune Calculator Metrici de Rankare ---
    const inputItemiRelevantiEl = document.getElementById('inputItemiRelevanti');
    const inputItemiReturnatiEl =anti, returnati) {
        if (relevanti.length === 0 || returnati.length === document.getElementById('inputItemiReturnati');
    const valoareKEl = document.getElementById('valoare 0) return 0;
        let preciziiLaItemRelevante = [];
        let numarRelevanteGasite = 0;
        returnati.forEach((itemReturnat, index) => {
K');
    const btnCalculeazaMetriciEl = document.getElementById('btnCalculeazaMetrici');
    const rezultatMetriciEl = document.getElementById('rezultatMetrici');

    function precisionAtK(re            if (relevanti.includes(itemReturnat)) {
                numarRelevanteGasite++;
                preciziiLaItemRelevante.push(numarRelevanteGasite / (index + 1));levanti, returnati, k) {
        if (k <= 0) return 0;
        const topKReturnati = returnati.slice(0, k);
        let gasitiRelevantiInTopK =
            }
        });
        if (preciziiLaItemRelevante.length === 0) return 0;
        return preciziiLaItemRelevante.reduce((sum, p) => sum + p, 0) / relevanti.length;
    }
    
    function meanAveragePrecision( 0;
        topKReturnati.forEach(item => {
            if (relevanti.includes(item)) {
                gasitiRelevantiInTopK++;
            }
        });
        returnrelevanti, returnati) {
        return averagePrecision(relevanti, returnati);
    } topKReturnati.length > 0 ? gasitiRelevantiInTopK / topKReturnati.

    function dcgAtK(scoruriRelevantaReturnate, k) {
        if (k <= 0) return 0;
        let dcg = 0;
        const topKScorlength : 0;
    }

    function averagePrecision(relevanti, returnati) {
        uri = scoruriRelevantaReturnate.slice(0, k);
        topKScoruri.forEach((scorif (relevanti.length === 0 || returnati.length === 0) return 0;
        let preciziiLaItemRelevante = [];
        let numarRelevanteGasite = 0;

        returnati.forEach((itemReturnat, index) => {
            if (relevanti., index) => {
            dcg += scor / Math.log2(index + 2); // logincludes(itemReturnat)) {
                numarRelevanteGasite++;
                preciziiLaItem2(i+1) unde i este 1-based rank
        });
        return dcg;
    }Relevante.push(numarRelevanteGasite / (index + 1));
            }


    function idcgAtK(scoruriRelevantaIdealeSortate, k) {
        return dcg        });

        if (preciziiLaItemRelevante.length === 0) return 0;AtK(scoruriRelevantaIdealeSortate.slice(0,k).sort((a,b
        return preciziiLaItemRelevante.reduce((sum, p) => sum + p, ) => b-a), k);
    }
    
    function ndcgAtK(relevanti, returnati, k) {
        if (k <= 0) return 0;
        const scoruriReturn0) / relevanti.length;
    }
    
    function meanAveragePrecision(relevanti, returnati) {
        return averagePrecision(relevanti, returnati);
    }

    function dcate = returnati.slice(0, k).map(item => relevanti.includes(item) ? gAtK(scoruriRelevantaReturnate, k) {
        if (k <= 0)1 : 0);
        
        let scoruriIdealePentruSortare = relevanti.map(() => 1); return 0;
        let dcg = 0;
        const topKScoruri = scoruri // Toți relevanții au scor 1
         // Umplem cu 0 dacă sunt mai puținiRelevantaReturnate.slice(0, k);
        topKScoruri.forEach((scor, index) => {
            dcg += scor / (index === 0 ? 1 : Math.log2(index + 1 + relevanți decât k, dar vrem să calculăm IDCG@k
        while(scoruriIdealePentru1)); // log2(i+1) for 1-based index, so log2(index+2) forSortare.length < k && scoruriIdealePentruSortare.length < returnati.length) {
 0-based if first is not special
        });
        return dcg;
    }
    
    //            // Ne asigurăm că nu adăugăm mai multe scoruri decât avem itemi returnați (în caz că Ajustare dcgAtK pentru a trata primul element diferit, conform definiției mai comune
    function dcgAtK_standard(scoruriRelevantaReturnate, k) {
        if (k <= 0) return 0;
 k e mare)
            // și nu mai mult decât k.
            // Această parte este pentru IDCG;        const topKScoruri = scoruriRelevantaReturnate.slice(0, k);
         dacă relevanți.length < k, IDCG se calculează pe relevanți.length.
            // Darif (topKScoruri.length === 0) return 0;

        let dcg = topK pentru a fi corect, IDCG trebuie să ia în considerare tot atâtea elemente cât DCG,
            Scoruri[0]; // Primul element
        for (let i = 1; i < topKScoruri.length; i++) {
            dcg += topKScoruri[i] / Math.log2// sortate ideal.
            // Vom lua cele mai bune k scoruri posibile.
             break; // Simplificăm: IDCG se calculează pe relevanții efectivi, sortați.
        }
         // Sort(i + 1 + 1); // i+1 este poziția, i+1+1 = i+2
        }
        return dcg;
    }


    function idcgAtK(scoruriRelevantaIdealeSortate, k) {
        return dcgAtK_standard(scoruriRelevăm primele k scoruri ideale (sau toți relevanții dacă < k)
        const scoruriIdeantaIdealeSortate, k);
    }
    
    function ndcgAtK(relevanti, returnale = [...relevanti].slice(0,k).map(() => 1).sort((a,bati, k) {
        if (k <= 0) return 0;
        const scoruriReturn) => b-a);
        // Umplem cu 0-uri dacă e nevoie pentru a avea kate = returnati.slice(0, k).map(item => relevanti.includes(item) ?  elemente pentru IDCG
        while (scoruriIdeale.length < k && scoruriIdeale.length < scor1 : 0);
        
        let scoruriIdeale = [];
        for(let i=0; i < Math.min(k, relevanti.length); i++) {
            scoruriIdeale.push(1uriReturnate.length) {
            scoruriIdeale.push(0);
        }


        const);
        }
        while(scoruriIdeale.length < k && scoruriIdeale.length < actualDcg = dcgAtK(scoruriReturnate, k);
        const idealDcg = idcgAtK(scoruriIdeale, Math.min(k, scoruriIdeale.length)); // k returnati.slice(0,k).length ) { // Asigură-te că nu depășește k pentru IDCG e min(k, nr de itemi relevanți)

        return idealDcg > 0 ? actualDcg / idealDcg : 0;
    }

    btnCalculeazaMetriciEl.addEventListener și nici lungimea listei returnate
            scoruriIdeale.push(0);
        }
        //('click', () => {
        const relevantiStr = inputItemiRelevantiEl.value;
        const return Asigură-te că scoruriIdeale are exact k elemente dacă e posibil, sau cât lungimea listei returnatiStr = inputItemiReturnatiEl.value;
        const kVal = parseInt(valoareKEl.value, 10);

        if (!relevantiStr.trim() || !returnatiStr.ate dacă k e mai mare
         while(scoruriIdeale.length < k && scoruriIdeale.length < returnati.length) {
            scoruriIdeale.push(0);
        }
        if (scoruriIdetrim() || isNaN(kVal) || kVal <=0) {
            alert("Introduceți liste valideale.length > k) scoruriIdeale = scoruriIdeale.slice(0,k);


         de itemi și o valoare K pozitivă.");
            rezultatMetriciEl.innerHTML = '<p style="color: red;">Date de input invalide.</p>';
            return;
        }

        const relevanticonst actualDcg = dcgAtK_standard(scoruriReturnate, k);
        const idealD = relevantiStr.split(',').map(item => item.trim()).filter(item => item.length >cg = idcgAtK(scoruriIdeale, k);

        return idealDcg > 0 ? actual 0);
        const returnati = returnatiStr.split(',').map(item => item.trim()).filter(Dcg / idealDcg : 0;
    }

    if (btnCalculeazaMetriciEl) { //item => item.length > 0);

        if (relevanti.length === 0 || returnati Verifică dacă elementul există
        btnCalculeazaMetriciEl.addEventListener('click', () => {
            const relevantiStr = inputItemiRelevantiEl.value;
            const returnatiStr =.length === 0) {
            alert("Listele de itemi nu pot fi goale.");
             inputItemiReturnatiEl.value;
            const kVal = parseInt(valoareKEl.value,rezultatMetriciEl.innerHTML = '<p style="color: red;">Listele de itemi nu pot fi goale.</p>';
            return;
        }
        
        const pAtK = precisionAtK 10);

            if (!relevantiStr.trim() || !returnatiStr.trim() ||(relevanti, returnati, kVal);
        const mapScore = meanAveragePrecision(relevanti isNaN(kVal) || kVal <=0) {
                alert("Introduceți liste valide de itemi și o valoare K pozitivă.");
                rezultatMetriciEl.innerHTML = '<p style="color: red, returnati);
        const ndcgScore = ndcgAtK(relevanti, returnati, kVal);

        rezultatMetriciEl.innerHTML = `
            <h4>Rezultate Metrici:</h4>
            ;">Date de input invalide.</p>';
                return;
            }

            const relevanti = relevantiStr.split(',').map(item => item.trim()).filter(item => item.length > 0);<p><strong>Precision@${kVal}:</strong> ${pAtK.toFixed(4)}</p>
            <p
            const returnati = returnatiStr.split(',').map(item => item.trim()).filter(item><strong>Mean Average Precision (MAP):</strong> ${mapScore.toFixed(4)}</p>
            <p => item.length > 0);

            if (relevanti.length === 0 || returnati.><strong>Normalized Discounted Cumulative Gain (NDCG@${kVal}):</strong> ${ndcgScore.toFixed(4length === 0) {
                alert("Listele de itemi nu pot fi goale.");
                rez)}</p>
        `;
    });

    // --- SECȚIUNEA PAGERANK UNIVERSITultatMetriciEl.innerHTML = '<p style="color: red;">Listele de itemi nu pot fi goale.</p>';
                return;
            }
            
            const pAtK = precisionAtK(ĂȚI (placeholder) ---
    const btnRuleazaPageRankDemoEl = document.getElementById('btnRuleazaPageRankDemo');
    const listaQSOriginalDemoEl = document.getElementById('listaQSOriginalDemo');
relevanti, returnati, kVal);
            const mapScore = meanAveragePrecision(relevanti,    const listaPageRankDemoEl = document.getElementById('listaPageRankDemo');

    btnRuleazaPageRank returnati);
            const ndcgScore = ndcgAtK(relevanti, returnati, kVal);

            rezultatMetriciEl.innerHTML = `
                <h4>Rezultate Metrici:</h4>
                DemoEl.addEventListener('click', () => {
        alert("Funcționalitatea PageRank Universități nu este încă<p><strong>Precision@${kVal}:</strong> ${pAtK.toFixed(4)}</p>
                <p><strong>Mean Average Precision (MAP):</strong> ${mapScore.toFixed(4)}</p>
                <p implementată în acest demo interactiv.");
        
        // Exemplu de date placeholder (înlocuiește cu log><strong>Normalized Discounted Cumulative Gain (NDCG@${kVal}):</strong> ${ndcgScore.toFixed(4ica ta reală)
        const demoQS = [
            { nume: "Universitatea A (QS)", rank)}</p>
            `;
        });
    }
    // --- Sfârșit Secțiune Calculator: 1, scor: 90 },
            { nume: "Universitatea B (QS)", rank: 2, scor: 85 },
            { nume: "Universitatea C (QS)", rank: 3, scor Metrici de Rankare ---

    // --- Început Secțiune PageRank Universități ---
    // TODO: 80 },
        ];
        const demoPageRank = [
            { nume: "Universitatea B: Implementare logică și event listener pentru btnRuleazaPageRankDemo
    const btnRuleazaPageRankDemoEl = (PR)", rank: 1, scorPR: 0.35 },
            { nume: "Universitatea A document.getElementById('btnRuleazaPageRankDemo');
    const listaQSOriginalDemoEl = document.getElementById(' (PR)", rank: 2, scorPR: 0.33 },
            { nume: "UniverslistaQSOriginalDemo');
    const listaPageRankDemoEl = document.getElementById('listaPageRankDemo');

    if (btnRuleazaPageRankDemoEl) { // Verifică dacă elementul există
        btnRuleitatea C (PR)", rank: 3, scorPR: 0.32 },
        ];

        listaQSOriginalazaPageRankDemoEl.addEventListener('click', () => {
            alert("Funcționalitatea Demo PageRank Universități nuDemoEl.innerHTML = demoQS.map(u => `<li>${u.rank}. ${u.nume} (Scor: ${u.scor})</li>`).join('');
        listaPageRankDemoEl.innerHTML = demoPageRank.map este încă implementată.");
            // Aici va veni logica pentru PageRank
            // 1. Define(u => `<li>${u.rank}. ${u.nume} (PageRank: ${u.scorște un set mic de date demo (universități, scoruri)
            // 2. Aplică algoritmul tPR.toFixed(3)})</li>`).join('');
    });
});
