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

- Studio name, city, hours, and email
- Services, seasons, questions, and the steps of a gathering
- Photo captions and alt text

The inquiry form does not send mail from a server. It opens the visitor’s email app with the note addressed to `vineandbloomdesign@gmail.com`, and it keeps a copy of the note on the page if the app does not open. The studio phone is (707) 321-1296.

The visit page is `/visit`. It shows a Google map of Healdsburg, the studio phone, and the studio email. Change the mapped place with `studio.mapQuery` in `lib/studio.ts` when the studio has a street address.

Walk-in orders live at `/order`. Stem prices are in [`lib/stems.ts`](lib/stems.ts). The page totals each stem, and the ready time is limited to Tuesday–Saturday, 10:00 AM–5:00 PM Pacific. Placing an order opens an email to the studio with the slip. Nothing is stored on the website.

## Replace the photographs

The pictures in `public/images` are reference photographs, labeled as such on the page, while the studio collects its own work. Swap the files and update the matching `alt` text in `lib/studio.ts`.

| File | Used for |
| --- | --- |
| `hero.jpg` | Opening bouquet |
| `jar.jpg` | Studio section |
| `sonoma.jpg` and `og.jpg` | Vineyard band and link previews |
| `arch.jpg`, `bouquet.jpg`, `roses.jpg`, `white.jpg`, `golden.jpg`, `table.jpg` | Mood gallery |

## Share previews

Set `NEXT_PUBLIC_SITE_URL` to the public site address so link previews use the right domain. Locally it falls back to `http://127.0.0.1:43123`.
