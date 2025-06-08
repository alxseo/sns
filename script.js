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

    let listaCurentaSortare = [];
    let generatorSortareCurent = null;
    let pasiSortare = 0;
    let comparatiiSortare = 0;
    let swapuriSortare = 0;

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

    function deseneazaListaSortare(lista, detaliiPas = {}) { // Am redenumit pentru claritate
        vizualizareContainerEl.innerHTML = '';
        if (!lista || lista.length === 0) return;
        const maxVal = Math.max(...lista, 1);
        const { activ1, activ2, pivotIndex, comparareIndex, iIndex, swapIndex1, swapIndex2, pivotFinalIndex, partitieLow, partitieHigh, sortedIndices } = detaliiPas;

        lista.forEach((val, index) => {
            const bara = document.createElement('div');
            bara.style.height = `${(val / maxVal) * 90}%`;
            bara.style.width = `${Math.max(10, 100 / lista.length - 5)}px`;
            bara.style.backgroundColor = 'var(--pico-color-indigo-500, #79a2d8)'; // Culoare de bază Pico
            bara.style.margin = '0 2px';
            bara.style.display = 'inline-block';
            bara.style.verticalAlign = 'bottom';
            bara.textContent = val;
            bara.style.color = 'white';
            bara.style.textAlign = 'center';
            bara.style.fontSize = '12px';
            bara.style.lineHeight = '20px';
            bara.style.transition = 'height 0.2s ease, background-color 0.2s ease';
            bara.style.boxSizing = 'border-box';


            if (sortedIndices && sortedIndices.includes(index)) {
                bara.style.backgroundColor = 'var(--pico-color-green-600, #43a047)'; // Verde pentru sortat
            } else if (partitieLow !== undefined && index >= partitieLow && index <= partitieHigh) {
                bara.style.border = '1px dotted var(--pico-color-slate-400, #94a3b8)';
                if (index === pivotIndex) bara.style.backgroundColor = 'var(--pico-color-amber-500, #f59e0b)'; // Pivot
                else if (index === comparareIndex) bara.style.backgroundColor = 'var(--pico-color-orange-500, #f97316)'; // Comparație
                else if (index === iIndex) bara.style.outline = '2px solid var(--pico-color-yellow-400, #facc15)';
            }

            if (index === activ1 || index === activ2 || index === swapIndex1 || index === swapIndex2) {
                 bara.style.backgroundColor = 'var(--pico-color-red-600, #dc2626)'; // Swap/Comparație activă
            }
            if (index === pivotFinalIndex) { // Pentru QuickSort, după ce pivotul e plasat
                bara.style.backgroundColor = 'var(--pico-color-green-600, #43a047)';
                bara.style.border = '2px solid var(--pico-color-green-700, #388e3c)';
            }
            vizualizareContainerEl.appendChild(bara);
        });
    }
    
    function reseteazaStatisticiSortare() {
        pasiSortare = 0;
        comparatiiSortare = 0;
        swapuriSortare = 0;
        if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;
        if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
        if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
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
    
    function* partitionLomutoGenerator(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        yield { lista: [...arr], pivotIndex: high, partitieLow: low, partitieHigh: high, iIndex: i, msg: `Pivot: ${pivot}. Partiționez [${low}-${high}]`};

        for (let j = low; j < high; j++) {
            comparatiiSortare++;
            if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
            yield { lista: [...arr], pivotIndex: high, comparareIndex: j, iIndex: i, partitieLow: low, partitieHigh: high, msg: `Compar ${arr[j]} cu pivot ${pivot}`};
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swapuriSortare++;
                if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
                yield { lista: [...arr], swapIndex1: i, swapIndex2: j, pivotIndex: high, iIndex: i, partitieLow: low, partitieHigh: high, msg: `Swap ${arr[j]} cu ${arr[i]}` };
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swapuriSortare++;
        if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
        let pivotFinalIdx = i + 1;
        yield { lista: [...arr], pivotFinalIndex: pivotFinalIdx, partitieLow: low, partitieHigh: high, msg: `Pivot ${pivot} așezat la ${pivotFinalIdx}`};
        return pivotFinalIdx;
    }

    function* quickSortGenerator(initialArr) {
        let arr = [...initialArr]; // Lucrăm pe o copie
        let stack = [{ low: 0, high: arr.length - 1 }];
        let sortedIndices = [];

        while (stack.length > 0) {
            const { low, high } = stack.pop();
            pasiSortare++;
            if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;

            if (low < high) {
                let partitionGen = partitionLomutoGenerator(arr, low, high);
                let result;
                while (!(result = partitionGen.next()).done) {
                    yield { ...result.value, lista: [...arr], stackState: JSON.stringify(stack), sortedIndices: [...sortedIndices] };
                }
                let pi = result.value;
                if(!sortedIndices.includes(pi)) sortedIndices.push(pi);


                if (pi - 1 > low) {
                    stack.push({ low: low, high: pi - 1 });
                } else if (pi -1 >= low) { // 0 sau 1 element, e sortat
                     for(let k=low; k<=pi-1; k++) if(!sortedIndices.includes(k)) sortedIndices.push(k);
                }

                if (pi + 1 < high) {
                    stack.push({ low: pi + 1, high: high });
                } else if (pi + 1 <= high) {
                    for(let k=pi+1; k<=high; k++) if(!sortedIndices.includes(k)) sortedIndices.push(k);
                }
                 yield { lista: [...arr], msg: `Sub-partiții adăugate. Stivă: ${stack.length}`, stackState: JSON.stringify(stack), sortedIndices: [...sortedIndices]};
            } else if (low === high) { // Un singur element e sortat
                 if(!sortedIndices.includes(low)) sortedIndices.push(low);
            }
        }
        // Asigură că toate indecșii sunt marcați ca sortați la final
        sortedIndices = Array.from({length: arr.length}, (_, k) => k);
        yield { lista: [...arr], msg: "Sortare QuickSort finalizată!", sortedIndices };
        return arr;
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
        btnSorteazaEl.addEventListener('click', () => {
            if (!generatorSortareCurent) {
                listaCurentaSortare = parseInputList(inputListaSortareEl.value);
                if (listaCurentaSortare.length === 0) {
                    alert("Introduceți o listă validă de numere.");
                    return;
                }
                reseteazaStatisticiSortare();
                if (selectAlgoritmSortareEl.value === 'bubbleSort') {
                    generatorSortareCurent = bubbleSortGenerator(listaCurentaSortare);
                } else if (selectAlgoritmSortareEl.value === 'quickSort') {
                    generatorSortareCurent = quickSortGenerator(listaCurentaSortare); 
                }
                deseneazaListaSortare(listaCurentaSortare, {}); // Afișează starea inițială
            }

            const stareUrmatoare = generatorSortareCurent.next();
            if (!stareUrmatoare.done && stareUrmatoare.value) {
                if (stareUrmatoare.value.lista) {
                    listaCurentaSortare = [...stareUrmatoare.value.lista]; 
                }
                deseneazaListaSortare(stareUrmatoare.value.lista, stareUrmatoare.value); 
                console.log(stareUrmatoare.value.msg, "Detalii:", stareUrmatoare.value);
            } else {
                if(stareUrmatoare.value && stareUrmatoare.value.lista) {
                    deseneazaListaSortare(stareUrmatoare.value.lista, stareUrmatoare.value);
                } else if (listaCurentaSortare.length > 0) { // Desenăm ultima stare cunoscută dacă .value e gol
                    deseneazaListaSortare(listaCurentaSortare, { sortedIndices: Array.from({length: listaCurentaSortare.length}, (_, k) => k) });
                }
                alert( (stareUrmatoare.value && stareUrmatoare.value.msg) || "Sortare completă!");
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
            dcg += topKScoruri[i] / Math.log2(i + 1 + 1); // i+1 este poziția, i+1+1 = i+2 (log2(rank))
        }
        return dcg;
    }

    function idcgAtK(scoruriRelevantaIdealeSortate, k) {
        // Presupune că scoruriRelevantaIdealeSortate sunt cele mai bune scoruri posibile, sortate desc.
        return dcgAtK_standard(scoruriRelevantaIdealeSortate.slice(0,k), k);
    }
    
    function ndcgAtK(relevanti, returnati, k) {
        if (k <= 0 || returnati.length === 0) return 0;
        const scoruriReturnate = returnati.slice(0, k).map(item => relevanti.includes(item) ? 1 : 0);
        
        let scoruriIdeale = [];
        for(let i=0; i < Math.min(k, relevanti.length); i++) { // Cel mult k itemi relevanți (scor 1)
            scoruriIdeale.push(1);
        }
        while(scoruriIdeale.length < k && scoruriIdeale.length < scoruriReturnate.length ) { // Umplem cu 0 până la lungimea listei returnate (dar nu mai mult de k)
            scoruriIdeale.push(0);
        }
        if (scoruriIdeale.length > k) scoruriIdeale = scoruriIdeale.slice(0, k);


        const actualDcg = dcgAtK_standard(scoruriReturnate, k);
        const idealDcg = idcgAtK(scoruriIdeale, k); // IDCG se calculează pe scorurile ideale (deja sortate)

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
    }
    // --- Sfârșit Secțiune Calculator Metrici de Rankare ---

// --- Început Secțiune PageRank Universități ---
const btnRuleazaPageRankDemoEl = document.getElementById('btnRuleazaPageRankDemo');
const listaQSOriginalDemoEl = document.getElementById('listaQSOriginalDemo');
const listaPageRankDemoEl = document.getElementById('listaPageRankDemo');
const grafPageRankContainerEl = document.getElementById('grafPageRankContainer'); // Adaugă acest div în HTML

// Date Demo (poți adăuga mai multe sau le poți modifica)
// Presupunem că scorurile sunt deja normalizate între 0 și 1 pentru simplitate aici.
// Într-o aplicație reală, ai face normalizarea.
const universitatitDemoData = [
    { id: 'U1', nume: 'Universitatea Alfa', qs_rank: 5, ifr: 0.8, isr: 0.7, irn: 0.9, sus: 0.6 },
    { id: 'U2', nume: 'Universitatea Beta', qs_rank: 2, ifr: 0.9, isr: 0.85, irn: 0.7, sus: 0.75 },
    { id: 'U3', nume: 'Universitatea Gamma', qs_rank: 8, ifr: 0.6, isr: 0.65, irn: 0.5, sus: 0.55 },
    { id: 'U4', nume: 'Universitatea Delta', qs_rank: 3, ifr: 0.85, isr: 0.75, irn: 0.8, sus: 0.7 },
    { id: 'U5', nume: 'Universitatea Epsilon', qs_rank: 1, ifr: 0.95, isr: 0.9, irn: 0.92, sus: 0.8 }
];

function calculeazaScorCompozit(uni) {
    // Media aritmetică simplă a scorurilor normalizate
    return (uni.ifr + uni.isr + uni.irn + uni.sus) / 4;
}

// Funcție pentru construirea grafului de adiacență (cine votează pentru cine)
function construiesteGraf(universitatiCuScor) {
    const graf = {}; // Cheie: id_univ, Valoare: array de id_uri pentru care votează
    universitatiCuScor.forEach(u1 => {
        graf[u1.id] = { outLinks: [], pageRank: 1 / universitatiCuScor.length }; // Inițializare PageRank
        universitatiCuScor.forEach(u2 => {
            if (u1.id !== u2.id) {
                // U1 votează pentru U2 dacă scorul U1 < scorul U2 (votare inversă)
                if (u1.scorCompozit < u2.scorCompozit) {
                    if (!graf[u1.id].outLinks.includes(u2.id)) {
                        graf[u1.id].outLinks.push(u2.id);
                    }
                }
            }
        });
    });
    return graf;
}

// Funcție pentru calculul PageRank iterativ
function calculeazaPageRank(graf, universitatiIds, iteratii = 20, d = 0.85) {
    const N = universitatiIds.length;
    let pageRanks = {};
    universitatiIds.forEach(id => pageRanks[id] = 1 / N); // Inițializare

    for (let iter = 0; iter < iteratii; iter++) {
        const newPageRanks = {};
        let danglingSum = 0; // Suma PageRank-urilor nodurilor "dangling" (fără out-links)

        universitatiIds.forEach(id => {
            if (graf[id] && graf[id].outLinks.length === 0) {
                danglingSum += pageRanks[id];
            }
        });

        universitatiIds.forEach(pageId => {
            let newRank = (1 - d) / N;
            newRank += d * (danglingSum / N); // Distribuim PageRank-ul nodurilor dangling

            universitatiIds.forEach(linkerId => {
                if (graf[linkerId] && graf[linkerId].outLinks.includes(pageId)) {
                    newRank += d * (pageRanks[linkerId] / graf[linkerId].outLinks.length);
                }
            });
            newPageRanks[pageId] = newRank;
        });
        pageRanks = newPageRanks;
    }
    return pageRanks;
}
    // --- Sfârșit Secțiune PageRank Universități ---
    
});
