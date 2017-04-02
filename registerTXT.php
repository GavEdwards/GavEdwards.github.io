
<html>
<body>

Thanks, <?php echo $_POST["firstname"]; ?><?php echo $_POST["lastname"]; ?>
<br />
We'll get back to you at <?php echo $_POST["email"];?>
<br />

 <?php
$file = 'data.txt';

// Open the file to get existing content
$current = file_get_contents($file);

// Append a new person to the data
$current .= "John Smith\n";

// Write the contents back to the file
file_put_contents($file, $current);
echo "$file  </br>";
echo "$current <br/>";
?>
 <?php
$dir = 'myDir';

if(!file_exists($dir)) {
	$oldmask=umask(0);
	mkdir($dir,0744);
}

file_put_contents($dir.'/test.txt','Hello File');
?>

<?php
$handle = fopen("data.txt", "r");
while (($buffer = fgets($handle, 4096)) !== false) {
echo "<p> $buffer <br /></p>";
}
fclose($handle);

$filedata = file_get_contents('./data.txt');
echo $filedata;

$handle = fopen("myDir/test.txt", "r");
while (($buffer = fgets($handle, 4096)) !== false) {
echo "<p> $buffer <br /></p>";
}
fclose($handle);

$filedata = file_get_contents('myDir/test.txt');
echo $filedata;
?>


</body>
</html>
