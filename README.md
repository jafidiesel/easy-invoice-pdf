# easy-invoice-pdf (Raspberry Pi fork)

This repository is a ripped/trimmed fork of the original [VladSez/easy-invoice-pdf](https://github.com/VladSez/easy-invoice-pdf).

## Repository status

- Adapted to run on a **Raspberry Pi 3B+**
- Designed to be served with **Apache**
- Produces a **lightweight static build** (`html + css + js`)
- No Node.js runtime is required in production

## How it works

The app is built with Next.js static export mode (`output: "export"`), so `npm run build` generates an `out/` folder with static assets ready to be hosted by Apache.

## Local setup

```bash
corepack enable
corepack install
pnpm install
cp .env.example .env.local
pnpm run dev
```

## Build for static hosting

```bash
npm run build
```

Static output will be generated in:

```text
/home/runner/work/easy-invoice-pdf/easy-invoice-pdf/out
```

## Build for Raspberry Pi Apache subpath

If Apache serves the app from `/invoice` (example: `http://pi.local/invoice`):

```bash
npm run build:pi
```

This sets `BASE_PATH=/invoice` so generated asset URLs work correctly under a subdirectory.

## Optional packaging/deployment helpers

```bash
npm run tar      # create out.tar.gz from ./out
npm run serve    # quick static preview via python http.server
```

## License

Licensed under [GNU AGPL v3](https://opensource.org/license/AGPL-3.0).
