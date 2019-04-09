let answers = [];
let answersSlider = [];
let totalPercentArr = [];
let database, studentSenate2019DBRef;
const apiKey = "AIza";
const sliderLabelValues = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree"
];
let candidatePic = [
  "imgs/bryan.jpg", 
  "imgs/meave.jpg ", 
  "imgs/paige.jpg",
  "imgs/mark.jpg", 
  "imgs/divine.jpg",
  "imgs/ivy.jpg", 
  "imgs/ishita.jpg", 
  "imgs/kyle.jpg"
];
let candidateAns = {
  bryan: [
    ["2", "7", "8", "0", "5", "3", "4", "1", "6"], //q1
    ["3", "0", "2", "4", "1"], //q2
    ["5", "3", "2", "0", "4", "1"], //q3
    ["2", "0", "4", "1", "3"], //q4
    ["2", "0", "1"],
    ["2"], //q6
    ["3"], //q7
    ["0", "2"] //q8
  ],

  maeve: [
    ["4", "2", "5", "3", "0", "1", "7", "6", "8"], //q1
    ["0", "1", "2", "3", "4"], //q2
    ["0", "3", "2", "1", "5", "4"], //q3
    ["0", "1", "2", "3", "4"], //q4
    ["0", "1", "2"],
    ["1"], //q6
    ["3"], //q7
    ["0", "0"] //q8
  ],

  paige: [
    ["7", "4", "3", "1", "0", "5", "8", "6", "2"], //q1
    ["1", "0", "2", "3", "4"], //q2
    ["4", "5", "0", "3", "2", "1"], //q3
    ["2", "0", "1", "3", "4"], //q4
    ["2", "0", "1"],
    ["1"], //q6
    ["2"], //q7
    ["0", "0"] //q8
  ],
  mark: [
    ["3", "5", "4", "2", "0", "1", "7", "8", "6"], //q1
    ["0", "3", "2", "1", "4"], //q2
    ["0", "2", "5", "1", "3", "4"], //q3
    ["1", "0", "3", "2", "4"], //q4
    ["0", "2", "1"],
    ["0"], //q6
    ["2"], //q7
    ["0", "0"] //q8
  ],
  divine: [
    ["1", "0", "2", "7", "3", "4", "5", "8", "6"], //q1
    ["3", "0", "2", "1", "4"], //q2
    ["3", "2", "1", "4", "0", "5"], //q3
    ["1", "0", "2", "4", "3"], //q4
    ["0", "1", "2"],
    ["1"], //q6
    ["0"], //q7
    ["0", "0"] //q8
  ],
  ishita: [
    ["6", "0", "2", "5", "3", "7", "4", "1", "8"], //q1
    ["1", "3", "0", "2", "4"], //q2
    ["0", "3", "2", "1", "5", "4"], //q3
    ["1", "2", "0", "4", "3"], //q4
    ["0", "1", "2"],
    ["0"], //q6
    ["2"], //q7
    ["2", "0"] //q8
  ],

  ivy: [
    ["0", "3", "7", "5", "2", "8", "1", "6", "4"], //q1
    ["1", "0", "2", "3", "4"], //q2
    ["0", "2", "1", "3", "5", "4"], //q3
    ["1", "0", "2", "3", "4"], //q4
    ["2", "0", "1"], //q5
    ["1"], //q6
    ["0"], //q7
    ["2", "0"] //q8
  ],

  kyle: [
    ["7", "5", "8", "4", "2", "6", "0", "1", "3"], //q1
    ["3", "2", "0", "1", "4"], //q2
    ["2", "1", "3", "4", "5", "0"], //q3
    ["2", "3", "0", "1", "4"], //q4
    ["1", "2", "0"], //q5
    ["1"], //q6
    ["2"], //q7
    ["0", "0"] //q8
  ]
};

