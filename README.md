# Vine&Bloom

Landing page for Vine&Bloom, a floral design studio in Healdsburg, California. Seasonal flowers for winery weddings, estate gatherings, private dinners, and weekly arrangements.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Edit the studio

Most of the words live in [`lib/studio.ts`](lib/studio.ts):

- Studio name, city, hours, email, and phone
- Services, seasons, questions, and the steps of a gathering
- Photo captions and alt text

Inquiries open the visitor’s email app addressed to vineandbloomdesign@gmail.com. The site does not send or store messages on a server. Calls go to (707) 321-1296.

## Replace the photographs

The pictures in `public/images` are reference photographs, labeled as such on the page, while the studio collects its own work. Swap the files and update the matching `alt` text in `lib/studio.ts`.

| File | Used for |
| --- | --- |
| `brand.png` | Opening poster |
| `logo.png` | Barrel logo in the header and footer |
| `jar.jpg` | Studio section |
| `sonoma.jpg` and `og.jpg` | Vineyard band and link previews |
| `hero.jpg`, `arch.jpg`, `bouquet.jpg`, `roses.jpg`, `white.jpg`, `golden.jpg`, `table.jpg` | Mood gallery |

## Share previews

Set `NEXT_PUBLIC_SITE_URL` to the public site address so link previews use the right domain. Locally it falls back to `http://127.0.0.1:43123`.
