# Bin Packing App

Created as result of a 1,5 day sprint at the Hackathon event hosted by the WBK insitute (KIT).
This repository contains functionality to automatically scan, measure and optimize the packing
arrangement of multiple smaller boxes in one bigger box.
This greatly improves the space- and thereby the economic efficiency of packaging.

## Contributors

Lennart Großkreutz, Thomas Marwitz, Paul Müller, Niklas Rondot, Timo Weberruß

![](res/better_boxing.png)

## Prerequisites

- add Allow Cors (Chrome) or Cors Everywhere (Firefox)

## Install

Take a look at the README in each subfolder

## Run the app

- Run Frontend: run `npm start` inside `visualizer/`
- Run Bin Packing Backend: `java -jar api-2.7.0` inside `bin-packing-backend/api/target` or `bin-packing-backend/out`
- Run Scanning Backend: `python main.py` inside `box-scanner`
