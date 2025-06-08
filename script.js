document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('inputListaSortare');
  const randEl   = document.getElementById('dimensiuneListaRandom');
  const genBtn   = document.getElementById('btnGenereazaLista');
  const sortBtn  = document.getElementById('btnSorteaza');
  const algSel   = document.getElementById('selectAlgoritmSortare');
  const vizCont  = document.getElementById('vizualizareSortareContainer');
  const pasiEl   = document.getElementById('nrPasiSortare');
  const compEl   = document.getElementById('nrComparatiiSortare');
  const swapEl   = document.getElementById('nrSwapuriSortare');

  let arr = [], gen = null, stats = { pasi:0, comp:0, swap:0 };

  function parseList(str) {
    return str
      .split(',')
      .map(s => parseInt(s.trim(),10))
      .filter(n => !isNaN(n));
  }

  function draw(a, info={}) {
    vizCont.innerHTML = '';
    if (!a.length) return;
    const mx = Math.max(...a);
    a.forEach((v,i) => {
      const bar = document.createElement('div');
      bar.textContent = v;
      bar.style.height = `${(v/mx)*100}%`;
      // culori
      if (info.i === i || info.j === i) {
        bar.style.background = '#dc2626'; // roșu
      } else if (info.sorted && info.sorted.includes(i)) {
        bar.style.background = '#43a047'; // verde
      } else {
        bar.style.background = '#2563eb'; // albastru
      }
      vizCont.appendChild(bar);
    });
    pasiEl.textContent = stats.pasi;
    compEl.textContent = stats.comp;
    swapEl.textContent = stats.swap;
  }

  function* bubble(a) {
    let n = a.length;
    let b = [...a];
    for (let i=0; i<n-1; i++) {
      for (let j=0; j<n-1-i; j++) {
        stats.comp++;
        yield { array:b, i, j, sorted: Array.from({length:i},(_,k)=>k) };
        if (b[j]>b[j+1]) {
          [b[j],b[j+1]]=[b[j+1],b[j]];
          stats.swap++;
          yield { array:b, i, j, sorted: Array.from({length:i},(_,k)=>k) };
        }
      }
      stats.pasi++;
    }
    yield { array:b, sorted: Array.from({length:n},(_,k)=>k) };
  }

  function* quick(a) {
    let b=[...a], stack=[0,a.length-1];
    function* part(l,h) {
      const p=b[h], idx=l;
      for (let j=l; j<h; j++) {
        stats.comp++;
        yield { array:b, i:l, j, pivot:h };
        if(b[j]<p) {
          [b[l],b[j]]=[b[j],b[l]];
          stats.swap++;
          yield { array:b, i:l, j, pivot:h };
          l++;
        }
      }
      [b[l],b[h]]=[b[h],b[l]];
      stats.swap++;
      yield { array:b, pivot:l };
      return l;
    }
    while(stack.length){
      const h=stack.pop(), l=stack.pop();
      if(l<h){
        let pg=part(l,h), res;
        while(!(res=pg.next()).done) yield res.value;
        const idx=res.value;
        stats.pasi++;
        if(idx+1<h){ stack.push(idx+1,h); }
        if(l<idx-1){ stack.push(l,idx-1); }
      }
    }
    yield { array:b, sorted: Array.from({length:a.length},(_,k)=>k) };
  }

  genBtn.addEventListener('click', ()=>{
    const n = parseInt(randEl.value,10);
    arr = Array.from({length: Math.max(2,n)}, ()=>Math.ceil(Math.random()*100));
    stats={pasi:0,comp:0,swap:0};
    draw(arr);
  });

  sortBtn.addEventListener('click', ()=>{
    if (inputEl.value.trim()) {
      arr = parseList(inputEl.value);
      stats={pasi:0,comp:0,swap:0};
    }
    const alg = algSel.value;
    gen = (alg==='quick'? quick(arr) : bubble(arr));
    function pas() {
      const it = gen.next();
      if (!it.done) {
        draw(it.value);
        setTimeout(pas, 200);
      }
    }
    pas();
  });

  // inițial
  genBtn.click();
});
