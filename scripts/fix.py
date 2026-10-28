p = r'F:/mudarris/src/app/page.tsx'
s = open(p).read()
repls = [
 ('text-muted-foreground">{t.how.subtitle}', 'text-white/80">{t.how.subtitle}'),
 ('flex flex-col items-center text-center"', 'flex flex-col items-center text-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm"'),
 ('rounded-2xl bg-primary/10 text-primary"', 'rounded-2xl bg-white/20 text-white"'),
 ('text-lg font-semibold">{s.t}', 'text-lg font-semibold text-white">{s.t}'),
 ('text-sm text-muted-foreground">{s.d}', 'text-sm text-white/80">{s.d}'),
]
for a,b in repls:
    if a in s:
        s = s.replace(a,b)
    else:
        print('NOT FOUND:', a)
open(p,'w').write(s)
print('done')