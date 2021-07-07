import React from "react";
import "../Style.css";
import Card from "./UI/Card";
import classes from "./Verbindung/Verbindungsanzeige.module.css";
import Button from "./UI/Button";
import Logo from "./Logo.js";

const onClickHandler = (event) => {
  event.preventDefault(); // Aktuell: Neuladen der Seite verhindern
};
//import 'webpack';
/* import logo from '.../public/busemoji.png'

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}
 */
const Verbindungsanzeige = (props) => {
  return (
      <Card className={classes.input}>
      <form onSubmit={onClickHandler}>
      <header className="Verbindung-header">Verbindungen</header>
        {/* <Bild/> 
    <img src={require('.../public/busemoji.png')} />
        */}
        <div className="Verbindung-textfeld-links">
          {" "}
          Abfahrt: Am {props.departureDay} um {props.departureTime} Uhr{" "}
        </div>
        <div className="Verbindung-textfeld-mitte">Linie: 50</div>
        <div className="Verbindung-textfeld-rechts">
          Ankunft: Am {props.departureDay} um {props.departureTime} Uhr
        </div>

        <div className="Verbindung-textfeld-links">
          Abfahrt an Haltestelle: {props.departureStop}
        </div>
        <div className="Verbindung-textfeld-rechts">
          Ankunft an Haltestelle: {props.destinationStop}
        </div>
        <Button type="submit">Zurück</Button>
        <Button type="submit">Auf erste Seite</Button>

        <Logo />
      </form>
    </Card>
  );
};

export default Verbindungsanzeige;
