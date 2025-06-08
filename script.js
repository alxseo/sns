// script.js
document.addEventListener('DOMContentLoaded', () => {
  // ==== Secțiunea Sortare ====
  const inputEl    = document.getElementById('inputListaSortare');
  const randEl     = document.getElementById('dimensiuneListaRandom');
  const genBtn     = document.getElementById('btnGenereazaLista');
  const sortBtn    = document.getElementById('btnSorteaza');
  const algSel     = document.getElementById('selectAlgoritmSortare');
  const vizCont    = document.getElementById('vizualizareSortareContainer');
  const pasiEl     = document.getElementById('nrPasiSortare');
  const compEl     = document.getElementById('nrComparatiiSortare');
  const swapEl     = document.getElementById('nrSwapuriSortare');

  let arr         = [];
  let sortGen     = null;
  let stats       = { pasi: 0, comp: 0, swap: 0 };

  function parseList(str) {
    return str
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));
  }

  function drawSort(state = {}) {
    const a = state.array || arr;
    vizCont.innerHTML = '';
    if (!a.length) return;
    const mx = Math.max(...a);
    a.forEach((v, i) => {
      const bar = document.createElement('div');
      bar.textContent = v;
      bar.style.height = `${(v/mx)*100}%`;
      if (i === state.i || i === state.j) {
        bar.style.background = '#dc2626';
      } else if (state.sorted && state.sorted.includes(i)) {
        bar.style.background = '#43a047';
      } else {
        bar.style.background = '#2563eb';
      }
      vizCont.appendChild(bar);
    });
    pasiEl.textContent = stats.pasi;
    compEl.textContent = stats.comp;
    swapEl.textContent = stats.swap;
  }

  function* bubble(a) {
    const b = [...a];
    const n = b.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        stats.comp++;
        yield { array: b, i, j, sorted: [...Array(i).keys()] };
        if (b[j] > b[j+1]) {
          [b[j], b[j+1]] = [b[j+1], b[j]];
          stats.swap++;
          yield { array: b, i, j, sorted: [...Array(i).keys()] };
        }
      }
      stats.pasi++;
    }
    yield { array: b, sorted: [...Array(n).keys()] };
  }

  function* quick(a) {
    const b = [...a];
    const stack = [0, b.length - 1];

    function* partition(l, h) {
      const pivot = b[h];
      let i = l;
      for (let j = l; j < h; j++) {
        stats.comp++;
        yield { array: b, i, j, pivot: h };
        if (b[j] < pivot) {
          [b[i], b[j]] = [b[j], b[i]];
          stats.swap++;
          yield { array: b, i, j, pivot: h };
          i++;
        }
      }
      [b[i], b[h]] = [b[h], b[i]];
      stats.swap++;
      yield { array: b, pivot: i };
      return i;
    }

    while (stack.length) {
      const h = stack.pop();
      const l = stack.pop();
      if (l < h) {
        const partGen = partition(l, h);
        let res;
        while (!(res = partGen.next()).done) {
          yield res.value;
        }
        const p = res.value;
        stats.pasi++;
        if (p + 1 < h) stack.push(p+1, h);
        if (l < p - 1) stack.push(l, p-1);
      }
    }
    yield { array: b, sorted: [...Array(a.length).keys()] };
  }

  genBtn.addEventListener('click', () => {
    const n = parseInt(randEl.value, 10) || 10;
    arr = Array.from({ length: n }, () => Math.ceil(Math.random() * 100));
    stats = { pasi: 0, comp: 0, swap: 0 };
    drawSort({ array: arr });
  });

  sortBtn.addEventListener('click', () => {
    if (inputEl.value.trim()) {
      arr = parseList(inputEl.value);
      stats = { pasi: 0, comp: 0, swap: 0 };
    }
    sortGen = (algSel.value === 'quick' ? quick(arr) : bubble(arr));
    (function step() {
      const it = sortGen.next();
      if (!it.done) {
        drawSort(it.value);
        setTimeout(step, 200);
      }
    })();
  });

  // inițial
  genBtn.click();

  // ==== Secțiunea PageRank ====
  const inpGraph   = document.getElementById('inputGraph');
  const inpDamp    = document.getElementById('inputDamp');
  const inpIter    = document.getElementById('inputIter');
  const btnPR      = document.getElementById('btnPRank');
  const outPR      = document.getElementById('outputPRank');

  btnPR.addEventListener('click', () => {
    const lines = inpGraph.value.split('\n').map(l => l.trim()).filter(l => l);
    const G = {};
    lines.forEach(l => {
      const [u, v] = l.split(',').map(s => s.trim());
      if (!u || !v) return;
      G[u] = G[u] || { out: [] };
      G[v] = G[v] || { out: [] };
      G[u].out.push(v);
    });
    const nodes = Object.keys(G);
    const N = nodes.length;
    let R = Object.fromEntries(nodes.map(n => [n, 1/N]));
    const d = parseFloat(inpDamp.value) || 0.85;
    const iters = parseInt(inpIter.value, 10) || 10;

    for (let k = 0; k < iters; k++) {
      const Rn = Object.fromEntries(nodes.map(n => [n, (1-d)/N]));
      nodes.forEach(u => {
        const out = G[u].out;
        const share = R[u] / (out.length || N);
        if (out.length) {
          out.forEach(v => Rn[v] += d*share);
        } else {
          nodes.forEach(v => Rn[v] += d*share);
        }
      });
      R = Rn;
    }

    const rows = nodes
      .sort((a, b) => R[b] - R[a])
      .map(n => `<tr><td>${n}</td><td>${R[n].toFixed(6)}</td></tr>`)
      .join('');
    outPR.innerHTML = `
      <table>
        <thead><tr><th>Nod</th><th>PageRank</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  });

  // ==== Secțiunea QS 2025 ====
  fetch('data/qs_ranking.json')
    .then(r => r.json())
    .then(data => {
      const top20 = data.sort((a, b) => a.rank - b.rank).slice(0, 20);
      const margin = { top: 20, right: 20, bottom: 40, left: 200 };
      const width  = 800 - margin.left - margin.right;
      const height = 500 - margin.top  - margin.bottom;

      const svg = d3.select('#chartQS')
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top  + margin.bottom)
        .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain([0, d3.max(top20, d => d.score)])
        .range([0, width]);

      const y = d3.scaleBand()
        .domain(top20.map(d => d.university))
        .range([0, height])
        .padding(0.1);

      svg.selectAll('rect')
        .data(top20)
        .join('rect')
          .attr('y', d => y(d.university))
          .attr('height', y.bandwidth())
          .attr('width',  d => x(d.score))
          .attr('fill',   '#2563eb');

      svg.append('g')
         .call(d3.axisLeft(y).tickSize(0))
         .selectAll('text')
           .style('font-size','0.9rem');

      svg.append('g')
         .attr('transform', `translate(0,${height})`)
         .call(d3.axisBottom(x))
         .selectAll('text')
           .style('font-size','0.8rem');
    })
    .catch(console.error);

});
