@echo off
echo Starting..
:main
for /f "delims=" %%a in (text.txt) DO (
	ECHO %%a
)
nodemon index.js
goto main