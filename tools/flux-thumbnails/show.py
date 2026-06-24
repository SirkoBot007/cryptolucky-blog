from IPython.display import Image, display

for k in ['casino', 'mundial', 'bonos']:
    print('====== ' + k + ' ======')
    display(Image('thumbs/' + k + '.png', width=480))
