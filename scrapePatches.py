import requests
from bs4 import BeautifulSoup
import json
import re

def removeSpecial(object):
    for key in object:
        object[key] = object[key].replace("\n","")

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
patchData = {"8.22": []}
for patch in patches:
    name = patch.select('h3 a')[0].get_text()
    overview = patch.select('.summary')[0].get_text()
    championData = {"name": name, "overview": overview}
    abilityChanges = list(patch.find('div').children)
    abilities = []
    currentAbility = {}
    for ability in abilityChanges:
        if ability=="\n":
            continue
        if 'change-detail-title' in ability['class']:
            print("hello")
            abilities.append(currentAbility)
            currentAbility = {"name": ability.get_text()}
        elif 'attribute-change' in ability['class']:
            print("goodbye")
            attrName = ability.select(".attribute")[0].get_text() #name of attribute
            if(len(ability.select(".attribute-removed"))!=0): # data was removed
                print(attrName)
                currentAbility[attrName] = ability.select(".attribute-removed")[0].get_text()
                continue
            if(len(ability.select(".attribute-after"))!=0): # data was removed
                print(attrName)
                currentAbility[attrName] = ability.select(".attribute-after")[0].get_text()
                continue
            currentAbility[attrName] = ability.select(".attribute-before")[0].get_text() + " => " + ability.select(".attribute-after")[0].get_text()
    abilities.append(currentAbility)
    removeSpecial(abilities[0])
    championData["changes"] = abilities[1:]
    patchData["8.22"].append(championData)
# cleaned = re.sub(r"[-()\#/@;<>`+=~|.!?]", "", aatroxJsonData)

with open('scrapedpatchdata.json', 'w') as outfile:
    json.dump(patchData, outfile, sort_keys=True, indent=4)
exit()