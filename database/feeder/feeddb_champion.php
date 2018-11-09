<?php
require_once('helper.php');

$ldb = new PDO('mysql:host=localhost;dbname=riotpatchnotes', 'root', '');

$cres = $ldb->prepare("
	SELECT *
	FROM champions
	WHERE name LIKE :name
");

$icres = $ldb->prepare("
	INSERT IGNORE INTO patch_champion_changes
	(patchId, championId, changes, overview)
	VALUES
	(:patchId, :championId, :changes, :overview)
");

$input = file_get_contents('champions.json');

$json = json_decode($input, true);

foreach($json as $patchId => $patch){
	foreach($patch as $patchEntry){
		$championName = $patchEntry['name'];
		$championName = strtolower($championName);
		$championName = str_replace(' ', '',$championName);
		$championName = str_replace('.', '',$championName);
		$championName = str_replace('\'', '',$championName);
		$championName = str_replace('wukong', 'monkeyking', $championName);
		$cres->bindParam('name', $championName);
		$cres->execute();
		$crow = $cres->fetch();
		if($crow === false){
			continue; // ignore champions with invalid names, they most likely are crawl errors
		}
		$championId = $crow['id'];

		$icres->bindParam('patchId', $patchId);
		$icres->bindParam('championId', $championId);
		$icres->bindValue('changes', json_encode($patchEntry['changes']));
		$icres->bindParam('overview', $patchEntry['overview']);
		$icres->execute();
	}
}

echo '<pre>';
print_r($json);
echo '</pre>';

?>