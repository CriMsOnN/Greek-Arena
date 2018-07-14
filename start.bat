@echo off
color 0A
for /f "delims=" %%a in (text.txt) DO (
	ECHO %%a
)
node index.js
pause