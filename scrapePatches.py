import requests
from bs4 import BeautifulSoup
import json
import re
import time

def removeSpecial(object):
    for key in object:
        object[key] = object[key].replace("\n","")
# for patch in patches:
#     if patch.value == value:
#         print "i found it!"
#         break
# else:
#     patch = None
allpatches = ["8.22","8.21","8.20","8.19","8.18","8.17","8.16","8.15","8.14","8.13"]
# allpatches = ["8.13"]
patchData = {}
def scrapeChampionData(patchNumber):
    page = requests.get("https://na.leagueoflegends.com/en/news/game-updates/patch/patch-"+patchNumber.replace(".","")+"-notes")
    # print(page.content)
    soup = BeautifulSoup(page.content, 'html.parser')
    # print(soup.prettify())
    patches = soup.find_all('div',class_='patch-change-block white-stone accent-before')
    patchData[patchNumber] = []
    for patch in patches:
        try:
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
                    abilities.append(currentAbility)
                    currentAbility = {"name": ability.get_text()}
                elif 'attribute-change' in ability['class']:
                    attrName = ability.select(".attribute")[0].get_text() #name of attribute
                    if(len(ability.select(".attribute-removed"))!=0): # data was removed
                        currentAbility[attrName] = {"removed": ability.select(".attribute-removed")[0].get_text()}
                        continue
                    if(len(ability.select(".attribute-after"))==0 and len(ability.select(".attribute-after"))!=0): # data was removed
                        currentAbility[attrName] = {"new": ability.select(".attribute-after")[0].get_text()}
                        continue
                    currentAbility[attrName] = {"before": ability.select(".attribute-before")[0].get_text(), "after": ability.select(".attribute-after")[0].get_text()}
            abilities.append(currentAbility)
            removeSpecial(abilities[0])
            championData["changes"] = abilities[1:]
            patchData[patchNumber].append(championData)
        except:
            continue
# cleaned = re.sub(r"[-()\#/@;<>`+=~|.!?]", "", aatroxJsonData)

for apatch in allpatches:
    scrapeChampionData(apatch)
    print("got data")

with open('scrapedpatchdata.json', 'w') as outfile:
    json.dump(patchData, outfile, sort_keys=True, indent=4)
exit()