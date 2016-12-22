var paperFalling = function (el) {
    this.viewport = el;
    this.world = document.createElement('div');
    this.papers = [];
    this.options = {
        numPaper: 25
            /*edit so that the num paper is relative to the screen size*/
            //maybe add option for multiple document types
    };
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // animation helper
    this.timer = 0;
    this._resetPapers = function (paper) {
        // place paper towards the far right third of canvas
        paper.x = this.width / 2 + Math.random() * (this.width / 3);
        paper.y = -10; //so paper is not visible on spawn
        paper.z = Math.random() * 200; //set how far away the perspective/distance of paper can be
        // the paper can be anywhere initialy
        if (this.timer === 0) {
            paper.y = Math.random() * this.height;
        }
        // Choose axis of rotation.
        // If axis is not X, chose a random static x-rotation for greater variability
        paper.rotation.speed = Math.random() * 2;
        var randomAxis = Math.random();
        if (randomAxis > 0.5) {
            paper.rotation.axis = 'X';
        }
        else if (randomAxis > 0.25) {
            paper.rotation.axis = 'Y';
            paper.rotation.x = Math.random() * 150 + 90;
        }
        else {
            paper.rotation.axis = 'Z';
            paper.rotation.x = Math.random() * 360 - 180;
            // looks weird if the rotation is too fast around this axis
            paper.rotation.speed = Math.random() * 0.5 + 0.5;
        }
        // random speed
        //paper.xSpeedVariation = Math.random() * 1;
        paper.xSpeedVariation = 0;
        //adjust paper falling speed
        //paper.ySpeed = Math.random() + 0.5;
        paper.ySpeed = Math.random() * 0.5 + 0.8;
        return paper;
    };
    this._updatePaper = function (paper) {
        var xSpeed = paper.xSpeedVariation;
        paper.x -= xSpeed;
        paper.y += paper.ySpeed;
        paper.rotation.value += paper.rotation.speed;
        //css translations
        var t = 'translateX( ' + paper.x + 'px ) translateY( ' + paper.y + 'px ) translateZ( ' + paper.z + 'px )  rotate' + paper.rotation.axis + '( ' + paper.rotation.value + 'deg )';
        if (paper.rotation.axis !== 'X') {
            t += ' rotateX(' + paper.rotation.x + 'deg)';
        }
        paper.el.style.webkitTransform = t;
        paper.el.style.MozTransform = t;
        paper.el.style.oTransform = t;
        paper.el.style.transform = t;
        // reset if out of view
        if (paper.x < -10 || paper.y > this.height) {
            this._resetPapers(paper);
        }
    }
    this._updatePosition = function () {
        if (this.timer >= 0) {
            var screenHeight = this.height;
        }
    }
}
paperFalling.prototype.init = function () {
    for (var i = 0; i < this.options.numPaper; i++) {
        var paper = {
            el: document.createElement('div')
            , x: 0
            , y: 0
            , z: 0
            , rotation: {
                axis: 'X'
                , value: 0
                , speed: 0
                , x: 0
            }
            , xSpeedVariation: 0
            , ySpeed: 0
            , path: {
                type: 1
                , start: 0
            , }
            , image: 1
        };
        this._resetPapers(paper);
        this.papers.push(paper);
        this.world.appendChild(paper.el);
    }
    this.world.className = 'paper-scene';
    this.viewport.appendChild(this.world);
    // set perspective
    this.world.style.webkitPerspective = "400px";
    this.world.style.MozPerspective = "400px";
    this.world.style.oPerspective = "400px";
    this.world.style.perspective = "300px";
    // reset window height/width on resize
    var self = this;
    window.onresize = function (event) {
        self.width = self.viewport.offsetWidth;
        self.height = self.viewport.offsetHeight;
    };
}
paperFalling.prototype.render = function () {
        this._updatePosition();
        for (var i = 0; i < this.papers.length; i++) {
            this._updatePaper(this.papers[i]);
        }
        this.timer++;
        requestAnimationFrame(this.render.bind(this));
    }
    // start up leaf scene
var paperContainer = document.querySelector('.falling-papers')
    , papers = new paperFalling(paperContainer);
papers.init();
papers.render();