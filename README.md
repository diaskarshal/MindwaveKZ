# MindwaveKZ | UX-audit system using Neural Interface

## About 
MindwaveKZ is a ux-audit tool combining data from the neurosky mindwave™ mobile and webcam-based eye tracking. Built as a high school project, it was tested on 5 companies to analyze user attention and engagement on companies' websites.
 
## Output
Captures:
- brainwaves (attention, signal quality)
- gaze (chrome extension via webgazer.js)
- screen recordings w/ overlaid data

Outputs reports (video + srt subtitles) for ux evaluation. (watch demo)

## Setup
Requirements: chrome, php server (xampp/wamp/mamp), webcam, mindwave headset.

1. place repo in webroot (e.g. htdocs), run apache → http://localhost/Web/index.php
2. load extension: chrome://extensions/ → dev mode → "load unpacked" → Extention folder
3. default login: admin / Inf2022 (change in Web/index.php)

## Usage
- Login at dashboard, connect headset, start session
- Calibration: click red dots (turn yellow)
- System records video w/ eeg + gaze overlays
- Download webm + srt, analyze for low-attention points

## Tech used: 
- Frontend: html, css, javascript, bootstrap
- Backend: php
- Other: webgazer.js, web bluetooth api, mediarecorder, filesaver.js, jquery
- Hardware: neurosky mindwave™ mobile headset


Project supervisor - Yerbol Zhunussov  

:)
