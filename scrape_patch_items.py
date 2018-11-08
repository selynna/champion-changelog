import requests, bs4, sys, re

def create_page_soup():
    #Requests the Champion.gg page of the desired champion
    page = requests.get('https://na.leagueoflegends.com/en/news/game-updates/patch/patch-821-notes')

    #Checks the page status and raises an exception in case of an error e.g. 404
    try:
        page.raise_for_status()
    except Exception as exc:
        print 'There was an error fetching champion data.\nMake sure you pass a valid champion name.'
        sys.exit(1)

    #Creates Beautiful Soup object using the champion page
    return bs4.BeautifulSoup(page.text, 'lxml')


def find_items(page_soup):
    header_list = page_soup.find_all('header', class_='header-primary')
    # Find items by iterating through headers and looking for "Items"
    for header in header_list:
        header_name = header.select('h2')[0].text.encode('ascii','ignore')
        if header_name == 'Items':
            return header
    return


def get_items(items_header):
    items_list = []
    LIST_OF_ATTRIBUTES = ['attribute', 'attribute-before', 'attribute-after']

    # Iterate through item divs
    for div in items_header.next_siblings:
        if div.name == 'p':
            break
        print div.name
        if div.name == 'div' and div['class'][0] == 'content-border':
            new_item = {}
            new_item['item_name'] = div.select('h3')[0].text.encode('ascii','ignore')
            new_item['summary'] = div.select('p')[0].text.encode('ascii','ignore')

            # iterate to find attributes
            attributes_list = []
            attribute_changes = div.find_all('div', {'class' : 'attribute-change'})
            for each_change in attribute_changes:
                new_attribute = {}

                # Create 3 fields of attributes
                for class_name in LIST_OF_ATTRIBUTES:
                    new_attribute[class_name] = each_change.find('span', class_=class_name).text.encode('ascii','ignore')
                attributes_list.append(new_attribute)
            
            new_item['attributes'] = attributes_list

            items_list.append(new_item)
    import pdb; pdb.set_trace()
    print "hello"


def main():
    page_soup = create_page_soup()
    items_header = find_items(page_soup)
    items = get_items(items_header)
    print items_header


if __name__ == '__main__':
    main()
