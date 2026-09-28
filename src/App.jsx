import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const targetDate = new Date("2026-10-03T09:30:00");

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // PWA install prompt
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  function calculateTimeLeft() {
    const difference = targetDate - new Date();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Detect PWA installation availability
  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();

      setInstallPrompt(event);
      setShowInstall(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Install button
  const installApp = async () => {
    if (!installPrompt) {
      return;
    }

    installPrompt.prompt();

    const { outcome } = await installPrompt.userChoice;

    console.log("Install result:", outcome);

    setInstallPrompt(null);
    setShowInstall(false);
  };

  return (
    <div className="page">

      <div className="container">

        <div className="badge">
          ✨ A LITTLE COUNTDOWN
        </div>

        <h1>
          Our Next Memory
          <br />
          Starts In...
        </h1>

        <p className="intro">
          Because the best moments are even better
          <br />
          when shared with a good friend. 🤝
        </p>

        {/* Event */}
        <div className="event-card">

          <div className="calendar">
            📅
          </div>

          <div>
            <p>OUR SPECIAL DAY</p>

            <h2>
              October 3, 2026
            </h2>

            <span>
              9:30 AM
            </span>
          </div>

        </div>

        {/* Countdown */}
        <div className="countdown">

          <div className="time-card">
            <strong>
              {String(timeLeft.days).padStart(2, "0")}
            </strong>

            <span>DAYS</span>
          </div>

          <div className="time-card">
            <strong>
              {String(timeLeft.hours).padStart(2, "0")}
            </strong>

            <span>HOURS</span>
          </div>

          <div className="time-card">
            <strong>
              {String(timeLeft.minutes).padStart(2, "0")}
            </strong>

            <span>MINUTES</span>
          </div>

          <div className="time-card">
            <strong>
              {String(timeLeft.seconds).padStart(2, "0")}
            </strong>

            <span>SECONDS</span>
          </div>

        </div>

        {/* Friendship message */}
        <div className="friend-message">

          <div className="line"></div>

          <p>
            Here's to more laughs,
            <br />
            more adventures,
            <br />
            and more memories together. 💙
          </p>

          <div className="line"></div>

        </div>

        {/* INSTALL BUTTON */}
        <div className="install-section">

          <div className="install-icon">
            📱
          </div>

          <div className="install-text">
            <strong>
              Keep this memory close
            </strong>

            <span>
              Add this countdown to your phone's home screen
            </span>
          </div>

          {installPrompt ? (
            <button
              className="install-button"
              onClick={installApp}
            >
              Add to Home Screen
            </button>
          ) : (
            <button
              className="install-button"
              onClick={() => {
                alert(
                  "To add this page to your home screen:\n\n" +
                  "1. Tap the ⋮ menu in Chrome\n" +
                  "2. Select 'Add to Home screen' or 'Install app'\n" +
                  "3. Tap Add"
                );
              }}
            >
              📱 Add to Home
            </button>
          )}

        </div>

        <div className="bottom">

          <span>🤝</span>

          <p>
            Good friends make good memories.
          </p>

          <span>🤝</span>

        </div>

      </div>

    </div>
  );
}

export default App;