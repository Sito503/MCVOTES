createSortable("#list");

function createSortable(selector) {
  var sortable = document.querySelector(selector);
  Draggable.create(sortable.children, {
    type: "y",
    bounds: sortable,
    edgeResistance: 1,
    onPress: sortablePress,
    onDragStart: sortableDragStart,
    onDrag: sortableDrag,
    liveSnap: sortableSnap,
    onDragEnd: sortableDragEnd
  });
}

function sortablePress() {
  var t = this.target,
    i = 0,
    child = t;
  while ((child = child.previousSibling)) if (child.nodeType === 1) i++;
  t.currentIndex = i;
  t.currentHeight = t.offsetHeight;
  t.kids = [].slice.call(t.parentNode.children); // convert to array
}

function sortableDragStart() {
  TweenLite.set(this.target, { color: "#0E8AD9" });
}

function sortableDrag() {
  var t = this.target,
    elements = t.kids.slice(), // clone
    indexChange = Math.round(this.y / t.currentHeight),
    bound1 = t.currentIndex,
    bound2 = bound1 + indexChange;
  if (bound1 < bound2) {
    // moved down
    TweenLite.to(elements.splice(bound1 + 1, bound2 - bound1), 0.15, {
      yPercent: -100
    });
    TweenLite.to(elements, 0.15, { yPercent: 0 });
  } else if (bound1 === bound2) {
    elements.splice(bound1, 1);
    TweenLite.to(elements, 0.15, { yPercent: 0 });
  } else {
    // moved up
    TweenLite.to(elements.splice(bound2, bound1 - bound2), 0.15, {
      yPercent: 100
    });
    TweenLite.to(elements, 0.15, { yPercent: 0 });
  }
}

function sortableSnap(y) {
  var h = this.target.currentHeight;
  return Math.round(y / h) * h;
}

function sortableDragEnd() {
  var t = this.target,
    max = t.kids.length - 1,
    newIndex = Math.round(this.y / t.currentHeight);
  newIndex += (newIndex < 0 ? -1 : 0) + t.currentIndex;
  if (newIndex === max) {
    t.parentNode.appendChild(t);
  } else {
    t.parentNode.insertBefore(t, t.kids[newIndex + 1]);
  }
  TweenLite.set(t.kids, { yPercent: 0, overwrite: "all" });
  TweenLite.set(t, { y: 0, color: "" });
}

$(document).ready(function() {
  $(".buddy").on("swiperight", function() {
    $(this)
      .addClass("rotate-left")
      .delay(700)
      .fadeOut(1);
    $(".buddy")
      .find(".status")
      .remove();

    $(this).append('<div class="status like">Like!</div>');
    if ($(this).is(":last-child")) {
      $(".buddy:nth-child(1)")
        .removeClass("rotate-left rotate-right")
        .fadeIn(300);
    } else {
      $(this)
        .next()
        .removeClass("rotate-left rotate-right")
        .fadeIn(400);
    }
  });


  $(".buddy").on("swipeleft", function() {
    $(this)
      .addClass("rotate-right")
      .delay(700)
      .fadeOut(1);
    $(".buddy")
      .find(".status")
      .remove();
    $(this).append('<div class="status dislike">Dislike!</div>');

    if ($(this).is(":last-child")) {
      $(".buddy:nth-child(1)")
        .removeClass("rotate-left rotate-right")
        .fadeIn(300);
      alert("OUPS");
    } else {
      $(this)
        .next()
        .removeClass("rotate-left rotate-right")
        .fadeIn(400);
    }
  });
});

const questionSet = {
  "Do you think canditaes need to fight for equalty?": ["T or F"],
  "Rank the issues in terms of importance to you?": [
    "Ranking",
    ["Food", "Activities", "Career Workshops", "Book cost", "Library Hours"]
  ]
};
function startQuiz(questionSet) {
  for (let question in questionSet.keys) {
    questionProps = questionSet[question];
    questionType = questionProps[0];
    if (questionType == "T or F") {
      // use the tinder style
    } else if (questionType == "Ranking") {
      // use the ranking style question
    } else {
      console.log("Error");
    }
  }
}
/*click button, only select all the DOM element right now*/  
function clickFunction() {
 
  var select= [];
  var all = document.getElementsByTagName("*");

 for (var i=0, max=all.length; i < max; i++) {
  
    console.log(document.getElementsByClassName('pro')+i);
 
 }

 
}
/*check boxes*/
(function() {
    var input = document.querySelectorAll(".items input");
    var orders = [];
    SelOrder (input, orders);
})();

 //order of selection                           
function SelOrder (input, orders) {
  for(var i=0; i< input.length; i++) {
    input[i].addEventListener("change", function(e){
      if(e.target.checked) {
        orders.push(e.target.id);
      } else {
        for (var k = 0; k < orders.length; k ++) {
          if(orders[k] == e.target.id) {
            orders.splice(k, 1);
          }
        }
      }
      for(var l =0; l <orders.length; l++) {
        for(var j=0; j< input.length; j++) {
          if (input[j].id == orders[l]) {
            input[j].className = "order" + (l + 1);
          }
        }
      }
    }, false);
  }
//clear button
  var clear = document.querySelector(".clr");
  clear.addEventListener("click", function() {
    orders = [];
    for(var i = 0; i < input.length; i++) {
      input[i].checked = false;
    }
  },false);
}