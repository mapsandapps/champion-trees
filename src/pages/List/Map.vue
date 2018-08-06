<template>
  <div>
    <div id="map" ref="map" />
    <div id="map-info" v-if="selectedTreeData">
      <div>
        {{ selectedTreeData['COMMON NAME'] }}<br>
        {{ selectedTreeData['LOCATION'] }}
      </div>
      <q-btn
        @click="navigateToDetails"
        label="View details"
        color="primary" />
    </div>
  </div>
</template>

<script>
import minBy from 'lodash/minBy';
import { mapGetters } from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const checkIcon = L.icon({
  iconRetinaUrl: 'statics/map-marker-check-2x.png',
  iconUrl: 'statics/map-marker-check.png',
  shadowUrl: 'statics/map-marker-shadow.png',
  iconSize: [60, 40],
  shadowSize: [60, 40],
  iconAnchor: [30, 40],
  shadowAnchor: [30, 40]
});

const goldIcon = L.icon({
  iconRetinaUrl: 'statics/map-marker-gold-2x.png',
  iconUrl: 'statics/map-marker-gold.png',
  shadowUrl: 'statics/map-marker-shadow.png',
  iconSize: [60, 40],
  shadowSize: [60, 40],
  iconAnchor: [30, 40],
  shadowAnchor: [30, 40]
});

const silverIcon = L.icon({
  iconRetinaUrl: 'statics/map-marker-silver-2x.png',
  iconUrl: 'statics/map-marker-silver.png',
  shadowUrl: 'statics/map-marker-shadow.png',
  iconSize: [60, 40],
  shadowSize: [60, 40],
  iconAnchor: [30, 40],
  shadowAnchor: [30, 40]
});

const bronzeIcon = L.icon({
  iconRetinaUrl: 'statics/map-marker-bronze-2x.png',
  iconUrl: 'statics/map-marker-bronze.png',
  shadowUrl: 'statics/map-marker-shadow.png',
  iconSize: [60, 40],
  shadowSize: [60, 40],
  iconAnchor: [30, 40],
  shadowAnchor: [30, 40]
});

const unrankedIcon = L.icon({
  iconRetinaUrl: 'statics/map-marker-unranked-2x.png',
  iconUrl: 'statics/map-marker-unranked.png',
  shadowUrl: 'statics/map-marker-shadow.png',
  iconSize: [60, 40],
  shadowSize: [60, 40],
  iconAnchor: [30, 40],
  shadowAnchor: [30, 40]
});

export default {
  name: 'Map',
  data() {
    return {
      selectedTreeData: null,
      userDot: null
    };
  },
  computed: {
    ...mapGetters([
      'coordinates',
      'getTree',
      'trees',
      'treeSeen'
    ])
  },
  watch: {
    coordinates() {
      this.updateUserDot();
    }
  },
  methods: {
    navigateToDetails() {
      this.$router.push({
        name: 'Details',
        params: { id: this.selectedTreeData.ID }
      });
    },
    onClick(data) {
      this.selectedTreeData = this.getTree(data.target.id);
    },
    updateUserDot() {
      if (this.userDot) this.userDot.removeFrom(this.map);
      this.userDot = L.circleMarker({
        lat: this.coordinates.latitude,
        lon: this.coordinates.longitude
      }).addTo(this.map);
      const closestTree = minBy(this.trees, 'distance');
      if (closestTree) {
        this.map.fitBounds([
          [
            this.coordinates.latitude,
            this.coordinates.longitude
          ],
          [
            closestTree.latitude,
            closestTree.longitude
          ]
        ],
        {
          maxZoom: 13
        });
      }
    }
  },
  mounted() {
    this.map = new L.Map(this.$refs.map).setView([0, 0], 4)
    .on('click', () => this.selectedTreeData = null);

    var markers = [];

    L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png', {
      attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
      minZoom: 1,
      maxZoom: 19
    }).addTo(this.map);

    this.trees.forEach(tree => {
      let treeIcon = unrankedIcon;
      if (this.treeSeen(tree.ID)) {
        treeIcon = checkIcon;
      } else if (tree.Rank == 1) {
        treeIcon = goldIcon;
      } else if (tree.Rank == 2) {
        treeIcon = silverIcon;
      } else if (tree.Rank == 3) {
        treeIcon = bronzeIcon;
      }
      let marker = L.marker({
        lat: tree.latitude,
        lon: tree.longitude
      },{
        icon: treeIcon
      })
      .on('click', this.onClick).addTo(this.map);
      marker.id = tree.ID;
      markers.push(marker);
    });

    let markerGroup = new L.featureGroup(markers);
    this.map.fitBounds(markerGroup.getBounds());

    if (this.coordinates.latitude && this.coordinates.longitude) {
      this.updateUserDot();
    }
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: calc(100vh - 50px);
}
#map-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 125px;
  grid-column-gap: 10px;
}
</style>
