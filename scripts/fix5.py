p = 'F:/mudarris/src/app/page.tsx'
s = open(p).read()
s = s.replace('items-stretch gap-8 px-4 lg:grid-cols-2', 'items-start gap-8 px-4 lg:grid-cols-2')
s = s.replace('h-full min-h-[320px] w-full rounded-2xl object-cover', 'h-64 w-full rounded-2xl object-cover')
open(p, 'w').write(s)
print('done')
