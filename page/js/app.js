// Copyright 2020-2021 anaurelian. All rights reserved.
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
   * Initializes the application object.
   */
  constructor() {
    // Cache some frequently used DOM elements
    this.#createdCounterEl = document.querySelector('#created-counter');
    this.#clickedCounterEl = document.querySelector('#clicked-counter');
    this.#remainingCounterEl = document.querySelector('#remaining-counter');
    this.#delayEl = document.querySelector('#delay');

    // Initialize slower/faster buttons
    document.querySelector('#slower-button').addEventListener('click', (e) => {
      this.#delay += 100;
      this.#updateDelay();
    });
    document.querySelector('#faster-button').addEventListener('click', (e) => {
      if (this.#delay > 100) this.#delay -= 100;
      this.#updateDelay();
    });

    // Set a random button color
    const configSectionEl = document.querySelector('#config-section');
    const color = getRandomColor();
    configSectionEl.style.backgroundColor = color.backcolor;
    configSectionEl.style.color = color.textcolor;

    document.querySelector('#config-start').addEventListener('click', (e) => {
      configSectionEl.classList.add('hidden');
      document.querySelector('main').classList.remove('hidden');

      // Add initial buttons
      this.#addInitialButtons();

      // Add the first button
      this.#addButton();
    });
  }

  #addInitialButtons() {
    const initialCount = document.querySelector('#config-initial').value;
    for (let i = 0; i < initialCount; i++) {
      this.#addButton(false);
    }
  }

  /**
   * Updates the counters.
   */
  #updateCounters() {
    this.#createdCounterEl.innerText = this.#createdCounter;
    this.#clickedCounterEl.innerText = this.#clickedCounter;
    this.#remainingCounterEl.innerText = this.#createdCounter - this.#clickedCounter;
  }

  /**
   * Updates the delay value.
   */
  #updateDelay() {
    this.#delayEl.innerText = this.#delay;
  }

  /**
   * Adds a new random color button.
   */
  #addButton(schedule = true) {
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

    // Schedule the next button add
    if (schedule) {
      setTimeout(() => this.#addButton(), this.#delay);
    }
  }
}

/**
 * Initialize the application in the window load event.
 */
 window.addEventListener("load", () => new App());