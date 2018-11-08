import requests, bs4, sys, re, json

ATTRIBUTE_TAGS = ['new', 'removed', 'updated']
LIST_OF_ATTRIBUTES = ['attribute', 'attribute-before', 'attribute-after', 'attribute-removed']

def create_page_soup(version):
    #Requests the Champion.gg page of the desired champion
    page = requests.get('https://na.leagueoflegends.com/en/news/game-updates/patch/patch-' + re.sub('[.]', '', version) + '-notes')

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

    # Iterate through item divs
    for div in items_header.next_siblings:
        if div.name == 'p':
            break
        if div.name == 'div' and div['class'][0] == 'content-border':
            new_item = {}
            new_item['item_name'] = div.select('h3')[0].text.encode('ascii','ignore')
            try:
                new_item['summary'] = div.select('p')[0].text.encode('ascii','ignore')
            except Exception:
                continue
    
            # iterate to find attributes
            attributes_list = []
            attribute_changes = div.find_all('div', {'class':['attribute-change', 'class2']})
            for each_change in attribute_changes:
                new_attribute = {}

                # Create 3 fields of attributes
                #import pdb; pdb.set_trace()
                for class_name in LIST_OF_ATTRIBUTES:
                    sub_class_name = ''
                    try:
                        name = each_change.find('span', class_=class_name).text.encode('ascii','ignore')
                        # Grab the name of the tag (either 'new', 'removed', or 'updated')
                        try:
                            sub_class_name = each_change.find('span', {'class': ATTRIBUTE_TAGS}).text.encode('ascii','ignore')
                        except Exception:
                            pass

                        new_attribute['attribute-type'] = sub_class_name
                        new_attribute[class_name] = name[len(sub_class_name if class_name == 'attribute' else ''):]

                    except Exception:
                        continue
                attributes_list.append(new_attribute)
            
            new_item['attributes'] = attributes_list

            items_list.append(new_item)

    return items_list


def write_to_json(items_list):
    with open('scraped_items_data.json', 'w') as outfile:
        json.dump(items_list, outfile, sort_keys=True, indent=4)


def main():
    versions = ['8.22', '8.21', '8.20', '8.19', '8.18', '8.17', '8.16', '8.15', '8.14', '8.13']
    all_items = []
    for v in versions:
        page_soup = create_page_soup(v)
        items_header = find_items(page_soup)

        if items_header is None:
            items = []
        else:
            items = get_items(items_header)
        
        new_version_entry = {}
        new_version_entry['version_num'] = v
        new_version_entry['items'] = items
        all_items.append(new_version_entry)

    write_to_json(all_items)


if __name__ == '__main__':
    main()
