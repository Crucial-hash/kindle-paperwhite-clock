#!/usr/bin/env python3
"""
Interactive F1 track icon normalizer
HARD-LOCKED to 997x748 output

Flow:
1) Fetch track image (new media or 2018)
2) Normalize to 997x748, save
3) Pause: user fills track with WHITE in Paint and saves
4) Script continues: keeps only WHITE pixels, makes everything else transparent
5) Saves final output

Deps:
  pip install pillow requests numpy
"""

import io
import os
import requests
import numpy as np
from PIL import Image

TARGET_W = 997
TARGET_H = 748


def fetch_image(urls, timeout=25):
    last = None
    for url in urls:
        try:
            r = requests.get(url, timeout=timeout)
            if r.status_code == 200 and "image" in (r.headers.get("Content-Type", "") or ""):
                return url, Image.open(io.BytesIO(r.content)).convert("RGBA")
        except Exception as e:
            last = e
    raise RuntimeError(f"Could not fetch image ({last})")


def build_media_urls(asset_id):
    base = f"v1740000000/common/f1/2026/track/{asset_id}"
    return [
        f"https://media.formula1.com/image/upload/h_748,c_scale/{base}.png",
        f"https://media.formula1.com/image/upload/w_5000/{base}.png",
        f"https://media.formula1.com/image/upload/{base}.png",
    ]


def build_2018_url(name):
    safe = name.replace(" ", "%20")
    return (
        "https://www.formula1.com/content/dam/fom-website/2018-redesign-assets/"
        f"Track%20icons%204x3/{safe}%20carbon.png.transform/9col/image.png"
    )


def normalize(img: Image.Image) -> Image.Image:
    """Scale uniformly to fit within 997x748, then pad to exact size (no crop)."""
    src_w, src_h = img.size
    scale = min(TARGET_W / src_w, TARGET_H / src_h)
    new_w = max(1, int(round(src_w * scale)))
    new_h = max(1, int(round(src_h * scale)))

    resized = img.resize((new_w, new_h), Image.LANCZOS)

    canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
    canvas.paste(resized, ((TARGET_W - new_w) // 2, (TARGET_H - new_h) // 2), resized)
    return canvas


def keep_only_color(img: Image.Image, target_rgb=(255, 255, 255), tolerance=30) -> Image.Image:
    """
    Keeps only pixels close to target_rgb; makes everything else transparent.
    Uses per-channel tolerance, and respects existing alpha (only considers visible pixels).
    """
    im = img.convert("RGBA")
    arr = np.array(im).astype(np.int16)  # avoid uint8 wrap
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]
    tr, tg, tb = target_rgb

    visible = a > 0
    match = (
        visible
        & (np.abs(r - tr) <= tolerance)
        & (np.abs(g - tg) <= tolerance)
        & (np.abs(b - tb) <= tolerance)
    )

    # Make everything else transparent
    arr[~match, 3] = 0

    # Force kept pixels to pure white (helps consistency / e-ink)
    arr[match, 0] = tr
    arr[match, 1] = tg
    arr[match, 2] = tb
    arr[match, 3] = 255

    return Image.fromarray(arr.astype(np.uint8), mode="RGBA")


def main():
    print("\nF1 Track Icon Generator (997x748)\n")

    mode = input("Source type (1 = new media, 2 = 2018 asset) [1]: ").strip() or "1"

    if mode == "1":
        asset_id = input("Media asset id (e.g. 2026trackmadringblackoutline): ").strip()
        urls = build_media_urls(asset_id)
        base_name = asset_id
    else:
        name = input("2018 track name (e.g. miami): ").strip()
        urls = [build_2018_url(name)]
        base_name = name.replace(" ", "_")

    rotate = input("Rotate? (0 / 90 / 180 / 270) [0]: ").strip() or "0"
    tol = input("White tolerance (0-255) [30]: ").strip() or "30"
    try:
        tolerance = int(tol)
    except ValueError:
        tolerance = 30

    # Output names
    draft_name = f"{base_name}_997x748_DRAFT.png"
    final_name = f"{base_name}_997x748_whiteonly.png"

    print("\nFetching image…")
    src_url, img = fetch_image(urls)

    if rotate != "0":
        img = img.rotate(int(rotate), expand=True)

    # Step 1: normalize and save draft
    out = normalize(img)
    out.save(draft_name, "PNG", optimize=True)

    print("\n✅ Draft saved:", draft_name)
    print("Source URL:", src_url)

    # Step 2: Pause for Paint edit
    print("\nNEXT STEP (manual):")
    print(f"1) Open '{draft_name}' in Paint")
    print("2) Use the fill tool to fill the inside of the track with PURE WHITE (#FFFFFF)")
    print("3) Save the file (overwrite the same filename), then come back here")
    input("\nWhen you've saved it, press ENTER to continue…")

    if not os.path.exists(draft_name):
        raise RuntimeError(f"Draft file not found: {draft_name}")

    # Reload edited image and perform white-only transparency
    edited = Image.open(draft_name).convert("RGBA")
    white_only = keep_only_color(edited, target_rgb=(255, 255, 255), tolerance=tolerance)
    white_only.save(final_name, "PNG", optimize=True)

    print("\n✅ Done")
    print("Final output:", final_name)
    print("Size: 997x748\n")


if __name__ == "__main__":
    main()
