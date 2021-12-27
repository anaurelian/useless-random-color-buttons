// Copyright 2017-2021 anaurelian. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

'use strict';

import { getRandomPosition, getRandomColor } from '/js/utils.js';

class App {

  #delay = 1000;
  #createdCounter = 0;
  #clickedCounter = 0;
  #createdCounterEl;
  #clickedCounterEl;
  #remainingCounterEl;
  #delayEl;

  /**
   * Init the application.
   */
  constructor() {
    this.#createdCounterEl = document.querySelector('#created-counter');
    this.#clickedCounterEl = document.querySelector('#clicked-counter');
    this.#remainingCounterEl = document.querySelector('#remaining-counter');
    this.#delayEl = document.querySelector('#delay');

    document.querySelector('#slower-button').addEventListener('click', (e) => {
      this.#delay += 100;
      this.#updateDelay();
    });

    document.querySelector('#faster-button').addEventListener('click', (e) => {
      if (this.#delay > 100) this.#delay -= 100;
      this.#updateDelay();
    });

    this.#addButton();
  }

  #updateCounters() {
    this.#createdCounterEl.innerText = this.#createdCounter;
    this.#clickedCounterEl.innerText = this.#clickedCounter;
    this.#remainingCounterEl.innerText = this.#createdCounter - this.#clickedCounter;
  }

  #updateDelay() {
    this.#delayEl.innerText = this.#delay;
  }

  #addButton() {
    const button = document.createElement('button');
    button.classList.add('absolute', 'color-button');

    const color = getRandomColor();
    button.innerText = color.backcolor;
    button.style.backgroundColor = color.backcolor;
    button.style.color = color.textcolor;
    button.style.zIndex = 0;

    button.addEventListener('click', (e) => {
      this.#clickedCounter++;
      this.#updateCounters();
      
      document.body.style.backgroundColor = e.target.style.backgroundColor;
      document.body.style.color = e.target.style.color;
  
      e.target.remove();
    });

    document.body.appendChild(button);
    const position = getRandomPosition(button);
    button.style.left = position.left + 'px';
    button.style.top = position.top + 'px';

    this.#createdCounter++;
    this.#updateCounters();

    setTimeout(() => this.#addButton(), this.#delay);
  }
}

/**
 * Init the application on window load event.
 */
 window.addEventListener("load", () => new App());