<!DOCTYPE html>
<html>
<?php
// define variables and set to empty values
$firstnameErr = $lastnameErr = $DOBErr = $emailErr  = "";
$firstname = $lastname = $DOB = $company = $email = "";
$confirmed=false;
//$firstname = $_POST["firstname"];
//$lastname = $_POST["lastname"];
//$DOB = $_POST["DOB"];
//$email = $_POST["email"];


if ( isset( $_POST['submit'] ) ) { 
  if (empty($_POST["firstname"])) {
    $firstnameErr = "Firstname is required";
  } else {
      $firstname = $_POST["firstname"];
	if(!preg_match("/^[a-zA-Z'-]+$/",$firstname)) {
  $firstnameErr = "Invalid firstname"; 
}
	
	
  }

  if (empty($_POST["lastname"])) {
    $lastnameErr = "Lastname is required";
  } else {
  $lastname = $_POST["lastname"];
	if(!preg_match("/^[a-zA-Z'-]+$/",$lastname)) {
  $lastnameErr = "Invalid lastname"; 
}
	
	
  }

  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } else {
 $email = $_POST["email"];
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  $emailErr = "Invalid email format"; 
}
	
  }

  if (empty($_POST["DOB"])) {
    $DOBErr = "Date of Birth is required";
  } else {
	  
	  $DOB = $_POST["DOB"];

	$date1 = new DateTime();
	$date1->format('d-m-Y');

   $date2=new DateTime($DOB);

   $interval = $date1->diff($date2);

   $myage= $interval->y; 

  if ($myage >= 18){ 
     } 
  else{ 
     $DOBErr = "You need to be over 18 to sign-up";}


	}
  
  
  $anyErr = false;
  if($firstnameErr!=null) $anyErr=true;
   if($lastnameErr!=null) $anyErr=true;
  if($DOBErr!=null) $anyErr=true;
  if($emailErr!=null) $anyErr=true;

	//$overallErr = $firstnameErr+ $lastnameErr + $DOBErr + $emailErr;
	//print ($overallErr);
  if($anyErr==false){
	  
	  
	  
$fp = fopen('data.csv', 'a');

$list = array (
array($_POST["firstname"], $_POST["lastname"], $_POST["DOB"],$_POST["email"])

);

foreach ($list as $fields) {
fputcsv($fp, $fields);
}
fclose($fp);


/* TESTING IT SAVES TO CSV CODE
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
}*/


	 $confirmed = true;
  }
  

}

