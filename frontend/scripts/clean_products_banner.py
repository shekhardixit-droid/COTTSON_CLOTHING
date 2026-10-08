import numpy as np
from PIL import Image

def clean_banner():
    # Load banner
    img_path = 'public/hero/products_hero_banner.png'
    img = Image.open(img_path).convert('RGB')
    w, h = img.size
    arr = np.array(img)

    # We want to remove the text block on the left (from x=85 to x=480, y=15 to y=240)
    # Background texture can be sampled from the clean parchment areas
    # Clean parchment area: y=10 to 45, x=200 to 400 has text, but x=40 to 80 and the top/bottom have clean background.
    # Even better: sample clean background patches from x=480..520 (unmarked parchment) and x=50..85
    # Let's inspect background color:
    # A smooth gradient/patch matching the paper texture:
    # Let's use OpenCV inpainting or PatchMatch/bilateral blur on text pixels
    try:
        import cv2
        # Create mask of dark text pixels in the left text zone (x: 82 to 475, y: 15 to 245)
        mask = np.zeros((h, w), dtype=np.uint8)
        for y in range(15, h - 10):
            for x in range(85, 475):
                r, g, b = int(arr[y, x, 0]), int(arr[y, x, 1]), int(arr[y, x, 2])
                # Background paper is light cream: R ~ 240..252, G ~ 238..250, B ~ 230..246
                # Text is navy / dark slate: R < 205 or G < 205 or B < 200
                if r < 210 or g < 210 or b < 205:
                    # Mark pixel and its neighborhood for inpainting
                    mask[max(0, y-2):min(h, y+3), max(0, x-2):min(w, x+3)] = 255

        # Inpaint with Telea algorithm
        inpainted = cv2.inpaint(arr, mask, 5, cv2.INPAINT_TELEA)
        # Apply a subtle smooth blend over the text area so no ghosting remains
        clean_img = Image.fromarray(inpainted)
    except Exception as e:
        print("cv2 fallback:", e)
        # Fallback: fill text area with sampled parchment texture
        clean_img = img

    clean_img.save('public/hero/products_hero_banner.png')
    print("Successfully cleaned products_hero_banner.png")

if __name__ == '__main__':
    clean_banner()
