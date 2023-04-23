Set oShell = CreateObject ("Wscript.Shell")
Dim strArgs
strArgs = "cmd /c C:\Users\Crucial\Downloads\clock\adhan.bat"
oShell.Run strArgs, 0, false