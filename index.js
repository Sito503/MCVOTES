let answers = [];
$(document).ready(function () {

  $(".buddy").on("swiperight", function () {
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

  $(".buddy").on("swipeleft", function () {
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
const amyWang = [
  0, 1, 2, 3, 4, 5, 6, 7, 8,
  4, 1, 2, 0, 3,
  2, 1, 0, 3,
  1, 3, 2, 4, 5, 0,
  1, 2, 4, 3, 0,
  0, 1, 2,
]
const questionSet = {
  "Department advisor should be required to use Starfish for advising appointment.": ["Slider"],

  "Drag and rank the issues in terms of importance to you": [
    "Ranking",
    ["Food Quality & Affordability", "Improve Student Activities",
      "Textbook Affordability", "Transportation", "Improve Advising",
      "Campus Security", "Library access",
      "Diversty Inclusion", "Student Health Resource"
    ]
  ],


  "Drag and rank the following transportation improvements in terms of importance to you": [
    "Ranking",
    ["Continue Free Ride On", "Free Parking", "Shuttle Frequency",
      "Student Discount Metro Pass", "Bike Share Program"
    ]
  ],
  "Drag and rank the following campus events in terms of importance to you.": [
    "Ranking",
    ["Career Development", "Student Fundraising", " Fun in Campus Life",
      "Multicultural Events", "Issue Townhalls", "Health Wellness"
    ]
  ],
  "Rank the following food improvement in terms of importance to you.": [
    "Ranking",
    ["Quality & Taste", "Affordability", "Discount Meal Plan", "Evening Hours",
      "Healthier Vending Option"
    ]
  ],
  "Drag and rank the following textbook improvement in terms of importance to you": [
    "Ranking",
    ["Affordability", "More Rentals", "More Z-courses/ open educational resources (no-cost resource)"]
  ],
  "Montgomery College should improve security, even doing so will increase tuition costs.": ["Slider"],
  " I think the following characteristic(s) are important to me for candidates who...": [
    "matrix"
  ]
};

function* questionGen() {
  for (var question in questionSet) {
    yield question;
  }
}
const questionIter = questionGen();

function getNextQuestion() {
  valueOfTheQuestionGen = questionIter.next();
  value = valueOfTheQuestionGen.value;
  isDone = valueOfTheQuestionGen.isDone;
  if (isDone) {
    return undefined;
  }
  return value;
}

function showProgressBar() {
  $(".progress").show();
  $("#next").click(clickProgress);

}



function showNextQuestion() {
  $("#question-container").fadeOut("fast", function () {
    $("#next").show();
    question = getNextQuestion();
    questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("wrapper");
    questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    console.log("called")
    if (question != undefined) {
      questionProps = questionSet[question];
      questionType = questionProps[0];
      questionDiv.innerText = question;
      questionContainer.appendChild(questionDiv);



      if (questionType == "Ranking") {
        questionAnswers = questionProps[1];
        for (var i = 0; i < questionAnswers.length; i++) {
          wrapperDiv.appendChild(createAnswerModule("" + i, questionAnswers[i]));
        }
        wrapperDiv.classList.add("sortable-items");
        questionContainer.appendChild(wrapperDiv);
        makeAnswerSortable();
        console.log(compareAnswers());
        $("#next").off("click");
        $("#next").click(getAnswersFromSortableQuestion);

      } else if (questionType == "Slider") {
        wrapperDiv.id = "radios";
        wrapperDiv.classList.add("radio-block")
        labelNameValues = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
        index = 1
        for (let index = 1; index <= labelNameValues.length; index++) {
          optionValue = "option" + index
          labelInput = document.createElement("input");
          labelInput.type = "radio"
          label = document.createElement("label");
          label.for = optionValue
          labelInput.id = optionValue
          label.innerHTML = labelNameValues[index - 1];
          wrapperDiv.append(labelInput)
          wrapperDiv.append(label)
          questionContainer.appendChild(wrapperDiv);


        }

        /*
        The fade out callback restrict rendering of the radios to slider.
        the 1 ms delay trick/hack the browser in rendering the dom after the divs have been created
        */
        setTimeout(function () {
          // converting the radios to slider
          $("#radios").radiosToSlider();

        }, 1)

      } else if (questionType == "matrix") {
        wrapperDiv.id = "registration";
        wrapperDIv.classList.add("container-matrix")
        labelNameValues = ["yes", "no", "dont care"];
        index = 1
        for (let index = 1; index <= labelNameValues.length; index++) {

        }


      } else {
        console.log("Error");
      }
    } else {
      questionDiv.innerHTML = answers;
      questionDiv.innerHTML += ":answers \n Quiz done get out here";
      questionContainer.appendChild(questionDiv);
    }
    showProgressBar()

  })


  $("#question-container").fadeIn(400)
}


function getAnswerFromMatrix() {



}



function getAnswersFromRadioQuestion() {
  var radios = document.getElementsByName('radios')
  var radioValArr;

  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      alert(radios[i].value);
      switch (i) {
        case 0:
          radioValArr.push("Strongly Agree")
          break;
        case 1:
          radioValArr.push("Agree")
          break;
        case 2:
          radioValArr.push("Neutral")
          break;
        case 3:
          radioValArr.push("Disagree")
          break;
        case 4:
          radioValArr.push("Strongly Disagree")
          break;


      }


      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
}

function clickProgress() {

  var $next = $('.progress ul li.current').removeClass('current').addClass('complete').next('li');
  $next.removeClass('complete').addClass('current');
  console.log('Prev');


}
var answerUser = [];

function getAnswersFromSortableQuestion() {
  moduleAnswers = document.getElementsByClassName("module");
  answersID = [];
  for (var answer of moduleAnswers) {
    answersID.push([answer.id, answer.innerText]);
    console.log("ID is " + answer.id);
    answerUser.push(answer.id);
  }
  console.log("user ans arr" + answerUser);
  console.log(moduleAnswers);
  answers.push(answersID);

  $("#next").off("click");
  $("#next").click(showNextQuestion);

  showNextQuestion();
}

function createAnswerModule(id, answer, clickableQuestion) {
  moduleSection = document.createElement("section");
  moduleSection.id = id;
  moduleSection.classList.add("module");
  moduleParagraph = document.createElement("p");
  moduleParagraph.innerText = answer;
  moduleSection.appendChild(moduleParagraph);
  if (clickableQuestion) {
    moduleSection.addEventListener("click", function () {
      answers.push([answer]);

      showNextQuestion();
    });
  }
  return moduleSection;
}

var percentage = 0;

function compareAnswers() {
  var percentageCal = 0;
  //Q1- 9 option
  for (var i = 0; i < 9; i++) {
    percentageCal += Math.abs(answerUser[i] - amyWang[i]);
  }
  if (percentageCal == 0) {

    //console.log("% for q1 is SAME");
    percentage += 100 / 8;
  } else {
    percentage = ((1 - (percentageCal / 36)) * 100) / 9;
  }
  console.log("% for q1 is " + percentage + " right now");
  //Q2 - 5 option
  percentageCal = 0;
  for (var i = 9; i < 14; i++) {
    percentageCal += Math.abs(answerUser[i] - amyWang[i]);
  }
  percentage = ((1 - (percentageCal / 36)) * 100) / 9;

  console.log("% for q2 is " + percentage + " right now");


}

// please ignore this code is to make sure the list are sortable on mobile devices
!(function (a) {
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
    (b._touchStart = function (a) {
      var b = this;
      !e &&
        b._mouseCapture(a.originalEvent.changedTouches[0]) &&
        ((e = !0),
          (b._touchMoved = !1),
          f(a, "mouseover"),
          f(a, "mousemove"),
          f(a, "mousedown"));
    }),
    (b._touchMove = function (a) {
      e && ((this._touchMoved = !0), f(a, "mousemove"));
    }),
    (b._touchEnd = function (a) {
      e &&
        (f(a, "mouseup"),
          f(a, "mouseout"),
          this._touchMoved || f(a, "click"),
          (e = !1));
    }),
    (b._mouseInit = function () {
      var b = this;
      b.element.bind({
          touchstart: a.proxy(b, "_touchStart"),
          touchmove: a.proxy(b, "_touchMove"),
          touchend: a.proxy(b, "_touchEnd")
        }),
        c.call(b);
    }),
    (b._mouseDestroy = function () {
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
function makeAnswerSortable() {
  $(".sortable-items").sortable();
  $(".sortable-items").disableSelection();
}
// tab things do touch yet please
$(document).ready(function () {
  $(".progress").show();

  $(".progress").hide();
  $("#next").click(showProgressBar);

  $("#tab1_content").show();
  $("#tab2_content").hide();
  $("#tab3_content").hide();
  $("#tab4_content").hide();


  $("#quiz_tab").click(function () {
    $("#tab1_content").show();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").hide();
  });

  $("#candidate_info_tab").click(function () {
    $("#tab1_content").hide();
    $("#tab2_content").show();
    $("#tab3_content").hide();
    $("#tab4_content").hide();

  });
  $("#role_info_tab").click(function () {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").show();
    $("#tab4_content").hide();

  });

  $("#about_tab").click(function () {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").show();

  });
});
$("#next").click(showNextQuestion);