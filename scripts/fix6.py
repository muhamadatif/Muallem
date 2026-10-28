p = "F:/mudarris/src/app/page.tsx"
s = open(p).read()
old = "const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };"
new = "const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } };\n\nconst icons = [\n  None,\n];"
assert old in s
s = s.replace(old, new)
open(p, "w").write(s)
print("done")
