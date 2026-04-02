try:
    from PIL import Image
    im = Image.open('web/public/images/heritage photo.png')
    pixel = im.getpixel((0, 0)) # Top left pixel usually background
    print(f"#{pixel[0]:02x}{pixel[1]:02x}{pixel[2]:02x}")
except Exception as e:
    print(e)
