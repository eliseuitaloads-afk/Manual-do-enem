import os
import base64
import re

html_path = r'C:\Users\Usuário\Documents\Antigravityu\mockup_ref.html'
with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# find all base64 images
matches = re.finditer(r'src="data:image/(png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)"', content)
count = 0
for m in matches:
    ext = m.group(1)
    b64_data = m.group(2)
    img_data = base64.b64decode(b64_data)
    count += 1
    img_path = f'C:\\Users\\Usuário\\Documents\\Antigravityu\\assets\\cover_{count}.{ext}'
    os.makedirs(os.path.dirname(img_path), exist_ok=True)
    with open(img_path, 'wb') as img_f:
        img_f.write(img_data)
    
    # replace in html
    content = content.replace(m.group(0), f'src="assets/cover_{count}.{ext}"')

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Extracted {count} images and saved updated HTML.')
