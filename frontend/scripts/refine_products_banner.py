import numpy as np
import cv2
from PIL import Image

def refine_banner():
    img_path = 'public/hero/products_hero_banner.png'
    img = Image.open(img_path).convert('RGB')
    w, h = img.size
    arr = np.array(img)

    # Let's inspect the faint leftover lines in the icon area (x: 100 to 450, y: 170 to 220)
    mask = np.zeros((h, w), dtype=np.uint8)
    for y in range(160, 225):
        for x in range(90, 460):
            r, g, b = int(arr[y, x, 0]), int(arr[y, x, 1]), int(arr[y, x, 2])
            # Slightly darker faint lines/ticks
            if r < 235 or g < 232 or b < 225:
                mask[max(0, y-2):min(h, y+3), max(0, x-2):min(w, x+3)] = 255

    inpainted = cv2.inpaint(arr, mask, 5, cv2.INPAINT_TELEA)
    clean_img = Image.fromarray(inpainted)
    clean_img.save('public/hero/products_hero_banner.png')
    print("Refinement complete!")

if __name__ == '__main__':
    refine_banner()
