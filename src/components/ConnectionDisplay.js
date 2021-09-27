import React, { useState, useEffect } from "react";
import "../Style.css";
import End from "./End.js";
import { FaBus } from "react-icons/fa";
import { GiKickScooter } from "react-icons/gi";



// die Fahrtdauer im Format h (Eingabewert 1), min (Eingabewert 2) wird nach einem Festen Schlüssel (0,1 , 0,3 oder 0,2 der Gesamtfahrtdauer)
// aufgeteilt in 2 bzw. 3 Fahrten und 1 bzw. 2 Wartezeiten . Ausgegeben wird es
// in einem Array nach dem Muster [Fahrtdauer1, WartezeitAufFahrt2, Fahrtdauer2, usw]
const durationSplitCheap = (h, m) => {
  const hour = Number(h);
  const min = Number(m);
  const t = Number(h * 60 + min);
  const trail1 = Number(Math.floor(t * 0.3));
  const waiting1 = Number(Math.floor(t * 0.15));
  const trail2 = Number(t - trail1 - waiting1);
  return [Number(trail1), Number(waiting1), Number(trail2)];
};

const durationSplitFast = (h, m) => {
  const hour = Number(h);
  const min = Number(m);
  const t = Number(h * 60 + min);
  let trail1 = Number(Math.floor(t * 0.3));
  let waiting1 = Number(Math.floor(t * 0.1));
  let trail2 = Number(Math.floor(t * 0.2));
  let waiting2 = Number(Math.floor(t * 0.15));
  let trail3 = Number(t - trail1 - waiting1 - trail2 - waiting2);
 
  return [
    Number(trail1),
    Number(waiting1),
    Number(trail2),
    Number(waiting2),
    Number(trail3),
  ];
};

// zu einer Uhrzeit (attribut 1) eine h (attribut 2) und Min (attribut 3)  hinzufügen
const addDurationToTime = (time, h, min) => {
  
  const [hours, minutes] = time.split(":");
  var h = Number(h);
  let hoursSum = Number(hours) + Number(h);
  let minutesSum = Number(minutes) + Number(min);
  let dateChange = false;
  while (minutesSum >= 60) {
    minutesSum = minutesSum - 60;
    hoursSum = hoursSum + 1;
  }
  if (minutesSum < 10) minutesSum = "0" + minutesSum;
  if (hoursSum >= 24) {
    hoursSum -= 24;
    
  }
  if (hoursSum < 10) hoursSum = "0" + hoursSum;
  return [hoursSum + ":" + minutesSum, dateChange];
};

const addDay = (date, changeVariable) => {
  let dateString = date.toString();
  let dateStringSplitted = dateString.split("-");
  let dateMonth = Number(dateStringSplitted[1]);
  let dateDay = Number(dateStringSplitted[2]);
  let dateYear = Number(dateStringSplitted[0]);
  if (changeVariable == true) {
    if (
      dateMonth == 2 &&
      dateDay == 28 &&
      (dateYear == 2024 || 2018 || 2032 || 2036)
    ) {
      dateMonth = dateMonth + 1;
      dateDay = 1;
    }
    if ((dateMonth == 1 || 3 || 5 || 7 || 8 || 10 || 12) && dateDay == 31) {
      dateDay = 1;
      if (dateMonth == 12) {
        dateMonth = 1;
        dateYear = dateYear + 1;
      } else {
        dateMonth = dateMonth + 1;
      }
    }
    if ((dateMonth == 4 || 6 || 9 || 11) && dateDay == 30) {
      dateMonth = dateMonth + 1;
      dateDay = 1;
    }
  }
  if (dateDay < 10) dateDay = "0" + dateDay;
  return dateYear + "-" + dateMonth + "-" + dateDay;
};

const outputWithoutYear = (date) => {
  let dateString = date.toString();
  let dateStringSplitted = dateString.split("-");
  let dateMonth = Number(dateStringSplitted[1]);
  let dateDay = Number(dateStringSplitted[2]);
  let dateYear = Number(dateStringSplitted[0]);
  return dateDay + "." + dateMonth + ".";
};



