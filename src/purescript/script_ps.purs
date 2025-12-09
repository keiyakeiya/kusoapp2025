module Main where

import Prelude

import Effect (Effect)
import Effect.Console (log)

hello_ps :: String -> Effect Unit
hello_ps arg = do
  log ("Hello from PureScript! " <> arg <> "!")
