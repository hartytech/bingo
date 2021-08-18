import Head from 'next/head'

import firebase from 'firebase'
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'

const type = "Regular BINGO"

const firebaseConfig = {
  apiKey: "AIzaSyCx86ET3fQ6W7S48iR56pam5e1j9HiBu7U",
  authDomain: "bingo-9abb7.firebaseapp.com",
  databaseURL: "https://bingo-9abb7-default-rtdb.firebaseio.com",
  projectId: "bingo-9abb7",
  storageBucket: "bingo-9abb7.appspot.com",
  messagingSenderId: "614858550688",
  appId: "1:614858550688:web:19c26f60f19d915ea3c8c5",
  measurementId: "G-751DYRHLMR"
  }

  firebase.initializeApp(firebaseConfig);



  var userStatusDatabaseRef = firebase.database().ref('/status/bingo');

  var isset = false;

  userStatusDatabaseRef.on("value", (snapshot) => {
      const post = snapshot.val();
      if (post.state != "offline") {
        
      }
      else {
      }
  
      console.log(post);
      
    })
  

export default function Home() {

  const [text, setText] = useState("");
  const [num, setNum] = useState("");
  const [game, setGame] = useState("");
  const [called, setCalled] = useState("");


  if (isset == false) {
    isset = true;
    userStatusDatabaseRef.on("value", (snapshot) => {
      const post = snapshot.val();
      if (post.state != "offline") {
        if (post.type != null) {
          if(post.value != null) {
            var calledString = "";
            setText("Current Number:");
            setNum(post.value);
            setGame(":  " + post.type);
            for(var i = 0; i< post.called.length; i++) {
              calledString += post.called[i] + ", "
            }
            setCalled(calledString)
          }
          else {
            setText("Waiting for BINGO Game...");
            setNum("");
            setGame(": " + post.type);
            setCalled("No Number History :(")
          }
        }
        else {
          setText("Waiting for BINGO Game...");
          setNum("");
          setGame(": -----");
          setCalled("No Number History :(")

        }
      }
      else {
        setText("No BINGO Connected...");
        setNum("");
        setGame(": -----");
        setCalled("No Number History :(")
      }
  
      
    })
    
  }

  return (
    <div className="container">
      
      <div className="gametype"><b>Game</b>{game}</div>
      <div className="number" id="number">
        <div style={{fontSize: "3vh", marginBottom: "-5vh", marginTop: "3vh"}}className="text">{text}</div>
        <div style={{fontWeight: "bold"}} className="number-text">{num}</div>
      </div>
      <div className="called">{called}</div>



      <style jsx>{`
        .container {
          min-height: 100vh;
          min-width: 98vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          
        }
        .gametype {
          width: 95%;
          height: 10vh;
          background-color: red;
          background: #28293d;
          box-shadow: 5px 5px 25px rgba(0,0,0,0.2);
          border-radius: 10px;
          margin-bottom: 1vh;
          text-align: center;
          color: white;
          font-size: 3vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .number {
          width: 95%;
          height: 30vh;
          margin-bottom: 1vh;
          border: 0.5vh solid white;
          border-radius: 10px;
          color: white;
          font-size: 20vh;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .called {
          width: 95%;
          height: 56vh;
          background-color: green;
          background: #28293d;
          box-shadow: 5px 5px 25px rgba(0,0,0,0.2);
          border-radius: 10px;

          margin-bottom: 1vh;
          text-align: center;
          color: white;
          font-size: 3vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3vh,
        }
        
      `}</style>

<style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background: #1b1c27;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )

}
