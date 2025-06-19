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
      question: "Sinds wanneer zijn we officieel samen?",
      answers: ["31 december", "1 januari", "5 januari", "7 januari"],
      correctAnswer: 2,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wie is op wie afgestapt op het nieuwjaarsfeest?",
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
      question: "Wat waren we van elkaar vergeten tijdens de eerste avond?",
      answers: ["Leeftijd", "Schoenmaat", "Telefoonnummer", "Naam"],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Naar welke film zijn we gegaan voor de eerste date?",
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
        "Van de 109 dagen dat Katinka zonder Jeremy in Amerika was dit jaar, hoeveel dagen hebben ze minimaal één uur met elkaar gebeld?",
      allowedDifference: 3,
      correctAnswer: 108,
      unit: "dagen",
      questionType: QuestionType["Number input"],
    },
    {
      question: "Als wat waren we verkleed voor carnaval?",
      answers: [
        "Vrijheidsbeeld & toerist",
        "Koempels",
        "Mario & Luigi",
        "Oreos",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Waar waren we op vakantie in Duitsland?",
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
      question:
        "Hoeveel personen waren er aanwezig op het verjaardsfeest van Katinka?",
      correctAnswer: 10,
      allowedDifference: 0,
      unit: "personen",
      questionType: QuestionType["Number input"],
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
      unit: "jaar",
      questionType: QuestionType["Number input"],
    },
    {
      question: "Welke blunder is niet gemaakt door Katinka?",
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
        "Door wie moesten we teruggaan om augurk suikerspin te proberen in New York?",
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
      question: "Op welk gebouw in New York hebben we samen gestaan?",
      answers: [
        "Empire State Building",
        "The Edge",
        "Chrysler Building",
        "Top of the Rock",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Welke bloemen kreeg Katinka voor haar afstuderen van Jeremy?",
      answers: ["Rode rozen", "Zonnebloemen", "Veldboeket", "Roze tulpen"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Wat stond er op het kunstwerk van Jeremy dat geveild kon worden op polarsteps?",
      answers: ["Falcon", "Windmolen", "Ridder", "Paard"],
      correctAnswer: 1,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question:
        "Welk gerecht heeft Katinka nog niet zelf gekookt sinds ze in Nederland is?",
      answers: ["Poke bowl", "Nacho ovenschotel", "Kip Teriyaki", "Lasagne"],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat is onze gezamenlijke lengte in centimeters?",
      correctAnswer: 369,
      allowedDifference: 5,
      unit: "cm",
      questionType: QuestionType["Number input"],
    },
    {
      question: "Welke date hebben we (nog) niet samen gedaan?",
      answers: [
        "Prison Island",
        "Blotevoetenpad",
        "Kinderboerderij",
        "Escape Room",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Waar gaan we op vakantie?",
      answers: ["Sicilië", "Ibiza", "Gran Canaria", "Sardinië"],
      correctAnswer: 0,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wie is het leukste koppel hier?",
      answers: [
        "Joke & Alexander",
        "Oma & Bertha",
        "Opa & Femke",
        "Katinka & Jeremy",
      ],
      correctAnswer: 3,
      questionType: QuestionType["Multiple Choice"],
    },
    {
      question: "Wat zijn Jeremy's middelnamen?",
      answers: [
        "Willem Cornelis",
        "Johannes Henry",
        "Gerrit Nicolaas",
        "Frederik Anton",
      ],
      correctAnswer: 1,
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
      musicRef.current.volume = 0.15; // Set the volume to 50%
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
                className={`bg-black text-white !border-none !outline-none rounded p-4 min-w-40 2xl:min-w-72 2xl:text-xl 2xl:py-7 text-center transition ${
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
              <span className="2xl:text-xl">
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
              className={`bg-yellow-500 text-black px-4 py-4 mt-4 rounded !border-none !outline-none transition  ${
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
      

      <div className="flex py-8 md:py-0 flex-col md:flex-row space-y-8 md:space-x-8 md:space-y-0 md:px-32 items-center justify-center flex-1 bg-[oklch(39.6% 0.141 25.723)] relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 15 15"
          version="1.1"
          id="casino"
          className="text-white w-20 aspect-square absolute top-1/2 left-5 -rotate-12"
        >
          <path
            d="M8.5,10c0.4561,0.6072,1.1821,1,2,1c1.3807,0,2.5-1.1193,2.5-2.5c0-0.5642-0.1938-1.0789-0.509-1.4973L12.5,7l-5-6l-5,6&#10;&#9;l0.009,0.0027C2.1938,7.4211,2,7.9358,2,8.5C2,9.8807,3.1193,11,4.5,11c0.8179,0,1.5439-0.3928,2-1&#10;&#9;C6.5997,9.8672,6.7902,9.6135,7,9.3337V11.5C7,13,4.5,13,4.5,13C4.2239,13,4,13.2238,4,13.5C4,13.7761,4.2239,14,4.5,14H7h1h2.5&#10;&#9;c0.2761,0,0.5-0.2239,0.5-0.5c0-0.2762-0.2239-0.5-0.5-0.5c0,0-2.5,0-2.5-1.5V9.3337C8.2098,9.6135,8.4003,9.8672,8.5,10z"
            fill="currentColor"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-black w-20 aspect-square absolute top-1/4 left-0 rotate-12"
          version="1.1"
          id="Icons"
          viewBox="0 0 32 32"
          xmlSpace="preserve"
        >
          <path
            d="M29.8,6.2l-3-3.9C26.5,2,26,1.9,25.6,2.1l-1.2,0.6c-2.9,1.4-6.1,1.7-9.2,0.8c-1.3-0.4-2.7-0.5-4-0.5H5C4.4,3,4,3.4,4,4v11.6  c0,0.6,0.4,1,1,1h4c0.6,0,1-0.4,1-1c0-1.6,1.3-2.9,3-2.9h2.9l-1.5,1.8c-3.5,4.2-6,9-7.4,14.3C7,29,7,29.4,7.2,29.6S7.7,30,8,30h13  c0.6,0,1-0.4,1-1c0-5.5,1.5-10.9,4.3-15.7l3.5-6C30.1,7,30,6.6,29.8,6.2z"
            fill="currentColor"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="_x32_"
          className="text-black w-20 aspect-square absolute top-3/4 left-0 rotate-12"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <g>
            <path d="M305.344,298.063c-2.75,5.172-6.531,9.484-11.344,13.016c-4.797,3.516-10.563,6.141-17.266,7.875   c-2.922,0.734-5.984,1.25-9.109,1.672v19.5h-23.25v-19.109c-6.641-0.563-12.969-1.594-18.938-3.234   c-9.125-2.5-21.031-12.563-21.031-12.563c-1.031-0.594-1.703-1.641-1.844-2.813c-0.156-1.156,0.25-2.344,1.063-3.188l11.672-11.656   c1.266-1.25,3.203-1.484,4.734-0.563c0,0,8.719,7.578,15.328,9.391c6.609,1.797,13.172,2.703,19.734,2.703   c8.25,0,15.063-1.453,20.484-4.375c5.422-2.938,8.109-7.469,8.109-13.688c0-4.453-1.313-7.984-4-10.578   c-2.656-2.563-7.156-4.172-13.531-4.875l-20.875-1.797c-12.375-1.219-21.906-4.656-28.625-10.313   c-6.719-5.688-10.047-14.281-10.047-25.797c0-6.359,1.281-12.031,3.859-17.016c2.594-4.984,6.109-9.188,10.578-12.625   c4.469-3.422,9.672-6.016,15.609-7.734c2.469-0.703,5.063-1.188,7.719-1.609v-16.813h23.25v16.469   c5.438,0.531,10.609,1.406,15.422,2.734c8.172,2.219,16.734,8.922,16.734,8.922c1.078,0.563,1.813,1.609,2,2.797   c0.188,1.219-0.219,2.406-1.063,3.281l-10.938,11.109c-1.156,1.172-2.969,1.469-4.469,0.703c0,0-6.469-4.609-12.063-6.063   s-11.469-2.203-17.656-2.203c-8.063,0-14.063,1.563-17.906,4.641c-3.875,3.109-5.813,7.141-5.813,12.109   c0,4.484,1.375,7.922,4.125,10.313c2.75,2.422,7.391,3.984,13.922,4.641l18.297,1.563c13.594,1.203,23.859,4.813,30.813,10.813   C306,259.734,309.469,268.5,309.469,280C309.469,286.891,308.094,292.906,305.344,298.063z" />
            <path d="M256,0C114.625,0,0,114.609,0,256c0,141.375,114.625,256,256,256c141.391,0,256-114.625,256-256   C512,114.609,397.391,0,256,0z M485.594,256c0,31.422-6.344,61.391-17.828,88.688l-44.016-18.234   c9.125-21.688,14.188-45.484,14.188-70.453c0-0.328-0.016-0.656-0.016-0.984h47.656C485.578,255.344,485.594,255.672,485.594,256z    M256,421.953C164.5,421.953,90.063,347.5,90.063,256S164.5,90.063,256,90.063S421.938,164.5,421.938,256   S347.5,421.953,256,421.953z M26.406,256c0-31.422,6.344-61.391,17.844-88.703l44.016,18.25   C79.125,207.234,74.063,231.031,74.063,256c0,0.328,0.016,0.641,0.016,0.969l-47.656,0.016   C26.422,256.656,26.406,256.328,26.406,256z M468.344,168.766L424.313,187c-9.344-22.703-23.125-43.109-40.297-60.125   l33.688-33.688C439.266,114.594,456.578,140.25,468.344,168.766z M344.688,44.234l-18.25,44.031   C304.766,79.125,280.969,74.063,256,74.063c-0.328,0-0.656,0.016-0.969,0.016V26.422c0.313,0,0.641-0.016,0.969-0.016   C287.422,26.406,317.375,32.766,344.688,44.234z M168.766,43.656L187,87.688c-22.688,9.344-43.109,23.125-60.125,40.297   L93.188,94.297C114.594,72.734,140.25,55.422,168.766,43.656z M43.656,343.219L87.688,325   c9.344,22.688,23.125,43.109,40.281,60.125l-33.688,33.688C72.719,397.406,55.406,371.75,43.656,343.219z M167.297,467.766   l18.234-44.031c21.688,9.156,45.5,14.219,70.469,14.219c0.328,0,0.656-0.031,0.969-0.031v47.656c-0.313,0-0.641,0.031-0.969,0.031   C224.563,485.609,194.594,479.25,167.297,467.766z M343.234,468.344L325,424.313c22.688-9.344,43.109-23.125,60.125-40.281   l33.688,33.688C397.406,439.266,371.75,456.578,343.234,468.344z" />
            <path d="M137.141,297.609c-0.859-2.625-3.266-4.281-5.859-4.281c-0.625,0-1.266,0.094-1.891,0.297   c-3.234,1.031-5.016,4.5-3.984,7.734c0.5,1.547,1.031,3.078,1.609,4.625l0.016,0.031l0.063,0.172v0.016v0.047l0,0l0.031,0.016   v0.016l0.063,0.156v0.031h0.031v0.031v0.016l0.016,0.031l0,0v0.047l0.031,0.109l0.016,0.016l0,0l0.016,0.016l0.016,0.031v0.031   v0.016l0.016,0.016l0.016,0.016v0.016l0.031,0.047v0.016l0.016,0.031l0.016,0.016v0.016v0.031v0.031h0.031v0.031v0.031v0.016   l0.016,0.031v0.016l0.016,0.031v0.016l0.031,0.031v0.016v0.016l0.016,0.031l0.016,0.031l0,0l0.016,0.031l0.016,0.016l0.031,0.078   v0.016v0.047l0,0v0.031l0.031,0.016v0.031v0.016l0.016,0.031h0.016l0.031,0.094l0,0l0.031,0.031v0.016l0.016,0.031l0,0l0.016,0.047   l0,0l0.063,0.219v0.016c2.156,5.422,4.75,10.656,7.719,15.625c1.141,1.922,3.188,3,5.281,3c1.078,0,2.156-0.281,3.156-0.875   c2.922-1.766,3.875-5.516,2.125-8.422C142.375,311.156,139.344,304.516,137.141,297.609z" />
            <path d="M179.422,156.109c2.734-1.984,3.344-5.844,1.359-8.578c-1.203-1.672-3.063-2.563-4.969-2.563   c-1.25,0-2.531,0.375-3.625,1.172l0,0l-0.031,0.016l-0.016,0.016l-0.016,0.016l-0.016,0.016l-0.016,0.016l-0.031,0.031h-0.031   l-0.016,0.031H172l-0.016,0.031h-0.016l-0.031,0.016l0,0l-0.016,0.016h-0.016l-0.094,0.063l-0.031,0.031v0.031h-0.031l-0.016,0.016   l-0.016,0.016h-0.016c-6.453,4.75-12.391,10.203-17.641,16.234c-2.234,2.563-1.953,6.453,0.609,8.672   c1.156,1.016,2.609,1.516,4.031,1.516c1.734,0,3.422-0.703,4.641-2.109C168.125,165.313,173.531,160.375,179.422,156.109z" />
            <path d="M203.031,370.297c-6.641-2.922-12.984-6.578-18.844-10.922c-1.094-0.797-2.375-1.188-3.656-1.188   c-1.875,0-3.734,0.875-4.938,2.5c-2.047,2.734-1.438,6.594,1.297,8.578c4.016,3,8.266,5.703,12.703,8.094l0.031,0.016l0,0   l0.031,0.031l0.125,0.063v0.031h0.031l0,0l0.063,0.016l0,0l0.141,0.063h0.016l0.016,0.031l0,0l0.016,0.031h0.016l0.016,0.016l0,0   l0.125,0.047l0,0h0.031l0.031,0.016l0.031,0.016h0.016l0.047,0.031l0,0v0.031l0,0l0.063,0.047l0,0l0.047,0.016h0.016h0.047   l0.016,0.016l0.031,0.016h0.016l0.109,0.063l0.031,0.016h0.031V378l0,0v0.016l0,0h0.031l0.031,0.016l0.094,0.047l0.031,0.016   l0.031,0.016l0.016,0.016h0.016h0.031v0.031h0.016h0.016v0.031h0.031l0,0h0.047l0.016,0.031h0.031l0.031,0.031h0.031h0.016   l0.047,0.031l0,0l0.031,0.016v0.016l0.031,0.016h0.031v0.016h0.031l0,0l0.031,0.016l0.031,0.016l0,0l0.031,0.016l0.016,0.016   l0.047,0.031h0.016l0.016,0.031h0.031l0.016,0.016h0.016l0.031,0.016v0.016h0.031h0.016h0.031l0.016,0.016l0.031,0.016l0.031,0.031   l0,0l0.031,0.016v0.016l0.031,0.016l0.031,0.016l0.031,0.016l0,0h0.031l0.031,0.016l0.031,0.016l0,0l0.031,0.016h0.031v0.016   l0.031,0.016l0.031,0.016l0,0l0.031,0.031l0,0l0.031,0.016l0.031,0.016l0.031,0.016l0,0l0.031,0.016h0.031l0.016,0.016l0.016,0.016   h0.031l0,0h0.031l0.016,0.031l0.078,0.031l0.016,0.031h0.016h0.031l0.016,0.031h0.016h0.031l0.016,0.016l0.016,0.016h0.031   l0.031,0.016h0.031v0.016l0.031,0.016l0.031,0.016v0.016h0.031v0.016l0.031,0.016h0.031l0.047,0.031l0.016,0.016h0.031l0.016,0.031   h0.016h0.031l0.016,0.016h0.016l0.031,0.016l0.094,0.063l0,0l0.031,0.016h0.016h0.016v0.016l0.031,0.016l0.031,0.016l0,0h0.031   l0.031,0.031h0.016l0.047,0.016l0,0h0.031v0.016l0.031,0.016l0.031,0.016l0.031,0.016l0,0l0.031,0.016v0.016l0.047,0.016h0.016   l0.031,0.016v0.016h0.031h0.031v0.031h0.031h0.031l0.016,0.016l0.016,0.016h0.016l0.047,0.031h0.016h0.016l0.031,0.031l0,0   l0.031,0.016l0.016,0.016h0.016h0.031l0.031,0.031l0,0l0.031,0.016l0.031,0.016h0.031l0,0l0.031,0.031h0.031l0,0l0.031,0.016   l0.031,0.016v0.016l0.031,0.016l0.031,0.016l0.031,0.016h0.016h0.016l0.031,0.016v0.016l0.031,0.016l0.016,0.016h0.031h0.016h0.016   l0.047,0.031h0.031l0,0l0.031,0.016l0.016,0.016l0.031,0.016l0,0l0.016,0.016l0.031,0.016l0.031,0.016l0,0H195l0.031,0.031h0.016   l0.016,0.016l0.031,0.016h0.031l0.016,0.031h0.016h0.031l0,0l0.031,0.016h0.031l0.031,0.016l0.031,0.016v0.016l0.016,0.016h0.016   l0.031,0.016h0.031l0.016,0.031h0.016h0.031l0.016,0.016l0.047,0.031l0,0l0.031,0.016h0.016h0.016h0.031l0.016,0.031h0.016h0.031   l0.016,0.031l0.078,0.031l0,0l0.031,0.016l0.016,0.016l0.031,0.016h0.016l0.031,0.016h0.016l0.031,0.031l0,0l0.047,0.016l0,0   l0.047,0.016l0,0h0.047v0.016l0.031,0.016h0.016l0.031,0.016l0,0l0.047,0.031l0,0l0.094,0.047l0,0h0.047v0.016l0.031,0.016h0.016   l0.156,0.078h0.016l0.047,0.016l0,0l0.031,0.016l0,0l0.094,0.047l0,0l0.047,0.031l0.047,0.016l0,0l0.031,0.016v0.016l0.047,0.016   l0.172,0.063h0.031l1.031,0.453c0.813,0.359,1.625,0.547,2.453,0.547c2.375,0,4.641-1.422,5.656-3.734   C207.625,375.219,206.156,371.609,203.031,370.297z" />
            <path d="M387.063,266.141c-3.125,0-5.797,2.359-6.094,5.547c-0.719,7.234-2.25,14.375-4.563,21.234   c-1.094,3.234,0.625,6.719,3.844,7.797c0.656,0.25,1.313,0.344,1.969,0.344c2.625,0,4.969-1.625,5.844-4.188l0,0v-0.031   l0.016-0.031l0,0l0.016-0.016v-0.016l0.016-0.047v-0.016l0.016-0.031l0,0l0.016-0.063h0.016v-0.031v-0.031h0.016v-0.031   l0.016-0.016V296.5v-0.031l0.016-0.031l0.016-0.016v-0.016l0.031-0.094v-0.016l0.016-0.016l0,0l0.016-0.031v-0.031v-0.016v-0.016   l0.031-0.031l0,0v-0.031v-0.031l0.031-0.094v-0.016l0.031-0.016v-0.016v-0.016v-0.031h0.016l0.016-0.031v-0.031v-0.031v-0.016   l0.016-0.031h0.016v-0.047l0,0l0.031-0.031v-0.031v-0.016v-0.031v-0.016l0.031-0.016v-0.016v-0.031V295.5l0.031-0.031l0,0v-0.031   l0.031-0.031l0,0v-0.063l0,0v-0.031l0.016-0.016l0.016-0.031v-0.016v-0.016l0.016-0.031l0.016-0.016l0,0v-0.031v-0.031l0.031-0.047   l0,0v-0.047v-0.016l0.031-0.031v-0.016l0,0v-0.031l0.031-0.031l0,0v-0.047v-0.016v-0.031l0.031-0.078l0.016-0.016l0.016-0.031l0,0   l0.016-0.063l0,0v-0.047l0,0l0.016-0.047l0.063-0.125v-0.031v-0.031l0,0v-0.031v-0.016l0.031-0.016v-0.016v-0.047l0.063-0.141l0,0   v-0.031v-0.016l0.016-0.031v-0.016l0.016-0.031v-0.016l0.016-0.031l0,0l0.047-0.156l0,0v-0.047l0,0l0.016-0.031v-0.016l0.016-0.031   l0,0l0.063-0.156v-0.031v-0.031v-0.016l0.031-0.031l0,0l0.078-0.297l0.016-0.063l0.078-0.234l0.016-0.047l0.063-0.234v-0.047l0,0   l0.031-0.063c1.813-6.281,3.094-12.797,3.75-19.516c0.313-3.359-2.156-6.375-5.547-6.703L387.063,266.141z" />
            <path d="M124.813,246.922c3.156,0,5.844-2.406,6.125-5.609c0.625-7.25,2.125-14.406,4.375-21.281   c1.063-3.219-0.688-6.719-3.922-7.75c-0.641-0.234-1.297-0.313-1.922-0.313c-2.563,0-4.969,1.625-5.844,4.188   c-0.703,2.125-1.328,4.297-1.906,6.469v0.047l0,0l-0.031,0.047v0.047l0,0l-0.031,0.141l0,0v0.031l-0.016,0.031L121.625,223v0.016   v0.016l-0.016,0.016l-0.016,0.031v0.016v0.031v0.016l-0.016,0.031v0.031l-0.016,0.016v0.016v0.031v0.016l-0.016,0.016v0.031v0.016   l-0.016,0.031v0.031v0.016v0.016l-0.016,0.031l-0.016,0.016v0.047l0,0l-0.031,0.047l0,0v0.047l0,0v0.031l-0.016,0.031h-0.016v0.031   v0.047l0,0l-0.031,0.125v0.016l-0.016,0.031v0.016l-0.016,0.031l-0.016,0.047c-0.781,3.203-1.422,6.453-1.922,9.75v0.031v0.016   v0.016l-0.016,0.031v0.016l-0.016,0.031v0.016v0.094v0.016v0.031l-0.031,0.016v0.031v0.016v0.031v0.016v0.031v0.016v0.016v0.031   l-0.031,0.031v0.031v0.031v0.016v0.031v0.016v0.031v0.016v0.016v0.031l0,0v0.031l-0.031,0.031v0.031v0.016v0.109l0,0v0.031v0.016   l-0.031,0.031v0.016v0.031l0,0v0.031v0.016l-0.031,0.203c-0.234,1.688-0.406,3.391-0.563,5.109   c-0.313,3.391,2.188,6.359,5.563,6.656L124.813,246.922z" />
            <path d="M381.063,219.656c0.594,0,1.219-0.078,1.844-0.281c3.219-1.016,5.047-4.453,4.031-7.703   c-2.453-7.891-5.813-15.422-9.953-22.453c-1.125-1.938-3.172-3.031-5.297-3.031c-1.063,0-2.125,0.281-3.094,0.859   c-2.938,1.703-3.906,5.484-2.203,8.422c3.703,6.266,6.641,12.953,8.797,19.875C376,217.969,378.438,219.656,381.063,219.656z" />
            <path d="M352.594,339.875c-1.719,0-3.406,0.672-4.625,2.063c-4.844,5.453-10.281,10.344-16.188,14.578   c-2.75,1.969-3.406,5.828-1.422,8.594c1.188,1.672,3.078,2.547,5,2.547c1.234,0,2.484-0.344,3.563-1.109   c5.188-3.688,9.984-7.813,14.406-12.313l0,0l0.172-0.203l0,0l0.016-0.016h0.016h0.031l0,0l0.078-0.063v-0.016l0.016-0.016   l0.031-0.016v-0.031l0.016-0.016l0.016-0.031l0,0l0.094-0.109l0,0l0.031-0.031v-0.016l0.016-0.016l0.016-0.016l0.016-0.031   l0.016-0.016v-0.031h0.031l0.031-0.016h0.016H354h0.031v-0.016V353.5h0.031l0.016-0.031l0.016-0.031l0,0l0.031-0.031l0.016-0.031   l0.016-0.031h0.031v-0.016l0.031-0.016l0,0l0.031-0.016v-0.016h0.031v-0.016l0.031-0.016v-0.016l0.031-0.047l0,0l0.031-0.031   l0.016-0.016l0.031-0.031v-0.016l0.016-0.031h0.016l0.078-0.125l0.047-0.031l0,0l0.047-0.031c0.859-0.875,1.719-1.828,2.563-2.781   c2.25-2.547,2-6.422-0.531-8.688C355.469,340.375,354.031,339.875,352.594,339.875z" />
            <path d="M281.438,379.469l-1.344,0.172c-6.813,1.5-13.844,2.281-20.875,2.281l-0.766-0.016h-0.016   c-3.391,0-6.156,2.75-6.188,6.125c-0.031,3.406,2.688,6.156,6.063,6.188h0.031l0,0h0.234l0,0h0.047h0.016h0.016h0.219h0.156l0,0   h0.031h0.031h0.031h0.031l0,0h0.063h0.031h0.031h0.031l0,0h0.031h0.031h0.031h0.016h0.016h0.016h0.047l0,0h0.047h0.016h0.016h0.016   h0.031h0.031h0.016h0.016h0.094h0.047h0.016h0.031l0,0h0.047h0.016h0.031h0.016h0.031h0.016h0.031l0,0h0.047h0.016h0.031h0.016   h0.016h0.031h0.016h0.016h0.047h0.016h0.047h0.016h0.016h0.016h0.031h0.031h0.031h0.016h0.016h0.031l0,0h0.031h0.031h0.016h0.031   h0.016h0.031h0.016h0.016h0.016h0.047l0,0h0.063h0.016h0.016h0.031h0.031l0,0l0.031-0.031h0.031h0.031h0.016h0.016h0.016h0.031   h0.016h0.031h0.031h0.031l0,0h0.031l0,0h0.156h0.031h0.016h0.047l0,0h0.063l0,0h0.031l0,0h0.031h0.031h0.031l0,0h0.047h0.016h0.016   h0.016h0.047l0,0h0.203l0,0h0.031l0,0h0.031h0.031h0.031h0.016h0.031h0.016h0.031l0,0h0.031h0.031h0.031l0,0h0.063l0,0l0.125-0.031   h0.016h0.031h0.016h0.031l0,0h0.063l0,0h0.031l0,0h0.047h0.016h0.031l0,0h0.031h0.031h0.031l0,0h0.188h0.016h0.047h0.031   l0.047-0.016h0.016h0.031l0,0h0.047h0.391l0,0h0.031l0,0h0.063l0,0l0.031-0.016h0.063c5.844-0.25,11.625-0.969,17.234-2.156h0.016   h0.031l0,0h0.031h0.016h0.031h0.016l0.031-0.031l0,0h0.031h0.031l0.031-0.031l0,0h0.047l0,0h0.047l0,0h0.047h0.016l0.031-0.016l0,0   h0.031l0.031-0.016h0.016l0.016-0.016h0.031l0,0h0.031h0.016h0.031l0.016-0.016h0.031l0.016-0.016h0.016h0.031l0.031-0.016   l0.156-0.031h0.016l0.047-0.031l0,0h0.031h0.016h0.016h0.031h0.031l0,0l0.031-0.031l0,0l0.438-0.094   c3.297-0.734,5.375-4,4.641-7.313C286.781,381.438,284.25,379.469,281.438,379.469z" />
            <path d="M332.313,154.438c1.875,0,3.719-0.844,4.906-2.484c2.078-2.703,1.5-6.563-1.219-8.594   c-0.781-0.609-1.578-1.172-2.375-1.781l-0.047-0.016l0,0l-0.031-0.016l0,0l-0.109-0.078h-0.016l-0.047-0.031l0,0l-0.031-0.016   v-0.016l-0.125-0.063v-0.016l-0.031-0.016l0,0l-0.031-0.031h-0.016l-0.031-0.031l0,0l-0.047-0.031l-0.031-0.016L333,141.188   l-0.016-0.031h-0.031l-0.016-0.016l-0.031-0.016v-0.016l-0.031-0.016v-0.016l-0.031-0.016l-0.016-0.016l-0.031-0.016l-0.016-0.016   L332.75,141l0,0l-0.031-0.031h-0.016l-0.016-0.031h-0.016l-0.031-0.016l-0.016-0.016l-0.031-0.031l0,0l-0.031-0.016l-0.016-0.016   l-0.016-0.016H332.5l-0.031-0.016v-0.016h-0.016l-0.016-0.016v-0.016l-0.063-0.031l0,0l-0.031-0.016h-0.016l-0.016-0.016h-0.031   v-0.031h-0.031l-0.016-0.016h-0.016l-0.031-0.031l0,0l-0.063-0.031v-0.031h-0.031v-0.016l-0.031-0.016v-0.016l-0.031-0.016l0,0   l-0.172-0.109l-0.016-0.016h-0.016l-0.016-0.031h-0.031l-0.109-0.094l0,0l-0.047-0.016l0,0l-0.031-0.031l0,0l-0.219-0.125   c-5.203-3.516-10.75-6.578-16.531-9.141c-0.813-0.359-1.672-0.531-2.5-0.531c-2.375,0-4.609,1.375-5.625,3.672   c-1.391,3.109,0.031,6.734,3.141,8.141c6.641,2.906,12.953,6.594,18.766,10.969C329.734,154.031,331.031,154.438,332.313,154.438z" />
            <path d="M254.313,130.125h0.063c3.375,0,6.156-2.719,6.203-6.094c0.047-3.359-2.625-6.125-5.953-6.188l-1.438-0.016   l0,0h-0.047h-0.016h-0.031h-0.016h-0.016h-0.031H253h-0.031h-0.031h-0.031h-0.016h-0.031h-0.016h-0.063h-0.109h-0.016h-0.031   h-0.031l0,0h-0.031h-0.031H252.5h-0.016h-0.016h-0.031h-0.031h-0.031h-0.031l0,0h-0.047h-0.016h-0.031h-0.016h-0.031h-0.016h-0.031   l0,0h-0.031h-0.031h-0.031l0,0H252l0,0h-0.031h-0.031h-0.031h-0.016h-0.047l0,0h-0.031l0,0h-0.031h-0.031h-0.031h-0.031h-0.016   h-0.016h-0.031h-0.031h-0.031l0,0h-0.047H251.5h-0.031h-0.016h-0.016h-0.031h-0.031h-0.016h-0.031l-0.016,0.016h-0.031h-0.016   h-0.016h-0.063h-0.016h-0.016h-0.031h-0.031l0,0h-0.031h-0.031h-0.016H251h-0.031h-0.031h-0.016h-0.031h-0.016h-0.031h-0.031   h-0.031h-0.031h-0.031l0,0h-0.031l0,0h-0.031h-0.031h-0.031h-0.031l0,0h-0.031h-0.016h-0.078l0,0h-0.031h-0.031l0,0h-0.031l0,0   h-0.031h-0.031h-0.031h-0.016h-0.016h-0.031h-0.031h-0.016h-0.047l0,0h-0.031h-0.031H250h-0.016h-0.047l0,0h-0.031l0,0h-0.031   h-0.031h-0.031h-0.031l0,0h-0.031l0,0h-0.094l0,0h-0.031l-0.031,0.031l0,0h-0.031h-0.016h-0.016H249.5h-0.031h-0.016h-0.016h-0.031   h-0.031h-0.016h-0.047h-0.031l0,0h-0.047h-0.016h-0.031l0,0h-0.031h-0.031h-0.016h-0.016h-0.031h-0.031H249l0,0h-0.031h-0.016   h-0.078l0,0h-0.031l0,0h-0.031h-0.031h-0.016h-0.016h-0.031h-0.031h-0.016h-0.016h-0.031h-0.016l-0.109,0.031l0,0h-0.047h-0.016   h-0.031l0,0h-0.031h-0.016h-0.031h-0.016h-0.031l0,0h-0.031h-0.031h-0.156l0,0h-0.031l0,0h-0.063v0.031h-0.031h-0.016h-0.031l0,0   h-0.219l0,0h-0.031h-0.016h-0.031h-0.016h-0.016h-0.031H247.5h-0.016l-0.141,0.031l0,0h-0.063l0,0h-0.031h-0.016h-0.031h-0.016   h-0.031l0,0h-0.031h-0.016h-0.203l0,0h-0.047h-0.016h-0.031l0,0h-0.031L246.766,118H246.5h-0.031l0,0h-0.047l0,0h-0.047   l-0.344,0.016c-6.031,0.391-11.906,1.266-17.641,2.578c-3.328,0.781-5.359,4.094-4.594,7.375c0.641,2.844,3.172,4.75,5.984,4.75   l1.391-0.156c7.047-1.625,14.328-2.438,21.609-2.438H254.313z" />
          </g>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-white w-20 aspect-square absolute top-10 left-0 rotate-12"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M495.24,267.592,445.066,41.083A32.038,32.038,0,0,0,406.9,16.76L180.393,66.934A32,32,0,0,0,156.071,105.1L177.092,200H48a32.036,32.036,0,0,0-32,32V464a32.036,32.036,0,0,0,32,32H280a32.036,32.036,0,0,0,32-32V340.957l158.917-35.2A32.038,32.038,0,0,0,495.24,267.592ZM280,464H48V232H184.181l22.063,99.606a32.031,32.031,0,0,0,31.18,25.092,32.3,32.3,0,0,0,6.984-.769l35.6-7.886L280.02,464ZM464,274.513,237.487,324.686,187.314,98.176,413.824,48l50.193,226.505Z"
          />
          <rect width="40" height="40" x="80" y="264" fill="currentColor" />
          <rect width="40" height="40" x="80" y="392" fill="currentColor" />
          <rect width="40" height="40" x="208" y="392" fill="currentColor" />
          <rect width="40" height="40" x="144" y="328" fill="currentColor" />
          <rect
            width="40"
            height="40"
            x="229.329"
            y="117.7"
            fill="currentColor"
            transform="rotate(-12.48 249.647 137.846)"
          />
          <rect
            width="40"
            height="40"
            x="381.981"
            y="214.989"
            fill="currentColor"
            transform="rotate(-12.489 401.996 234.995)"
          />
          <rect
            width="40"
            height="40"
            x="305.655"
            y="166.345"
            fill="currentColor"
            transform="rotate(-12.49 325.645 186.34)"
          />
        </svg>

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
                <h1 className="text-center  max-w-[850px] px-2 md:px-0 mb-8 text-lg md:text-3xl 2xl:text-[50px] 2xl:!leading-[60px]">
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
          <div className="relative flex flex-col items-center justify-center min-h-screen p-2 md:p-8">
            {/* Glowing Frame */}
            <div
              className="relative  shadow-lg rounded-2xl
              px-4 py-4 md:px-16 md:py-16 text-center text-white bg-[#1a1a1a] max-w-3xl gap-4 flex flex-col"
            >
              {/* Lampjes */}
              <div
                className="absolute inset-0  border-transparent rounded-2xl before:absolute before:inset-0 
                before:rounded-2xl before:border-[10px] before:border-yellow-500 before:animate-pulse"
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
                className="w-fit mx-auto bg-yellow-500 text-black font-semibold mt-6 z-20 !outline-none !border-none hover:scale-105 transition"
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
