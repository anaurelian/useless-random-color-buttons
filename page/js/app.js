// Copyright 2017-2021 anaurelian. All rights reserved.
// Use of this source code is governed by an MIT-style license that can be
// found in the LICENSE file.

'use strict';

import { getRandomPosition, getRandomColor } from '/js/utils.js';

class App {

  #mainElem;

  /**
   * Init the application.
   */
  constructor() {
    this.#mainElem = document.querySelector('main');
    setInterval(() => this.#addButton(), 2000);
  }


  #addButton() {
    const button = document.createElement('button');
    button.classList.add('absolute', 'color-button');

    const color = getRandomColor();
    button.innerText = color.backcolor;
    button.style.backgroundColor = color.backcolor;
    button.style.color = color.textcolor;


    // button.classList.add(`left-[${position.left}]`, `top-[${position.top}]`);

    button.addEventListener('click', (e) => {
      this.#mainElem.style.backgroundColor = e.target.style.backgroundColor;
  
      e.target.remove();
  
      // buttonCount.textContent = `${document.body.childElementCount}`;
    });

    this.#mainElem.appendChild(button);
    const position = getRandomPosition(button);
    button.style.left = position.left + 'px';
    button.style.top = position.top + 'px';
  }
}

/**
 * Init the application on window load event.
 */
 window.addEventListener("load", () => new App());