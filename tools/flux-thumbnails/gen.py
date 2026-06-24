import torch, os, shutil
from diffusers import StableDiffusionXLPipeline

# SDXL base 1.0 (OpenRAIL++, comercial, ungated). Cabe en la T4.
pipe = StableDiffusionXLPipeline.from_pretrained(
    'stabilityai/stable-diffusion-xl-base-1.0',
    torch_dtype=torch.float16, variant='fp16', use_safetensors=True,
).to('cuda')
pipe.watermark = None

os.makedirs('thumbs', exist_ok=True)
BASE = 'premium glossy mobile game tile, vibrant saturated colors, glowing light, sparkles and confetti, 3D render, centered composition, dark vignette edges, high energy'
NEG = 'text, words, letters, watermark, logo, brand name, signature, ugly, blurry, low quality, deformed, extra limbs'

prompts = {
    'casino':  'casino slot machine with golden lucky sevens 777 and bursting gold coins, neon purple and magenta, ' + BASE,
    'mundial': 'golden football trophy next to a shiny soccer ball on a green stadium pitch, emerald green and gold, ' + BASE,
    'bonos':   'golden gift box bursting open with gold coins and cash, orange and red, ' + BASE,
}

gen = torch.Generator('cuda').manual_seed(7)
for k, p in prompts.items():
    img = pipe(prompt=p, negative_prompt=NEG, num_inference_steps=30,
               guidance_scale=7.0, width=1344, height=768, generator=gen).images[0]
    img.save('thumbs/' + k + '.png')
    print('generada:', k)

shutil.make_archive('thumbs', 'zip', 'thumbs')
from google.colab import files
files.download('thumbs.zip')