const ConnectionDisplay = (props) => {
  const [clickedEnd, setEndClicked] = useState(false);
  const [hideConnectionDisplay, setHideConnectionDisplay] = useState(false);
  const [changeDay, setChangeDay] = useState(false);

  {
    console.log(props.departureDay, props.departureStop);
  }

  const backClickHandler = () => {
    props.onGoBack();
  };
  const endClickHandler = () => {
    setEndClicked(true);
  };
  // ------------------------------- FÜR DIE VERZÖGERUNG---------------------------------------------------------------
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //  setHideConnectionDisplay(false);
  //  setloadingMessage(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  // zum in-string konvertieren, außerdem zwischen 3-9 min (zufällig) hinzufügen
  const timeToDecimalAdd = (time) => {
    const [hours, minutes] = time.split(":");
    let additionalRandomMinutes = props.additionalRandomMinutes;
    let tneu = Number(minutes) + Number(additionalRandomMinutes);
    return Number(hours) + Number(tneu) / 60;
  };

  //   zum String in Zeit konvertieren
  const stringToTime = (StringTime) => {
    const hs = Math.floor(StringTime);
    const mins = Math.round((StringTime - hs) * 60);
    return `${hs < 10 ? "0" : ""}${hs}:${mins < 10 ? "0" : ""}${mins}`;
  };

  let newDepartureTime = stringToTime(timeToDecimalAdd(props.departureTime));
  let splittedDurationsCheap = durationSplitCheap(
    props.durationH,
    props.durationMin
  );
  let splittedDurationsFast = durationSplitFast(
    props.durationH,
    props.durationMin
  );

  return (
    <div>
      {props.cheaperConnectionStarted ? (
        <div>
          {clickedEnd ? (
            <End/>
          ) : (
            <div className="container-verbindung">
              {hideConnectionDisplay ? null : (
                <form>
                  <h1 className="Verbindung-header">Verbindung</h1>
                  <h2 className="h2ConnectionDisplay">Schritt 1</h2>
                  <div className="container-ConnectionDisplay">
                    <div className="verbindung-textfeld">
                      {" "}
                      <p>Abfahrt:</p>{" "}
                      {outputWithoutYear(addDay(props.departureDay, changeDay))}{" "}
                      um {newDepartureTime}{" "}
                    </div>
                    <div className="verbindung-textfeld">Linie: 50</div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft:</p>{" "}
                      {outputWithoutYear(addDay(props.departureDay, changeDay))}{" "}
                      um{" "}
                      {addDurationToTime(
                        newDepartureTime,
                        Number(0),
                        Number(splittedDurationsFast[0])
                      )}{" "}
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Abfahrt an Haltestelle:</p> {props.departureStop}{" "}
                    </div>
                    <div className="busIcon">
                      <FaBus size="3rem" color="white" />
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft an Haltestelle:</p> Weender Straße-Ost{" "}
                    </div>
                  </div>
                  <h2 className="h2ConnectionDisplay">Schritt 2</h2>
                  <div className="container-ConnectionDisplay">
                    <div className="verbindung-textfeld">
                      {" "}
                      <p>Abfahrt:</p>{" "}
                      {outputWithoutYear(addDay(props.departureDay, changeDay))}{" "}
                      um{" "}
                      {addDurationToTime(
                        newDepartureTime,
                        Number(0),
                        Number(
                          splittedDurationsFast[0] + splittedDurationsFast[1]
                        )
                      )}{" "}
                    </div>
                    <div className="verbindung-textfeld">
                      Verfügbare Scooter: 3
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft:</p>{" "}
                      {outputWithoutYear(addDay(props.departureDay, changeDay))}{" "}
                      um{" "}
                      {addDurationToTime(
                        newDepartureTime,
                        Number(0),
                        Number(
                          splittedDurationsFast[0] +
                            splittedDurationsCheap[1] +
                            splittedDurationsFast[2]
                        )
                      )}{" "}
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Abfahrt an Haltestelle:</p> Weender Straße-Ost{" "}
                    </div>
                    <div className="busIcon">
                      <GiKickScooter size="3rem" color="white" />
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft an Haltestelle:</p> Neues Rathaus{" "}
                    </div>
                  </div>
                  <h2 className="h2ConnectionDisplay">Schritt 3</h2>
                  <div className="container-ConnectionDisplay">
                    <div className="verbindung-textfeld">
                      {" "}
                      <p>Abfahrt:</p>{" "}
                      {outputWithoutYear(addDay(props.departureDay, changeDay))}{" "}
                      um{" "}
                      {addDurationToTime(
                        newDepartureTime,
                        Number(0),
                        Number(
                          splittedDurationsFast[0] +
                            splittedDurationsCheap[1] +
                            splittedDurationsFast[2] +
                            splittedDurationsFast[3]
                        )
                      )}{" "}
                    </div>
                    <div className="verbindung-textfeld">Linie: 12</div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft:</p>{" "}
                      {outputWithoutYear(addDay(props.departureDay, changeDay))}{" "}
                      um{" "}
                      {addDurationToTime(
                        newDepartureTime,
                        Number(0),
                        Number(
                          splittedDurationsFast[0] +
                            splittedDurationsCheap[1] +
                            splittedDurationsFast[2] +
                            splittedDurationsFast[3] +
                            splittedDurationsFast[4]
                        )
                      )}{" "}
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Abfahrt an Haltestelle:</p> Neues Rathaus{" "}
                    </div>
                    <div className="busIcon">
                      <FaBus size="3rem" color="white" />
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft an Haltestelle:</p> {props.destinationStop}{" "}
                    </div>
                  </div>
                  <div className="buttons-verbindung">
                    <button
                      className="button"
                      onClick={backClickHandler}
                      type="submit"
                    >
                      {" "}
                      Zurück
                    </button>
                    <button
                      className="button"
                      onClick={() => {
                        endClickHandler();
                        props.onSetStartFormHidden(true);
                      }}
                    >
                      {" "}
                      Test Beenden?
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {clickedEnd ? (
            <End/>
          ) : (
            <div className="container-verbindung">
              
              {hideConnectionDisplay ? null : (
                <form>
                  <h1 className="Verbindung-header">Verbindung</h1>
                  <h2 className="h2ConnectionDisplay">Schritt 1</h2>
                  <div className="container-ConnectionDisplay">
                    <div className="verbindung-textfeld">
                      {" "}
                      <p>Abfahrt:</p> {outputWithoutYear(props.departureDay)} um{" "}
                      {newDepartureTime}{" "}
                    </div>
                    <div className="verbindung-textfeld">Linie: 50</div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft:</p> {outputWithoutYear(props.departureDay)} um{" "}
                      {addDurationToTime(
                        newDepartureTime,
                        Number(0),
                        Number(splittedDurationsCheap[0])
                      )}{" "}
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Abfahrt an Haltestelle:</p> {props.departureStop}{" "}
                    </div>
                    <div className="busIcon">
                      <FaBus size="3rem" color="white" />
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft an Haltestelle:</p> Weender Straße-Ost{" "}
                    </div>
                  </div>
                  <h2 className="h2ConnectionDisplay">Schritt 2</h2>
                  <div className="container-ConnectionDisplay">
                    <div className="verbindung-textfeld">
                      {" "}
                      <p>Abfahrt:</p> {outputWithoutYear(props.departureDay)} um{" "}
                      {addDurationToTime(
                        newDepartureTime,
                        Number(0),
                        Number(
                          splittedDurationsCheap[0] + splittedDurationsCheap[1]
                        )
                      )}{" "}
                    </div>
                    <div className="verbindung-textfeld">Linie: 18</div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft:</p> {outputWithoutYear(props.departureDay)} um{" "}
                      {addDurationToTime(
                        newDepartureTime,
                        Number(0),
                        Number(
                          splittedDurationsCheap[0] +
                            splittedDurationsCheap[1] +
                            splittedDurationsCheap[2]
                        )
                      )}{" "}
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Abfahrt an Haltestelle:</p> Weender Straße-Ost{" "}
                    </div>
                    <div className="busIcon">
                      <FaBus size="3rem" color="white" />
                    </div>
                    <div className="verbindung-textfeld">
                      <p>Ankunft an Haltestelle:</p> {props.destinationStop}{" "}
                    </div>
                  </div>
                  <div className="buttons-verbindung">
                    <button
                      className="button"
                      onClick={backClickHandler}
                      type="submit"
                    >
                      {" "}
                      Zurück
                    </button>
                    <button
                      className="button"
                      onClick={() => {
                        endClickHandler();
                        props.onSetStartFormHidden(true);
                      }}
                    >
                      {" "}
                      Test Beenden?
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionDisplay;
