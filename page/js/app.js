// Copyright 2017-2021 anaurelian. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

'use strict';

import { getRandomPosition, getRandomColor, doOnRandomInterval } from '/js/utils.js';

class App {

  #createdCounter = 0;
  #clickedCounter = 0;
  #createdCounterEl;
  #clickedCounterEl;
  #remainingCounterEl;

  /**
   * Init the application.
   */
  constructor() {
    this.#createdCounterEl = document.querySelector('#created-counter');
    this.#clickedCounterEl = document.querySelector('#clicked-counter');
    this.#remainingCounterEl = document.querySelector('#remaining-counter');
    doOnRandomInterval(() => this.#addButton());
  }

  #updateCounters() {
    this.#createdCounterEl.innerText = this.#createdCounter;
    this.#clickedCounterEl.innerText = this.#clickedCounter;
    this.#remainingCounterEl.innerText = this.#createdCounter - this.#clickedCounter;
  }

  #addButton() {
    const button = document.createElement('button');
    button.classList.add('absolute', 'color-button');

    const color = getRandomColor();
    button.innerText = color.backcolor;
    button.style.backgroundColor = color.backcolor;
    button.style.color = color.textcolor;

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
  }
}

/**
 * Init the application on window load event.
 */
 window.addEventListener("load", () => new App());