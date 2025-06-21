import { useEffect, useState } from "react";
import {
  differenceInDays,
  differenceInSeconds,
  intervalToDuration,
} from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function Home() {
  const targetDate = "2025-06-21T18:00:00+01:00"; // Target date in Dutch time (CET/CEST)
  // const targetDate = "2025-06-09T18:56:00+01:00"; // Target date in Dutch time (CET/CEST)

  const [remainingTime, setRemainingTime] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [tapCount, setTapCount] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  const introRef = React.createRef();

  // Set the initial volume when the component is mounted
  useEffect(() => {
    if (introRef.current) {
      introRef.current.volume = 0.15; // Set the volume to 50%
    }
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const zonedNow = fromZonedTime(now, "Europe/Amsterdam");
      const target = fromZonedTime(targetDate, "Europe/Amsterdam");
      const diffInSeconds = differenceInSeconds(target, zonedNow);

      if (diffInSeconds <= 0) {
        setRemainingTime("0d 0h 0m 0s");
        setTotalDays(0);
        navigate("/family-weekend");
        // clearInterval(intervalId);
      } else {
        const totalDays = differenceInDays(target, zonedNow);
        setTotalDays(totalDays);
        const duration = intervalToDuration({ start: zonedNow, end: target });

        const formattedTime = `${totalDays ? `${totalDays}d` : "0d"} ${
          duration.hours ? `${duration.hours}h` : "0h"
        } ${duration.minutes ? `${duration.minutes}m` : "0m"} ${
          duration.seconds ? `${duration.seconds}s` : "0s"
        }`;
        setRemainingTime(formattedTime);
      }
    };

    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(intervalId);
  }, [targetDate]);

  // Handle Image Clicks
  const handleImageClick = () => {
    if (showButton) return; // No need to track taps if button is already visible

    setTapCount((prevCount) => {
      const newCount = prevCount + 1;

      if (newCount === 3) {
        setShowButton(true);
      }

      // Reset the count if no further taps occur within 1 second
      setTimeout(() => setTapCount(0), 1000);

      return newCount;
    });
  };

  return (
    <>
      <audio loop autoPlay ref={introRef} src="/anniversary/intro.mp3" />

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/25 z-10"
          >
            <div
              className="absolute left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 hover:scale-105 transition cursor-pointer group"
              onClick={() => navigate("/anniversary-3-months")}
            >
              <img
                className="max-h-96 rounded-lg border-black"
                src="/anniversary/einruhr.jpg"
              />

              <span className="absolute left-1/2 -bottom-3 translate-y-full w-full text-center -translate-x-1/2 text-white text-2xl font-medium">
                Drie maanden samen
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10 absolute right-3 top-3 text-red-600 b"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>

              <div className="p-2 right-3 bottom-3 bg-white rounded-full aspect-square absolute flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5 text-black group-hover:-rotate-45 transition"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex items-center flex-col w-full py-16 px-2 space-y-8">
        <div className="space-y-8 flex items-center flex-col">
          <h1 className="text-4xl 2xl:text-7xl">{remainingTime}</h1>

          <img
            className="max-h-96 2xl:max-h-[450px]  rounded-lg border-black"
            src={`/family/start.jpg`}
            onClick={handleImageClick}
          />
        </div>

        {/* <div className="flex justify-start w-full space-x-4">
          <div
            className="hover:scale-105  relative transition cursor-pointer group"
            onClick={() => navigate("/anniversary")}
          >
            <img
              className="max-h-48 rounded-lg border-black"
              src="/old/43.jpg"
            />

            <span className="absolute left-1/2 -bottom-3 translate-y-full w-full text-center -translate-x-1/2 text-white text-2xl font-medium">
              1 maand
            </span>

            <div className="p-2 right-3 bottom-3 bg-white rounded-full aspect-square absolute flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-black group-hover:-rotate-45 transition"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div
            className="hover:scale-105 mr-auto relative transition cursor-pointer group"
            onClick={() => navigate("/anniversary-3-months")}
          >
            <img
              className="max-h-48 rounded-lg border-black"
              src="/days/55.jpg"
            />

            <span className="absolute left-1/2 -bottom-3 translate-y-full w-full text-center -translate-x-1/2 text-white text-2xl font-medium">
              3 maanden
            </span>

            <div className="p-2 right-3 bottom-3 bg-white rounded-full aspect-square absolute flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-5 text-black group-hover:-rotate-45 transition"
              >
                <path
                  fillRule="evenodd"
                  d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default Home;
