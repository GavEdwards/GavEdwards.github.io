	window.requestAnimFrame = function () {
	    return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */ callback) {
	        window.setTimeout(callback, 1000 / 60);
	    });
	}();
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var W = window.innerWidth
	    , H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
	var particle_count = 20
	    , particles = []
	    , couleurs = ["#2ecc71", "#3498db", "#f1c40f", "#e74c3c"];

	function Particle() {
	    this.radius = Math.round((Math.random() * 2) + 2);
	    this.x = Math.floor((Math.random() * canvas.width / 2) + this.radius);
	    this.y = Math.floor((Math.random() * canvas.height / 2) + this.radius);
	    this.color = '#ffffff'; //couleurs[Math.round(Math.random()*couleurs.length)];
	    this.speedx = Math.round((Math.random() * 201) + 0) / 100;
	    this.speedy = Math.round((Math.random() * 201) + 0) / 100;
	    switch (Math.round(Math.random() * couleurs.length)) {
	    case 1:
	        this.speedx *= 1;
	        this.speedy *= 1;
	        break;
	    case 2:
	        this.speedx *= -1;
	        this.speedy *= 1;
	        break;
	    case 3:
	        this.speedx *= 1;
	        this.speedy *= -1;
	        break;
	    case 4:
	        this.speedx *= -1;
	        this.speedy *= -1;
	        break;
	    }
	    this.move = function () {
	        context.beginPath();
	        context.globalCompositeOperation = 'source-over';
	        context.fillStyle = this.color;
	        context.globalAlpha = 1;
	        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
	        context.fill();
	        context.closePath();
	        this.x = this.x + this.speedx;
	        this.y = this.y + this.speedy;
	        if (this.x <= 0 + this.radius) {
	            this.speedx *= -1;
	        }
	        if (this.x >= canvas.width - this.radius) {
	            this.speedx *= -1;
	        }
	        if (this.y <= 0 + this.radius) {
	            this.speedy *= -1;
	        }
	        if (this.y >= canvas.height - this.radius) {
	            this.speedy *= -1;
	        }
	        for (var j = 0; j < particle_count; j++) {
	            var particleActuelle = particles[j]
	                , yd = particleActuelle.y - this.y
	                , xd = particleActuelle.x - this.x
	                , d = Math.sqrt(xd * xd + yd * yd);
	            if (d < 200) {
	                context.beginPath();
	                context.globalAlpha = (200 - d) / (200 - 0);
	                context.globalCompositeOperation = 'destination-over';
	                context.lineWidth = 1;
	                context.moveTo(this.x, this.y);
	                context.lineTo(particleActuelle.x, particleActuelle.y);
	                context.strokeStyle = this.color;
	                context.lineCap = "round";
	                context.stroke();
	                context.closePath();
	            }
	        }
	    };
	};
	for (var i = 0; i < particle_count; i++) {
	    var particle = new Particle();
	    particles.push(particle);
	}

	function animate() {
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    for (var i = 0; i < particle_count; i++) {
	        particles[i].move();
	    }
	    requestAnimFrame(animate);
	}
	animate();
	
	
var c = document.getElementById("logocanvas");
var ctx = c.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
c.width = W;

var b = 0;
var inc = true;
var interval = setInterval(ani,50);
function ani(){
  var grd =        ctx.createLinearGradient(0,0,W,0);
grd.addColorStop(0, "white");
grd.addColorStop(1,"white");
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0,0,c.width,c.height);
  ctx.fillStyle="#0166b7"
  ctx.save();
  ctx.translate(50,0);
  ctx.rotate(50*Math.PI/180);
  ctx.fillRect(290-b,-290+b,8,40);
  ctx.fillRect(290-b,-258+b,40,8);
  ctx.restore();
  
    ctx.save();
    ctx.translate(40,15);
  ctx.rotate(50*Math.PI/180);
  ctx.fillStyle="#0166b7"
  ctx.fillRect(290+b,-280-b,40,8);

  ctx.fillRect(322+b,-273-b,8,32);
  ctx.restore();


  if(b>100){
    inc = false;
    console.log("FALSE");
    clearInterval(interval);
  } else {
    
    if(b<1){
    inc=true;
          console.log("TRUE");

    }
  }
  
  if(inc==true){
    b++;
  } 
  if(inc==false){
    b--;
  }
}