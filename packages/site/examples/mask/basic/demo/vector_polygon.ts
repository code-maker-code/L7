// @ts-ignore
import { Scene, Source, PolygonLayer } from '@antv/l7';
// @ts-ignore
import { Map } from '@antv/l7-maps';



const scene = new Scene({
    id: 'map',

    map: new Map({
        center: [110, 30],
        // zoom: 12,
        zoom: 3,
    }),
});
const worldSource = new Source('https://ganos.oss-cn-hangzhou.aliyuncs.com/m2/rs_l7/{z}/{x}/{y}.pbf',
    {
        parser: {
            type: 'mvt',
            tileSize: 256,
            maxZoom: 9,
            extent: [-180, -85.051129, 179, 85.051129],
        },
    })
const maskData = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [125.15625000000001, 8.407168163601076],
                            [116.54296874999999, -21.289374355860424],
                            [156.26953125, -20.632784250388013],
                            [150.29296875, 2.1088986592431382],
                        ],
                    ],
                    [
                        [
                            [78.57421875, 46.92025531537451],
                            [51.67968749999999, 37.020098201368114],
                            [87.890625, 28.76765910569123],
                        ],
                    ],
                ],
            },
        },
    ],
};

const polygonLayer = new PolygonLayer({ visible: true }).source(maskData).shape('fill').color('#f00').style({ opacity: 0.4 });


const fillLayer = new PolygonLayer({
    zIndex: 3,
    visible: true,
    maskLayers: [polygonLayer],
    featureId: 'COLOR',
    sourceLayer: 'ecoregions2', // woods hillshade contour ecoregions ecoregions2 city
}).source(worldSource).shape('fill')
    .color('COLOR')
    .style({
        opacity: 0.5
    })



scene.on('loaded', () => {
    scene.addLayer(fillLayer);

    scene.addLayer(polygonLayer);
    
});
