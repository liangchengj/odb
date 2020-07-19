@echo off
:: Created at 2020/7/19 0:02.
:: @author Liangcheng Juves

:: MSVC
set MSVC_VERSION=14.26.28801
set MSVC_PATH=C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Tools\MSVC\%MSVC_VERSION%

:: Windows Kit
set WK10_PATH=C:\Program Files (x86)\Windows Kits\10
set WK10_VERSION=10.0.18362.0
set WK10_INCLUDE=%WK10_PATH%\Include\%WK10_VERSION%
set WK10_LIB=%WK10_PATH%\Lib\%WK10_VERSION%

setx INCLUDE "%MSVC_PATH%\include;%WK10_INCLUDE%\cppwinrt\winrt;%WK10_INCLUDE%\shared;%WK10_INCLUDE%\ucrt;%WK10_INCLUDE%\um;%WK10_INCLUDE%\winrt"
setx LIB "%MSVC_PATH%\lib\onecore\x64;%MSVC_PATH%\lib\x64;%WK10_LIB%\ucrt\x64;%WK10_LIB%\ucrt_enclave\x64;%WK10_LIB%\um\x64"

echo The environment variable is set successfully.
pause