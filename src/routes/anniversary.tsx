import { set } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import Modal from "../components/modal";
import React from "react";

enum QuestionType {
  "Multiple Choice" = "Multiple Choice",
  "Number input" = "Number input",
}

function Anniversary() {
  const [questions, setQuestions] = useState([
    {
      question:
        "Wat was de volgorde van onze ongemakkelijke eerste ontmoeting?",
      answers: [
        "Naam, hand, knuffel ",
        "Naam, knuffel, hand",
        "Hand, naam, knuffel",
        "Knuffel, hand, naam",
      ],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Hoelang duurde het voordat ik moest plassen op het nieuwjaarsfeestje?",
      answers: ["1 uur", "Half uur", "2 uur", "Direct"],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Bij welk spel ben je naast me komen staan?",
      answers: ["Roulette", "Dobbelspel", "Blackjack", "Poker"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Toen je je camera aan mij toevertrouwde (gewaagd) was hij toen al op?",
      answers: ["Ja", "Nee"],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wie heeft de ander meer alcohol gegeven?",
      answers: ["Katinka", "Jeremy"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Hoe vaak is Jeremy verteld dat wij het wel héél leuk samen hadden, vóór nieuwjaar?",
      answers: ["0x", "2x", "3x", "5x"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Was de onderstaande foto genomen voor of na 12 uur?",
      answers: ["Voor", "Na", "Ik denk dat Jeremy dit niet meer exact weet"],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
      image: "/days/43.jpg",
    },
    {
      question: "Wie heeft er vaker gewonnen met Roulette?",
      answers: [
        "Jeremy",
        "Katinka",
        "Precies even vaak",
        "Als het antwoord Jeremy is dan geloof ik het niet",
      ],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Hoe vaak hebben we het luchtbed opnieuw opgeblazen in de nacht?",
      correctAnswer: 2,
      allowedDifference: 0,
      unit: "keer",
      questionType: QuestionType["Number input"],
    },
    {
      question: "Wat was het eerste berichtje dat je me stuurde?",
      answers: [
        "Heyy, beetje bij kunnen slapen in de trein?",
        "Heyy, nog een beetje bij kunnen slapen?",
        "Heyy, nog bijgekomen van gisteren?",
        "Heyy, hoe is het met je?",
      ],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/whatsapp.png",
    },
    {
      question: "In welk restaurant was onze eerste date?",
      answers: ["Tabkeaw", "Harry's", "Bikke", "Le Fernand"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Hoeveel minuten duurt We live in time?",
      correctAnswer: 108,
      allowedDifference: 5,
      unit: "minuten",
      questionType: QuestionType["Number input"],
      image: "/anniversary/in-time.jpg",
    },
    {
      question: "Wat heeft Jeremy geleerd van We live in time?",
      answers: [
        "Laat Katinka nooit een stoel uitkiezen",
        "Dat hij graag een stopwatch wil hebben",
        "Hoe hij eieren moet scheiden",
        "Dat Katinka haar telefoon het nooit doet",
      ],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/pathe.png",
    },
    {
      question: "Hoe heet het bos waar we zijn gaan wandelen?",
      answers: ["Steinerbos", "Stammenderbos", "Danikerbos", "Absbroekbos"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
      image: "/days/35.jpg",
    },
    {
      question:
        "Hoeveel glazen wijn had Katinka op tijdens onze ondervraging bij de van der valk?",
      answers: [
        "Geen",
        "2 glazen",
        "4 glazen",
        "Daar zijn we het niet over eens",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
      image: "/days/41.jpg",
    },
    {
      question: "Wie heeft er gewonnen met het potje pesten bij de Gouv?",
      answers: [
        "Jeremy won",
        "Katinka won",
        "Jeremy won, maar ik weiger dat toe te geven",
        "Het was gelijk",
      ],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/gouv.jpeg",
    },
    {
      question:
        "Hoeveel cocktails hebben we individueel gedronken bij bar Nola?",
      correctAnswer: 2,
      allowedDifference: 0,
      questionType: QuestionType["Number input"],
      image: "/anniversary/bar-nola.jpeg",
    },
    {
      question:
        "Hoe antwoorde Katinka toen Jeremy vroeg of ze zijn vriendin wilde zijn?",
      answers: [
        "Ze riep 'JA!'",
        "Ze knikte en glimlachte",
        "Ze draaide zich om en lachte",
        "Ze gaf hem een knuffel",
      ],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Hoeveel dagen zitten er tussen het moment dat ik je naar het vliegveld bracht en de volgende keer dat we elkaar weer zouden zien?",
      correctAnswer: 54,
      allowedDifference: 1,
      unit: "dagen",
      questionType: QuestionType["Number input"],
      image: "/days/42.jpg",
    },
    {
      question:
        "Welke kleur heeft Jeremy gekozen voor de achtergrond van het zelfportret dat hij van Katinka heeft gemaakt?",
      answers: ["Blauw", "Rood", "Bruin", "Groen"],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
      image: "/days/38.jpg",
    },
    {
      question: "Hoeveel zwemtrainingen heeft Jeremy tot nu toe gedaan?",
      correctAnswer: 3,
      allowedDifference: 0,
      questionType: QuestionType["Number input"],
      image: "/days/40.jpg",
    },
    {
      question: "Wat vindt Jeremy het mooiste aan Katinka?",
      answers: ["Ogen", "Glimlach", "Haar", "Billen"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Welke van de onderstaande reeks aan datums is correct? Leg ook kort uit wat er bij elke datum hoort.",
      answers: [
        "31 dec, 02 jan, 05 jan, 13 jan, 17 jan, 3 maart, 8 maart, 12 maart, 23 april",
        "31 dec, 01 jan, 05 jan, 11 jan, 18 jan, 2 maart, 7 maart, 14 maart, 23 april",
        "31 dec, 03 jan, 05 jan, 13 jan, 18 jan, 1 maart, 7 maart, 12 maart, 23 april",
        "31 dec, 04 jan, 06 jan, 13 jan, 19 jan, 2 maart, 9 maart, 12 maart, 22 april",
      ],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Welke van deze theeën is jouw favoriet?",
      answers: [
        "Lavendel",
        "Ochtendmelange",
        "Rooibos",
        "Geen van bovenstaande, heb je goed opgelet?",
      ],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/lavendel.avif",
    },
    {
      question: "Hoeveel uur hebben we tot nu toe gebeld?",
      correctAnswer: 104,
      allowedDifference: 10,
      unit: "uur",
      questionType: QuestionType["Number input"],
    },
  ]);

  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [hideConfettiIntially, setHideConfettiIntially] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showModal, setShowModal] = useState(false);
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

  const [prizes] = useState([
    {
      amountRequired: 3,
      prize:
        "Een knuffel om je te laten weten dat ik van je hou – 1x inzetbaar",
    },
    {
      amountRequired: 5,
      prize:
        "Een lief berichtje om je dag op te vrolijken (of een voice-memo, jouw keuze!)",
    },
    {
      amountRequired: 8,
      prize:
        "Een dag helemaal zonder pesten – jouw keuze wanneer je dat wilt inzetten",
    },
    {
      amountRequired: 10,
      prize: "Eén verzoek naar keuze (binnen redelijke grenzen)",
    },
    {
      amountRequired: 12,
      prize:
        "Een filmavond met jouw favoriete film, inclusief popcorn (natuurlijk!)",
    },
    {
      amountRequired: 15,
      prize: "Een driegangen diner, speciaal voor jou, door mij bereid",
    },
    {
      amountRequired: 20,
      prize: "Een weekend weg naar de bestemming van jouw keuze",
    },
    { amountRequired: 25, prize: "Een extra TikTok-filmpje" },
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
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
        content={currentPrize}
      ></Modal>
      <audio ref={audioCorrectRef} src="/anniversary/correct.mp3" />
      <audio ref={audioWrongRef} src="/anniversary/wrong.mp3" />
      <audio loop ref={musicRef} src="/anniversary/music.mp3" />
      <audio loop autoPlay ref={quizRef} src="/anniversary/quiz.mp3" />

      <div className="flex space-x-8 px-32 items-center justify-center flex-1 bg-gray-900">
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
                <h1 className="text-center mb-8">
                  {currentQuestion + 1}.&nbsp;
                  {questions[currentQuestion].question}
                </h1>
                {renderQuestion(questions[currentQuestion])}

                {questions[currentQuestion].image && (
                  <img width={300} src={questions[currentQuestion].image} />
                )}
              </motion.div>
            </AnimatePresence>
            <div>
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
              </div>
            </div>
          </>
        ) : (
          <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8">
            {/* Glowing Frame */}
            <div
              className="relative bg-gradient-to-b from-red-600 to-purple-800 rounded-2xl shadow-lg 
              px-16 py-16 text-center text-white max-w-3xl gap-4 flex flex-col"
            >
              {/* Lampjes */}
              <div
                className="absolute inset-0 ] border-transparent rounded-2xl before:absolute before:inset-0 
                before:rounded-2xl before:border-[10px] before:border-yellow-300 before:animate-pulse"
              ></div>

              <h1 className="text-3xl font-bold mb-4 drop-shadow-lg">
                Welkom bij de ultieme 1-maands-quiz!
              </h1>

              <div className="flex flex-col gap-2 text-lg font-medium">
                <p>
                  We zijn nu officieel <strong>1 maand</strong> samen! Maar hoe
                  goed ken je eigenlijk onze momenten samen? 🤔 Tijd om dat te
                  testen!
                </p>
                <p>
                  Beantwoord de vragen zo goed mogelijk—geen druk hoor… ik zal
                  je *nauwelijks* judgen. 😇
                </p>
                <p>
                  Voor een aantal goed beantwoorde vragen verdien je een prijs.
                  Hoe meer je er goed hebt, hoe beter de beloningen!
                </p>
                <p>
                  Succes… en maak me trots (of laat me lachen)! 😏 Veel plezier!
                </p>
              </div>

              <button
                onClick={() => setHasStarted(true)}
                className="w-fit mx-auto bg-gray-900 mt-6 z-20 !outline-none !border-none hover:scale-105 transition"
              >
                Ik wil beginnen!
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Anniversary;
