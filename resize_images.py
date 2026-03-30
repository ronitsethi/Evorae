import os
import shutil
import random
import subprocess
import glob

# Paths
source_dir = "/Users/ronitsethi/Documents/Antigravity/Evorae/Product Images"
target_dir = "/Users/ronitsethi/Documents/Antigravity/Evorae/web/public/images"

# Ensure target exists
os.makedirs(target_dir, exist_ok=True)

# Find all JPGs
images = glob.glob(os.path.join(source_dir, "*.JPG")) + glob.glob(os.path.join(source_dir, "*.jpg"))
if not images:
    print("No images found!")
    exit(1)

# Pick a balanced random sample of ~40 images to represent the collection
images.sort()
random.seed(42) # Deterministic selection
selected = random.sample(images, min(40, len(images)))

for img in selected:
    filename = os.path.basename(img)
    target_path = os.path.join(target_dir, filename)
    
    # We will just copy them down-scaled using macOS sips
    print(f"Resizing {filename}...")
    # Resize keeping aspect ratio, max width or height 2400px
    subprocess.run(["sips", "-Z", "2400", img, "--out", target_path], check=False)
    
print(f"Copied and resized {len(selected)} images to {target_dir}")
