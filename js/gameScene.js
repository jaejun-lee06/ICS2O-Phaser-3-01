/* global Phaser */

// Copyright (c) 2022 Jaejun Lee All rights reserved
//
// Created by: Jaejun Lee
// Created on: April 2022
// This is the Phaser3 configuration file

/**
 * This class is the Game Scene.
 */
class GameScene extends Phaser.Scene {
  // create an alien
  createAlien() {
    const alienXLocation = Math.floor(Math.random() * 1920) + 1 //spawns the alien between 1 and 1921 pixel
    let alienXVelocity = Math.floor(Math.random() * 50) + 1 // random speed of the alien
    alienXVelocity *= Math.round(Math.random()) ? 1 : -1 // this will add minus sign to 50% of cases
    const anAlien = this.physics.add.sprite(alienXLocation, -100, "alien")
    anAlien.body.velocity.y = 200
    anAlien.body.velocity.x = alienXVelocity
    this.alienGroup.add(anAlien)
  }

  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.ship = null
    this.fireMissile = false
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#ffffff")
  }

  preload() {
    console.log("Game Scene")

    // images
    this.load.image("starBackground", "./assets/starBackground.png")
    this.load.image("ship", "./assets/spaceShip.png")
    this.load.image("missile", "./assets/missile.png")
    this.load.image("alien", "./assets/alien.png")
    //sound
    this.load.audio("laser", "./assets/laser1.wav")
    this.load.audio("explosion", "./assets/barrelExploding.wav")
  }

  create(data) {
    this.background = this.add.image(0, 0, "starBackground").setScale(2.0)
    this.background.setOrigin(0, 0)

    this.ship = this.physics.add.sprite(1920 / 2, 1080 - 100, "ship")

    //create a group for the missiles
    this.missileGroup = this.physics.add.group()

    //create a group for the aliens
    this.alienGroup = this.add.group()
    this.createAlien()

    //Collisions between missiles and aliens
    this.physics.add.collider(
      this.missileGroup,
      this.alienGroup,
      function (missileCollide, alienCollide) {
        alienCollide.destroy()
        missileCollide.destroy()
        this.sound.play("explosion")
        this.createAlien()
        this.createAlien()
      }.bind(this)
    )
  }

  update(time, delta) {
    //called 60 times a second.

    const keyForwardObj = this.input.keyboard.addKey("W")
    const keyLeftObj = this.input.keyboard.addKey("A")
    const keyBackwardObj = this.input.keyboard.addKey("S")
    const keyRightObj = this.input.keyboard.addKey("D")
    const keySpaceObj = this.input.keyboard.addKey("SPACE")

    if (keyForwardObj.isDown === true) {
      this.ship.y -= 17
      if (this.ship.y < 700) {
        this.ship.y = 700
      }
    }

    if (keyLeftObj.isDown === true) {
      this.ship.x -= 17
      if (this.ship.x < 0) {
        this.ship.x = 0
      }
    }

    if (keyBackwardObj.isDown === true) {
      this.ship.y += 17
      if (this.ship.y > 1080) {
        this.ship.y = 1080
      }
    }

    if (keyRightObj.isDown === true) {
      this.ship.x += 17
      if (this.ship.x > 1920) {
        this.ship.x = 1920
      }
    }

    if (keySpaceObj.isDown === true) {
      if (this.fireMissile === false) {
        //fire missile
        this.fireMissile = true
        const aNewMissile = this.physics.add.sprite(
          this.ship.x,
          this.ship.y,
          "missile"
        )
        this.missileGroup.add(aNewMissile)
        this.sound.play("laser")
      }
    }

    if (keySpaceObj.isUp === true) {
      this.fireMissile = false
    }

    this.missileGroup.children.each(function (item) {
      item.y = item.y - 15
      if (item.y < 0) item.destroy()
    })
  }
}

export default GameScene