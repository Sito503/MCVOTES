let answers = [];
var answerUser = [];
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

var candidateAns = {
  amyWang: [
    ["0", "1", "2", "3", "4", "5", "6", "7", "8"], //q1
    [" 4", "1", "2", "0", "3"], //q2
    ["1", "2", "0", "3"], //q3
    ["0", "1", "2", "3", "4", "5"], //q4
    [" 4", "1", "2", "0", "3"],
    ["0", "1", "2"]
  ]
};
const questionSet = {
  "Drag and rank the issues in terms of importance to you": [
    "Ranking",
    [
      "Food Quality & Affordability",
      "Improve Student Activities",
      "Textbook Affordability",
      "Transportation",
      "Improve Advising",
      "Campus Security",
      "Library access",
      "Diversty Inclusion",
      "Student Health Resource"
    ]
  ],

  "Drag and rank the following transportation improvements in terms of importance to you": [
    "Ranking",
    [
      "Continue Free Ride On",
      "Free Parking",
      "Shuttle Frequency",
      "Student Discount Metro Pass",
      "Bike Share Program"
    ]
  ],
  "Drag and rank the following campus events in terms of importance to you.": [
    "Ranking",
    [
      "Career Development",
      "Student Fundraising",
      "Fun in Campus Life",
      "Multicultural Events",
      "Issue Townhalls",
      "Health Wellness"
    ]
  ],
  "Rank the following food improvement in terms of importance to you.": [
    "Ranking",
    [
      "Quality & Taste",
      "Affordability",
      "Discount Meal Plan",
      "Evening Hours",
      "Healthier Vending Option"
    ]
  ],
  "Drag and rank the following textbook improvement in terms of importance to you": [
    "Ranking",
    [
      "Affordability",
      "More Rentals",
      "More Z-courses/ open educational resources (no-cost resource)"
    ]
  ],
  "Department advisor should be required to use Starfish for advising appointment.": [
    "Slider"
  ],

  "Montgomery College should improve security, even doing so will increase tuition costs.": [
    "Slider"
  ],
  " I think the following characteristic(s) are important to me for candidates who ": [
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
  $("#question-container").fadeOut("fast", function() {
    $("#next").show();
    question = getNextQuestion();
    questionContainer = document.getElementById("question-container");
    questionContainer.innerHTML = "";
    wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("wrapper");
    questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    if (question != undefined) {
      questionProps = questionSet[question];
      questionType = questionProps[0];
      questionDiv.innerText = question;
      questionContainer.appendChild(questionDiv);

      if (questionType == "Ranking") {
        questionAnswers = questionProps[1];
        for (var i = 0; i < questionAnswers.length; i++) {
          wrapperDiv.appendChild(
            createAnswerModule("" + i, questionAnswers[i])
          );
        }
        wrapperDiv.classList.add("sortable-items");
        questionContainer.appendChild(wrapperDiv);
        makeAnswerSortable();

        $("#next").off("click");
        $("#next").click(getAnswersFromSortableQuestion);
      } else if (questionType == "Slider") {
        wrapperDiv.id = "radios";
        wrapperDiv.classList.add("radio-block");
        labelNameValues = [
          "Strongly Agree",
          "Agree",
          "Neutral",
          "Disagree",
          "Strongly Disagree"
        ];
        index = 1;
        for (let index = 1; index <= labelNameValues.length; index++) {
          optionValue = "option" + index;
          labelInput = document.createElement("input");
          labelInput.type = "radio";
          label = document.createElement("label");
          label.for = optionValue;
          labelInput.id = optionValue;
          label.innerHTML = labelNameValues[index - 1];
          wrapperDiv.append(labelInput);
          wrapperDiv.append(label);
          questionContainer.appendChild(wrapperDiv);
        }

        /*
        The fade out callback restrict rendering of the radios to slider.
        the 1 ms delay trick/hack the browser in rendering the dom after the divs have been created
        */
        setTimeout(function() {
          // converting the radios to slider
          $("#radios").radiosToSlider();
        }, 1);
        $("#next").click(getAnswersFromRadioQuestion);
      } else if (questionType == "matrix") {
  /*      Survey
    .StylesManager
    .applyTheme("default");

    var json = {
      questions: [
        {
            type: "matrix",
            name: "Quality",
            title: "Please indicate if you agree or disagree with the following statements",
            columns: [
                {
                    value: 1,
                    text: "Strongly Disagree"
                }, {
                    value: 2,
                    text: "Disagree"
                }, {
                    value: 3,
                    text: "Neutral"
                }, {
                    value: 4,
                    text: "Agree"
                }, {
                    value: 5,
                    text: "Strongly Agree"
                }
            ],
            rows: [
                {
                    value: "affordable",
                    text: "Product is affordable"
                }, {
                    value: "does what it claims",
                    text: "Product does what it claims"
                }, {
                    value: "better then others",
                    text: "Product is better than other products on the market"
                }, {
                    value: "easy to use",
                    text: "Product is easy to use"
                }
            ]
        }
    ]
};


$("#surveyElement").Survey({model: survey});
*/

      } else {
        // not a valid value for the question
        console.log("Error");
      }
    } else {
      // end of the quiz
      callCompare();
      questionDiv.innerHTML = answers;
      questionDiv.innerHTML += ":answers \n Quiz done get out here";
      questionContainer.appendChild(questionDiv);
      $("#next").hide();
      $("#restart").show();
      $("#restart").click(refreshPage);
    }
  });

  $("#question-container").fadeIn(400);
}

function getAnswerFromMatrix() {

  /*window.survey = new Survey.Model(json);

  survey
      .onComplete
      .add(function (result) {
          document
              .querySelector('#surveyResult')
              .innerHTML = "result: " + JSON.stringify(result.data);
      });

*/
}

function refreshPage() {
  window.location.reload();
}

function getAnswersFromRadioQuestion() {
  selectedRadioValue = document.getElementsByClassName("slider-label-active");
  if (selectedRadioValue.length != 0) {
    value = selectedRadioValue[0].innerText;
    answers.push(value);
    clickProgress();
    showNextQuestion();
  }
}

function clickProgress() {
  var $next = $(".progress ul li.current")
    .removeClass("current")
    .addClass("complete")
    .next("li");
  $next.removeClass("complete").addClass("current");
}

function getAnswersFromSortableQuestion() {
  moduleAnswers = document.getElementsByClassName("module");
  answersID = [];
  for (var answer of moduleAnswers) {
    answersID.push([answer.id, answer.innerText]);
    answerUser.push(answer.id);
  }

  answers.push(answersID);
  clickProgress();
  showNextQuestion();
}

function createAnswerModule(id, answer, clickableQuestion) {
  sortableIcon = document.createElement("span");
  sortableIcon.classList.add("ui-icon-grip-dotted-vertical");
  sortableIcon.classList.add("ui-icon");
  moduleSection = document.createElement("section");
  moduleSection.id = id;
  moduleSection.classList.add("module");
  moduleParagraph = document.createElement("p");
  moduleParagraph.innerText = answer;
  moduleSection.appendChild(sortableIcon);
  moduleSection.appendChild(moduleParagraph);
  if (clickableQuestion) {
    moduleSection.addEventListener("click", function() {
      answers.push([answer]);
    });
  }
  return moduleSection;
}
function callCompare() {
  compareAnswers(0, 9);
  compareAnswers(10, 14);
  compareAnswers(15, 18);
  compareAnswers(19, 24), compareAnswers(25, 29);
  compareAnswers(30, 32);
}

var percentage = 0;
function compareAnswers(questionHd, questionTl) {
  var percentageCal = 0;

  for (var i = questionHd; i < questionTl; i++) {
    percentageCal += Math.abs(answerUser[i] - candidateAns.amyWang[i]); //i need to fix this
  }
  if (percentageCal == 0) {
    percentage += 100 / 8;
  } else {
    percentage = ((1 - percentageCal / 36) * 100) / 9;
  }
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
function makeAnswerSortable() {
  $(".sortable-items").sortable();
  $(".sortable-items").disableSelection();
}
// tab things do touch yet please

$(document).ready(function() {
  $(".progress").show();
  $("#restart").hide();
  $(".progress").hide();
  $("#next").click(showProgressBar);

  $("#tab1_content").show();
  $("#tab2_content").hide();
  $("#tab3_content").hide();
  $("#tab4_content").hide();
  $("#tab5_content").hide();

  $("#quiz_tab").click(function() {
    $("#tab1_content").show();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").hide();

    $("#tab5_content").hide();
  });

  $("#candidate_info_tab").click(function() {
    $("#tab1_content").hide();
    $("#tab2_content").show();
    $("#tab3_content").hide();
    $("#tab4_content").hide();

    $("#tab5_content").hide();
  });
  $("#role_info_tab").click(function() {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").show();
    $("#tab4_content").hide();

    $("#tab5_content").hide();
  });

  $("#about_tab").click(function() {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").show();
    $("#tab5_content").hide();
  });
  $("#result_tab").click(function() {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").hide();
    $("#tab5_content").show();
  });
});
$("#next").click(showNextQuestion);