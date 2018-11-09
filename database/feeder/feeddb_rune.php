<?php
require_once('helper.php');

$ldb = new PDO('mysql:host=localhost;dbname=riotpatchnotes', 'root', '');

$irres = $ldb->prepare("
	INSERT IGNORE INTO patch_rune_changes
	(patchId, runeId, changes)
	VALUES
	(:patchId, :runeId, :changes)
");

$input = file_get_contents('runes.json');

$json = json_decode($input, true);

foreach($json as $patchId => $patch){
	foreach($patch as $patchEntry){
		$runeId = getRuneIdFromName($patchEntry['name']);
		if($runeId === false){
			echo "oh no: <br>";
			print_r($patchEntry);
			continue; // ignore runes with invalid names, they most likely are crawl errors
		}
		
		$irres->bindParam('patchId', $patchId);
		$irres->bindParam('runeId', $runeId);
		$irres->bindValue('changes', json_encode($patchEntry));
		$irres->execute();
	}
}

echo '<pre>';
print_r($json);
echo '</pre>';

?>