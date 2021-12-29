// Copyright 2020-2021 anaurelian. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

'use strict';

import { getRandomPosition, getRandomColor } from '/js/utils.js';

class App {

  #delay = 1000;
  #winOnNoRemains = true;
  #createdCounter = 0;
  #clickedCounter = 0;
  #prevClickedCounter = 0;

  #maxClickrate = 0;

  #startTime;
  #prevTime;

  /**
   * Cached DOM elements
   */
  #createdCounterEl;
  #clickedCounterEl;
  #remainingCounterEl;
  #clickrateStatsEl;

  #addButtonIntervalID;

  /**
   * Initializes the application object.
   */
  constructor() {
    // Cache some frequently used DOM elements
    this.#createdCounterEl = document.querySelector('#created-counter');
    this.#clickedCounterEl = document.querySelector('#clicked-counter');
    this.#remainingCounterEl = document.querySelector('#remaining-counter');
    this.#clickrateStatsEl = document.querySelector('#clickrate-stats');

    document.querySelector('#config-start').addEventListener('click', (e) => this.#start());
  }

  #start() {
    document.querySelector('#config-section').classList.add('hidden');
    document.querySelector('main').classList.remove('hidden');

    // Add initial buttons
    this.#addInitialButtons();

    this.#delay = document.querySelector('#config-delay').value;
    this.#winOnNoRemains = document.querySelector('#config-win-on-no-remains').checked;

    // Start adding buttons
    this.#addButtonIntervalID = setInterval(() => this.#addButton(), this.#delay);

    this.#prevTime = Date.now();
    setInterval(() => {
      const clickrate = (this.#clickedCounter - this.#prevClickedCounter) * 1000 / (Date.now() - this.#prevTime);
      
      this.#prevClickedCounter = this.#clickedCounter;
      this.#prevTime = Date.now();

      this.#maxClickrate = Math.max(this.#maxClickrate, clickrate);

      this.#clickrateStatsEl.textContent = `${clickrate.toFixed(2)} / ${this.#maxClickrate.toFixed(2)}`;
    }, 1000);
  }

  #addInitialButtons() {
    const initialCount = document.querySelector('#config-initial').value;
    for (let i = 0; i < initialCount; i++) {
      setTimeout(() => this.#addButton());
    }
  }

  /**
   * Updates the counters.
   */
  #updateCounters() {
    const remainingCounter = this.#createdCounter - this.#clickedCounter;

    this.#createdCounterEl.innerText = this.#createdCounter;
    this.#clickedCounterEl.innerText = this.#clickedCounter;
    this.#remainingCounterEl.innerText = remainingCounter;

    if (this.#winOnNoRemains && (remainingCounter == 0)) {
      this.#showWonScreen();
      clearInterval(this.#addButtonIntervalID);
    }
    // document.title = `${this.#createdCounter} created, ${this.#clickedCounter} clicked, ${this.#createdCounter - this.#clickedCounter} remaining`;
  }

  /**
   * Adds a new random color button.
   */
  #addButton() {
    const button = document.createElement('button');
    button.classList.add('absolute', 'color-button');

    // Set a random button color
    const color = getRandomColor();
    button.innerText = color.backcolor;
    button.style.backgroundColor = color.backcolor;
    button.style.color = color.textcolor;

    // Initialize the button click event
    button.addEventListener('click', (e) => {
      // Update the background and text color of the document body
      document.body.style.backgroundColor = e.target.style.backgroundColor;
      document.body.style.color = e.target.style.color;
  
      // Remove the button
      e.target.remove();

      // Update the clicked counter
      this.#clickedCounter++;
      this.#updateCounters();
    });

    // Add the button at a random position
    document.body.appendChild(button);
    const position = getRandomPosition(button);
    button.style.left = position.left + 'px';
    button.style.top = position.top + 'px';

    // Update the created counter
    this.#createdCounter++;
    this.#updateCounters();
  }

  #showWonScreen() {
    document.querySelector('#won-section').classList.remove('hidden');
  }
}

/**
 * Initialize the application in the window load event.
 */
 window.addEventListener("load", () => new App());