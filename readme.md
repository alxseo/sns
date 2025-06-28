# SNS – Sorting & Ranking Demo

**Demo live:** https://alxseo.github.io/sns

Acest proiect este un **MVP** pentru demonstrarea comparării performanțelor algoritmilor de sortare clasici și a unui algoritm de rankare (PageRank adaptat) aplicat pe un subset de date (QS World University Rankings).

---

## Cuprins

1. [Descriere](#descriere)  
2. [Funcționalități](#funcționalități)  
3. [Structură proiect](#structură-proiect)  
4. [Instalare & rulare locală](#instalare--rulare-locală)  
5. [Utilizare](#utilizare)  
6. [Dependențe](#dependețe)  
7. [Roadmap & contribuții](#roadmap--contribuții)  
8. [Licență](#licență)  

---

## Descriere

Acest demo permite:

- **Vizualizarea comparativă** a timpilor de execuție pentru Bubble Sort vs. QuickSort, generată din cod Python (`comparison_plot.py`) și afișată dinamic ca imagine PNG servită de Flask :contentReference[oaicite:7]{index=7}.  
- **Demonstrarea PageRank-ului adaptat** pe subsetul de universități din QS Rankings, cu parametri configurabili în interfața web și rezultate afișate în clasamente suﬂet HTML :contentReference[oaicite:8]{index=8}.  

---

## Funcționalități

- **Grafice de sortare**  
  - Matplotlib + Seaborn  
  - Linia de timp Bubble vs QuickSort  
- **Demo PageRank**  
  - Încarcă `data/qs_ranking.json` (generat din Excel cu `convert_qs.py`)  
  - Parametri configurabili: factor de amortizare, număr iterări, putere link-uri, prag link-uri, criteriu link-uri :contentReference[oaicite:9]{index=9}  
  - Clasament original QS vs. PageRank adaptat  
- **Vizualizator de sortare interactiv**  
  - HTML/CSS/JS pachetat în `index.html`, `style.css`, `script.js`  
  - Permite generarea listei și rularea vizuală a Bubble, QuickSort etc.

---

## Structură proiect

sns/
├── data/
│ ├── world_rankings.csv # date brute QS CSV
│ └── qs_ranking.json # rezultate JSON generate (convert_qs.py)
├── comparison_plot.py # generează grafic Bubble vs QuickSort
├── convert_qs.py # parsează Excel QS → JSON
├── server.py # API Flask + static ﬁles + endpoint grafic
├── index.html # interfața web demo
├── style.css # stilizare MVP
└── script.js # logica front-end

---

## Instalare & rulare locală

1. **Clonează repo-ul**  
```bash
   git clone https://github.com/alxseo/sns.git
   cd sns
```
2. **Creează un mediu virtual** (opțional, dar recomandat)
```bash
python3 -m venv env
source env/bin/activate
```
3. Instalează dependențele
```bash
pip install flask matplotlib seaborn pandas openpyxl
```
4. Generează JSON-ul QS
- Pune fișierul Excel `world_rankings.xlsx` în `data/`
- Rulează:
```bash
python3 convert_qs.py
```
5. **Pornește serverul**
```bash
python3 server.py
```
Accesează `http://localhost:5000` în browser.

---
## Utilizare

1. **Pagina principală**
    - Interfață demo PageRank
    - Setează **Număr Universități**, **Scor Minim QS** și parametri PageRank
    - Apasă **Rulează Demo PageRank** și compară topurile.
2. **Vizualizator 1 – Sortare**
    - Introdu listă personalizată sau generează aleator
    - Alege algoritm (Bubble, QuickSort) și rulează
    - Urmărește **pași**, **comparări** și **swap-uri** în timp real.
3. **Vizualizator 2 – Grafic static**
    - Accesează endpoint `/comparison_plot.png` pentru a vedea graficul generat de Flask.


---
## Dependențe

- **Python 3.7+**
- Flask
- Matplotlib
- Seaborn
- Pandas
- Openpyxl (pentru convert_qs.py)
- Browser modern (Chrome/Firefox)

_Developed by Diaconu George Alexandru – Lucrare de Licență 2025_