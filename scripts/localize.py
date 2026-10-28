p = 'F:/mudarris/src/app/page.tsx'
s = open(p).read()
repls = [
 ('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=80', '/images/hero-children.jpg'),
 ('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60', '/images/poster.jpg'),
 ('https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=700&q=80', '/images/school.jpg'),
 ('https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80', '/images/teacher.jpg'),
 ('alt="Professional office"', 'alt="School building"'),
 ('className="mt-6 h-80 w-full rounded-2xl object-cover"', 'className="mt-6 h-96 w-full rounded-2xl object-cover"'),
]
for a,b in repls:
    if a in s:
        s = s.replace(a,b)
    else:
        print('NOT FOUND:', a)
open(p,'w').write(s)
print('done')
