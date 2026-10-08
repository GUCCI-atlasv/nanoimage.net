# Historical mirrored deployment workflow

The production source gap was recovered on 2026-10-08. Use the root project source build and deploy workflow:

```bash
npm ci
npm run deploy
```

Mirrored `prod-out/` deployment was a temporary workaround for missing source and is no longer the current workflow. See `docs/PRODUCTION_SOURCE_GAP.md` for the recovery and validation record.
