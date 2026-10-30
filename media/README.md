# Marketing media

Videos for the marketing site, served from the `iloomi-media` Firebase Hosting
site in prod (`iloomi-b34f8`) at https://media.iloomi.com.

Files are cached for a year, so never overwrite one. To change a video, add it
under a new version (`feature-talk-v2.mp4`), point the site at it, and deploy:

    firebase deploy --only hosting

Loops play muted, so encode them without audio:

    ffmpeg -i in.mp4 -an -c:v copy -movflags +faststart public/videos/name-vN.mp4
