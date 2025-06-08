document.addEventListener('DOMContentLoaded', () => {
  // ==== Secțiunea Sortare ====
  const inputEl = document.getElementById('inputListaSortare');
  const randEl   = document.getElementById('dimensiuneListaRandom');
  const genBtn   = document.getElementById('btnGenereazaLista');
  const sortBtn  = document.getElementById('btnSorteaza');
  const algSel   = document.getElementById('selectAlgoritmSortare');
  const vizCont  = document.getElementById('vizualizareSortareContainer');
  const pasiEl   = document.getElementById('nrPasiSortare');
  const compEl   = document.getElementById('nrComparatiiSortare');
  const swapEl   = document.getElementById('nrSwapuriSortare');

  let arr = [], gen = null, stats = { pasi: 0, comp: 0, swap: 0 };

  function parseList(str) {
    return str
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));
  }

  function draw(a, info = {}) {
    vizCont.innerHTML = '';
    if (!a.length) return;
    const mx = Math.max(...a);
    a.forEach((v, i) => {
      const bar = document.createElement('div');
      bar.textContent = v;
      bar.style.height = `${(v/mx)*100}%`;
      if (i === info.i || i === info.j) {
        bar.style.background = '#dc2626';
      } else if (info.sorted && info.sorted.includes(i)) {
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
    let b = [...a], n = b.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        stats.comp++;
        yield { array: b, i, j, sorted: [...Array(i).keys()] };
        if (b[j] > b[j + 1]) {
          [b[j], b[j + 1]] = [b[j + 1], b[j]];
          stats.swap++;
          yield { array: b, i, j, sorted: [...Array(i).keys()] };
        }
      }
      stats.pasi++;
    }
    yield { array: b, sorted: [...Array(n).keys()] };
  }

  function* quick(a) {
    let b = [...a], stack = [0, a.length - 1];

    function* part(l, h) {
      const pivot = b[h];
      for (let j = l; j < h; j++) {
        stats.comp++;
        yield { array: b, i: l, j, pivot: h };
        if (b[j] < pivot) {
          [b[l], b[j]] = [b[j], b[l]];
          stats.swap++;
          yield { array: b, i: l, j, pivot: h };
          l++;
        }
      }
      [b[l], b[h]] = [b[h], b[l]];
      stats.swap++;
      yield { array: b, pivot: l };
      return l;
    }

    while (stack.length) {
      const h = stack.pop(), l = stack.pop();
      if (l < h) {
        const pg = part(l, h);
        let res;
        while (!(res = pg.next()).done) yield res.value;
        const pi = res.value;
        stats.pasi++;
        if (pi + 1 < h) stack.push(pi + 1, h);
        if (l < pi - 1) stack.push(l, pi - 1);
      }
    }
    yield { array: b, sorted: [...Array(a.length).keys()] };
  }

  genBtn.addEventListener('click', () => {
    const n = parseInt(randEl.value, 10) || 10;
    arr = Array.from({ length: n }, () => Math.ceil(Math.random() * 100));
    stats = { pasi: 0, comp: 0, swap: 0 };
    draw(arr);
  });

  sortBtn.addEventListener('click', () => {
    if (inputEl.value.trim()) {
      arr = parseList(inputEl.value);
      stats = { pasi: 0, comp: 0, swap: 0 };
    }
    gen = (algSel.value === 'quick' ? quick(arr) : bubble(arr));
    (function step() {
      const it = gen.next();
      if (!it.done) {
        draw(it.value);
        setTimeout(step, 200);
      }
    })();
  });

  // Inițial
  genBtn.click();


  // ==== Secțiunea PageRank ====
  const inpGraph = document.getElementById('inputGraph');
  const inpDamp  = document.getElementById('inputDamp');
  const inpIter  = document.getElementById('inputIter');
  const btnPR    = document.getElementById('btnPRank');
  const outPR    = document.getElementById('outputPRank');

  btnPR.addEventListener('click', () => {
    // Parse graf
    const lines = inpGraph.value.split('\n').map(l => l.trim()).filter(l => l);
    const G = {};
    lines.forEach(l => {
      const [u, v] = l.split(',').map(s => s.trim());
      if (!u || !v) return;
      G[u] = G[u] || { outLinks: [] };
      G[v] = G[v] || { outLinks: [] };
      G[u].outLinks.push(v);
    });

    function pageRank(graph, d, iterations) {
      const nodes = Object.keys(graph);
      const N = nodes.length;
      let R = Object.fromEntries(nodes.map(n => [n, 1/N]));
      for (let it = 0; it < iterations; it++) {
        const Rn = Object.fromEntries(nodes.map(n => [n, (1-d)/N]));
        nodes.forEach(u => {
          const out = graph[u].outLinks;
          const share = R[u] / (out.length || N);
          if (out.length) {
            out.forEach(v => Rn[v] += d * share);
          } else {
            nodes.forEach(v => Rn[v] += d * share);
          }
        });
        R = Rn;
      }
      return R;
    }

    const d = parseFloat(inpDamp.value) || 0.85;
    const iters = parseInt(inpIter.value, 10) || 10;
    const ranks = pageRank(G, d, iters);

    // Afișare tabel
    const rows = Object.entries(ranks)
      .sort((a, b) => b[1] - a[1])
      .map(([node, val]) =>
        `<tr><td>${node}</td><td>${val.toFixed(6)}</td></tr>`
      ).join('');
    outPR.innerHTML = `
      <table>
        <thead><tr><th>Nod</th><th>PageRank</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>`;
  });


  // ==== Studiu de Caz QS 2025 ====
  fetch('data/qs_ranking.json')
    .then(res => res.json())
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
    .catch(err => console.error(err));
});
