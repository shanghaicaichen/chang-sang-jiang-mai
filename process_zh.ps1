$files = Get-ChildItem -Path zh\*.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    
    $content = $content.Replace('href="css/style.css"', 'href="../css/style.css"')
    $content = $content.Replace('src="js/main.js"', 'src="../js/main.js"')
    
    $basename = $f.Name
    $switcher = "            </ul>`n            <div class=`"lang-switch`" style=`"margin-left: 20px; font-weight: bold;`">`n                <a href=`"../zh/$basename`" style=`"color: var(--color-primary);`">中</a> | `n                <a href=`"../en/$basename`">EN</a>`n            </div>"
    
    $content = $content.Replace("            </ul>", $switcher)
    
    Set-Content -Path $f.FullName -Value $content -Encoding UTF8
}
