import React from "react";
import "../Style.css";
import Logo from "./Logo.js";

const End = (props) => {
  // Button Click Handler einfügen

  return (
    <div> 
      <form>
        <header className="Startseite-header">
          <h1 className="logo">Nav2Gö</h1>
          <div id="endText">
            <p> Danke für die Teilnahme! </p>
            <p>Klicke jetzt bitte auf den Button, um zur Umfrage zu gelangen</p>
          </div>
        </header>
        <div id="containerButtonEnd">
          <a href="http://google.de">Umfrage starten</a>
          <button type="submit">Zurück auf Anfang</button>
        </div>
      </form>
    </div>
  );
};

export default End;