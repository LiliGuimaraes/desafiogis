import os
import io

import numpy as np
import rasterio
import rasterio.features
import rasterio.warp
from flask import Flask, send_file
from flask import jsonify


app = Flask(__name__)

TILE_FOLDER = 'outputfolder'


""" route to tms true_color.tif genereted"""


@app.route('/tms/<z>/<x>/<y>.png')
def tms(z, x, y):
    pngimage = '{0}/{1}/{2}/{3}.png'.format(TILE_FOLDER, z, x, y)
    if os.path.exists(pngimage):
        directory = '{0}/{1}/{2}'.format(TILE_FOLDER, z, x)
        filename = '{0}.png'.format(y)
        with open(pngimage, 'rb') as bites:
            return send_file(
                io.BytesIO(bites.read()),
                mimetype='image/png'
            )
    return jsonify({})

# FIXME:
# calculate NDVI dynamicaly  -


@app.route('/ndvi/<longitude>/<latitude>')
def get_ndvi(longitude, latitude):
    longitude = float(longitude)
    latitude = float(latitude)
    data = []
    return jsonify(data)


@app.route("/")
def get_polygon():
    with rasterio.open('data/bd74fcb4-3f4a-4769-bc8f-a9a5c6cc8893/true_color.tif') as dataset:
        # Read the dataset's valid data mask as a ndarray.
        mask = dataset.dataset_mask()

        # Extract feature shapes and values from the array.
        for geom, val in rasterio.features.shapes(
                mask, transform=dataset.transform):

            # Transform shapes from the dataset's own coordinate
            # reference system to CRS84 (EPSG:4326).
            geom = rasterio.warp.transform_geom(
                dataset.crs, 'EPSG:4326', geom, precision=6)
            # Print GeoJSON shapes to stdout.
    return jsonify(geom)
