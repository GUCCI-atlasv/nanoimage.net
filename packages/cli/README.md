# NanoImage CLI

Free, open-source command-line tool to compress, resize, convert, and clean image files locally.

**Website:** https://nanoimage.net/cli  
**Docs:** https://nanoimage.net/docs/cli

## Install

```bash
npm install -g nanoimage
```

Requires Node.js 18+.

## Commands

### `compress`
```bash
nanoimage compress ./images --quality 80 --output ./out
nanoimage compress hero.jpg --quality 75
```

### `resize`
```bash
nanoimage resize ./images --width 1200 --output ./resized
nanoimage resize banner.jpg --width 800 --height 400 --fit cover
```

### `convert`
```bash
nanoimage convert ./images --to webp --output ./webp
nanoimage convert logo.png --to jpg --background white
```

### `webp`
```bash
nanoimage webp ./public --quality 82 --remove-exif
```

### `remove-exif`
```bash
nanoimage remove-exif ./photos --output ./clean
```

## Options

All commands support:
- `-o, --output <dir>` — output directory (default: overwrite in place)
- `--json` — print results as JSON (useful for CI/CD)

## License

MIT
