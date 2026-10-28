p = 'F:/mudarris/src/app/page.tsx'
s = open(p).read()
s = s.replace('items-start gap-8 px-4 lg:grid-cols-2', 'items-stretch gap-8 px-4 lg:grid-cols-2')
s = s.replace('className="mt-6 h-64 w-full rounded-2xl object-cover"', 'className="mt-6 h-full min-h-[320px] w-full rounded-2xl object-cover"')
open(p, 'w').write(s)
print('done')