function getDatabase() {
  var config = {
    apiKey: apiKey,
    authDomain: "mcvotes-916fb.firebaseapp.com",
    databaseURL: "https://mcvotes-916fb.firebaseio.com",
    projectId: "mcvotes-916fb",
    storageBucket: "mcvotes-916fb.appspot.com",
    messagingSenderId: "872674444214"
  };
  firebase.initializeApp(config);
  // Get a reference to the database service
  database = firebase.database();
  studentSenate2019DBRef = database.ref("student-senate-2019");
}
getDatabase();
const questionSet = {
  "Drag and rank the issues in terms of importance to you": [
    "Ranking",
    [
      "Textbook Affordability",
      "Food Quality & Affordability",
      "Transportation",
      "Improve Advising",
      "Campus Security",
      "Student Health Resource",
      "Improve Student Activities",
      "Library access",
      "Diversty Inclusion"
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
  "Drag and rank the following campus events in terms of importance to you": [
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
  "Rank the following food improvement in terms of importance to you": [
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
  "Department advisor should be required to use Starfish for advising appointment": [
    "Slider"
  ],

  "Montgomery College should improve security, even doing so will increase tuition costs": [
    "Slider"
  ],
  " I think the following characteristic(s) are important to me for candidates who": [
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

        index = 1;
        for (let index = 1; index <= sliderLabelValues.length; index++) {
          optionValue = "option" + index;
          labelInput = document.createElement("input");
          labelInput.type = "radio";
          label = document.createElement("label");
          label.for = optionValue;
          labelInput.id = optionValue;
          label.innerHTML = sliderLabelValues[index - 1];
          wrapperDiv.append(labelInput);
          wrapperDiv.append(label);
          questionContainer.appendChild(wrapperDiv);
        }

        /*
        The fade out callback restrict rendering of the radios to slider.
        the 1 ms delay trick/hack the browser in rendering the dom after the divs have been created
        */
        setTimeout(function () {
          var radios = $("#radios").radiosToSlider();
        }, 1);
        $("#next").off();
        $("#next").click(getAnswersFromRadioQuestion);
      } else if (questionType == "matrix") {
        // table and container creation
        wrapperDiv.classList.add("container-matrix");
        wrapperDiv.id = "registration";
        table = document.createElement("table");
        statements = [
          "Served as a club leader previously",
          "Has been involved with volunteer work"
        ];
        // header row
        headerRow = document.createElement("tr");
        StatementRow = document.createElement("th");
        StatementRow.id = "column-document";
        headerRow.appendChild(StatementRow);
        tableHeaders = ["Agree", "Neutral", "Disagree"];
        tableHeaders.forEach(element => {
          header = document.createElement("th");
          header.classList.add("column-button");
          header.innerText = element;
          headerRow.appendChild(header);
        });
        table.appendChild(headerRow);
        // statement row with radio buttons
        statements.forEach((statement, statementIndex) => {
          statementRow = document.createElement("tr");
          statementRow.classList.add("stRow");

          statementTableData = document.createElement("td");
          statementTableData.innerText = statement;
          statementRow.appendChild(statementTableData);
          for (let index = 0; index < 3; index++) {
            containerButtonTD = document.createElement("td");
            containerButtonTD.classList.add("container-button");

            radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.value = index;
            radioButton.name = statementIndex;
            radioButton.classList.add("matrix-buttons");
            containerButtonTD.appendChild(radioButton);
            statementRow.appendChild(containerButtonTD);
          }
          table.append(statementRow);
        });
        wrapperDiv.appendChild(table);
        questionContainer.appendChild(wrapperDiv);
        $("#next").off();
        $("#next").click(getAnswersFromMatrixQuestion);
      } else {
        // not a valid value for the question
        console.log("Error");
      }
    } else {
      // end of the quiz
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      studentSenate2019DBRef.push({
        meta: [dd, mm, yyyy],
        questions: questionSet,
        answers: answers
      });

      console.log("print answer: " + answers);
      $("#tab1_content").hide();
      $("#tab2_content").show();
      $("#tab3_content").hide();
      $("#tab4_content").hide();
      $("#tab5_content").hide();
      $("#tab6_content").hide();
      compareAnswers();
      changePercent();
    }
  });

  $("#question-container").fadeIn(400);
}

function getAnswersFromMatrixQuestion() {
  matrixAnswers = [];
  $(".matrix-buttons").each(function (i, checkbox) {
    if (checkbox.checked) {
      matrixAnswers.push(parseInt(checkbox.value));
    }
  });
  statements = $(".stRow");
  if (matrixAnswers.length == statements.length) {
    answers.push(matrixAnswers);
    clickProgress();
    showNextQuestion();
  } else {
    alertUserToSelectAnswer();
  }
}

function refreshPage() {
  window.location.reload();
}

function getAnswersFromRadioQuestion() {
  selectedRadioValue = document.getElementsByClassName("slider-label-active");
  if (selectedRadioValue.length != 0) {
    value = selectedRadioValue[0].innerText;
    for (let index = 0; index < sliderLabelValues.length; index++) {
      sliderLabelValue = sliderLabelValues[index];
      if (sliderLabelValue == value) {
        answers.push([index]);
      }
    }

    clickProgress();
    showNextQuestion();
  } else {
    alertUserToSelectAnswer();
  }
}

function alertUserToSelectAnswer() {
  alert("Please answer the prompt");
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
    answersID.push(answer.id);
  }

  answers.push(answersID);
  clickProgress();
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
    });
  }
  return moduleSection;
}

