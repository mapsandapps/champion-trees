<template>
  <div>
    <div id="map" ref="map" />
    <div v-if="selectedTreeData">
      {{ selectedTreeData['COMMON NAME'] }}<br>
      {{ selectedTreeData['LOCATION'] }}<br>
      <q-btn
        @click="navigateToDetails"
        label="View details"
        color="primary" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: 'Map',
  components: {
  },
  props: {
    trees: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedTreeData: null
    };
  },
  computed: {
    ...mapGetters([
      'getTree'
    ])
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
    }
  },
  mounted() {
    const map = new L.Map(this.$refs.map).setView([0, 0], 4);

    var markers = [];

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    this.trees.forEach(tree => {
      let marker = L.marker({
        lat: tree.Latitude,
        lon: tree.Longitude
      }).on('click', this.onClick).addTo(map);
      marker.id = tree.ID;
      markers.push(marker);
    });

    let markerGroup = new L.featureGroup(markers);
    map.fitBounds(markerGroup.getBounds());
  }
};
</script>

<style lang="scss" scoped>
#map {
  height: 500px;
}
</style>
