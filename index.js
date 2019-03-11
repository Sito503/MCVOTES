let answers = [];
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
    answers.push("yes");
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
    answers.push("no");
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
});

const questionSet = {
  "Do you think canditaes need to fight for equalty?": ["T or F"],
  "Rank the issues in terms of importance to you?": [
    "Ranking",
    ["Food", "Activities", "Career Workshops", "Book cost", "1231"]
  ]
};
function* questionGen() {
  for (var question in questionSet) {
    yield question;
  }
}
const questionIter = questionGen();

function startQuiz() {
  // list_of_questions = Object.getOwnPropertyNames(questionSet);
  // for (let question in questionSet) {
  question = getNextQuestion();
  questionProps = questionSet[question];
  questionType = questionProps[0];
  if (questionType == "T or F") {
    // use the tinder style
  } else if (questionType == "Ranking") {
    // use the ranking style question
  } else {
    console.log("Error");
  }
  // }
}
function getNextQuestion() {
  valueOfTheQuestionGen = questionIter.next();
  console.log(valueOfTheQuestionGen);
  value = valueOfTheQuestionGen.value;
  isDone = valueOfTheQuestionGen.isDone;
  if (isDone) {
    return undefined;
  }
  return value;
}
/*click button, only select all the DOM element right now*/
function clickFunction() {
  var select = [];
  var all = document.getElementsByTagName("*");

  for (var i = 0, max = all.length; i < max; i++) {
    console.log(document.getElementsByClassName("pro") + i);
  }
}
function showNextQuestion() {
  question = getNextQuestion();
  questionProps = questionSet[question];
  questionType = questionProps[0];
  questionContainer = document.getElementById("question-container");

  if (questionType == "T or F") {
    // use the tinder style
    wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("wrapper");
    questionDiv = document.createElement("div");
    questionDiv.classList.add("question");
    questionDiv.innerText = question;
    agree = document.createElement("sections");
    disagree = document.createElement("sections");

    agree.innerText = "Agree";
    disagree.innerText = "Disagree";
    wrapperDiv.appendChild(questionDiv);

    wrapperDiv.appendChild(agree);
    wrapperDiv.appendChild(disagree);
    questionContainer.appendChild(wrapperDiv);
  } else if (questionType == "Ranking") {
    // use the ranking style question
  } else {
    console.log("Error");
  }
}

/*check boxes*/
$(document).ready(function() {
  var checklistElements = document.querySelectorAll(".ui-checkbox");
  var orders = [];
  SelOrder(checklistElements, orders);
});

//order of selection
function SelOrder(checklistElements, orders) {
  checkboxs = [];
  checkboxLabels = [];
  for (var elem of checklistElements) {
    [checkboxLabel, checkbox] = elem.children;
    checkboxs.push(checkbox);
    checkboxLabels.push(checkboxLabel);
  }
  for (var i = 0; i < checkboxs.length; i++) {
    checkboxs[i].addEventListener(
      "change",
      function(e) {
        if (e.target.checked) {
          orders.push(e.target.id);
        } else {
          for (var k = 0; k < orders.length; k++) {
            if (orders[k] == e.target.id) {
              orders.splice(k, 1);
            }
          }
        }
        for (var l = 0; l < orders.length; l++) {
          for (var j = 0; j < checkboxs.length; j++) {
            if (checkboxs[j].id == orders[l]) {
              checkboxs[j].className = "order" + (l + 1);
            }
          }
        }
      },
      false
    );
  }
  //clear button
  var clear = document.querySelector(".clr");
  clear.addEventListener(
    "click",
    function() {
      for (var i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = false;
        checkboxLabels[i].classList.remove("ui-checkbox-on");
        checkboxLabels[i].classList.add("ui-checkbox-off");
      }
    },
    false
  );
}

// please ignore this code is to make sure the list are sortable on mobile devices
!(function(a) {
  function f(a, b) {
    if (!(a.originalEvent.touches.length > 1)) {
      a.preventDefault();
      var c = a.originalEvent.changedTouches[0],
        d = document.createEvent("MouseEvents");
      d.initMouseEvent(
        b,
        !0,
        !0,
        window,
        1,
        c.screenX,
        c.screenY,
        c.clientX,
        c.clientY,
        !1,
        !1,
        !1,
        !1,
        0,
        null
      ),
        a.target.dispatchEvent(d);
    }
  }
  if (((a.support.touch = "ontouchend" in document), a.support.touch)) {
    var e,
      b = a.ui.mouse.prototype,
      c = b._mouseInit,
      d = b._mouseDestroy;
    (b._touchStart = function(a) {
      var b = this;
      !e &&
        b._mouseCapture(a.originalEvent.changedTouches[0]) &&
        ((e = !0),
        (b._touchMoved = !1),
        f(a, "mouseover"),
        f(a, "mousemove"),
        f(a, "mousedown"));
    }),
      (b._touchMove = function(a) {
        e && ((this._touchMoved = !0), f(a, "mousemove"));
      }),
      (b._touchEnd = function(a) {
        e &&
          (f(a, "mouseup"),
          f(a, "mouseout"),
          this._touchMoved || f(a, "click"),
          (e = !1));
      }),
      (b._mouseInit = function() {
        var b = this;
        b.element.bind({
          touchstart: a.proxy(b, "_touchStart"),
          touchmove: a.proxy(b, "_touchMove"),
          touchend: a.proxy(b, "_touchEnd")
        }),
          c.call(b);
      }),
      (b._mouseDestroy = function() {
        var b = this;
        b.element.unbind({
          touchstart: a.proxy(b, "_touchStart"),
          touchmove: a.proxy(b, "_touchMove"),
          touchend: a.proxy(b, "_touchEnd")
        }),
          d.call(b);
      });
  }
})(jQuery);
// SORTABLE
$(function() {
  $(".sortable-items").sortable();
  $(".sortable-items").disableSelection();
});
