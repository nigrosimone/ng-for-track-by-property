@echo off
npm version patch && ^
cd "%cd%\projects\ng-for-track-by-property" && ^
npm version patch && ^
cd "%cd%" && ^
npm run build ng-for-track-by-property --prod && ^
copy /y "%cd%\README.md" "%cd%\dist\ng-for-track-by-property\README.md" && ^
copy /y "%cd%\LICENSE" "%cd%\dist\ng-for-track-by-property\LICENSE" && ^
cd "%cd%\dist\ng-for-track-by-property" && ^
npm publish --ignore-scripts && ^
cd "%cd%"
pause