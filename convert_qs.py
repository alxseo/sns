# convert_qs.py
import pandas as pd
import json

# Citește file-ul Excel
df = pd.read_excel(
    'data/2025 QS World University Rankings 2.2 (For qs.com).xlsx',
    sheet_name=0
)

# Păstrează doar coloanele relevante și redenumește-le
df = df.rename(columns={
    'Rank': 'rank',
    'University name': 'university',
    'Overall score': 'score'
})[['rank', 'university', 'score']]

# Curăță rândurile lipsă
df = df.dropna(subset=['rank', 'university'])

# Exportă în JSON
records = df.to_dict(orient='records')
with open('data/qs_ranking.json', 'w', encoding='utf-8') as f:
    json.dump(records, f, ensure_ascii=False, indent=2)

print(f'Exported {len(records)} universități în data/qs_ranking.json')
