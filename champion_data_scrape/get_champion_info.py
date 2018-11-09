import requests, bs4, sys, re

CHAMPION_LIST = ['Aatrox','Ahri','Akali','Alistar','Amumu','Anivia','Annie','Ashe','AurelionSol','Azir','Bard','Blitzcrank','Brand','Braum','Caitlyn','Camille','Cassiopeia','ChoGath','Corki','Darius','Diana','DrMundo','Draven','Ekko','Elise','Evelynn','Ezreal','Fiddlesticks','Fiora','Fizz','Galio','Gangplank','Garen','Gnar','Gragas','Graves','Hecarim','Heimerdinger','Illaoi','Irelia','Ivern','Janna','JarvanIV','Jax','Jayce','Jhin','Jinx','KaiSa','Kalista','Karma','Karthus','Kassadin','Katarina','Kayle','Kayn','Kennen','KhaZix','Kindred','Kled','KogMaw','LeBlanc','LeeSin','Leona','Lissandra','Lucian','Lulu','Lux','Malphite','Malzahar','Maokai','MasterYi','MissFortune','Mordekaiser','Morgana','Nami','Nasus','Nautilus','Nidalee','Nocturne','Nunu','Olaf','Orianna','Ornn','Pantheon','Poppy','Pyke','Quinn','Rakan','Rammus','RekSai','Renekton','Rengar','Riven','Rumble','Ryze','Sejuani','Shaco','Shen','Shyvana','Singed','Sion','Sivir','Skarner','Sona','Soraka','Swain','Syndra','TahmKench','Taliyah','Talon','Taric','Teemo','Thresh','Tristana','Trundle','Tryndamere','Twisted Fate','Twitch','Udyr','Urgot','Varus','Vayne','Veigar','VelKoz','Vi','Viktor','Vladimir','Volibear','Warwick','Wukong','Xayah','Xerath','Xin Zhao','Yasuo','Yorick','Zac','Zed','Ziggs','Zilean','Zoe','Zyra']


def create_page_soup(champion):
    #Requests the Champion.gg page of the desired champion
    page = requests.get('https://champion.gg/champion/' + champion)
    pos = 0

    #Checks the page status and raises an exception in case of an error e.g. 404
    try:
        page.raise_for_status()
    except Exception as exc:
        print 'There was an error fetching champion data.\nMake sure you pass a valid champion name.'
        sys.exit(1)

    #Creates Beautiful Soup object using the champion page
    return bs4.BeautifulSoup(page.text, 'lxml')



# Prep for runes
def create_rune_list(page_soup):
    rune_list = []

    #Extracts and prints keystones from page_soup
    #print colored('Keystone: ', 'cyan', attrs=['bold'])
    regex = re.compile('.*Description__Title*')
    elements = page_soup.find_all('div', {'class' : regex})
    for i in elements:
        rune_list.append(i.text)

    return list(set(rune_list))


def create_item_list(page_soup):
    # Prep for Items
    item_list = []

    #Extracts and prints starter items from page_soup
    #print colored('Starting items: ', 'cyan', attrs=['bold'])
    elements = page_soup.find('div', {'class' : 'col-xs-12 col-sm-12 col-md-5'})
    elements = elements.find_all('div', {'class' : 'build-wrapper'})
    for items in elements:
        for item in items.find_all('a'):
            item_name = re.sub(r'.+\/', '', item['href'])
            #print '\t' + item_name
            item_list.append(item_name)

    #Extracts and prints core build from page_soup
    #print colored('Core build (in order of purchase):', 'cyan', attrs=['bold'])
    elements = page_soup.find('div', {'class' : 'col-xs-12 col-sm-12 col-md-7'})
    elements = elements.find_all('div', {'class' : 'build-wrapper'})
    for items in elements:
        for item in items.find_all('a'):
            item_name = re.sub(r'.+\/', '', item['href'])
            #print '\t' + item_name
            item_list.append(item_name)

    return list(set(item_list))


def main():
    final_list = []
    
    for champion in CHAMPION_LIST:
        print champion
        champion_entry = {}
        page_soup = create_page_soup(champion)
        
        champion_entry['name'] = champion
        champion_entry['runes'] = create_rune_list(page_soup)
        champion_entry['items'] = create_item_list(page_soup)
        
        final_list.append(champion_entry)

    print final_list

    print len(final_list)

if __name__ == '__main__':
    main()
