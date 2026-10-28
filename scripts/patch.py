p = 'F:/mudarris/src/app/page.tsx'
s = open(p).read()
old = '''      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-16">
        <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center text-3xl font-bold">
          {t.how.title}
        </motion.h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">{t.how.subtitle}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {t.how.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary"
              >
                {icons[i]}
              </motion.div>
              <h3 className="text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>'''
new = '''      {/* How it works */}
      <section id="how" className="relative overflow-hidden py-20">
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoPlay muted loop playsInline
          poster="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=60"
          src="https://videos.pexels.com/video-files/5734763/5734763-hd_1280_720_30fps.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <motion.h2 initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="text-center text-3xl font-bold text-white">
            {t.how.title}
          </motion.h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/80">{t.how.subtitle}</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {t.how.steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
                className="flex flex-col items-center text-center rounded-2xl bg-white/10 p-6 backdrop-blur-sm"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-white"
                >
                  {icons[i]}
                </motion.div>
                <h3 className="text-lg font-semibold text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-white/80">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>'''
assert old in s, 'old block not found'
s = s.replace(old, new)
open(p, 'w').write(s)
print('done')
"