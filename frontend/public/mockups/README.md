# Ghost-mannequin mockup templates

One folder per garment **type** (not per product): `polo`, `tipped-polo`, `crew-tee`,
`formal-shirt`, `hoodie`, `zip-hoodie`, `hoodie-vest`, `track-jacket`.
Products point at a type in `src/data/productMockups.json`.

**If a type's folder (or its `template.json` / `base.png`) is missing, its products keep
showing their `photo.jpg`.** Nothing needs to change in code when you add or replace layers.

The garment is drawn on a soft off-white background (#f5f5f5) with a subtle ground shadow —
no mannequin, neck, arms or body.

## Files per template

All PNGs in one folder must be **exactly the same size**, **aligned pixel-for-pixel**, and
**RGBA with a transparent background**. Recommended size: **1200 × 1400 px**.

| File | Required | Content |
|---|---|---|
| `base.png` | **yes** | The whole garment, **pure white fabric**, ghost-mannequin style (hollow neck, no body), realistic soft shading, transparent background. Its brightness is the shading for every colour, so: white/very light grey overall, darker only in folds and shadows, nothing blown out to flat 255 over large areas. Buttons can be on it (the `buttons` mask recolours them). |
| `mask-body.png` | **yes** | The **whole garment silhouette** (everything visible in `base.png`). Body is painted first; other parts are painted over it. |
| `mask-sleeve.png` | no | Both sleeves, excluding cuffs/ribbing and tipping. |
| `mask-cuff.png` | no | Sleeve cuffs / ribbed bands (excluding the tipping stripes). |
| `mask-sleeve-tip.png` | no | Sleeve tipping stripes only. |
| `mask-collar.png` | no | The collar (and inner neck band), excluding tipping stripes. |
| `mask-collar-tip.png` | no | Collar tipping stripes only. |
| `mask-placket.png` | no | The placket strip, excluding the buttons. |
| `mask-buttons.png` | no | The buttons. |
| `details.png` | no | Anything drawn on top and **never recoloured** (e.g. a woven label). Usually not needed. |
| `template.json` | **yes** | Size, parts, default colours, logo zones (below). |

A missing optional mask simply hides that colour option for the garment type.

**Mask rules** (checked by `npm run check-template <type>`):
- White (or any colour) where the part is, **fully transparent** elsewhere. Anti-aliased edges
  are fine — the renderer feathers them by another ~0.5 px.
- Apart from `mask-body.png`, **masks must not overlap**: each garment pixel belongs to one part.
  (Stripes are cut out of the collar/cuff masks, buttons out of the placket mask.)
- Every mask must lie on the garment in `base.png`.

## template.json

```jsonc
{
  "version": 2,
  "type": "tipped-polo",
  "width": 1200, "height": 1400,
  "pxPerCm": 13.1,                       // template px per cm across the chest (see below)
  "layers": { "base": "base.png" },       // optionally "details": "details.png"
  "foldStrength": 0.55,                   // 0–1: fold visibility on dark colours (default 0.55)
  "regions": [                            // painted in this order
    { "id": "body",       "label": "Body",           "mask": "mask-body.png",       "default": "#1c1c1c" },
    { "id": "sleeve",     "label": "Sleeves",        "mask": "mask-sleeve.png",     "default": "#1c1c1c", "inherit": "body" },
    { "id": "cuff",       "label": "Sleeve cuffs",   "mask": "mask-cuff.png",       "default": "#1c1c1c", "inherit": "sleeve" },
    { "id": "sleeve-tip", "label": "Sleeve tipping", "mask": "mask-sleeve-tip.png", "default": "#f5f5f2", "inherit": "collar-tip" },
    { "id": "collar",     "label": "Collar",         "mask": "mask-collar.png",     "default": "#1c1c1c", "inherit": "body" },
    { "id": "collar-tip", "label": "Collar tipping", "mask": "mask-collar-tip.png", "default": "#f5f5f2" },
    { "id": "placket",    "label": "Placket",        "mask": "mask-placket.png",    "default": "#1c1c1c", "inherit": "body" },
    { "id": "buttons",    "label": "Buttons",        "mask": "mask-buttons.png",    "default": "#f5f5f2" }
  ],
  "zones": [
    { "id": "left-chest",   "label": "Left chest",   "x": 700, "y": 430, "w": 131, "h": 105, "rotation": 0 },
    { "id": "center-chest", "label": "Center chest", "x": 425, "y": 560, "w": 350, "h": 275, "rotation": 0 },
    { "id": "right-chest",  "label": "Right chest",  "x": 369, "y": 430, "w": 131, "h": 105, "rotation": 0 }
  ]
}
```
(The numbers above are placeholders — measure your own.)

- Part ids: `body`, `sleeve`, `cuff`, `sleeve-tip`, `collar`, `collar-tip`, `placket`, `buttons`.
- `inherit`: use that part's colour when this one isn't set (sleeves follow the body, cuff
  tipping follows collar tipping, …). `default`: hex colour when nothing else applies.
- Zone ids: `left-chest`, `center-chest`, `right-chest`, `left-sleeve`, `right-sleeve`, `back`.
  "Left" means the **wearer's** left = the **right side of the image**.
  The studio's Left / Center / Right chest positions map to the zones with the same id.

### Measuring pxPerCm and zones
1. In Photoshop/Photopea, open `base.png` and turn on the Info panel (pixel coordinates).
2. **pxPerCm** = chest width in px, measured straight across just below the armholes, ÷ the
   flat chest width of the sample garment in cm (size M polo ≈ 52 cm).
3. **Zones**: with the Rectangular Marquee, draw the largest box a logo may fill at that spot
   and read its X, Y, W, H from the Info panel. Typical: left chest ≈ 10 × 8 cm, centre chest
   ≈ 27 × 21 cm. For a sloping sleeve, set `rotation` in degrees (clockwise).
4. Logos are fitted inside the zone keeping their aspect ratio; the size slider scales them
   50–100 % of the zone.

## Exporting from Photoshop / Photopea

Start from a white ghost-mannequin polo (photo or 3D render) on its own layer.

1. **Canvas**: Image → Canvas Size → 1200 × 1400 px (garment centred, ~40 px margin all round,
   same framing for every garment type if possible). Keep it RGB, 8-bit.
2. **Cut out** the garment: select the background (Select → Subject / Magic Wand), invert,
   Layer Mask. Remove any mannequin, neck or hanger. Refine Edge / Select and Mask for a clean,
   slightly soft edge. Hide the background layer.
3. **base.png**: the garment must read as white fabric. If needed, Desaturate
   (Image → Adjustments → Desaturate) and use Levels so the fabric sits around 230–245 with
   folds darker. File → Export → Export As → PNG, **Transparency on**. (Photopea: File → Export
   as → PNG.)
4. **One mask per part**: for each part, make a new empty layer, select the part (Pen tool or
   Lasso, following seams), fill with white, keep everything else transparent. Hide all other
   layers (including base) and export that layer alone as PNG with transparency, at the full
   canvas size (**do not trim** — Export As must keep 1200 × 1400).
   - Draw the tipping stripes, buttons and cuffs first, then subtract them from the collar,
     placket and sleeve masks (Ctrl/Cmd-click the stripe layer thumbnail → Delete on the
     collar layer) so parts don't overlap.
   - `mask-body.png` = Ctrl/Cmd-click the garment's layer mask → fill white on a new layer.
5. Name the files exactly as in the table above and put them in `public/mockups/<type>/`.
6. Check them:
   ```
   npm run check-template tipped-polo
   ```
   then open `/mockup-lab?debug=masks` and pick a product of that type: every part is tinted
   in its own colour and the logo zones are outlined, so misalignments are obvious.
