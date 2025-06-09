document.addEventListener('DOMContentLoaded', () => {
    // --- Început Secțiune Vizualizator Algoritmi de Sortare ---
    const inputListaSortareEl = document.getElementById('inputListaSortare');
    const selectAlgoritmSortareEl = document.getElementById('selectAlgoritmSortare');
    const dimensiuneListaRandomEl = document.getElementById('dimensiuneListaRandom');
    const btnGenereazaListaEl = document.getElementById('btnGenereazaLista');
    const btnSorteazaEl = document.getElementById('btnSorteaza');
    const vizualizareContainerEl = document.getElementById('vizualizareSortareContainer');
    const nrPasiSortareEl = document.getElementById('nrPasiSortare');
    const nrComparatiiSortareEl = document.getElementById('nrComparatiiSortare');
    const nrSwapuriSortareEl = document.getElementById('nrSwapuriSortare');
    const vitezaAnimatieEl = document.getElementById('vitezaAnimatie');
    const vitezaAnimatieValueEl = document.getElementById('vitezaAnimatieValue');
    const modVizualizareEl = document.getElementById('modVizualizare');
    const complexitateSortareEl = document.getElementById('complexitateSortare');
    const explicatieSortareEl = document.getElementById('explicatieSortare');
    const explicatiePasCurentEl = document.getElementById('explicatiePasCurent');

    let listaCurentaSortare = [];
    let generatorSortareCurent = null;
    let pasiSortare = 0;
    let comparatiiSortare = 0;
    let swapuriSortare = 0;
    let vitezaAnimatie = 500; // ms

    const algoritmiInfo = {
        bubbleSort: {
            complexitate: "O(n²)",
            explicatie: "Bubble Sort compară elementele adiacente și le schimbă dacă sunt în ordine greșită. Este simplu dar ineficient pentru liste mari."
        },
        quickSort: {
            complexitate: "O(n log n) în medie, O(n²) în cel mai rău caz",
            explicatie: "QuickSort folosește un element pivot pentru a partiționa lista în subliste mai mici. Este unul dintre cei mai rapizi algoritmi de sortare."
        },
        insertionSort: {
            complexitate: "O(n²)",
            explicatie: "Insertion Sort construiește lista sortată un element la un timp, inserând fiecare element nou în poziția corectă."
        },
        selectionSort: {
            complexitate: "O(n²)",
            explicatie: "Selection Sort împarte lista în două părți: sortată și nesortată. Selectează repetat elementul minim din partea nesortată."
        },
        mergeSort: {
            complexitate: "O(n log n)",
            explicatie: "Merge Sort împarte lista în jumătăți, le sortează recursiv, apoi le combină într-o listă sortată."
        }
    };

    function updateAlgoritmInfo() {
        const algoritm = selectAlgoritmSortareEl.value;
        const info = algoritmiInfo[algoritm];
        if (info) {
            complexitateSortareEl.textContent = info.complexitate;
            explicatieSortareEl.textContent = info.explicatie;
        }
    }

    if (selectAlgoritmSortareEl) {
        selectAlgoritmSortareEl.addEventListener('change', updateAlgoritmInfo);
        updateAlgoritmInfo();
    }

    if (vitezaAnimatieEl && vitezaAnimatieValueEl) {
        vitezaAnimatieEl.addEventListener('input', () => {
            const value = vitezaAnimatieEl.value;
            vitezaAnimatieValueEl.textContent = value;
            vitezaAnimatie = 1100 - (value * 100); // 100ms to 1000ms
        });
    }

    function parseInputList(inputString) {
        if (!inputString.trim()) return [];
        return inputString.split(',')
            .map(item => parseInt(item.trim(), 10))
            .filter(num => !isNaN(num));
    }

    function genereazaListaAleatorie(dimensiune) {
        const lista = [];
        for (let i = 0; i < dimensiune; i++) {
            lista.push(Math.floor(Math.random() * 100) + 1);
        }
        return lista;
    }

    function deseneazaListaSortare(lista, detaliiPas = {}) {
        if (!vizualizareContainerEl) return;
        vizualizareContainerEl.innerHTML = '';
        // Adjust vertical alignment based on visualization mode
        if (modVizualizareEl.value === 'dots') {
            vizualizareContainerEl.style.alignItems = 'center';
        } else {
            vizualizareContainerEl.style.alignItems = 'flex-end';
        }
        if (!lista || lista.length === 0) return;
        
        const maxVal = Math.max(...lista, 1);
        const { activ1, activ2, pivotIndex, comparareIndex, iIndex, swapIndex1, swapIndex2, pivotFinalIndex, partitieLow, partitieHigh, sortedIndices } = detaliiPas;
        const modVizualizare = modVizualizareEl ? modVizualizareEl.value : 'bars';

        // Dimensiuni dinamice
        const containerWidth = vizualizareContainerEl.clientWidth || 1000;
        const n = lista.length;
        let barWidth = Math.max(32, Math.min(120, Math.floor((containerWidth - 20) / n) - 6));
        let barMaxHeight = 220;
        if (n > 16) {
            barWidth = Math.max(12, Math.floor((containerWidth - 20) / n) - 6);
            barMaxHeight = 160;
        }
        if (n > 30) {
            barWidth = Math.max(6, Math.floor((containerWidth - 20) / n) - 6);
            barMaxHeight = 100;
        }
        if (n > 50) {
            barWidth = Math.max(3, Math.floor((containerWidth - 20) / n) - 6);
            barMaxHeight = 60;
        }

        lista.forEach((val, index) => {
            const element = document.createElement('div');
            const isActive = index === activ1 || index === activ2;
            const isPivot = index === pivotIndex;
            const isSorted = sortedIndices && sortedIndices.includes(index);
            const isComparing = index === comparareIndex;
            const isSwapping = index === swapIndex1 || index === swapIndex2;
            const isPartition = partitieLow !== undefined && index >= partitieLow && index <= partitieHigh;

            if (modVizualizare === 'bars') {
                element.style.height = `${(val / maxVal) * barMaxHeight + 30}px`;
                element.style.width = `${barWidth}px`;
                element.style.margin = '0 2px';
                element.style.display = 'flex';
                element.style.flexDirection = 'column-reverse';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'flex-end';
            } else {
                const dotSize = Math.max(24, Math.min(100, Math.floor(barWidth * 1.2)));
                element.style.width = `${dotSize}px`;
                element.style.height = `${dotSize}px`;
                element.style.borderRadius = '50%';
                element.style.margin = '5px';
                element.style.display = 'flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
            }

            element.style.backgroundColor = 'var(--color-bg-secondary)';
            element.style.transition = 'all 0.3s ease';
            element.style.color = 'var(--color-text)';
            element.style.textAlign = 'center';
            element.style.fontSize = `${Math.max(10, Math.min(22, Math.floor(barWidth * 0.5)))}px`;
            element.style.lineHeight = '20px';
            element.style.boxSizing = 'border-box';

            if (isSorted) {
                element.style.backgroundColor = 'var(--pico-color-slate-500, #E17564)';
            } else if (isPartition) {
                element.style.border = '1px dotted var(--pico-color-slate-400, #BE3144)';
                if (isPivot) element.style.backgroundColor = 'var(--pico-color-primary-hover, #872341)';
                else if (isComparing) element.style.backgroundColor = 'var(--pico-color-slate-400, #BE3144)';
                else if (index === iIndex) element.style.outline = '2px solid var(--pico-color-slate-500, #E17564)';
            }

            if (isActive || isSwapping) {
                element.style.backgroundColor = 'var(--pico-color-primary-hover, #872341)';
                element.style.transform = 'scale(1.1)';
            }

            if (index === pivotFinalIndex) {
                element.style.backgroundColor = 'var(--pico-color-slate-500, #E17564)';
                element.style.border = '2px solid var(--pico-color-primary-hover, #872341)';
            }

            // Reset classes
            element.className = '';
            if (isSorted) element.classList.add('sorted');
            if (isActive) element.classList.add('active');
            if (isSwapping) element.classList.add('swapping');
            if (isPivot) element.classList.add('pivot');
            if (isComparing) element.classList.add('comparing');

            // Numărul vizibil doar dacă sunt puține elemente sau dacă e destul spațiu
            if (n <= 30 || barWidth > 24) {
                const span = document.createElement('span');
                span.textContent = val;
                element.appendChild(span);
            }

            vizualizareContainerEl.appendChild(element);
        });
    }

    function reseteazaStatisticiSortare() {
        pasiSortare = 0;
        comparatiiSortare = 0;
        swapuriSortare = 0;
        if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;
        if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
        if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
        if(explicatiePasCurentEl) explicatiePasCurentEl.innerHTML = '<p style="margin: 0; font-style: italic;">Așteptând începerea sortării...</p>';
    }

    function* bubbleSortGenerator(arr) {
        let n = arr.length;
        let newArr = [...arr];
        let swapped;
        let sortedCount = 0;

        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            for (let j = 0; j < n - 1 - i; j++) {
                comparatiiSortare++;
                if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
                yield { lista: [...newArr], activ1: j, activ2: j + 1, sortedIndices: Array.from({length: sortedCount}, (_, k) => n - 1 - k), msg: `Compar ${newArr[j]} cu ${newArr[j+1]}` };

                if (newArr[j] > newArr[j + 1]) {
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                    swapped = true;
                    swapuriSortare++;
                    if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
                    yield { lista: [...newArr], activ1: j, activ2: j + 1, sortedIndices: Array.from({length: sortedCount}, (_, k) => n - 1 - k), msg: `Swap ${newArr[j+1]} cu ${newArr[j]}` };
                }
            }
            pasiSortare++;
            if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;
            sortedCount++; 
            if (!swapped) {
                yield { lista: [...newArr], msg: "Lista sortată (optimizare Bubble Sort).", sortedIndices: Array.from({length: n}, (_, k) => k) };
                return newArr;
            }
        }
        yield { lista: [...newArr], msg: "Sortare Bubble Sort finalizată!", sortedIndices: Array.from({length: n}, (_, k) => k) };
        return newArr;
    }
    
    function* partitionLomutoGenerator(arr, low, high, allSortedIndices) {
        let pivot = arr[high];
        let i = low - 1;
        yield { lista: [...arr], pivotIndex: high, partitieLow: low, partitieHigh: high, iIndex: i, sortedIndices: [...allSortedIndices], msg: `Pivot: ${pivot}. Partiționez [${low}-${high}]`};

        for (let j = low; j < high; j++) {
            comparatiiSortare++;
            if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
            yield { lista: [...arr], pivotIndex: high, comparareIndex: j, iIndex: i, partitieLow: low, partitieHigh: high, sortedIndices: [...allSortedIndices], msg: `Compar ${arr[j]} cu pivot ${pivot}`};
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swapuriSortare++;
                if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
                yield { lista: [...arr], swapIndex1: i, swapIndex2: j, pivotIndex: high, iIndex: i, partitieLow: low, partitieHigh: high, sortedIndices: [...allSortedIndices], msg: `Swap ${arr[j]} cu ${arr[i]}` };
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swapuriSortare++;
        if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
        let pivotFinalIdx = i + 1;
        // Nu adăugăm aici în allSortedIndices, se va face în quickSortGenerator după ce partiția e completă
        yield { lista: [...arr], pivotFinalIndex: pivotFinalIdx, partitieLow: low, partitieHigh: high, sortedIndices: [...allSortedIndices], msg: `Pivot ${pivot} așezat la ${pivotFinalIdx}`};
        return pivotFinalIdx;
    }

    function* quickSortGenerator(initialArr) {
        let arr = [...initialArr]; 
        let stack = [{ low: 0, high: arr.length - 1 }];
        let sortedIndicesGlobally = []; 

        while (stack.length > 0) {
            const { low, high } = stack.pop();
            pasiSortare++;
            if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;

            if (low < high) {
                let partitionGen = partitionLomutoGenerator(arr, low, high, [...sortedIndicesGlobally]);
                let result;
                while (!(result = partitionGen.next()).done) {
                    yield { ...result.value, lista: [...arr], stackState: JSON.stringify(stack) }; // Pasăm sortedIndices existente
                }
                let pi = result.value;
                if(!sortedIndicesGlobally.includes(pi)) sortedIndicesGlobally.push(pi); // Adaugă pivotul la indecșii global sortați


                if (pi - 1 > low) {
                    stack.push({ low: low, high: pi - 1 });
                } else if (pi - 1 >= low) { 
                     for(let k=low; k<=pi-1; k++) if(!sortedIndicesGlobally.includes(k)) sortedIndicesGlobally.push(k);
                }
                if (pi + 1 < high) {
                    stack.push({ low: pi + 1, high: high });
                } else if (pi + 1 <= high) {
                    for(let k=pi+1; k<=high; k++) if(!sortedIndicesGlobally.includes(k)) sortedIndicesGlobally.push(k);
                }
                 yield { lista: [...arr], msg: `Sub-partiții adăugate. Stivă: ${stack.length}`, stackState: JSON.stringify(stack), sortedIndices: [...sortedIndicesGlobally]};
            } else if (low === high) { 
                 if(!sortedIndicesGlobally.includes(low)) sortedIndicesGlobally.push(low);
                 yield { lista: [...arr], msg: `Element la ${low} considerat sortat.`, sortedIndices: [...sortedIndicesGlobally]};
            }
        }
        yield { lista: [...arr], msg: "Sortare QuickSort finalizată!", sortedIndices: Array.from({length: arr.length}, (_, k) => k) };
        return arr;
    }
    
    function* insertionSortGenerator(arr) {
        let newArr = [...arr];
        let sortedCount = 0;

        for (let i = 1; i < newArr.length; i++) {
            let current = newArr[i];
            let j = i - 1;
            
            while (j >= 0) {
                comparatiiSortare++;
                if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
                yield { 
                    lista: [...newArr], 
                    activ1: j, 
                    activ2: j + 1, 
                    sortedIndices: Array.from({length: sortedCount}, (_, k) => k),
                    msg: `Compar ${newArr[j]} cu ${current}`
                };

                if (newArr[j] > current) {
                    newArr[j + 1] = newArr[j];
                    swapuriSortare++;
                    if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
                    j--;
                } else {
                    break;
                }
            }
            newArr[j + 1] = current;
            sortedCount++;
            pasiSortare++;
            if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;
        }
        yield { 
            lista: [...newArr], 
            msg: "Sortare Insertion Sort finalizată!", 
            sortedIndices: Array.from({length: newArr.length}, (_, k) => k) 
        };
        return newArr;
    }

    function* selectionSortGenerator(arr) {
        let newArr = [...arr];
        let sortedCount = 0;

        for (let i = 0; i < newArr.length - 1; i++) {
            let minIdx = i;
            
            for (let j = i + 1; j < newArr.length; j++) {
                comparatiiSortare++;
                if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
                yield { 
                    lista: [...newArr], 
                    activ1: j, 
                    activ2: minIdx, 
                    sortedIndices: Array.from({length: sortedCount}, (_, k) => k),
                    msg: `Compar ${newArr[j]} cu ${newArr[minIdx]}`
                };

                if (newArr[j] < newArr[minIdx]) {
                    minIdx = j;
                }
            }

            if (minIdx !== i) {
                [newArr[i], newArr[minIdx]] = [newArr[minIdx], newArr[i]];
                swapuriSortare++;
                if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
            }
            
            sortedCount++;
            pasiSortare++;
            if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;
        }
        yield { 
            lista: [...newArr], 
            msg: "Sortare Selection Sort finalizată!", 
            sortedIndices: Array.from({length: newArr.length}, (_, k) => k) 
        };
        return newArr;
    }

    function* mergeSortGenerator(arr) {
        function* merge(left, right, startIdx) {
            let result = [];
            let i = 0, j = 0;
            
            while (i < left.length && j < right.length) {
                comparatiiSortare++;
                if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
                yield { 
                    lista: [...arr], 
                    activ1: startIdx + i, 
                    activ2: startIdx + left.length + j,
                    msg: `Compar ${left[i]} cu ${right[j]}`
                };

                if (left[i] <= right[j]) {
                    result.push(left[i]);
                    i++;
                } else {
                    result.push(right[j]);
                    j++;
                }
            }

            result = result.concat(left.slice(i)).concat(right.slice(j));
            for (let k = 0; k < result.length; k++) {
                arr[startIdx + k] = result[k];
                swapuriSortare++;
                if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
            }
        }

        function* mergeSortHelper(arr, start, end) {
            if (end - start <= 1) return;

            const mid = Math.floor((start + end) / 2);
            yield* mergeSortHelper(arr, start, mid);
            yield* mergeSortHelper(arr, mid, end);
            yield* merge(arr.slice(start, mid), arr.slice(mid, end), start);
            
            pasiSortare++;
            if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;
        }

        let newArr = [...arr];
        yield* mergeSortHelper(newArr, 0, newArr.length);
        yield { 
            lista: [...newArr], 
            msg: "Sortare Merge Sort finalizată!", 
            sortedIndices: Array.from({length: newArr.length}, (_, k) => k) 
        };
        return newArr;
    }

    if (btnGenereazaListaEl) {
        btnGenereazaListaEl.addEventListener('click', () => {
            const dimensiune = parseInt(dimensiuneListaRandomEl.value, 10);
            if (dimensiune > 0 && dimensiune <= 20) {
                listaCurentaSortare = genereazaListaAleatorie(dimensiune);
                deseneazaListaSortare(listaCurentaSortare);
                inputListaSortareEl.value = listaCurentaSortare.join(',');
                generatorSortareCurent = null;
                if(btnSorteazaEl) btnSorteazaEl.disabled = false;
                reseteazaStatisticiSortare();
            } else {
                alert("Introduceți o dimensiune validă (1-20).");
            }
        });
    }

    if (btnSorteazaEl) {
        btnSorteazaEl.addEventListener('click', async () => {
            if (!generatorSortareCurent) {
                listaCurentaSortare = parseInputList(inputListaSortareEl.value);
                if (listaCurentaSortare.length === 0) {
                    alert("Introduceți o listă validă de numere.");
                    return;
                }
                reseteazaStatisticiSortare();
                
                const algoritm = selectAlgoritmSortareEl.value;
                switch(algoritm) {
                    case 'bubbleSort':
                        generatorSortareCurent = bubbleSortGenerator(listaCurentaSortare);
                        break;
                    case 'quickSort':
                        generatorSortareCurent = quickSortGenerator(listaCurentaSortare);
                        break;
                    case 'insertionSort':
                        generatorSortareCurent = insertionSortGenerator(listaCurentaSortare);
                        break;
                    case 'selectionSort':
                        generatorSortareCurent = selectionSortGenerator(listaCurentaSortare);
                        break;
                    case 'mergeSort':
                        generatorSortareCurent = mergeSortGenerator(listaCurentaSortare);
                        break;
                }

                if (generatorSortareCurent) {
                    const stareInitiala = generatorSortareCurent.next();
                    if (!stareInitiala.done && stareInitiala.value) {
                        if (stareInitiala.value.lista) listaCurentaSortare = [...stareInitiala.value.lista];
                        deseneazaListaSortare(stareInitiala.value.lista, stareInitiala.value);
                        if(explicatiePasCurentEl) explicatiePasCurentEl.innerHTML = `<p style="margin: 0;">${stareInitiala.value.msg}</p>`;
                    }
                }
                return;
            }

            const stareUrmatoare = generatorSortareCurent.next();
            if (!stareUrmatoare.done && stareUrmatoare.value) {
                if (stareUrmatoare.value.lista) {
                    listaCurentaSortare = [...stareUrmatoare.value.lista];
                }
                deseneazaListaSortare(stareUrmatoare.value.lista, stareUrmatoare.value);
                if(explicatiePasCurentEl) explicatiePasCurentEl.innerHTML = `<p style="margin: 0;">${stareUrmatoare.value.msg}</p>`;
                
                // Adăugăm un delay pentru animație
                await new Promise(resolve => setTimeout(resolve, vitezaAnimatie));
            } else {
                let finalMessage = "Sortare completă!";
                if (stareUrmatoare.value && stareUrmatoare.value.msg) {
                    finalMessage = stareUrmatoare.value.msg;
                }
                if(stareUrmatoare.value && stareUrmatoare.value.lista) {
                    deseneazaListaSortare(stareUrmatoare.value.lista, stareUrmatoare.value);
                } else if (listaCurentaSortare.length > 0) {
                    deseneazaListaSortare(listaCurentaSortare, { sortedIndices: Array.from({length: listaCurentaSortare.length}, (_, k) => k) });
                }
                if(explicatiePasCurentEl) explicatiePasCurentEl.innerHTML = `<p style="margin: 0;">${finalMessage}</p>`;
                btnSorteazaEl.disabled = true;
                generatorSortareCurent = null;
            }
        });
    }
    
    if (btnGenereazaListaEl) {
        btnGenereazaListaEl.click();
    }
    // --- Sfârșit Secțiune Vizualizator Algoritmi de Sortare ---


    // --- Început Secțiune Calculator Metrici de Rankare ---
    const inputItemiRelevantiEl = document.getElementById('inputItemiRelevanti');
    const inputItemiReturnatiEl = document.getElementById('inputItemiReturnati');
    const valoareKEl = document.getElementById('valoareK');
    const btnCalculeazaMetriciEl = document.getElementById('btnCalculeazaMetrici');
    const rezultatMetriciEl = document.getElementById('rezultatMetrici');

    function precisionAtK(relevanti, returnati, k) {
        if (k <= 0 || returnati.length === 0) return 0;
        const topKReturnati = returnati.slice(0, k);
        let gasitiRelevantiInTopK = 0;
        topKReturnati.forEach(item => {
            if (relevanti.includes(item)) {
                gasitiRelevantiInTopK++;
            }
        });
        return topKReturnati.length > 0 ? gasitiRelevantiInTopK / topKReturnati.length : 0;
    }

    function averagePrecision(relevanti, returnati) {
        if (relevanti.length === 0 || returnati.length === 0) return 0;
        let preciziiLaItemRelevante = [];
        let numarRelevanteGasite = 0;
        returnati.forEach((itemReturnat, index) => {
            if (relevanti.includes(itemReturnat)) {
                numarRelevanteGasite++;
                preciziiLaItemRelevante.push(numarRelevanteGasite / (index + 1));
            }
        });
        if (preciziiLaItemRelevante.length === 0) return 0;
        return preciziiLaItemRelevante.reduce((sum, p) => sum + p, 0) / relevanti.length;
    }
    
    function meanAveragePrecision(relevanti, returnati) {
        return averagePrecision(relevanti, returnati);
    }
    
    function dcgAtK_standard(scoruriRelevantaReturnate, k) {
        if (k <= 0) return 0;
        const topKScoruri = scoruriRelevantaReturnate.slice(0, k);
        if (topKScoruri.length === 0) return 0;
        let dcg = topKScoruri[0]; 
        for (let i = 1; i < topKScoruri.length; i++) {
            dcg += topKScoruri[i] / Math.log2(i + 1 + 1); 
        }
        return dcg;
    }

    function idcgAtK(scoruriRelevantaIdealeSortate, k) {
        return dcgAtK_standard(scoruriRelevantaIdealeSortate.slice(0,k), k);
    }
    
    function ndcgAtK(relevanti, returnati, k) {
        if (k <= 0 || returnati.length === 0) return 0;
        const kLimitat = Math.min(k, returnati.length); // k nu poate fi mai mare decât numărul de itemi returnați
        const scoruriReturnate = returnati.slice(0, kLimitat).map(item => relevanti.includes(item) ? 1 : 0);
        
        let scoruriIdeale = [];
        for(let i=0; i < Math.min(kLimitat, relevanti.length); i++) {
            scoruriIdeale.push(1);
        }
        while(scoruriIdeale.length < kLimitat ) { 
            scoruriIdeale.push(0);
        }

        const actualDcg = dcgAtK_standard(scoruriReturnate, kLimitat);
        const idealDcg = idcgAtK(scoruriIdeale, kLimitat);

        return idealDcg > 0 ? actualDcg / idealDcg : 0;
    }

    if (btnCalculeazaMetriciEl) {
        btnCalculeazaMetriciEl.addEventListener('click', () => {
            const relevantiStr = inputItemiRelevantiEl.value;
            const returnatiStr = inputItemiReturnatiEl.value;
            const kVal = parseInt(valoareKEl.value, 10);

            if (!relevantiStr.trim() || !returnatiStr.trim() || isNaN(kVal) || kVal <=0) {
                alert("Introduceți liste valide de itemi și o valoare K pozitivă.");
                if(rezultatMetriciEl) rezultatMetriciEl.innerHTML = '<p style="color: red;">Date de input invalide.</p>';
                return;
            }

            const relevanti = relevantiStr.split(',').map(item => item.trim()).filter(item => item.length > 0);
            const returnati = returnatiStr.split(',').map(item => item.trim()).filter(item => item.length > 0);

            if (relevanti.length === 0 || returnati.length === 0) {
                alert("Listele de itemi nu pot fi goale.");
                if(rezultatMetriciEl) rezultatMetriciEl.innerHTML = '<p style="color: red;">Listele de itemi nu pot fi goale.</p>';
                return;
            }
            
            const pAtK = precisionAtK(relevanti, returnati, kVal);
            const mapScore = meanAveragePrecision(relevanti, returnati);
            const ndcgScore = ndcgAtK(relevanti, returnati, kVal);

            if(rezultatMetriciEl) {
                rezultatMetriciEl.innerHTML = `
                    <h4>Rezultate Metrici:</h4>
                    <p><strong>Precision@${kVal}:</strong> ${pAtK.toFixed(4)}</p>
                    <p><strong>Mean Average Precision (MAP):</strong> ${mapScore.toFixed(4)}</p>
                    <p><strong>Normalized Discounted Cumulative Gain (NDCG@${kVal}):</strong> ${ndcgScore.toFixed(4)}</p>
                `;
            }
        });
        // Afișează metrici cu valorile default la încărcare
        if(inputItemiRelevantiEl && inputItemiRelevantiEl.value) btnCalculeazaMetriciEl.click();
    }
    // --- Sfârșit Secțiune Calculator Metrici de Rankare ---

    // --- Început Secțiune PageRank Universități ---
    const btnRuleazaPageRankDemoEl = document.getElementById('btnRuleazaPageRankDemo');
    const listaQSOriginalDemoEl = document.getElementById('listaQSOriginalDemo');
    const listaPageRankDemoEl = document.getElementById('listaPageRankDemo');
    const grafPageRankContainerEl = document.getElementById('grafPageRankContainer');

    // New elements for customization
    const dampingFactorEl = document.getElementById('dampingFactor');
    const dampingFactorValueEl = document.getElementById('dampingFactorValue');
    const numIterationsEl = document.getElementById('numIterations');
    const numIterationsValueEl = document.getElementById('numIterationsValue');
    const linkCriteriaEl = document.getElementById('linkCriteria');
    const linkThresholdEl = document.getElementById('linkThreshold');
    const linkThresholdValueEl = document.getElementById('linkThresholdValue');
    const numUniversitiesEl = document.getElementById('numUniversities');
    const numUniversitiesValueEl = document.getElementById('numUniversitiesValue');
    const minScoreEl = document.getElementById('minScore');
    const minScoreValueEl = document.getElementById('minScoreValue');
    const countryFilterEl = document.getElementById('countryFilter');
    const linkStrengthEl = document.getElementById('linkStrength');
    const linkStrengthValueEl = document.getElementById('linkStrengthValue');

    // Update output values for range inputs
    if (dampingFactorEl && dampingFactorValueEl) {
        dampingFactorEl.addEventListener('input', () => {
            dampingFactorValueEl.textContent = dampingFactorEl.value;
        });
    }
    if (numIterationsEl && numIterationsValueEl) {
        numIterationsEl.addEventListener('input', () => {
            numIterationsValueEl.textContent = numIterationsEl.value;
        });
    }
    if (linkThresholdEl && linkThresholdValueEl) {
        linkThresholdEl.addEventListener('input', () => {
            linkThresholdValueEl.textContent = linkThresholdEl.value;
        });
    }
    if (numUniversitiesEl && numUniversitiesValueEl) {
        numUniversitiesEl.addEventListener('input', () => {
            numUniversitiesValueEl.textContent = numUniversitiesEl.value;
        });
    }
    if (minScoreEl && minScoreValueEl) {
        minScoreEl.addEventListener('input', () => {
            minScoreValueEl.textContent = minScoreEl.value;
        });
    }
    if (linkStrengthEl && linkStrengthValueEl) {
        linkStrengthEl.addEventListener('input', () => {
            linkStrengthValueEl.textContent = linkStrengthEl.value;
        });
    }

    let universitatitDemoDataGlobal = [];
    let allUniversitiesData = [];

    async function incarcaDateUniversitati() {
        try {
            console.log("Starting to load university data...");
            console.log("Attempting to fetch qs_ranking.json...");
            const response = await fetch('qs_ranking.json');
            console.log("Fetch response status:", response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error response:", errorText);
                throw new Error(`HTTP error! status: ${response.status}, Text: ${errorText}`);
            }
            
            const data = await response.json();
            console.log("Raw data loaded, first item:", data[0]);
            console.log("Total items loaded:", data.length);
            
            // Store all data for filtering
            allUniversitiesData = data;
            
            // Populate country filter
            if (countryFilterEl) {
                const countries = [...new Set(data.map(uni => {
                    const country = uni.university.split(" - ")[1] || "Unknown";
                    return country.trim();
                }))].sort();
                
                countries.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country;
                    option.textContent = country;
                    countryFilterEl.appendChild(option);
                });
            }
            
            // Apply filters
            await aplicaFiltre();
            
            if (btnRuleazaPageRankDemoEl) {
                console.log("Enabling PageRank button");
                btnRuleazaPageRankDemoEl.disabled = false;
            }
            return true;
        } catch (error) {
            console.error("Error loading university data:", error);
            console.error("Error stack:", error.stack);
            if (listaQSOriginalDemoEl) {
                listaQSOriginalDemoEl.innerHTML = `<li>Eroare: ${error.message}</li>`;
            }
            if (btnRuleazaPageRankDemoEl) {
                btnRuleazaPageRankDemoEl.disabled = true;
            }
            throw error;
        }
    }

    async function aplicaFiltre() {
        // Apply minimum score filter
        const minScore = minScoreEl ? parseFloat(minScoreEl.value) : 0;
        console.log("Applying minimum score filter:", minScore);
        let filteredData = allUniversitiesData.filter(uni => uni.score >= minScore);
        
        // Apply country filter
        const selectedCountry = countryFilterEl ? countryFilterEl.value : 'all';
        if (selectedCountry !== 'all') {
            filteredData = filteredData.filter(uni => {
                const country = uni.university.split(" - ")[1] || "Unknown";
                return country.trim() === selectedCountry;
            });
        }
        
        // Get number of universities to analyze
        const numUnis = numUniversitiesEl ? parseInt(numUniversitiesEl.value) : 8;
        console.log("Number of universities to analyze:", numUnis);
        
        universitatitDemoDataGlobal = filteredData.slice(0, numUnis).map((uni, index) => ({
            id: `U${index + 1}`,
            nume: uni.university.replace(/\s*\(.*\)\s*$/, '').trim().split(" - ")[0],
            qs_rank: uni.rank,
            score_qs_original: uni.score,
            ifr: Math.random() * 0.5 + 0.5,
            isr: Math.random() * 0.5 + 0.5,
            irn: Math.random() * 0.5 + 0.5,
            sus: Math.random() * 0.5 + 0.5
        }));
        console.log("Processed university data:", universitatitDemoDataGlobal);
    }

    // Add event listeners for filters
    if (countryFilterEl) {
        countryFilterEl.addEventListener('change', aplicaFiltre);
    }
    if (minScoreEl) {
        minScoreEl.addEventListener('change', aplicaFiltre);
    }
    if (numUniversitiesEl) {
        numUniversitiesEl.addEventListener('change', aplicaFiltre);
    }

    function calculeazaScorCompozit(uni) {
        return (uni.ifr + uni.isr + uni.irn + uni.sus) / 4;
    }

    function construiesteGraf(universitatiCuScor) {
        const graf = {};
        const linkCriteria = linkCriteriaEl ? linkCriteriaEl.value : 'both';
        const linkThreshold = linkThresholdEl ? parseFloat(linkThresholdEl.value) : 0.3;
        const linkStrength = linkStrengthEl ? parseInt(linkStrengthEl.value) : 3;

        universitatiCuScor.forEach(u1 => {
            graf[u1.id] = { outLinks: [], inLinks: [] };
        });

        universitatiCuScor.forEach(u1 => {
            universitatiCuScor.forEach(u2 => {
                if (u1.id !== u2.id) {
                    let shouldCreateLink = false;
                    let linkWeight = 1;
                    
                    switch(linkCriteria) {
                        case 'qs':
                            const qsRankDiff = u1.qs_rank - u2.qs_rank;
                            shouldCreateLink = qsRankDiff > 5;
                            linkWeight = Math.min(5, Math.max(1, Math.floor(qsRankDiff / 5)));
                            break;
                        case 'composite':
                            const scoreDiff = u2.scorCompozit - u1.scorCompozit;
                            shouldCreateLink = scoreDiff > linkThreshold;
                            linkWeight = Math.min(5, Math.max(1, Math.floor(scoreDiff * 5)));
                            break;
                        case 'research':
                            const researchDiff = u2.ifr - u1.ifr;
                            shouldCreateLink = researchDiff > linkThreshold;
                            linkWeight = Math.min(5, Math.max(1, Math.floor(researchDiff * 5)));
                            break;
                        case 'teaching':
                            const teachingDiff = u2.sus - u1.sus;
                            shouldCreateLink = teachingDiff > linkThreshold;
                            linkWeight = Math.min(5, Math.max(1, Math.floor(teachingDiff * 5)));
                            break;
                        case 'both':
                        default:
                            const scoreDiffBoth = u2.scorCompozit - u1.scorCompozit;
                            const qsRankDiffBoth = u1.qs_rank - u2.qs_rank;
                            shouldCreateLink = (scoreDiffBoth > linkThreshold || qsRankDiffBoth > 5);
                            linkWeight = Math.min(5, Math.max(1, 
                                Math.floor((scoreDiffBoth * 2.5) + (qsRankDiffBoth / 5))
                            ));
                    }

                    if (shouldCreateLink) {
                        if (!graf[u1.id].outLinks.includes(u2.id)) {
                            graf[u1.id].outLinks.push({
                                target: u2.id,
                                weight: linkWeight * linkStrength
                            });
                            if (!graf[u2.id].inLinks.includes(u1.id)) {
                                graf[u2.id].inLinks.push(u1.id);
                            }
                        }
                    }
                }
            });
        });
        return graf;
    }

    function calculeazaPageRank(graf, universitatiIds) {
        const N = universitatiIds.length;
        if (N === 0) return {};
        
        const dampingFactor = dampingFactorEl ? parseFloat(dampingFactorEl.value) : 0.85;
        const numIterations = numIterationsEl ? parseInt(numIterationsEl.value) : 30;
        
        let pageRanks = {};
        universitatiIds.forEach(id => pageRanks[id] = 1 / N);

        for (let iter = 0; iter < numIterations; iter++) {
            const newPageRanks = {};
            let danglingSum = 0;
            universitatiIds.forEach(id => {
                if (graf[id] && graf[id].outLinks.length === 0) {
                    danglingSum += pageRanks[id];
                }
            });

            universitatiIds.forEach(pageId => {
                let newRank = (1 - dampingFactor) / N;
                newRank += dampingFactor * (danglingSum / N);
                if (graf[pageId] && graf[pageId].inLinks) {
                    graf[pageId].inLinks.forEach(linkerId => {
                        if (graf[linkerId] && graf[linkerId].outLinks.length > 0) {
                            newRank += dampingFactor * (pageRanks[linkerId] / graf[linkerId].outLinks.length);
                        }
                    });
                }
                newPageRanks[pageId] = newRank;
            });

            // Normalize ranks
            const sum = Object.values(newPageRanks).reduce((a, b) => a + b, 0);
            Object.keys(newPageRanks).forEach(key => {
                newPageRanks[key] = newPageRanks[key] / sum;
            });

            let diff = 0;
            for(let id of universitatiIds) {
                diff += Math.abs(newPageRanks[id] - pageRanks[id]);
            }
            pageRanks = newPageRanks;
            if (diff < 0.00001 && iter > 5) break;
        }
        return pageRanks;
    }

    function deseneazaGrafSimplu(graf, noduriData, container, pageRanks) {
        if (!container) return;
        container.innerHTML = '';
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "500px");
        svg.style.border = "1px solid var(--pico-color-slate-300, lightgray)";
        container.appendChild(svg);

        const pozitiiNoduri = {};
        const razaNodBaza = 20;
        const latimeContainer = container.clientWidth || 800;
        const inaltimeContainer = 500;

        // Calculate positions in a circular layout
        noduriData.forEach((nod, index) => {
            const unghi = (index / noduriData.length) * 2 * Math.PI - Math.PI / 2;
            const razaCerc = Math.min(latimeContainer, inaltimeContainer) / 2 - 80;
            pozitiiNoduri[nod.id] = {
                x: latimeContainer / 2 + razaCerc * Math.cos(unghi),
                y: inaltimeContainer / 2 + razaCerc * Math.sin(unghi)
            };
        });

        // Add arrow marker definition
        const defs = document.createElementNS(svgNS, 'defs');
        const marker = document.createElementNS(svgNS, 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('viewBox', '0 -5 10 10');
        marker.setAttribute('markerWidth', '6');
        marker.setAttribute('markerHeight', '6');
        marker.setAttribute('refX', '20');
        marker.setAttribute('refY', '0');
        marker.setAttribute('orient', 'auto');
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', 'M0,-5L10,0L0,5');
        path.setAttribute('fill', 'var(--pico-color-slate-600, #475569)');
        marker.appendChild(path);
        defs.appendChild(marker);
        svg.appendChild(defs);

        // Draw edges with weights
        noduriData.forEach(nod => {
            if (graf[nod.id] && graf[nod.id].outLinks) {
                graf[nod.id].outLinks.forEach(link => {
                    if (pozitiiNoduri[nod.id] && pozitiiNoduri[link.target]) {
                        const sursa = pozitiiNoduri[nod.id];
                        const target = pozitiiNoduri[link.target];
                        const linie = document.createElementNS(svgNS, "line");
                        linie.setAttribute("x1", sursa.x);
                        linie.setAttribute("y1", sursa.y);
                        linie.setAttribute("x2", target.x);
                        linie.setAttribute("y2", target.y);
                        linie.setAttribute("stroke", "var(--pico-color-slate-400, #94a3b8)");
                        linie.setAttribute("stroke-width", Math.max(1, Math.min(5, link.weight / 2)));
                        linie.setAttribute("marker-end", "url(#arrowhead)");
                        svg.appendChild(linie);

                        // Add weight label
                        const midX = (sursa.x + target.x) / 2;
                        const midY = (sursa.y + target.y) / 2;
                        const text = document.createElementNS(svgNS, "text");
                        text.setAttribute("x", midX);
                        text.setAttribute("y", midY);
                        text.setAttribute("text-anchor", "middle");
                        text.setAttribute("fill", "var(--pico-color-slate-700, #334155)");
                        text.setAttribute("font-size", "10px");
                        text.textContent = link.weight;
                        svg.appendChild(text);
                    }
                });
            }
        });

        // Draw nodes
        noduriData.forEach(nod => {
            if (pozitiiNoduri[nod.id]) {
                const { x, y } = pozitiiNoduri[nod.id];
                const prScore = pageRanks[nod.id] || 0;
                const razaCercActuala = razaNodBaza + (prScore * 100);

                const grup = document.createElementNS(svgNS, "g");
                
                // Add node circle
                const cerc = document.createElementNS(svgNS, "circle");
                cerc.setAttribute("cx", x);
                cerc.setAttribute("cy", y);
                cerc.setAttribute("r", razaCercActuala);
                cerc.setAttribute("fill", `rgba(76, 175, 80, ${Math.max(0.2, Math.min(1, 0.2 + prScore * 8))})`);
                cerc.setAttribute("stroke", "var(--pico-color-green-700, #388e3c)");
                cerc.setAttribute("stroke-width", "2");
                grup.appendChild(cerc);

                // Add university ID
                const textId = document.createElementNS(svgNS, "text");
                textId.setAttribute("x", x);
                textId.setAttribute("y", y + 4);
                textId.setAttribute("text-anchor", "middle");
                textId.setAttribute("fill", "white");
                textId.setAttribute("font-size", "12px");
                textId.setAttribute("font-weight", "bold");
                textId.textContent = nod.id;
                grup.appendChild(textId);

                // Add university name
                const textNume = document.createElementNS(svgNS, "text");
                textNume.setAttribute("x", x);
                textNume.setAttribute("y", y + razaCercActuala + 15);
                textNume.setAttribute("text-anchor", "middle");
                textNume.setAttribute("fill", "var(--pico-color-slate-700, #334155)");
                textNume.setAttribute("font-size", "10px");
                textNume.textContent = `${nod.nume.substring(0, 20)}${nod.nume.length > 20 ? '...' : ''}`;
                grup.appendChild(textNume);

                // Add PageRank score
                const textPR = document.createElementNS(svgNS, "text");
                textPR.setAttribute("x", x);
                textPR.setAttribute("y", y + razaCercActuala + 30);
                textPR.setAttribute("text-anchor", "middle");
                textPR.setAttribute("fill", "var(--pico-color-slate-700, #334155)");
                textPR.setAttribute("font-size", "9px");
                textPR.textContent = `PR: ${prScore.toFixed(4)}`;
                grup.appendChild(textPR);

                // Add QS Rank
                const textQS = document.createElementNS(svgNS, "text");
                textQS.setAttribute("x", x);
                textQS.setAttribute("y", y + razaCercActuala + 45);
                textQS.setAttribute("text-anchor", "middle");
                textQS.setAttribute("fill", "var(--pico-color-slate-700, #334155)");
                textQS.setAttribute("font-size", "9px");
                textQS.textContent = `QS: ${nod.qs_rank}`;
                grup.appendChild(textQS);

                svg.appendChild(grup);
            }
        });
    }

    if (btnRuleazaPageRankDemoEl) {
        btnRuleazaPageRankDemoEl.disabled = true;
        
        btnRuleazaPageRankDemoEl.addEventListener('click', () => {
            console.log("PageRank button clicked");
            console.log("Universities data:", universitatitDemoDataGlobal);
            
            if (universitatitDemoDataGlobal.length === 0) {
                console.error("No university data available");
                alert("Datele universităților sunt în curs de încărcare sau a apărut o eroare. Vă rugăm așteptați sau reîmprospătați.");
                return;
            }

            const universitatiCuScor = universitatitDemoDataGlobal.map(uni => ({
                ...uni,
                scorCompozit: calculeazaScorCompozit(uni)
            }));
            console.log("Universities with scores:", universitatiCuScor);

            // Display original QS ranking
            if(listaQSOriginalDemoEl) {
                console.log("Displaying QS ranking");
                const qsSorted = [...universitatiCuScor].sort((a, b) => a.qs_rank - b.qs_rank);
                listaQSOriginalDemoEl.innerHTML = qsSorted.map(u => 
                    `<li>${u.qs_rank}. ${u.nume} (Scor: ${u.scorCompozit.toFixed(3)})</li>`
                ).join('');
            }

            // Calculate PageRank
            console.log("Calculating PageRank");
            const idsUniversitati = universitatiCuScor.map(u => u.id);
            const graf = construiesteGraf(universitatiCuScor);
            console.log("Graph structure:", graf);
            
            const pageRanks = calculeazaPageRank(graf, idsUniversitati);
            console.log("PageRank scores:", pageRanks);

            // Display PageRank ranking
            const clasamentPageRank = universitatiCuScor.map(uni => ({
                ...uni,
                scorPR: pageRanks[uni.id] || 0
            })).sort((a, b) => b.scorPR - a.scorPR);

            if(listaPageRankDemoEl) {
                console.log("Displaying PageRank ranking");
                listaPageRankDemoEl.innerHTML = clasamentPageRank.map((u, index) => 
                    `<li>${index + 1}. ${u.nume} (PR: ${u.scorPR.toFixed(4)}, QS: ${u.qs_rank})</li>`
                ).join('');
            }

            // Draw the graph
            if (grafPageRankContainerEl) {
                console.log("Drawing graph");
                deseneazaGrafSimplu(graf, universitatiCuScor, grafPageRankContainerEl, pageRanks);
            }
        });

        // Load university data
        console.log("Loading university data...");
        incarcaDateUniversitati().then(() => {
            console.log("University data loaded successfully");
            btnRuleazaPageRankDemoEl.disabled = false;
        }).catch(error => {
            console.error("Error loading university data:", error);
        });
    }
    // --- Sfârșit Secțiune PageRank Universități ---
});
