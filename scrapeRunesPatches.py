import requests
from bs4 import BeautifulSoup
import json
page = requests.get("https://na.leagueoflegends.com/en/news/game-updates/patch/patch-816-notes")
# print(page.content)
soup = BeautifulSoup(page.content, 'html.parser')
# print(soup.prettify())
patches = soup.find_all('div',class_='white-stone accent-before')
# for patch in patches:
#     if patch.value == value:
#         print "i found it!"
#         break
# else:
#     patch = None
name = patches[0].select('h3')[0].get_text()
overview = patches[0].select('.summary')[0].get_text()
runeChanges = patches[0].select('.attribute-change,.change-detail-title')
runes = []
currentRune = {}
for rune in runeChanges:
    if 'change-detail-title' in rune['class']:
        runes.append(currentRune)
        currentRune = {"name": rune.get_text()}
    else:
        attrName = rune.select(".attribute")[0].get_text() #name of attribute
        #currentRune[attrName] = rune.get_text().replace(/\\n/g, '')

aatroxJsonData = json.dumps(runes)
with open('aatrox.json', 'w') as outfile:
    json.dump(aatroxJsonData, outfile, sort_keys=True, indent=4)
print(aatroxJsonData)
print(name, overview)
exit()
