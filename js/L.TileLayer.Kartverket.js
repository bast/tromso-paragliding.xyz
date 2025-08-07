/*global L:false*/

(function () {
    'use strict';

    L.TileLayer.Kartverket = L.TileLayer.extend({

        baseUrl: 'https://opencache{s}.statkart.no/gatekeeper/gk/gk.open_gmaps?'
               + 'layers={layer}&zoom={z}&x={x}&y={y}',

        options: {
            maxNativeZoom: 18,
            attribution: '&copy; <a href="http://kartverket.no">Kartverket</a>',
            subdomains: ['', '2', '3']
        },

        mappings: {
            kartdata2: 'topo4',
            norgeskart_bakgrunn: 'topo4',
            sjo_hovedkart2: 'sjokartraster',
            toporaster: 'toporaster3',
            topo2: 'topo4',
            topo2graatone: 'topo4graatone'
        },

        layers: [
            'matrikkel_bakgrunn2',
            'topo4',
            'topo4graatone',
            'europa',
            'toporaster3',
            'sjokartraster',
            'norges_grunnkart',
            'norges_grunnkart_graatone',
            'egk',
            'terreng_norgeskart',
            'havbunn_grunnkart',
            'bakgrunnskart_forenklet'
        ],

        layerNames: [
            'Matrikkel bakgrunn',
            'Topografisk norgeskart',
            'Topografisk norgeskart gråtone',
            'Europakart',
            'Topografisk norgeskart, raster',
            'Sjøkart hovedkartserien',
            'Norges Grunnkart',
            'Norges grunnkart gråtone',
            'Europeisk grunnkart',
            'Terreng',
            'Havbunn grunnkart',
            null
        ],

        initialize: function (layer, options) {
            if (this.layers.indexOf(layer) === -1) {
                if (this.mappings[layer]) {
                    layer = this.mappings[layer];
                } else {
                    throw new Error('Unknown layer "' + layer + '"');
                }
            }

            L.TileLayer.prototype.initialize.call(this, this.baseUrl, options);
            this.options.layer = layer;
        }

    });

    L.tileLayer.kartverket = function (layer, options) {
        return new L.TileLayer.Kartverket(layer, options);
    };

    L.tileLayer.kartverket.getLayers = function () {
        return L.TileLayer.Kartverket.prototype.layers.slice();
    };

    L.tileLayer.kartverket.getLayerName = function (layer) {
        var idx = L.TileLayer.Kartverket.prototype.layers.indexOf(layer);
        var name = null;
        if (idx !== -1) {
            name = L.TileLayer.Kartverket.prototype.layerNames[idx];
        }
        return (name !== null) ? name : layer;
    };

}());
