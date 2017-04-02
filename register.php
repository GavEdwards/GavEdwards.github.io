
<html>
<body>

Thanks, <?php echo $_POST["firstname"]; ?><?php echo $_POST["lastname"]; ?>
<br />
We'll get back to you at <?php echo $_POST["email"];?>
<br />

 <?php
$list = array (
array('aaa', 'bbb', 'ccc', 'dddd'),
array('123', '456', '789'),
array('"aaa"', '"bbb"')
);
chmod("data.csv", 755);   // decimal; probably incorrect
chmod("data.csv", "u+rwx,go+rx"); // string; incorrect
chmod("data.csv", 0755);  // octal; correct value of mode

$fp = fopen('data.csv', 'w');

foreach ($list as $fields) {
fputcsv($fp, $fields);
}
fclose($fp);

?>


<?php
$row = 1;
if (($handle = fopen("data.csv", "r")) !== FALSE) {
	while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
		$num = count($data);
		echo "<p> $num fields in line $row: <br /></p>\n";
		$row++;
		for ($c=0; $c < $num; $c++) {
			echo $data[$c] . "<br />\n";
		}
	}
	fclose($handle);
}
?>



</body>
</html>
