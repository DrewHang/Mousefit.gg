import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoadingPage from "./LoadingPage.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setFinalMouse, getFinalMouse } from "./redux/state/finalMouseSlice.js";
import {
  setScrapedData,
  getScrapedData,
} from "./redux/state/scrapedDataSlice.js";
import { setIsQuizDone, getIsQuizDone } from "./redux/state/isQuizDoneSlice.js";
import {
  setRelatedMouse,
  getRelatedMouse,
} from "./redux/state/relatedMouseSlice.js";
import {
  setScrapedYoutube,
  getScrapedYoutube,
} from "./redux/state/scrapedYoutubeSlice.js";

export default function QuizPage() {
  const questions = [
    {
      questionText: "What your preferred mouse grip?",
      type: "mouseGrip",
      answerOptions: [
        { answerText: "Claw", value: "Claw" },
        { answerText: "Fingertip", value: "Fingertip" },
        { answerText: "Palm", value: "Palm" },
      ],
    },
    {
      questionText: "Wired or Wireless?",
      type: "interface",
      answerOptions: [
        { answerText: "Wired", value: "wired" },
        { answerText: "Wireless", value: "wireless" },
      ],
    },
    {
      questionText: "Light, Medium, or Heavy Weight?",
      type: "weight",
      answerOptions: [
        { answerText: "Light", value: [0, 80] },
        { answerText: "Medium", value: [80, 120] },
        { answerText: "Heavy", value: [120, 1000] },
      ],
    },
    {
      questionText: "Small, Medium, or Large Mouse Size?",
      type: "mouseSize",
      answerOptions: [
        { answerText: "Small", value: [0, 292800] },
        { answerText: "Medium", value: [292800, 357000] },
        { answerText: "Large", value: [357000, 100000000] },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [categoryType, setCategoryType] = useState("");
  const [mouseList, setMouseList] = useState([]);
  const isQuizDone = useSelector(getIsQuizDone);
  const finalMouse = useSelector(getFinalMouse);
  const scrapedData = useSelector(getScrapedData);
  const relatedMice = useSelector(getRelatedMouse);
  const scrapedYoutube = useSelector(getScrapedYoutube);
  const dispatch = useDispatch();

  useEffect(() => {
    getMouseList();
  }, []);

  useEffect(() => {
    setCategoryType(questions[currentQuestion].type);
  }, [currentQuestion]);

  useEffect(() => {
    if (finalMouse.finalmouse.amazonLink !== undefined) {
      getRelatedMice();
      getYoutubeVid();
      getScrapedMouse();
    }
  }, [finalMouse]);

  const getScrapedMouse = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: finalMouse.finalmouse.amazonLink }),
    };

    fetch("/api/getScrapeData", requestOptions)
      .then((response) => response.json())
      .then((data) =>
        dispatch(setScrapedData({ data: data, isLoading: false }))
      );
  };

  const getYoutubeVid = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mouse: finalMouse.finalmouse.productName }),
    };

    fetch("/api/getLink", requestOptions)
      .then((response) => response.json())
      .then((data) =>
        dispatch(setScrapedYoutube({ data: data, isLoading: false }))
      );
  };

  const getMouseList = () => {
    fetch("/api/getAll")
      .then((res) => res.json())
      .then(
        (result) => {
          setMouseList(result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const filterMouseList = (filterTerm, type) => {
    let filteredList = [];
    if (type === "mouseGrip") {
      filteredList = mouseList.filter((mouse) =>
        mouse[type][0].includes(filterTerm)
      );
    } else if (type === "interface") {
      filteredList = mouseList.filter((mouse) =>
        mouse[type][0].includes(filterTerm)
      );
    } else if (type === "weight") {
      filteredList = mouseList.filter(
        (mouse) => mouse[type] >= filterTerm[0] && mouse[type] <= filterTerm[1]
      );
    } else if (type === "mouseSize") {
      filteredList = mouseList.filter(
        (mouse) => mouse[type] >= filterTerm[0] && mouse[type] <= filterTerm[1]
      );
    }
    setMouseList(filteredList);
  };

  const handleAnswerClick = (filterTerm, type) => {
    filterMouseList(filterTerm, type);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion === questions.length) {
      dispatch(setIsQuizDone({ done: true }));
    }

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const result = randomFinalMouse(mouseList);
      dispatch(setFinalMouse({ finalmouse: result }));
    }
  };

  function randomFinalMouse(arr) {
    return arr[Math.floor(arr.length * Math.random())];
  }

  function getRelatedMice() {
    const relatedList = mouseList.filter(
      (mouse) => mouse.amazonLink !== finalMouse.finalmouse.amazonLink
    );
    dispatch(setRelatedMouse({ relatedmouse: relatedList }));
  }

  if (isQuizDone.done) {
    return <LoadingPage />;
  }

  return (
    <Typography className="quiz-app" component="div">
      <div style={{ opacity: "1" }}>
        <div className="question-section">
          <Typography className="question-count" component="div">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </Typography>
          <Typography className="question-text">
            {questions[currentQuestion].questionText}
          </Typography>
        </div>
        <Typography className="answer-section" component="div">
          {questions[currentQuestion].answerOptions.map(
            (answerOption, index) => (
              <Button
                className="answers-button"
                key={index}
                onClick={() =>
                  handleAnswerClick(answerOption.value, categoryType)
                }
              >
                {answerOption.answerText}
              </Button>
            )
          )}
        </Typography>
      </div>
    </Typography>
  );
}
