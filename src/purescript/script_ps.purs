module Main where

import Prelude

import Effect (Effect)
import Effect.Random (randomInt)

randomDoor :: Int -> Effect Int
randomDoor a_doors_num =
  randomInt 0 (a_doors_num - 1)

notOpenIndex :: Int -> Effect Int
notOpenIndex aDoorsNum =
  randomInt 0 (aDoorsNum - 2)
