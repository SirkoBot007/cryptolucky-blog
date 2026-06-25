#!/usr/bin/env python3
"""Genera lib/thumb-manifest.ts con los slugs que YA tienen imagen real en
public/images/thumbs/<slug>.webp (excluye sample-*). Re-ejecutar tras cada lote.
Uso: python tools/gen-thumb-manifest.py"""
import os, glob, json, re

THUMBS_DIR = 'public/images/thumbs'
slugs = []
for p in sorted(glob.glob(os.path.join(THUMBS_DIR, '*.webp'))):
    name = os.path.splitext(os.path.basename(p))[0]
    if name.startswith('sample-'):
        continue
    slugs.append(name)

ts = (
    '// AUTO-GENERADO por tools/gen-thumb-manifest.py — NO editar a mano.\n'
    '// Slugs con miniatura real en /images/thumbs/<slug>.webp. El resto usa el tile CSS temático.\n'
    'export const THUMB_SLUGS: ReadonlySet<string> = new Set(' + json.dumps(slugs, ensure_ascii=False, indent=2) + ');\n\n'
    'export function hasThumb(slug: string): boolean {\n'
    '  return THUMB_SLUGS.has(slug);\n'
    '}\n\n'
    'export function thumbSrc(slug: string): string {\n'
    '  return `/images/thumbs/${slug}.webp`;\n'
    '}\n'
)
with open('lib/thumb-manifest.ts', 'w', encoding='utf-8') as f:
    f.write(ts)
print(f'thumb-manifest: {len(slugs)} slugs con imagen real')
for s in slugs:
    print(' -', s)
