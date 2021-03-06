
$(document).ready(function() {

    // FOR NAME

    //GENERALLY, for HEADER, if there is hover, css style changes applied
    function hoverChange() {
        $("a.front, span.back").css("color", "#3d3d57")
                                .css("font-size", "50px")
                                .css("text-shadow", "-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white");
        $("span.back").css("top", "-1px").css("left", "2px");
    }

    //removes all applied attributes when unhovered
    function hoverRevert() {
        $("a.front, span.back").removeAttr("style")
    }


    $("h2.logo-name, h2.logo-name a, span.back").mouseover(hoverChange).mouseout(hoverRevert);


    //STICK NAVBAR
    $(window).scroll(function(){
       if ($(this).scrollTop() > 100) {
           $(".nav-container").addClass("sticky")
       } else {
           $(".nav-container").removeClass("sticky")
       }
    });


    // FOR NAVIGATION OPTIONS
    $("div.highlights-intro, a#intro-sel").mouseover(function () {
        $("div.highlights-intro").css("width", "40px");
    }).mouseout(function () {
        $("div.highlights-intro").css("width", "0");
    });


    $("div.highlights-about-us, a#about-sel").mouseover(function () {
        $("div.highlights-about-us").css("width", "46px");
    }).mouseout(function () {
        $("div.highlights-about-us").css("width", "0");
    });


    $("div.highlights-xp, a#xp-sel").mouseover(function () {
        $("div.highlights-xp").css("width", "60px");
    }).mouseout(function () {
        $("div.highlights-xp").css("width", "0");
    });


    $("div.highlights-survey, a#survey-sel").mouseover(function () {
        $("div.highlights-survey").css("width", "100px");
    }).mouseout(function () {
        $("div.highlights-survey").css("width", "0");
    });
});


// INTRO

//Typing Carousel -> javascript
let TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000; // turns string to int
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

///prototype allows to add properties into object (functions)
//deletes one letter per iteration
TxtRotate.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    // loopRepeat % length of array => gives remainder that goes from lowest -> len(array) forever.
    //ie. 0/10 = R0 -> 0th item of list
    //    34/10 = R4 -> 4th item of list

    let fullTxt = this.toRotate[i];

    //substring to display certain parts of text. Not all (typing effect)
    //if the text is deleting, (For display, treat string as an array for display)
    if (this.isDeleting) {
        if (fullTxt === "Leader<" && this.txt.length >= 3){
            this.txt = fullTxt.substring(0, this.txt.length -1);
        }else {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }
    //if the text is adding
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // adds span tag to div.txt-rotate
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';


    let that = this;
    //randomizer between each LETTER (looks like "natural" typing")
    let delta = 250 - Math.random() * 100;

    if (this.isDeleting) { delta /= 3; }

    // When text is fully typed out and if .js is still trying to type more,
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;   //deleting mode
    //Or when text is empty and if .js is still in deleting phase,
    } else if (this.isDeleting && this.txt === '' || this.isDeleting && this.txt === 'Lea' && fullTxt === "Leader<") {
        this.isDeleting = false; //typing mode
        this.loopNum++;
        if (fullTxt === "Leader<"){
            delta = 1500;
        } else {
            delta = 500;
        }

    } //when done, increments the loopNum and restarts

    setTimeout(function() {
        that.tick();
    }, delta);
    //loops after specified timeout
};

window.onload = function() {
    let elements = document.getElementsByClassName('txt-rotate');
    for (let i=0; i<elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-rotate');  //takes "array" from html
        let period = elements[i].getAttribute('data-period');   //takes period from html
        console.log(period, toRotate);
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period); // runs func
            // JSON.parse() takes the "text" from html file and turns it into readable javascript
        }
    }
    // add make style  into html
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}