?>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Contact</title>
        <meta name="description" content="How to contact Ascot Business Solutions">
        <link rel="stylesheet" href="WebsiteCSS.css">
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
        <script type="text/javascript" src="WebsiteScript.js" defer></script>
    </head>

    <body>
        <div id="nav-bar">
            <div class="nav-logo"><img src="images/Ascot-logo-tran.png" width=100 height=40></div> <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
            <div id="nav-items">
                <div class="nav-left">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="features.html">Features</a></li>
                        <li><a href="cloud.html">Cloud</a></li>
                        <li><a href="AboutUs.html">About Us</a></li>
                        <li><a href="Purchase.html">Purchase</a></li>
                        <li><a href="contact.php">Contact</a></li>
                    </ul>
                </div>
                <div class="nav-right">
                    <ul>
                        <li id="setPref"> <i class="fa fa-cog fa-2x" aria-hidden="true"></i>
                            <ul class="options">
                                <li>
                                    <form id="font-size" class="option" action="setText()">
                                        <label for="font-options">Font Size</label>
                                        <select name="font-options">
                                            <option value="0.9em">Small</option>
                                            <option value="1em">Normal</option>
                                            <option value="1.1em">Large</option>
                                            <option value="1.2em">Extra Large</option>
                                        </select>
                                    </form>
                                </li>
                                <li>
                                    <form id="header-color" class="option" action="setHeader()">
                                        <label for="header-color">Header Colour</label>
                                        <input name="header-color" type="color"> </form>
                                </li>
                                <li>
                                    <button id="resetColour" onclick="resetColour()">Reset Colour</button>
                                </li>
                            </ul>
                        </li>
                        <li><a class="twitter-logo social" href=""><i class="fa fa-twitter fa-2x" aria-hidden="true"></i></a></li>
                        <li> <a class="facebook-logo social" href=""><i class="fa fa-facebook-square fa-2x" aria-hidden="true"></i></a></li>
                        <li><a class="youtube-logo social" href=""><i class="fa fa-youtube fa-2x" aria-hidden="true"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="header-wrap">
            <div class="header"> </div>
        </div>
        <div id="content-wrap">
            <div class="header-content">
                <div class="header-left">
                    <h1>Get in touch</h1>
                    <h2>How to contact us here at Ascot Business Solutions</h2> <img class="logo" src="images/Ascot-Logo.jpg"> </div>
                <!-- Contact-->
                <div class="header-right">
                    <div class="contact-us contact-form">
                        <h3>Join our Mailing List</h3>
                        <form class="form" id="contact-form" action="" <?php echo htmlspecialchars($_SERVER[ "PHP_SELF"]);?>"" method="POST">
                            <p class="first-name">
                                <input name="firstname" type="text" placeholder="First Name" id="first-name" />
                                <?php echo $firstnameErr;?>
                            </p>
                            <p class="last-name">
                                <input name="lastname" type="text" placeholder="Last Name" id="last-name" />
                                <?php echo $lastnameErr;?>
                            </p>
                            <p class="DOB">
                                <input name="DOB" type="date" placeholder="Date Of Birth dd-mm-yyyy" id="DOB" />
                                <?php echo $DOBErr;?>
                            </p>
                            <p class="email">
                                <input name="email" type="text" placeholder="Email Address" id="email" />
                                <?php echo $emailErr;?>
                            </p>
                            <input type='submit' name='submit' value='Submit' /> </form>
                    </div>
                </div>
                <!-- END MAILING LIST -->
            </div>
            <div id="content-info">
                <div class="content-1 content">
                    <div class="content-width-wrap">
                        <h3>Contact Information</h3>
                        <br>
                        <p>info@ascot-solutions.co.uk | 0845 351 0570</p>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d154322.76489384467!2d-2.086617999999983!3d52.817079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487a723435972e1b%3A0x86ddebdaa6898039!2sAscot+Business+Solutions+Ltd!5e0!3m2!1sen!2suk!4v1416825576789" width="100%" height="350" frameborder="0" style="border:0; margin-top:20px;"> </iframe>
                    </div>
                </div>
            </div>
        </div>
        <!--POP UP HTML-->
        <div id="pop-up">
            <div class="popup-content">
                <div class="popup-header"> <span class="close">×</span>
                    <h3>Thank you for joining the mailing list</h3> </div>
                <div class="popup-body">
                    <div class="popup-bodywrap">
                        <p>We'll get back to you with the latest FileDirector information and offers</p>
                        <br> Your Information:
                        <br /> Firstname:
                        <?php echo $_POST["firstname"]; ?>
                            <br /> Lastname:
                            <?php echo $_POST["lastname"]; ?>
                                <br /> We'll get back to you at
                                <?php echo $_POST["email"];?>
                                    <br />
                                    <br>
                                    <p>If you'd like to find out about other ways to manage your documents please visit</p>
                    </div>
                </div>
                <div class="popup-footer">
                    <h4>Document Management Software Specialists</h4> </div>
            </div>
        </div>
        <?php 
		if($confirmed==true){
	echo '<script type="text/javascript" defer>',
     'var popup = document.getElementById("pop-up");
	 var close = document.getElementsByClassName("close")[0];

	 popup.style.display = "block";
	 close.onclick = function () {
        popup.style.display = "none";
    } 
	window.onclick = function (event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
	 ',
     '</script>';
		}
	
	
	?>
            <!-- END POP UP -->
    </body>

</html>