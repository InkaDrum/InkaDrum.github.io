import React from "react";
import Card from './Card';
import Button from './Button';
import classes from '.ErrorModal.module.css';

const ErrorModal = (props) => {
  return (
      <div>
    <div className={classes.backdrop} />
    {/* um eine Interaktion mit dem Rest der Seite zu verhindern während die Fehlermeldung angezeigt wird */}
    <Card className={classes.modal}>
      <header className={classes.header}>
      <h2>{props.title}</h2>  {/*Leerer Text/ Titel, der angepasst wird je nach Aufruf*/}
      </header>
      <div className={classes.inhalt}>
          <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button>Ok</Button>
      </footer>
    </Card>
    </div>
  );
};

export default ErrorModal;