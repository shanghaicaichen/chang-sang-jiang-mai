$files = Get-ChildItem -Path en\*.html
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw -Encoding UTF8
    
    # 1. Lang attr
    $content = $content.Replace('<html lang="zh-CN">', '<html lang="en">')
    
    # 2. Title
    $content = $content.Replace('<title>长桑君脉法 - 古朴雅致的现代脉学体系</title>', '<title>Chang Sang Jun Pulse Method</title>')
    
    # 3. Logo text (inside SVG)
    $content = $content.Replace('>长桑君脉法</text>', '>Chang Sang Jun Pulse Method</text>')
    # Also adjust SVG font size maybe for English to fit, 22 is too big for English string
    $content = $content.Replace('font-size="22" fill="#8B1E14" font-weight="bold" letter-spacing="2">Chang Sang Jun Pulse Method</text>', 'font-size="12" fill="#8B1E14" font-weight="bold" letter-spacing="0.5">Chang Sang Jun Pulse Method</text>')
    
    # 4. Nav Links
    $content = $content.Replace('>首页</a>', '>Home</a>')
    $content = $content.Replace('>大师溯源</a>', '>Origin</a>')
    $content = $content.Replace('>理论体系</a>', '>Theory</a>')
    $content = $content.Replace('>临床应用</a>', '>Clinical</a>')
    $content = $content.Replace('>学习进阶</a>', '>Learning</a>')
    $content = $content.Replace('>学术动态</a>', '>News</a>')
    
    # 5. Language switcher styling
    $content = $content.Replace('style="color: var(--color-primary);">中</a>', '>中</a>')
    $content = $content.Replace('">EN</a>', '" style="color: var(--color-primary);">EN</a>')
    
    # 6. Footer
    $content = $content.Replace('长桑君脉法 学术委员会. 保留所有权利。', 'Chang Sang Jun Pulse Method Academic Committee. All Rights Reserved.')
    
    Set-Content -Path $f.FullName -Value $content -Encoding UTF8
}
