import os
import re

log_path = r'C:\Users\Usuário\.gemini\antigravity\brain\b8b847c5-10f4-49e9-9d1b-545c47cf2c96\.system_generated\logs\overview.txt'
with open(log_path, 'r', encoding='utf-8') as f:
    content = f.read()

user_req_start = content.rfind('<USER_REQUEST>')
user_req_end = content.rfind('</USER_REQUEST>')

user_prompt = content[user_req_start:user_req_end]

idx_html = user_prompt.find('Index :')
idx_css = user_prompt.find('STYLE :')
idx_js = user_prompt.find('Script:')

html_content = user_prompt[idx_html + len('Index :'):idx_css].strip()
css_content = user_prompt[idx_css + len('STYLE :'):idx_js].strip()
js_content = user_prompt[idx_js + len('Script:'):].strip()

# Replace inline <script> with src if needed
html_content = re.sub(r'<script>[\s\S]*?</script>', '<script src="script.js"></script>', html_content)

with open(r'c:\Users\Usuário\Documents\Antigravityu\index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

with open(r'c:\Users\Usuário\Documents\Antigravityu\style.css', 'w', encoding='utf-8') as f:
    f.write(css_content)

with open(r'c:\Users\Usuário\Documents\Antigravityu\script.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Done')
