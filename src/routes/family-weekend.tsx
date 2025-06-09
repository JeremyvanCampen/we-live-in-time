import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Modal from "../components/modal";
import React from "react";
import Dice from "react-dice-roll";

enum QuestionType {
  "Multiple Choice" = "Multiple Choice",
  "Number input" = "Number input",
}

function FamilyWeekend() {
  const [winners, setWinners] = useState([]);
  const [disableDice, setDisableDice] = useState(false);
  const [questions, setQuestions] = useState([
    {
      question: "Sinds wanneer zijn Jeremy en Katinka officieel samen?",
      answers: ["31 december", "1 januari", "5 januari", "7 januari"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
      image: "/family/1.jpg",
    },
    {
      question: "Wie is op wie afgestapt op het feest",
      answers: [
        "Katinka op Jeremy",
        "Jeremy op Katinka",
        "Tegen elkaar aan gebotst",
        "Celine heeft ons gekoppeld",
      ],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat waren we van elkaar vergeten na de eerste avond?",
      answers: ["Leeftijd", "Schoenmaat", "Telefoonnummer", "Naam"],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Welke film hebben we gezien voor de eerste date?",
      answers: [
        "Paddington in Peru",
        "Lilo & Stitch",
        "We live in time",
        "Gladiator 2",
      ],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Voor welk bedrijf werkt Jeremy?",
      answers: ["NS", "Secret Ninjas", "Rabobank", "Code Pirates"],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Hoeveel dagen van de totaal 109 dagen die Katinka in Amerika is geweest hebben we minsten één uur gefacetimed?",
      allowedDifference: 3,
      unit: "dagen",
      questionType: QuestionType["Number input"],
    },
    {
      question: "Als wat waren we verkleed voor carnaval?",
      answers: [
        "Vrijheidsbeeld & toerist",
        "Koempels",
        "Mario & Luigi",
        "Oreo",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Waar waren op vakantie in Duitsland?",
      answers: ["Einruhr", "Berlijn", "Keulen", "Gemünd"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Wat heeft Katinka niet van Jeremy gekregen op haar verjaardag?",
      answers: ["Kaart", "Snoepzak", "Prullenbak", "Ketting"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: `Hoeveel dagen hebben we van 1 januari tot New York (11 mei) samen doorgebracht?`,
      answers: ["16", "18", "20", "21"],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat is geen dagelijkse snack voor Jeremy?",
      answers: [
        "Proteine pudding",
        "Appel met pindakaas",
        "Paprika rijstwafels",
        "Banaan met nutella",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Welke wedstrijd tussen ons heeft katinka niet gewonnen?",
      answers: ["Minigolf", "Pingpong", "Flipperen", "Zwemmen"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat zijn de namen van de katten bij ons thuis?",
      answers: ["Coco & Chanel", "Abel & Leo", "Guus & Erwin", "Balou & Nova"],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Hoe oud zijn we samen?",
      correctAnswer: 52,
      allowedDifference: 0,
      questionType: QuestionType["Number input"],
    },
    {
      question: "Welke blunders zijn niet gemaakt door Katinka?",
      answers: [
        `Van de trap gevallen`,
        `Koffie geknoeid over kleding`,
        `Chocolade in bed laten vallen`,
        `Sleutel vergeten`,
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Waar werkt Jeremy zijn moeder?",
      answers: ["Home Instead", "Andi", "Dovida", "Envida"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wie speelt er vaker vals?",
      answers: [`Jeremy`, `Katinka`, `Bertha`, `Celine`],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat voor een hond heeft Jeremy?",
      answers: [
        "Labrador",
        "Duitse herder",
        "Amerikaanse Franco",
        "Chiwawa (?)",
      ],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Door wie moesten we teruggaan om augurk suikerspin te proberen?",
      answers: ["Celine", "Celine", "Celine", "Celine"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Waar heeft Jeremy als enige een filmpje van gemaakt in New York?",
      answers: [
        "Het Vrijheidsbeeld",
        "De subway",
        "Van zijn hamburger",
        "Het aanmeren van de boot",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Waar heeft Jeremy als enige een filmpje van gemaakt in New York?",
      answers: [
        "Het Vrijheidsbeeld",
        "De subway",
        "Van zijn hamburger",
        "Het aanmeren van de boot",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
  ]);

  const [finalAnswerGiven, setFinalAnswerGiven] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [hideConfettiIntially, setHideConfettiIntially] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAllResults, setShowAllResults] = useState(false);
  const [currentPrize, setCurrentPrize] = useState("");
  const audioCorrectRef = React.createRef();
  const audioWrongRef = React.createRef();
  const musicRef = React.createRef();
  const quizRef = React.createRef();
  const [hasStarted, setHasStarted] = useState(false);
  const [initialStart, setInitialStart] = useState(true);

  // Set the initial volume when the component is mounted
  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = 0.1; // Set the volume to 50%
    }

    if (quizRef.current) {
      quizRef.current.volume = 0.1; // Set the volume to 50%
    }
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    if (hasStarted) {
      musicRef.current.play();
      quizRef.current.pause();
    }
  }, [hasStarted]);

  function checkAnswer(answer) {
    setShowResults(true);

    const question = questions[currentQuestion];
    if (
      (question.questionType === QuestionType["Multiple Choice"] &&
        question.correctAnswer === answer) ||
      (question.questionType === QuestionType["Number input"] &&
        Math.abs(question.correctAnswer - answer) <= question.allowedDifference)
    ) {
      setCorrectAnswers(correctAnswers + 1);
      audioCorrectRef.current.play();
    } else {
      audioWrongRef.current.play();
    }
    if (currentQuestion === questions.length - 1) {
      musicRef.current.play();
      quizRef.current.play();
    }
    setTimeout(() => {
      if (currentQuestion !== questions.length - 1) {
        setShowResults(false);
        setCurrentQuestion(currentQuestion + 1);
        setUserInput("");
      } else {
        setFinalAnswerGiven(true);
      }
    }, 5000);
  }

  function toggleConfettiy() {
    if (hideConfettiIntially) {
      setHideConfettiIntially(false);
    }
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }

  function renderQuestion(question) {
    switch (question.questionType) {
      case QuestionType["Multiple Choice"]:
        return (
          <div className="grid grid-cols-2 gap-8">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(index)}
                disabled={showResults}
                className={`bg-black text-white !border-none  !outline-none rounded p-4 min-w-40 text-center transition ${
                  showResults
                    ? question.correctAnswer === index
                      ? "!bg-green-600"
                      : "!bg-red-600"
                    : "hover:scale-105"
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        );
      case QuestionType["Number input"]:
        return (
          <div className="flex flex-col gap-4">
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className={`p-2 rounded border ${
                showResults
                  ? Math.abs(question.correctAnswer - parseInt(userInput)) <=
                    question.allowedDifference
                    ? "bg-green-600"
                    : "bg-red-600"
                  : ""
              }`}
              disabled={showResults}
            />
            {question.allowedDifference > 0 && (
              <span>
                Je mag er ±{question.allowedDifference} {question.unit} vanaf
                zitten
              </span>
            )}
            {showResults && (
              <span className="text-xl">
                Het juiste antwoord was: {question.correctAnswer}{" "}
                {question.unit}
              </span>
            )}
            <button
              onClick={() => checkAnswer(parseInt(userInput))}
              disabled={showResults}
              className={`bg-green-600 text-white px-4 py-2 rounded !border-none !outline-none transition  ${
                showResults ? "" : "hover:scale-105"
              }`}
            >
              Dit is mijn antwoord
            </button>
          </div>
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    if (!initialStart) {
      if (currentQuestion !== questions.length - 1) {
        if (showModal) {
          musicRef.current.pause();
          quizRef.current.play();
        } else {
          musicRef.current.play();
          quizRef.current.pause();
        }
      }
    } else {
      setInitialStart(false);
    }
  }, [showModal]);

  const [prizes, setPrizes] = useState([
    {
      amountRequired: 1,
      prize: "Gratis pokerchip",
    },
    {
      amountRequired: 5,
      prize: "Steel een pokerchip van een ander team.",
    },
    {
      amountRequired: 8,
      prize: "Sckakel een ander team naar keuze uit voor de volgende vraag.",
    },
    {
      amountRequired: 10,
      prize: "Twee gratis pokerchips",
    },
    {
      amountRequired: 12,
      prize: "Toegestaan valsspelen voor de volgende vraag.",
    },
    {
      amountRequired: 15,
      prize: "Wissel de verzamelde pokerchips van twee teams naar keuze.",
    },
    {
      amountRequired: 20,
      prize: "Steel een pokerchip van elk team.",
    },
    {
      amountRequired: 25,
      prize:
        "Verdien voor de resterende vragen twee pokerchips voor een goed antwoord.",
    },
  ]);

  useEffect(() => {
    if (
      correctAnswers ===
      prizes.find((prize) => prize.amountRequired === correctAnswers)
        ?.amountRequired
    ) {
      toggleConfettiy();
      setShowModal(true);
      setCurrentPrize(
        prizes.find((prize) => prize.amountRequired === correctAnswers)?.prize
      );
    }
  }, [correctAnswers]);

  return (
    <>
      {!hideConfettiIntially && <Confetti recycle={showConfetti} />}
      <Modal
        showPrize
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
        content={
          <div className="flex flex-col gap-6 items-center text-center">
            {winners[
              prizes.findIndex((prize) => prize.prize === currentPrize)
            ] && (
              <h1 className="text-2xl">
                {
                  winners[
                    prizes.findIndex((prize) => prize.prize === currentPrize)
                  ]
                }
                &nbsp;hebben gewonnen!
              </h1>
            )}
            {currentPrize}

            {!winners[
              prizes.findIndex((prize) => prize.prize === currentPrize)
            ] && (
              <Dice
                size={200}
                rollingTime={3000}
                disabled={
                  winners[
                    prizes.findIndex((prize) => prize.prize === currentPrize)
                  ] === null || disableDice
                }
                faces={[
                  "/family/joke-alexander.png",
                  "/family/femke-opa.png",
                  "/family/femke-opa.png",
                  "/family/celine-mitch.png",
                  "/family/oma-bertha.png",
                  "/family/oma-bertha.png",
                ]}
                onRoll={(value) => {
                  let winner = "";
                  if (value === 1) {
                    winner = "Joke & Alexander";
                  } else if (value === 2) {
                    winner = "Opa & Femke";
                  } else if (value === 3) {
                    winner = "Opa & Femke";
                  } else if (value === 4) {
                    winner = "Celine & Mitch";
                  } else if (value === 5) {
                    winner = "Oma & Bertha";
                  } else if (value === 6) {
                    winner = "Oma & Bertha";
                  }

                  setDisableDice(true);
                  setTimeout(() => {
                    setWinners((prevWinners) => {
                      const updatedWinners = [...prevWinners];
                      const prizeIndex = prizes.findIndex(
                        (prize) => prize.prize === currentPrize
                      );
                      updatedWinners[prizeIndex] = winner;
                      return updatedWinners;
                    });
                    setDisableDice(false);
                  }, 2000);
                }}
              />
            )}
          </div>
        }
      ></Modal>
      <Modal
        closeModal={() => setShowAllResults(false)}
        isOpen={showAllResults}
        content={
          <ul className="gap-y-3 flex flex-col">
            {winners.map(
              (winner, index) =>
                prizes[index] && (
                  <li className="flex gap-x-2" key={index}>
                    <div>
                      <img
                        className="min-w-5 w-5 max-w-5 mt-1.5"
                        src="/anniversary/trophy.png"
                      />
                    </div>
                    {winner} - {prizes[index].prize}
                  </li>
                )
            )}
          </ul>
        }
        showPrize={false}
      ></Modal>
      <audio ref={audioCorrectRef} src="/anniversary/correct.mp3" />
      <audio ref={audioWrongRef} src="/anniversary/wrong.mp3" />
      <audio loop ref={musicRef} src="/anniversary/music.mp3" />
      <audio loop autoPlay ref={quizRef} src="/anniversary/quiz.mp3" />

      <div className="flex py-8 flex-col md:flex-row space-y-8 md:space-x-8 md:space-y-0 md:px-32 items-center justify-center flex-1 bg-gray-900">
        {hasStarted ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{ duration: 0.3 }}
                key={currentQuestion}
                className="mr-auto  w-full flex flex-col gap-y-8 items-center justify-center"
              >
                <h1 className="text-center  max-w-[850px] px-2 md:px-0 mb-8 text-lg md:text-3xl">
                  {currentQuestion + 1}/{questions.length}.&nbsp;
                  {questions[currentQuestion].question}
                </h1>

                <div>{renderQuestion(questions[currentQuestion])}</div>

                {questions[currentQuestion].image && (
                  <img
                    className="rounded-md border border-gray-900 shadow-lg ]"
                    src={questions[currentQuestion].image}
                    width={200}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="w-full text-center text-xl max-w-72">
              <ul className="flex flex-col">
                {prizes
                  .slice() // Use slice to avoid mutating the original array
                  .reverse()
                  .map((prize, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        correctAnswers >= prize.amountRequired &&
                          setShowModal(true);
                        correctAnswers >= prize.amountRequired &&
                          setCurrentPrize(prize.prize);
                      }}
                      className={`transition duration-300 border bg-black rounded-lg p-2 text-white min-w-72 ${
                        correctAnswers >= prize.amountRequired
                          ? "opacity-100 bg-green-600"
                          : "opacity-60"
                      }
                    ${
                      correctAnswers >= prize.amountRequired
                        ? "cursor-pointer hover:bg-green-500"
                        : ""
                    }
                    `}
                    >
                      {prize.amountRequired}
                    </li>
                  ))}
              </ul>
              {currentQuestion >= 0 && (
                <div className="mt-8">
                  <h1 className="text-2xl">{correctAnswers} ✅</h1>
                </div>
              )}
              {currentQuestion >= 24 && finalAnswerGiven && (
                <button
                  className="w-fit mx-auto bg-white text-black mt-6 z-20 !outline-none !border-none hover:scale-105 transition"
                  onClick={() => setShowAllResults(true)}
                >
                  Toon alle resultaten
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 p-2 md:p-8">
            {/* Glowing Frame */}
            <div
              className="relative bg-gradient-to-b from-red-600 to-purple-800 rounded-2xl shadow-lg 
              px-4 py-4 md:px-16 md:py-16 text-center text-white max-w-3xl gap-4 flex flex-col"
            >
              {/* Lampjes */}
              <div
                className="absolute inset-0 ] border-transparent rounded-2xl before:absolute before:inset-0 
                before:rounded-2xl before:border-[10px] before:border-yellow-300 before:animate-pulse"
              ></div>

              <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">
                Welkom bij de ultieme 5,5 maand quiz!
              </h1>

              <div className="flex flex-col gap-2 text-lg font-medium">
                <p>
                  We zijn nu officieel <strong>5,5 maanden</strong> samen
                  (toevallig kennen we elkaar ook zo lang)! Jullie zijn vanaf
                  het begin heel nieuwsgierig geweest (vooral Celine & Mitch),
                  maar hoe goed hebben jullie eigenlijk opgelet?
                </p>
                <p>
                  Beantwoord de vragen zo goed mogelijk—geen druk hoor… wij
                  zullen jullie <em>nauwelijks</em> judgen. 😇
                </p>

                <p>
                  Er zijn tussendoor prijzen te winnen om het extra spannend te
                  maken. Zodra er een prijs is gewonnen, moet nog worden bepaald
                  <strong> wie</strong> er heeft gewonnen.
                </p>
                <p>
                  Om het spel eerlijk te maken hebben we voor twee teams een
                  extra regel: ieder teamlid moet individueel een antwoord
                  opschrijven, zorg dat jullie op één lijn zitten, want alleen
                  als jullie beiden het goede antwoord raden kunnen er punten
                  gescoord worden.
                </p>
                <p>
                  Om in casino-thema te blijven is het doel van de quiz om
                  zoveel mogelijk pokerchips te verzamelen. Heel veel succes en
                  laten we duidelijk zijn: valsspelen wordt niet getolereerd!
                </p>
              </div>

              <button
                onClick={() => setHasStarted(true)}
                className="w-fit mx-auto bg-gray-900 mt-6 z-20 !outline-none !border-none hover:scale-105 transition"
              >
                We gaan beginnen!
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FamilyWeekend;
