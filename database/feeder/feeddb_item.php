<?php
require_once('helper.php');

$ldb = new PDO('mysql:host=localhost;dbname=riotpatchnotes', 'root', '');

$ires = $ldb->prepare("
	SELECT *
	FROM items
	WHERE name LIKE :name
");

$iires = $ldb->prepare("
	INSERT IGNORE INTO patch_item_changes
	(patchId, itemId, changes, overview)
	VALUES
	(:patchId, :itemId, :changes, :overview)
");

$input = file_get_contents('items.json');

$json = json_decode($input, true);

foreach($json as $patch){
	$patchId = $patch['version_num'];
	foreach($patch['items'] as $item){
		$itemName = $item['item_name'];
		$ires->bindParam('name', $itemName);
		$ires->execute();
		$irow = $ires->fetch();
		if($irow === false){
			echo 'invalid item name. ignoring item: '.$itemName.'<br>';
			continue; // ignore items with invalid names, they most likely are crawl errors
		}
		$itemId = $irow['id'];
		
		$iires->bindParam('patchId', $patchId);
		$iires->bindParam('itemId', $itemId);
		$iires->bindValue('changes', json_encode($item));
		$iires->bindParam('overview', $item['summary']);
		$iires->execute();
	}
}

echo '<pre>';
print_r($json);
echo '</pre>';

?>