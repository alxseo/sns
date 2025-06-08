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

    function deseneazaListaSortare(lista, detaliiPas = {}) {
        if (!vizualizareContainerEl) return;
        vizualizareContainerEl.innerHTML = '';
        if (!lista || lista.length === 0) return;
        
        const maxVal = Math.max(...lista, 1);
        const { activ1, activ2, pivotIndex, comparareIndex, iIndex, swapIndex1, swapIndex2, pivotFinalIndex, partitieLow, partitieHigh, sortedIndices } = detaliiPas;

        lista.forEach((val, index) => {
            const bara = document.createElement('div');
            bara.style.height = `${(val / maxVal) * 90}%`;
            bara.style.width = `${Math.max(10, 100 / lista.length - 5)}px`;
            bara.style.backgroundColor = 'var(--pico-color-indigo-500, #79a2d8)';
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
                bara.style.backgroundColor = 'var(--pico-color-green-600, #43a047)';
            } else if (partitieLow !== undefined && index >= partitieLow && index <= partitieHigh) {
                bara.style.border = '1px dotted var(--pico-color-slate-400, #94a3b8)';
                if (index === pivotIndex) bara.style.backgroundColor = 'var(--pico-color-amber-500, #f59e0b)';
                else if (index === comparareIndex) bara.style.backgroundColor = 'var(--pico-color-orange-500, #f97316)';
                else if (index === iIndex) bara.style.outline = '2px solid var(--pico-color-yellow-400, #facc15)';
            }

            if (index === activ1 || index === activ2 || index === swapIndex1 || index === swapIndex2) {
                 bara.style.backgroundColor = 'var(--pico-color-red-600, #dc2626)';
            }
            if (index === pivotFinalIndex) {
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
        let sortedCount = 0; // Urmărește câte elemente sunt la locul lor final (la sfârșit)

        for (let i = 0; i < n - 1; i++) {
            swapped = false;
            for (let j = 0; j < n - 1 - i; j++) {
                comparatiiSortare++;
                if(nrComparatiiSortareEl) nrComparatiiSortareEl.textContent = comparatiiSortare;
                // Generează starea *înainte* de posibilul swap
                yield { lista: [...newArr], activ1: j, activ2: j + 1, sortedIndices: Array.from({length: sortedCount}, (_, k) => n - 1 - k), msg: `Compar ${newArr[j]} cu ${newArr[j+1]}` };

                if (newArr[j] > newArr[j + 1]) {
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                    swapped = true;
                    swapuriSortare++;
                    if(nrSwapuriSortareEl) nrSwapuriSortareEl.textContent = swapuriSortare;
                    // Generează starea *după* swap
                    yield { lista: [...newArr], activ1: j, activ2: j + 1, sortedIndices: Array.from({length: sortedCount}, (_, k) => n - 1 - k), msg: `Swap ${newArr[j+1]} cu ${newArr[j]}` };
                }
            }
            pasiSortare++;
            if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;
            sortedCount++; // Un element în plus este la locul lui corect
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
        yield { lista: [...arr], pivotFinalIndex: pivotFinalIdx, partitieLow: low, partitieHigh: high, sortedIndices: [...allSortedIndices, pivotFinalIdx], msg: `Pivot ${pivot} așezat la ${pivotFinalIdx}`};
        return pivotFinalIdx;
    }

    function* quickSortGenerator(initialArr) {
        let arr = [...initialArr]; 
        let stack = [{ low: 0, high: arr.length - 1 }];
        let sortedIndicesGlobally = []; // Ține evidența indecșilor sortați global

        while (stack.length > 0) {
            const { low, high } = stack.pop();
            pasiSortare++;
            if(nrPasiSortareEl) nrPasiSortareEl.textContent = pasiSortare;

            if (low < high) {
                let partitionGen = partitionLomutoGenerator(arr, low, high, [...sortedIndicesGlobally]);
                let result;
                while (!(result = partitionGen.next()).done) {
                    yield { ...result.value, lista: [...arr], stackState: JSON.stringify(stack) };
                }
                let pi = result.value;
                if(!sortedIndicesGlobally.includes(pi)) sortedIndicesGlobally.push(pi);

                // Adăugăm sub-array-urile la stivă
                // Stânga
                if (pi - 1 > low) {
                    stack.push({ low: low, high: pi - 1 });
                } else if (pi - 1 >= low) { 
                     for(let k=low; k<=pi-1; k++) if(!sortedIndicesGlobally.includes(k)) sortedIndicesGlobally.push(k);
                }
                // Dreapta
                if (pi + 1 < high) {
                    stack.push({ low: pi + 1, high: high });
                } else if (pi + 1 <= high) {
                    for(let k=pi+1; k<=high; k++) if(!sortedIndicesGlobally.includes(k)) sortedIndicesGlobally.push(k);
                }
                 yield { lista: [...arr], msg: `Sub-partiții adăugate. Stivă: ${stack.length}`, stackState: JSON.stringify(stack), sortedIndices: [...sortedIndicesGlobally]};
            } else if (low === high) { // Un singur element
                 if(!sortedIndicesGlobally.includes(low)) sortedIndicesGlobally.push(low);
                 yield { lista: [...arr], msg: `Element la ${low} considerat sortat.`, sortedIndices: [...sortedIndicesGlobally]};
            }
        }
        yield { lista: [...arr], msg: "Sortare QuickSort finalizată!", sortedIndices: Array.from({length: arr.length}, (_, k) => k) };
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
                // Primul pas pentru a afișa starea inițială și a porni generatorul
                if (generatorSortareCurent) {
                    const stareInitiala = generatorSortareCurent.next();
                    if (!stareInitiala.done && stareInitiala.value) {
                        if (stareInitiala.value.lista) listaCurentaSortare = [...stareInitiala.value.lista];
                        deseneazaListaSortare(stareInitiala.value.lista, stareInitiala.value);
                        console.log(stareInitiala.value.msg, "Detalii inițiale:", stareInitiala.value);
                    } else if (stareInitiala.done && stareInitiala.value && stareInitiala.value.lista) {
                        // Cazul în care sortarea se termină la primul pas (ex: listă deja sortată / goală)
                         deseneazaListaSortare(stareInitiala.value.lista, stareInitiala.value);
                         alert(stareInitiala.value.msg || "Sortare completă!");
                         btnSorteazaEl.disabled = true;
                         generatorSortareCurent = null;
                    }
                }
                return; // Așteaptă următorul click pentru pasul următor
            }

            // Pașii următori
            const stareUrmatoare = generatorSortareCurent.next();
            if (!stareUrmatoare.done && stareUrmatoare.value) {
                if (stareUrmatoare.value.lista) {
                    listaCurentaSortare = [...stareUrmatoare.value.lista]; 
                }
                deseneazaListaSortare(stareUrmatoare.value.lista, stareUrmatoare.value); 
                console.log(stareUrmatoare.value.msg, "Detalii pas:", stareUrmatoare.value);
            } else {
                if(stareUrmatoare.value && stareUrmatoare.value.lista) {
                    deseneazaListaSortare(stareUrmatoare.value.lista, stareUrmatoare.value);
                } else if (listaCurentaSortare.length > 0) { 
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
        let dcg = topKScoruri[0]; // Primul element nu are discount logaritmic (sau log2(1)=0, deci rel_1 / 1)
        for (let i = 1; i < topKScoruri.length; i++) {
            dcg += topKScoruri[i] / Math.log2(i + 1 + 1); // i+1 este poziția (rank), deci log2(rank+1)
        }
        return dcg;
    }

    function idcgAtK(scoruriRelevantaIdealeSortate, k) {
        // Presupune că scoruriRelevantaIdealeSortate sunt cele mai bune scoruri posibile, deja sortate desc.
        return dcgAtK_standard(scoruriRelevantaIdealeSortate.slice(0,k), k);
    }
    
    function ndcgAtK(relevanti, returnati, k) {
        if (k <= 0 || returnati.length === 0) return 0;
        const scoruriReturnate = returnati.slice(0, k).map(item => relevanti.includes(item) ? 1 : 0);
        
        let scoruriIdeale = [];
        for(let i=0; i < Math.min(k, relevanti.length); i++) {
            scoruriIdeale.push(1);
        }
        // Umplem cu 0 pentru a avea k elemente în IDCG dacă k > numărul de relevanți
        // și k <= lungimea listei returnate (sau a listei relevante, oricare e mai mică dintre k și lungimea listei returnate)
        const lungimePentruUmplere = Math.min(k, scoruriReturnate.length);
        while(scoruriIdeale.length < lungimePentruUmplere) { 
            scoruriIdeale.push(0);
        }
        // Asigură-te că `scoruriIdeale` nu e mai lung decât `scoruriReturnate` pentru o comparație corectă
        // sau că nu depășește k.
        if (scoruriIdeale.length > k) scoruriIdeale = scoruriIdeale.slice(0, k);


        const actualDcg = dcgAtK_standard(scoruriReturnate, k);
        const idealDcg = idcgAtK(scoruriIdeale, k);

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
    const grafPageRankContainerEl = document.getElementById('grafPageRankContainer');

    const universitatitDemoData = [
        { id: 'U1', nume: 'Universitatea Alfa', qs_rank: 5, ifr: 0.8, isr: 0.7, irn: 0.9, sus: 0.6 },
        { id: 'U2', nume: 'Universitatea Beta', qs_rank: 2, ifr: 0.9, isr: 0.85, irn: 0.7, sus: 0.75 },
        { id: 'U3', nume: 'Universitatea Gamma', qs_rank: 8, ifr: 0.6, isr: 0.65, irn: 0.5, sus: 0.55 },
        { id: 'U4', nume: 'Universitatea Delta', qs_rank: 3, ifr: 0.85, isr: 0.75, irn: 0.8, sus: 0.7 },
        { id: 'U5', nume: 'Universitatea Epsilon', qs_rank: 1, ifr: 0.95, isr: 0.9, irn: 0.92, sus: 0.8 },
        { id: 'U6', nume: 'Universitatea Zeta', qs_rank: 4, ifr: 0.7, isr: 0.72, irn: 0.75, sus: 0.68 },
        { id: 'U7', nume: 'Universitatea Eta', qs_rank: 7, ifr: 0.65, isr: 0.6, irn: 0.62, sus: 0.5 },
        { id: 'U8', nume: 'Universitatea Theta', qs_rank: 6, ifr: 0.75, isr: 0.68, irn: 0.70, sus: 0.61 }
    ];

    function calculeazaScorCompozit(uni) {
        return (uni.ifr + uni.isr + uni.irn + uni.sus) / 4;
    }

    function construiesteGraf(universitatiCuScor) {
        const graf = {};
        universitatiCuScor.forEach(u1 => {
            graf[u1.id] = { outLinks: [], inLinks: [] }; // Adăugăm și inLinks pentru calculul PageRank mai ușor
        });

        universitatiCuScor.forEach(u1 => {
            universitatiCuScor.forEach(u2 => {
                if (u1.id !== u2.id) {
                    if (u1.scorCompozit < u2.scorCompozit) { // U1 "votează" pentru U2
                        if (!graf[u1.id].outLinks.includes(u2.id)) {
                            graf[u1.id].outLinks.push(u2.id);
                        }
                        if (!graf[u2.id].inLinks.includes(u1.id)) {
                            graf[u2.id].inLinks.push(u1.id);
                        }
                    }
                }
            });
        });
        return graf;
    }

    function calculeazaPageRank(graf, universitatiIds, iteratii = 30, d = 0.85) {
        const N = universitatiIds.length;
        let pageRanks = {};
        universitatiIds.forEach(id => pageRanks[id] = 1 / N);

        for (let iter = 0; iter < iteratii; iter++) {
            const newPageRanks = {};
            let danglingSum = 0;
            universitatiIds.forEach(id => {
                if (graf[id] && graf[id].outLinks.length === 0) {
                    danglingSum += pageRanks[id];
                }
            });

            universitatiIds.forEach(pageId => {
                let newRank = (1 - d) / N; // Termenul de teleportare
                newRank += d * (danglingSum / N); // Distribuirea PR-ului de la nodurile dangling

                if (graf[pageId] && graf[pageId].inLinks) {
                    graf[pageId].inLinks.forEach(linkerId => {
                        if (graf[linkerId] && graf[linkerId].outLinks.length > 0) {
                             newRank += d * (pageRanks[linkerId] / graf[linkerId].outLinks.length);
                        }
                    });
                }
                newPageRanks[pageId] = newRank;
            });
             // Verificăm convergența (simplificat)
            let diff = 0;
            for(let id of universitatiIds) {
                diff += Math.abs(newPageRanks[id] - pageRanks[id]);
            }
            pageRanks = newPageRanks;
            if (diff < 0.00001 && iter > 5) break; // Condiție de oprire timpurie
        }
        return pageRanks;
    }

    function deseneazaGrafSimplu(graf, noduriData, container, pageRanks) {
        if (!container) return;
        container.innerHTML = '';
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "300px"); 
        svg.style.border = "1px solid var(--pico-color-slate-300, lightgray)";
        container.appendChild(svg);

        const pozitiiNoduri = {};
        const razaNod = 18;
        const latimeContainer = container.clientWidth || 300; // Fallback
        const inaltimeContainer = 300;

        noduriData.forEach((nod, index) => {
            const unghi = (index / noduriData.length) * 2 * Math.PI - Math.PI / 2; // Pornim de sus
            const razaCerc = Math.min(latimeContainer, inaltimeContainer) / 2 - 40;
            pozitiiNoduri[nod.id] = {
                x: latimeContainer / 2 + razaCerc * Math.cos(unghi),
                y: inaltimeContainer / 2 + razaCerc * Math.sin(unghi)
            };
        });

        const defs = document.createElementNS(svgNS, 'defs');
        const marker = document.createElementNS(svgNS, 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '9'); // Ajustat pentru a nu fi exact pe cerc
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        const polygon = document.createElementNS(svgNS, 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', 'var(--pico-color-slate-500, #64748b)');
        marker.appendChild(polygon);
        defs.appendChild(marker);
        svg.appendChild(defs);

        noduriData.forEach(nod => {
            if (graf[nod.id] && graf[nod.id].outLinks) {
                graf[nod.id].outLinks.forEach(targetId => {
                    if (pozitiiNoduri[nod.id] && pozitiiNoduri[targetId]) {
                        const sursa = pozitiiNoduri[nod.id];
                        const target = pozitiiNoduri[targetId];
                        const linie = document.createElementNS(svgNS, "line");
                        linie.setAttribute("x1", sursa.x);
                        linie.setAttribute("y1", sursa.y);
                        linie.setAttribute("x2", target.x);
                        linie.setAttribute("y2", target.y);
                        linie.setAttribute("stroke", "var(--pico-color-slate-400, #94a3b8)");
                        linie.setAttribute("stroke-width", "1.5");
                        linie.setAttribute("marker-end", "url(#arrowhead)");
                        svg.appendChild(linie);
                    }
                });
            }
        });

        noduriData.forEach(nod => {
            if (pozitiiNoduri[nod.id]) {
                const { x, y } = pozitiiNoduri[nod.id];
                const prScore = pageRanks[nod.id] || 0;
                const cerc = document.createElementNS(svgNS, "circle");
                cerc.setAttribute("cx", x);
                cerc.setAttribute("cy", y);
                cerc.setAttribute("r", razaNod + (prScore * 50)); // Dimensiune variabilă în funcție de PR
                cerc.setAttribute("fill", `rgba(76, 175, 80, ${0.5 + prScore * 5})`); // Opacitate/intensitate variabilă
                cerc.setAttribute("stroke", "var(--pico-color-green-700, #388e3c)");
                cerc.setAttribute("stroke-width", "1");
                svg.appendChild(cerc);

                const text = document.createElementNS(svgNS, "text");
                text.setAttribute("x", x);
                text.setAttribute("y", y + 4);
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("fill", "white");
                text.setAttribute("font-size", "9px");
                text.setAttribute("font-weight", "bold");
                text.textContent = nod.id;
                svg.appendChild(text);

                const textPR = document.createElementNS(svgNS, "text");
                textPR.setAttribute("x", x);
                textPR.setAttribute("y", y + razaNod + 12 + (prScore * 50)); // Sub cerc
                textPR.setAttribute("text-anchor", "middle");
                textPR.setAttribute("fill", "var(--pico-color-slate-700, #334155)");
                textPR.setAttribute("font-size", "9px");
                textPR.textContent = `PR:${prScore.toFixed(3)}`;
                svg.appendChild(textPR);
            }
        });
    }


    if (btnRuleazaPageRankDemoEl) {
        btnRuleazaPageRankDemoEl.addEventListener('click', () => {
            const universitatiCuScor = universitatitDemoData.map(uni => ({
                ...uni,
                scorCompozit: calculeazaScorCompozit(uni)
            }));

            if(listaQSOriginalDemoEl) {
                const qsSorted = [...universitatiCuScor].sort((a, b) => a.qs_rank - b.qs_rank);
                listaQSOriginalDemoEl.innerHTML = qsSorted.map(u => 
                    `<li>${u.qs_rank}. ${u.nume} (Sc.Comp: ${u.scorCompozit.toFixed(3)})</li>`
                ).join('');
            }

            const idsUniversitati = universitatiCuScor.map(u => u.id);
            const graf = construiesteGraf(universitatiCuScor);
            console.log("Graf PageRank Demo:", graf);

            const pageRanks = calculeazaPageRank(graf, idsUniversitati);
            console.log("PageRanks Demo:", pageRanks);

            const clasamentPageRank = universitatiCuScor.map(uni => ({
                ...uni,
                scorPR: pageRanks[uni.id] || 0
            })).sort((a, b) => b.scorPR - a.scorPR);

            if(listaPageRankDemoEl) {
                listaPageRankDemoEl.innerHTML = clasamentPageRank.map((u, index) => 
                    `<li>${index + 1}. ${u.nume} (PR: ${u.scorPR.toFixed(4)})</li>`
                ).join('');
            }

            if (grafPageRankContainerEl) {
                deseneazaGrafSimplu(graf, universitatiCuScor, grafPageRankContainerEl, pageRanks);
            }
        });
        // Rulăm o dată la încărcare pentru a popula listele
        btnRuleazaPageRankDemoEl.click(); 
    }
    // --- Sfârșit Secțiune PageRank Universități ---
    
});
