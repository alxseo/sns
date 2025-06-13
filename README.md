# Algoritmi de Sortare și Ierarhizare – Demo Web

Această aplicație web interactivă face parte din lucrarea de licență  
“Algoritmi de Sortare și Ierarhizare: De la metode clasice la optimizări bazate pe inteligență artificială”  
Universitatea Internațională Danubius, 2025  
Autor: Diaconu George-Alexandru  
Coordonator: Conf. Univ. Dr. Ing. Adrian Beteringhe  

---
## Funcționalități

1. **Vizualizator algoritmi de sortare**  
   - Bubble Sort, QuickSort, Insertion Sort, Selection Sort, Merge Sort  
   - Animație pas-cu-pas, statistici în timp real (pași, comparații, swap-uri)  
   - Afișaj complexitate și explicație  
2. **Calculator metrici de rankare**  
   - Precision@k, Mean Average Precision (MAP), NDCG@k  
   - Input manual de liste de itemi relevanți și returnați  
3. **Demo PageRank adaptat pentru universități**  
   - Date reale QS World University Rankings 2024–25  
   - Construire interactivă a grafului de „voturi inverse”  
   - Parametrizare: damping factor, criteriu link, prag, iterări  
   - Afișare clasament QS vs PageRank și grafic SVG al rețelei  
4. **Grafic comparativ al timpilor de sortare**  
   - Backend Python + Matplotlib / Seaborn  
   - Imagine servită din Flask la `/comparison_plot.png`  

---
## Structura proiectului

sns/
├── data/
│ ├── Algoritmi de sortare și rankare.pdf # PDF-ul lucrării de licență
│ ├── 2025 QS World University Rankings.xlsx # fișier raw Excel
│ ├── qs_ranking.json # date JSON pentru demo PageRank
│ └── mvp.css # stiluri suplimentare (neutilizate)
├── convert_qs.py # script Python: Excel → JSON
├── comparison_plot.py # script Python pentru grafic static
├── server.py # micro-serviciu Flask
├── index.html # interfață web principală
├── style.css # stilizare aplicație
├── script.js # logica front-end (sorting, metrici, PageRank)
├── qs_ranking.json # date generate / preprocesate
└── requirements.txt # (opțional) listă dependențe Python

---
## Instalare

1. Clonați repo și intrați în director:
   ```bash
   git clone <repo-url>
   cd sns
   ```

2. Configurați un mediu virtual și instalați dependențele:
   ```bash
   python3 -m venv venv
   source venv/bin/activate      # pe Windows: venv\Scripts\activate
   pip install Flask matplotlib seaborn pandas openpyxl
   # sau, dacă există, pip install -r requirements.txt
   ```

3. (Opțional) Reconvertește datele QS din Excel în JSON:
   ```bash
   python convert_qs.py \
     "data/2025 QS World University Rankings 2.2 (For qs.com).xlsx" \
     data/qs_ranking.json
   ```

---
## Utilizare

1. **Lansați serverul**  
   ```bash
   python server.py
   ```
   Accesați în browser: `http://127.0.0.1:5000/`

2. **Vizualizator algoritmi de sortare**  
   - Selectați sau generați o listă  
   - Alegeți algoritmul, reglați viteza și butonați “Pornește Sortarea”  

3. **Calculator metrici**  
   - Introduceți liste comă-separate de ID-uri pentru relevanți și returnați  
   - Specificați valoarea K, apăsați “Calculează Metrici”  

4. **Demo PageRank universități**  
   - Filtrați după scor minim și țară  
   - Ajustați damping factor, criteriu link, prag, iterări  
   - Apăsați “Rulează Demo PageRank” și urmăriți graficul și listele QS vs PageRank  

5. **Grafic comparativ**  
   - Secțiunea “Comparare Timp de Execuție” afișează imaginea generată automat  

---
## Recomandări și extensii

- Înlocuiți valorile fictive IFR/ISR/IRN/SUS cu date reale normalizate  
- Publicați live (Heroku, PythonAnywhere, Netlify etc.)  
- Documentați codul complet în Anexe sau Jupyter Notebook  
- Adăugați un fișier `README.md` și un `LICENSE` (MIT, Apache, etc.)  

---
## Autor și Contact

- **Diaconu George-Alexandru**  
- E-mail: alex28diaconu@gmail.com  
- Universitatea Internațională Danubius, Galați  
- Coordonator: Conf. Univ. Dr. Ing. Adrian Beteringhe  
