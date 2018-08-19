import os
import numpy

import rasterio
from matplotlib import pyplot
from rasterio.plot import show_hist

#input image bands Sentinel2
b4 = 'data/bd74fcb4-3f4a-4769-bc8f-a9a5c6cc8893/bands/B04.TIF'
b8 = 'data/bd74fcb4-3f4a-4769-bc8f-a9a5c6cc8893/bands/B08.TIF'

with rasterio.open(b4) as red:
    RED = red.read()
with rasterio.open(b8) as nir:
    NIR = nir.read()

# calculate NDVI
ndvi = (NIR.astype(float) - RED.astype(float)) / (NIR+RED)

profile = red.meta
profile.update(driver='GTiff')
profile.update(dtype=rasterio.float32)

outputndvi= 'ndvi.tif'

with rasterio.open(outputndvi, 'w', **profile) as dst:
    dst.write(ndvi.astype(rasterio.float32))

src = rasterio.open(outputndvi)
pyplot.show = lambda : None
# prevents showing during doctests
show_hist(src, bins=50, lw=0.0, stacked=False, alpha=0.3, histtype='stepfilled', title="Histogram")
fig = pyplot.gcf()
fig.savefig('histogram.png')
