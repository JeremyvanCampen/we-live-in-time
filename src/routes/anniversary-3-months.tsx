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

function AnniversaryThreeMonths() {
  const [winners, setWinners] = useState([]);
  const [disableDice, setDisableDice] = useState(false);
  const [questions, setQuestions] = useState([
    {
      question:
        "Op welke afstand is Jeremy in slaap gevallen tijdens de conference?",
      answers: ["200 yards", "500 yards", "800 yards", "1000 yards"],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/1.jpg",
    },
    {
      question: "Wie heeft de grootste hap van onze Oreo's genomen?",
      answers: ["Joshua", "Celine", "Maud", "Mitch"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/2.jpg",
    },
    {
      question:
        "Welke drie toetjes hadden we als optie toen we bij je oma zijn gaan eten?",
      answers: [
        "Vanille-ijs, chocolade ijs en viennetta",
        "Slagroomijs, advocaat-chocolade ijs en sorbetijs",
        "Vanille-ijs, mango ijs en viennetta",
        "Slagroomijs, advocaat-chocolade ijs en viennetta",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/3.jpg",
    },
    {
      question: "Wie heeft er gewonnen met onze zwemwedstrijd?",
      answers: [
        "Jeremy",
        "Katinka",
        "Het was gelijk",
        "Het antwoord is Katinka, maar ik weet niet of Jeremy dat zou toegeven",
      ],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat was onze code voor de sleutelkast in Einruhr?",
      answers: ["7335", "7225", "7223", "7332"],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Bij welke supermarkten zijn we geweest onderweg naar Einruhr?",
      answers: ["Netto & Aldi", "Netto & Lidl", "Aldi & Lidl", "Netto & Rewe"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Hoe heet de route die we hebben gevolgd tijdens onze hike?",
      answers: [
        "RurUfersteig",
        "Eifelsteig",
        "Eifelsteig-RurUfersteig",
        "RurUfersteig-Eifelsteig",
      ],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/7.jpg",
    },
    {
      question: `Hoe heet de verlate 'stad' waar we doorheen zijn gelopen op de helft van onze hike?`,
      answers: ["Wollseifen", "Vogelsang IP", "Gemünd", "Morbach"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/8.jpg",
    },
    {
      question: "Wie heeft mooier gezongen tijdens onze karaoke sessie?",
      answers: [
        "Is dit een strikvraag?",
        "Jeremy",
        "Katinka",
        "De artiesten zelf",
      ],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/9.jpg",
    },
    {
      question: "Hoe heet het taxi bedrijf waar ik mee heb gebeld in gemund?",
      answers: [
        "Funk-Taxi Johann Faber Inh. Agnes Faber",
        "Taxi Nikolaus II GmbH",
        "Taxi Top Team",
        "Busbetrieb Esch",
      ],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Hoeveel km/u reden wij toen we onze boete kregen?",
      correctAnswer: 61,
      allowedDifference: 2,
      unit: "km/u",
      questionType: QuestionType["Number input"],
      image: "/anniversary/11.jpg",
    },
    {
      question: "Wat voor een stuk fruit gaf je me bij je opa?",
      answers: ["Mandarijn", "Appel", "Peer", "Sinaasappel"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat was jouw verjaardagsontbijt?",
      answers: [
        `Pannenkoek met nutella, stukjes appel, jus d'orange en melk`,
        `Pannenkoek met nutella, stukjes appel, jus d'orange`,
        `Pannenkoek met nutella, peer, jus d'orange en melk`,
        `Pannenkoek met nutella, stukjes appel, croissantje en melk`,
      ],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat hebben we met zijn vieren gespeeld na de high tea?",
      answers: [
        "Darten",
        "Sjoelen",
        "Tafeltennis",
        "Kun je dat wat Jeremy deed sjoelen noemen?",
      ],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/13.jpg",
    },
    {
      question: "Hoeveel punten verschil zat er tussen ons bij glowgolf?",
      correctAnswer: 10,
      allowedDifference: 1,
      questionType: QuestionType["Number input"],
    },
    {
      question:
        "Hoe heette het restaurant waar we zijn gaan eten op je verjaardag?",
      answers: [
        "Gasterij koningswinkelhof",
        "Harry's",
        "Aan de linde",
        "Bikke",
      ],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/15.jpg",
    },
    {
      question: "Waar hebben Julia en Jeremy het meest samen over gepraat?",
      answers: ["Intolerantie voor eten", "Sporten", "Katinka", "Pindakaas"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/16.jpg",
    },
    {
      question: "Hoeveel mensen waren aanwezig op jouw verjaardsfeest?",
      correctAnswer: 10,
      allowedDifference: 0,
      unit: "personen",
      questionType: QuestionType["Number input"],
    },
    {
      question: `Wat was Katinka's favoriete cadeau voor haar verjaardag?`,
      answers: [
        "Ketting",
        "Dweil",
        "Prullenbak",
        "Ik denk dat Jeremy denkt dat het de ketting is, maar dat is het niet",
      ],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/17.jpg",
    },
    {
      question:
        "Toen Jeremy alle spullen is gaan halen toen hij zijn sleutel was vergeten, hoeveel tassen had hij toen vast?",
      correctAnswer: 7,
      allowedDifference: 0,
      unit: "tassen",
      questionType: QuestionType["Number input"],
      image: "/anniversary/18.jpg",
    },
    {
      question:
        "Welk bordspel hebben we zowel met Julia als met jouw familie gespeeld?",
      answers: ["Tafeltennis", "30 seconds", "Skibbidy", "Regenwormen"],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat hebben we gegeten op onze laatste avond samen?",
      answers: ["Tokyoto", "Tabkeaw", "Dadawan", "Sashimi"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Hoe kan Katinka het beste aan school werken?",
      answers: [
        "Als Jeremy aan het werk is",
        "Als Jeremy zit te eten",
        "Als Jeremy zit te puzzelen",
        "Als we niet bellen",
      ],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Welke fictieve karakters hebben we getekend tijdens een van onze online dates?",
      answers: [
        "Winnie the pooh, Olaf, Pluto en Donald Duck",
        "Winnie the dooh, Stitch, Olaf en Pluto",
        "Winnie the pooh, Olaf, Pluto en Goofy",
        "Winnie the pooh, Stitch, Olaf en Pluto",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
      image: "/anniversary/24.jpg",
    },
    {
      question:
        "Hoeveel alinea's had Jeremy's liefdesbrief die je hebt gekregen voor het 3 maanden samen zijn?",
      correctAnswer: 8,
      allowedDifference: 0,
      unit: "alinea's",
      questionType: QuestionType["Number input"],
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
    }, 0);
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
      prize: "Een drankje of snacks naar keuze, helemaal voor jou.",
    },
    {
      amountRequired: 5,
      prize: "Een foto van mij met een bordje en een boodschap naar keuze.",
    },
    {
      amountRequired: 8,
      prize:
        "Een ‘goed voor één’ kaartje: ik luister een hele dag zonder je te onderbreken.",
    },
    {
      amountRequired: 10,
      prize: "Een volledige massage.",
    },
    {
      amountRequired: 12,
      prize: "Een diner naar keuze, speciaal voor jou klaargemaakt.",
    },
    {
      amountRequired: 15,
      prize: "Een dag waarop jij beslist wat we doen.",
    },
    {
      amountRequired: 20,
      prize: "Een surprise-date, alles wordt voor jou geregeld.",
    },
    {
      amountRequired: 25,
      prize: "Een collage van foto’s met onze mooiste momenten samen.",
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
                &nbsp;heeft gewonnen!
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
                  "/anniversary/jeremy_1.jpg",
                  "/anniversary/katinka_1.jpg",
                  "/anniversary/jeremy_2.jpg",
                  "/anniversary/katinka_2.jpg",
                  "/anniversary/jeremy_3.jpg",
                  "/anniversary/katinka_3.jpg",
                ]}
                onRoll={(value) => {
                  const winner =
                    value === 1 || value === 3 || value === 5
                      ? "Jeremy"
                      : "Katinka";

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
                  {currentQuestion + 1}.&nbsp;
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
                Welkom bij de ultieme 3-maands-quiz!
              </h1>

              <div className="flex flex-col gap-2 text-lg font-medium">
                <p>
                  We zijn nu officieel <strong>3 maanden</strong> samen! Maar
                  hoe goed ken je eigenlijk onze momenten samen? Bij deze eerste
                  quiz viel je kennis helaas tegen, dus dit is je kans om dat
                  recht te zetten!
                </p>
                <p>
                  Er is deze keer wel een twist: er zijn natuurlijk nieuwe
                  prijzen, maar het zou te makkelijk zijn als jij alles zou
                  winnen. Zodra je een prijs hebt gewonnen, moet nog worden
                  bepaald <strong>wie</strong> dat heeft gewonnen.
                </p>
                <p>
                  Dit wordt natuurlijk geheel eerlijk gedaan doordat er
                  willekeurig een winnaar gekozen wordt. Dus je zal er maar op
                  moeten vertrouwen dat dit eerlijk gebeurt! Ik weet dat mijn
                  reputatie niet in mijn voordeel werkt, maar ik beloof dat er
                  niet wordt vals gespeeld!
                </p>
                <p>
                  Dus als je het hiermee eens bent, begin de quiz en accepteer
                  de gevolgen! Succes… en veel plezier!
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

export default AnniversaryThreeMonths;
