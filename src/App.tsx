import { useState, useEffect } from "react";
import "./App.css";
import {
  differenceInDays,
  differenceInSeconds,
  intervalToDuration,
} from "date-fns";
import { fromZonedTime } from "date-fns-tz"; // Correct import
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

function App() {
  const targetDate = "2025-03-01T10:00:00+01:00"; // Target date in Dutch time (CET/CEST)

  const [remainingTime, setRemainingTime] = useState("");
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date(); // Current time in local time zone (system's timezone)

      // Convert the current UTC time to 'Europe/Amsterdam' time zone
      const zonedNow = fromZonedTime(now, "Europe/Amsterdam");

      // Convert the target date to the correct time zone 'Europe/Amsterdam'
      const target = fromZonedTime(targetDate, "Europe/Amsterdam");

      // Calculate the difference in seconds
      const diffInSeconds = differenceInSeconds(target, zonedNow);

      if (diffInSeconds <= 0) {
        setRemainingTime("Time's up!");
        clearInterval(intervalId);
      } else {
        // Get total days between the current date and target date (without including months)
        const totalDays = differenceInDays(target, zonedNow);
        setTotalDays(totalDays);
        const duration = intervalToDuration({ start: zonedNow, end: target });

        // Create a readable string displaying the remaining time
        const formattedTime = `${totalDays ? `${totalDays}d` : "0d"} ${
          duration.hours ? `${duration.hours}h` : "0h"
        } ${duration.minutes ? `${duration.minutes}m` : "0m"} ${
          duration.seconds ? `${duration.seconds}s` : "0s"
        }`;
        setRemainingTime(formattedTime);
      }
    };

    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [targetDate]);

  return (
    <div className="flex items-center flex-col space-y-8 w-full pt-16 px-2">
      <h1 className="text-4xl">{remainingTime}</h1>
      <img
        className="max-h-96 rounded-lg border-black"
        src={totalDays === 33 ? "/days/33.gif" : `/days/${totalDays}.jpg`}
        alt={`Day ${totalDays}`}
      />
      {/* <Swiper
        spaceBetween={10}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          {" "}
          <img
            className="max-h-96 rounded-lg border-black"
            src={totalDays === 33 ? "/days/33.gif" : `/days/${totalDays}.jpg`}
            alt={`Day ${totalDays}`}
          />
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <img
            className="max-h-96 rounded-lg border-black"
            src={totalDays === 33 ? "/days/33.gif" : `/days/${totalDays}.jpg`}
            alt={`Day ${totalDays}`}
          />
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper> */}
    </div>
  );
}

export default App;
