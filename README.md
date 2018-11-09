# Champion Changelog

Champion Changelog is a patch TL;DR since you last played the champion.

## Public endpoint

Scraping patch data is difficult, so we made an endpoint to help others also use the patch data we scraped from the Riot PatchNotes. Our data goes from 7.22 (Runes Reforged) to 8.22 for Runes and 8.13 to 8.22 for champion data.

To use the endpoint, you can send an HTTP request to:

```
https://heabuh.com/leaguepatch/
```

with the proper endpoint URL. There are currently 3 endpoint URLS:

```
/getrunepatchchanges?patch_number=[PATCH NUMBER]
```

This endpoint will return all the rune changes for a particular patch number.

```
/getchampionpatchchanges?patch_number=[PATCH NUMBER]
```

This endpoint will return all the changes to champions for a particular patch number.

```
/getrelevantchanges?patch_number=[PATCH NUMBER]&champion=[CHAMP NAME]
```

This endpoint will return all the relevant changes (based on top 10 items and runes scraped from champion.gg which can be found in `info.json`) for a particular champion on a particular patch. This includes only runes and champion changes for now.

