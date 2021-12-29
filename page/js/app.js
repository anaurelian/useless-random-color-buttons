// Copyright 2020-2021 anaurelian. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

'use strict';

import { getRandomPosition, getRandomColor } from '/js/utils.js';



let delay = 1000;
let winOnNoRemains = true;
let createdCounter = 0;
let clickedCounter = 0;
let prevClickedCounter = 0;

let maxClickrate = 0;

let startTime;
let prevTime;

/**
 * Cached DOM elements
 */
let clickrateStatsEl;

let addButtonIntervalID;

/**
 * Initializes the application object.
 */
function initPage() {
  // Cache some frequently used DOM elements

  clickrateStatsEl = document.querySelector('#clickrate-stats');

  document.querySelector('#config-start').addEventListener('click', (e) => start());
}

function start() {
  document.querySelector('#config-section').classList.add('hidden');
  document.querySelector('main').classList.remove('hidden');

  // Add initial buttons
  addInitialButtons();

  delay = document.querySelector('#config-delay').value;
  winOnNoRemains = document.querySelector('#config-win-on-no-remains').checked;

  // Start adding buttons
  addButtonIntervalID = setInterval(() => addButton(), delay);

  prevTime = Date.now();
  setInterval(() => {
    const clickrate = (clickedCounter - prevClickedCounter) * 1000 / (Date.now() - prevTime);
    
    prevClickedCounter = clickedCounter;
    prevTime = Date.now();

    maxClickrate = Math.max(maxClickrate, clickrate);

    clickrateStatsEl.textContent = `${clickrate.toFixed(2)} / ${maxClickrate.toFixed(2)}`;
  }, 1000);
}

/**
 * Adds a new random color button.
 */
function addButton() {
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
    clickedCounter++;
    updateCounters();
  });

  // Add the button at a random position
  document.body.appendChild(button);
  const position = getRandomPosition(button);
  button.style.left = position.left + 'px';
  button.style.top = position.top + 'px';

  // Update the created counter
  createdCounter++;
  updateCounters();
}

function addInitialButtons() {
  const initialCount = document.querySelector('#config-initial').value;
  for (let i = 0; i < initialCount; i++) {
    setTimeout(() => addButton());
  }
}

/**
 * Updates the counters.
 */
function updateCounters() {

  if (typeof updateCounters.createdEl === "undefined") {
    updateCounters.createdEl = document.querySelector('#stats-created');
  }
  if (typeof updateCounters.clickedEl === "undefined") {
    updateCounters.clickedEl = document.querySelector('#stats-clicked');
  }
  if (typeof updateCounters.remainingEl === "undefined") {
    updateCounters.remainingEl = document.querySelector('#stats-remaining');
  }

  const remainingCounter = createdCounter - clickedCounter;

  updateCounters.createdEl.textContent = createdCounter;
  updateCounters.clickedEl.textContent = clickedCounter;
  updateCounters.remainingEl.textContent = remainingCounter;

  if (winOnNoRemains && (remainingCounter == 0)) {
    showWinScreen();
    clearInterval(addButtonIntervalID);
  }
  // document.title = `${createdCounter} created, ${clickedCounter} clicked, ${createdCounter - clickedCounter} remaining`;
}


function showWinScreen() {
  document.querySelector('#win-section').classList.remove('hidden');
}


/**
 * Initialize the application in the window load event.
 */
 window.addEventListener("load", initPage);