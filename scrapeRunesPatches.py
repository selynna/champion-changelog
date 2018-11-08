import requests
from bs4 import BeautifulSoup
import json

runes_reforged = ["Press the Attack", "Lethal Tempo", "Fleet Footwork", "Conqueror", "Overheal", "Triumph", "Presence of Mind", "Legend: Alacrity", "Legend: Tenacity", "Legend: Bloodline", "Coup de Grace", "Cut Down", "Last Stand", "Electrocute", "Predator", "Dark Harvest", "Hail of Blades", "Cheap Shot", "Taste of Blood", "Sudden Impact", "Zombie Ward", "Ghost Poro", "Eyeball Collection", "Ravenous Hunter", "Ingenious Hunter", "Relentless Hunter", "Ultimate Hunter", "Summon Aery", "Arcane Comet", "Phase Rush", "Nullifying Orb", "Manaflow Band", "Nimbus Cloak", "Transcendence", "Celerity", "Absolute Focus", "Scorch", "Waterwalking", "Gathering Storm", "Grasp of the Undying", "Aftershock", "Guardian", "Demolish", "Font of Life", "Bone Plating", "Conditioning", "Second Wind", "Chrysalis", "Overgrowth", "Revitalize", "Unflinching", "Glacial Augment", "Kleptomancy", "Unsealed Spellbook", "Hextech Flashtraption", "Magical Footwear", "Perfect Timing", "Future's Market", "Minion Dematerializer", "Biscuit Delivery", "Cosmic Insight", "Approach Velocty", "Time Warp Tonic"]

patch_notes = {"722": "7.22", "723": "7.23", "724":"7.24", "724b": "7.24b", "81":"8.1", "82":"8.2", "83":"8.3", "84":"8.4", "85":"8.5", "86":"8.6", "87":"8.7", "88":"8.8", "89": "8.9", "810":"8.10", "811":"8.11", "812":"8.12", "813":"8.13", "814":"8.14", "815":"8.15", "816":"8.16", "817":"8.17", "818":"8.18", "819":"8.19", "820":"8.20", "821":"8.21", "822":"8.22"}

url_base = "https://na.leagueoflegends.com/en/news/game-updates/patch/patch-%s-notes"

total = {}

for k,v in patch_notes.items():
  page = requests.get(url_base % k)

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
              print("hi")
              runes.append(currentRune)
              currentRune = {"name": rune.get_text()}
          else:
              print("bye")
              attrName = rune.select(".attribute")[0].get_text() #name of attribute
              currentRune[attrName] = rune.get_text()
      runes.append(currentRune)
    
  total[v] = runes

with open('runes.json', 'w') as outfile:
  json.dump(json.dumps(total), outfile, sort_keys=True, indent=4)
print(total)


exit()
