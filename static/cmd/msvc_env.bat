@echo off
:: Created at 2020/7/19 0:02
:: @author Liangcheng Juves

setx INCLUDE "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Tools\MSVC\14.26.28801\include;C:\Program Files (x86)\Windows Kits\10\Include\10.0.18362.0\ucrt"
setx LIB "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Tools\MSVC\14.26.28801\lib\onecore\x64;C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Tools\MSVC\14.26.28801\lib\x64;C:\Program Files (x86)\Windows Kits\10\Lib\10.0.18362.0\ucrt\x64;C:\Program Files (x86)\Windows Kits\10\Lib\10.0.18362.0\um\x64"

echo The environment variable is set successfully.
pause