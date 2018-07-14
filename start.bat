@echo off
for /f "delims=" %%a in (text.txt) DO (
	ECHO %%a
)
nodemon index.js
pause