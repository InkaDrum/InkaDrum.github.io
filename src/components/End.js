import React from "react";
import "../Style.css";

const End = (props) => {

  // Auskommentiert ist die alternative Weiterleitung zur zweiten App anstelle der Weiterleitung zur Umfrage
  return (
    <div>
      <form>
        <header className="Startseite-header">
          <h1 className="logo">Nav2Gö</h1>
          <div id="endText">
            <p>
              <br></br>Vielen Dank für die Teilnahme!{" "}
            </p>
            {/* <p>Klicken Sie jetzt bitte auf den Button, um zur zweiten App zu gelangen</p> */}
            <p>
              {" "}
              Klicken Sie jetzt bitte auf den Button, um zur Umfrage zu gelangen
              <br></br>
              <br></br>
            </p>
          </div>
        </header>
        <div id="containerButtonEnd">
          <a href="https://www.survio.com/survey/d/G9Q1M7L8V7J5L3I9V">
            Umfrage starten
          </a>
          {/* <a href="https://morza95.github.io">App-Version 2 starten</a> */}
        </div>
      </form>
    </div>
  );
};

export default End;