function compareAnswers() {
  totalPercent = 0;
  candidateSliderCal = 0;
  for (candidate in candidateAns) {
    candidateAnswers = candidateAns[candidate];
    for (
      let questionNumber = 0;
      questionNumber < candidateAnswers.length;
      questionNumber++
    ) {
      candidateSAns = candidateAnswers[questionNumber];
      var candidateAnsTotal = 0;
      var percentageCal = 0;
      if (candidateSAns.length == 2) {
        for (let i = 0; i < candidateSAns.length; i++) {
          percentageCal =
            Math.abs(candidateSAns[i] - answers[questionNumber][i]) / 3;
          totalPercent += 6.25 * (1 - percentageCal);
        }
      } else {
        for (let i = 0; i < candidateSAns.length; i++) {
          if (candidateSAns.length == 1) {
            if (candidateSAns[i] == answers[questionNumber][i]) {
              totalPercent += 12.5;
            } else {
              percentageSliderCal = Math.abs(
                candidateSAns[i] - answers[questionNumber][i]
              );
              console.log("percentageSliderCal is " + percentageSliderCal);
              totalPercent += 2.5 * (5 - percentageSliderCal);
            }
            percentageSliderCal = 0;
          } else {
            percentageCal += Math.abs(
              answers[questionNumber][i] - candidateSAns[i]
            );
            candidateAnsTotal += Math.abs(candidateSAns[i]);
          }
        }
        if (candidateAnsTotal != 0) {
          if (percentageCal == 0) {
            totalPercent += 12.5;
          } else {
            totalPercent += ((1 - percentageCal / candidateAnsTotal) * 100) / 8;
          }
        }
      }

      percentageCal = 0;
      percentageSliderCal = 0;
      console.log("total % is " + totalPercent);
    }
    candidateAnsTotal = 0;
    percentageCal = 0;

    totalPercentArr.push(totalPercent);

    console.log("Total percent arr " + totalPercentArr);

    totalPercent = 0;
  }
}

function changePercent() {
  let i = 0;
  var result = document.getElementsByClassName("bar-names");
  var percentage = 0;
  // compareAnswers();

  $(".bar-percent[data-percentage]").each(function () {
    var progress = $(this);
    if (totalPercentArr.length < 1) {
      percentage = 0;
    } else {
      percentage = Math.ceil($(this).attr("data-percent"));

      console.log(result[i].id);
      switch (result[i].id) {
        case "bryan":
          percentage = Math.ceil(totalPercentArr[0]) + 1;
          break;
        case "maeve":
          percentage = Math.ceil(totalPercentArr[1]) + 1;
          break;
        case "paige":
          percentage = Math.ceil(totalPercentArr[2]) + 1;
          break;
        case "mark":
          percentage = Math.ceil(totalPercentArr[3]) + 1;
          break;
        case "divine":
          percentage = Math.ceil(totalPercentArr[4]) + 1;
          break;
        case "ishita":
          percentage = Math.ceil(totalPercentArr[5]) + 1;
          break;
        case "ivy":
          percentage = Math.ceil(totalPercentArr[6]) + 1;
          break;
        case "kyle":
          percentage = Math.ceil(totalPercentArr[7]) + 1;
          break;
        default:
          percentage = 0;
      }
    }

    $({
      countNum: 0
    }).animate(
      {
        countNum: percentage
      },
      {
        duration: 2000,
        easing: "linear",
        step: function () {
          // What todo on every count
          var pct = Math.floor(this.countNum) + "%";
          progress.text(pct) &&
            progress
              .siblings()
              .children()
              .css("width", pct);
        }
      }
    );
    i++;
  });
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
  $("#restart").hide();
  $(".progress").hide();
  $("#next").click(showProgressBar);
  changePercent();

  $("#tab1_content").show();
  $("#tab2_content").hide();
  $("#tab3_content").hide();
  $("#tab4_content").hide();
  $("#tab5_content").hide();
  $("#tab6_content").hide();

  $("#quiz_tab").click(function () {
    $("#tab1_content").show();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").hide();
    $("#tab5_content").hide();
    $("#tab6_content").hide();
  });

  $("#candidate_info_tab").click(function () {
    $("#tab1_content").hide();
    $("#tab2_content").show();
    $("#tab3_content").hide();
    $("#tab4_content").hide();
    $("#tab5_content").hide();
    $("#tab6_content").hide();
    changePercent();
  });
  $("#role_info_tab").click(function () {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").show();
    $("#tab4_content").hide();

    $("#tab5_content").hide();
    $("#tab6_content").hide();
  });

  $("#about_tab").click(function () {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").show();
    $("#tab5_content").hide();
    $("#tab6_content").hide();
  });
  $("#result_tab").click(function () {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").hide();
    $("#tab5_content").show();
    $("#tab6_content").hide();
  });
  $("#vote_tab").click(function () {
    $("#tab1_content").hide();
    $("#tab2_content").hide();
    $("#tab3_content").hide();
    $("#tab4_content").hide();
    $("#tab5_content").hide();
    $("#tab6_content").show();
  });
  resultPic();
});
$("#next").click(showNextQuestion);

// document.addEventListener("keydown", keyDownTextField, false);

// function keyDownTextField(e) {
//   var keyCode = e.keyCode;
//   if (keyCode == 13) {
//     showNextQuestion();
//     showProgressBar();
//   }
// }

function resultPic() {
  $(".bar-percentage").each((i, bar) => {
    imageURL = candidatePic[i];
    bar.style.background = `url("${imageURL}") no-repeat`;
    bar.style.backgroundSize = "100% 100%";
  });
}
