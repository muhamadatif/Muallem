p = 'F:/mudarris/src/app/page.tsx'
s = open(p).read()
s = s.replace('  const { t } = useLang();', '  const { t, lang } = useLang();')
old1 = '          <SchoolWizard />\n'
new1 = '          <SchoolWizard />\n          <p className="mt-4 text-center text-xs text-muted-foreground">{ (lang=="ar"?"تحتاج مساعدة؟":"Need help?") } <a href="https://wa.me/201000000000" className="text-primary hover:underline">WhatsApp</a></p>\n'
assert old1 in s
s = s.replace(old1, new1, 1)
old2 = '          <TeacherWizard />\n'
new2 = '          <TeacherWizard />\n          <p className="mt-4 text-center text-xs text-muted-foreground">{ (lang=="ar"?"تحتاج مساعدة؟":"Need help?") } <a href="https://wa.me/201000000000" className="text-primary hover:underline">WhatsApp</a></p>\n'
assert old2 in s
s = s.replace(old2, new2, 1)
open(p, 'w').write(s)
print('done')
