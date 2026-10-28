p = 'F:/mudarris/src/app/page.tsx'
s = open(p).read()
old = 'src="https://videos.pexels.com/video-files/5734763/5734763-hd_1280_720_30fps.mp4"'
new = 'src="/videos/kids-classroom.mp4"'
assert old in s, 'not found'
s = s.replace(old, new)
open(p, 'w').write(s)
print('done')