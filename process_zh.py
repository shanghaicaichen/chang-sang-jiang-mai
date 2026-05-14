import os, glob

files = glob.glob('zh/*.html')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace paths
    content = content.replace('href="css/style.css"', 'href="../css/style.css"')
    content = content.replace('src="js/main.js"', 'src="../js/main.js"')
    
    # Add lang switcher
    basename = os.path.basename(f)
    switcher = f'''            </ul>
            <div class="lang-switch" style="margin-left: 20px; font-weight: bold;">
                <a href="../zh/{basename}" style="color: var(--color-primary);">中</a> | 
                <a href="../en/{basename}">EN</a>
            </div>'''
    content = content.replace('            </ul>', switcher)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
