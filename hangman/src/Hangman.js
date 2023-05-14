import React, { Component } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: "apple", word: false };
    this.handleGuess = this.handleGuess.bind(this);
  }

  handlerandomWord = () => {
    var word = randomWord()
    this.setState(st => ({
      answer: word
    }));
  }

  restart = () => {
    this.setState(st => ({
      nWrong: 0, guessed: new Set(), answer: "apple", word: false
    }));
    this.handlerandomWord()
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        key={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    if (this.state.word === false){
      this.handlerandomWord()
      this.setState(st => ({
        word: true
      }))
    }
    if(this.guessedWord().join('') === this.state.answer){
      console.log('Yes')
    }
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img alt={this.state.nWrong} src={this.props.images[this.state.nWrong]} />
        {this.guessedWord().join('') === this.state.answer ? <p>You win</p> : <p className="Hangman-guesses">Wrong guesses: {this.state.nWrong}</p>}
        <p className='Hangman-word'>{this.guessedWord()}</p>
        {this.state.nWrong < 6 ? <p className='Hangman-btns'>{this.generateButtons()}</p> : <p className="Hangman-over">Game Over</p>}
        <button id="reset" onClick={this.restart}>↻</button>
      </div>
    );
  }
}

export default Hangman;