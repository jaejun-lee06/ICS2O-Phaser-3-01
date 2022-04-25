/* global Phaser */

// Copyright (c) 2022 Jaejun Lee All rights reserved
//
// Created by: Jaejun Lee
// Created on: April 2022
// This is the Title Scene

class TitleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'titleScene'})
  }

  init (data) {
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload () {
    console.log('Title Scene')
  }

  creat (data) {
  }

  update (time, delta) {
  }
}

export default TitleScene
