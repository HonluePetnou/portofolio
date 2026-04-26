import os

files_to_fix = [
    r'c:\Users\SUPRA STORES\Documents\soluty\portofolio\back-office\app\(dashboard)\articles\page.tsx',
    r'c:\Users\SUPRA STORES\Documents\soluty\portofolio\back-office\app\(dashboard)\projects\page.tsx',
    r'c:\Users\SUPRA STORES\Documents\soluty\portofolio\back-office\components\shared\AvatarUpload.tsx',
    r'c:\Users\SUPRA STORES\Documents\soluty\portofolio\back-office\components\shared\ImageUpload.tsx',
    r'c:\Users\SUPRA STORES\Documents\soluty\portofolio\back-office\components\testimonials\ProfileTestimonials.tsx'
]

replacements = {
    'rounded-[2rem]': 'rounded-4xl',
    'break-words': 'wrap-break-word',
    'bg-white/[0.02]': 'bg-white/2',
    'bg-white/[0.01]': 'bg-white/1',
    'bg-white/[0.03]': 'bg-white/3',
    'border-[12px]': 'border-12',
    'bg-gradient-to-r': 'bg-linear-to-r',
    'tracking-[0.1em]': 'tracking-widest'
}

for file_path in files_to_fix:
    if os.path.exists(file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for old, new in replacements.items():
            content = content.replace(old, new)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Fixed {file_path}')
    else:
        print(f'File not found: {file_path}')
