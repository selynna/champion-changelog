import requests
from bs4 import BeautifulSoup
import json
import re
page = requests.get("https://na.leagueoflegends.com/en/news/game-updates/patch/patch-816-notes")
# print(page.content)
soup = BeautifulSoup(page.content, 'html.parser')
# print(soup.prettify())
patches = soup.find_all('div',class_='patch-change-block white-stone accent-before')
# for patch in patches:
#     if patch.value == value:
#         print "i found it!"
#         break
# else:
#     patch = None
name = patches[0].select('h3 a')[0].get_text()
overview = patches[0].select('.summary')[0].get_text()
abilityChanges = patches[0].select('.attribute-change,.change-detail-title')
abilities = []
currentAbility = {}
for ability in abilityChanges:
    if 'change-detail-title' in ability['class']:
        abilities.append(currentAbility)
        currentAbility = {"name": ability.get_text()}
    else:
        attrName = ability.select(".attribute")[0].get_text() #name of attribute
        currentAbility[attrName] = ability.get_text()

aatroxJsonData = json.dumps(abilities)
cleaned = re.sub(r"[-()\#/@;<>`+=~|.!?]", "", aatroxJsonData)
with open('aatrox.json', 'w') as outfile:
    json.dump(aatroxJsonData, outfile, sort_keys=True, indent=4)
print(cleaned)
print(name, overview)
exit()