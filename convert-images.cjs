const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "public");

const extensions = [".webp", ".webp", ".webp"];

async function getImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(await getImages(fullPath));
    } else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertImages() {
  console.log("🔍 Searching for images...");

  const images = await getImages(ROOT);

  console.log(`📸 Found ${images.length} images.\n`);

  for (const input of images) {
    const ext = path.extname(input);
    const output = input.slice(0, -ext.length) + ".webp";

    try {
      await sharp(input)
        .webp({
          quality: 82,
          effort: 5
        })
        .toFile(output);

      const originalSize = fs.statSync(input).size;
      const newSize = fs.statSync(output).size;

      const saved = ((1 - newSize / originalSize) * 100).toFixed(1);

      console.log(
        `✅ ${path.relative(ROOT, input)} → ${path.basename(output)} | saved ${saved}%`
      );
    } catch (error) {
      console.error(`❌ Failed: ${input}`);
      console.error(error.message);
    }
  }

  console.log("\n🎉 Conversion finished!");
}

convertImages();