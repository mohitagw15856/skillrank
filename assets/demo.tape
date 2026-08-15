Output assets/demo.gif

Require bash
Set Shell bash
Set Theme { "background": "#0B0E14", "foreground": "#E8EAF0", "cursor": "#60A5FA", "selection": "#2A3140", "black": "#0B0E14", "red": "#F05252", "green": "#34D399", "yellow": "#FBBF24", "blue": "#60A5FA", "magenta": "#A78BFA", "cyan": "#22D3EE", "white": "#E8EAF0", "brightBlack": "#8B94A7", "brightRed": "#F87171", "brightGreen": "#6EE7B7", "brightYellow": "#FCD34D", "brightBlue": "#93C5FD", "brightMagenta": "#C4B5FD", "brightCyan": "#67E8F9", "brightWhite": "#FFFFFF" }
Set FontSize 17
Set Width 1180
Set Height 840
Set Padding 26
Set TypingSpeed 30ms
Set Framerate 24
Hide
Type 'skillrank() { node bin/skillrank.mjs "$@"; }'
Enter
Type "clear"
Enter
Show

Sleep 700ms
Type "skillrank test/fixtures --quiet"
Sleep 400ms
Enter
Sleep 7s
