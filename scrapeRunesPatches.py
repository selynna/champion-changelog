import requests
from bs4 import BeautifulSoup
import json

page = requests.get("https://na.leagueoflegends.com/en/news/game-updates/patch/patch-816-notes")

soup = BeautifulSoup(page.content, 'html.parser')
patches = soup.find_all('div',class_='white-stone accent-before')

runes = []
for patch in patches:
  if patch.find('h3'):
    name = patch.select('h3')[0].get_text()
    runeChanges = patch.select('.attribute-change,.change-detail-title')
    currentRune = {"name": name}
    for rune in runeChanges:
        if 'change-detail-title' in rune['class']:
            runes.append(currentRune)
            currentRune = {"name": rune.get_text()}
        else:
            attrName = rune.select(".attribute")[0].get_text() #name of attribute
            currentRune[attrName] = rune.get_text()
    
runeJsonData = json.dumps(runes)
with open('runes.json', 'w') as outfile:
  json.dump(runeJsonData, outfile, sort_keys=True, indent=4)
print(runeJsonData)
exit()
