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

  
  // ================================
  // Cod minimal de test pentru Sortare
  // ================================

  // Reconectăm butonul de sortare pentru a porni din nou generatorul
  sortBtn.addEventListener('click', () => {
    // Dacă s-a introdus manual o listă, o folosim:
    if (inputEl.value.trim()) {
      arr = parseList(inputEl.value);
      stats = { pasi: 0, comp: 0, swap: 0 };
    }
    // Alegem generatorul potrivit
    generator = (algSel.value === 'quick' ? quick(arr) : bubble(arr));
    // Parcurgem pașii
    (function step() {
      const it = generator.next();
      if (!it.done) {
        draw(it.value);
        setTimeout(step, 200);
      }
    })();
  });
});
