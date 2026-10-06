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

The about page is `/about`. It is Grace Hayes’s story of Vine & Bloom, in her words. The paragraphs live in `story` in `lib/studio.ts`.

The visit page is `/visit`. It shows a Google map of 20 Healdsburg Ave, Healdsburg, CA 95448, the studio phone, and the studio email. The street address lives on `studio` in `lib/studio.ts`.

Wedding packages live at `/wedding`. The basic package starts at $1,500 and includes a bridal bouquet, bridesmaid bouquets, and boutonnieres. The custom wedding package starts at a $4,000 minimum and includes table arrangements, bar arrangements, and backdrop pieces. A request opens an email to the studio. Nothing is charged on the page.

Sympathy orders live at `/memorial`. Hearts, crosses, and circle wreaths are priced in [`lib/sympathy.ts`](lib/sympathy.ts) from $250 to a $1,000 full deluxe. A full deluxe casket spray is $1,500.

Seasonal harvest arrangements live at `/order`. Three sizes are priced in [`lib/arrangements.ts`](lib/arrangements.ts): small $75, medium $125, and large $200. The ready time is limited to Tuesday–Saturday, 10:00 AM–5:00 PM Pacific. Placing an order opens an email to the studio with the slip. Nothing is stored on the website.

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
