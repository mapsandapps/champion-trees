webpackJsonp([3],{"K/GD":function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.arrow-container[data-v-4a55fd95] {\n  margin: 0 auto;\n  width: 200px;\n}\n.tree-info[data-v-4a55fd95] {\n  text-align: center;\n}\n",""])},"LOE/":function(e,t,n){var o=n("K/GD");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);(0,n("rjj0").default)("3ec41f50",o,!1,{})},dAKm:function(e,t,n){var o=n("vxJQ")("round");e.exports=o},qMFH:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n("Dd8w"),r=n.n(o),i=n("dAKm"),a=n.n(i),s=n("7109"),c=n("NYxO"),l={name:"Navigate",data:function(){return{compassDirection:null,compassError:null,geolocationWatcherID:null,primaryColor:s.v.getBrand("primary"),tree:null}},computed:r()({},Object(c.c)(["bearingFromUser","getTree","treeSeen"]),{arrowDirection:function(){if(this.treeBearing&&this.compassDirection){var e=this.treeBearing-this.compassDirection;return e<0?e+360:e>=360?e-360:e}return null},seen:function(){return this.treeSeen(this.tree.ID)},treeBearing:function(){return a()(this.bearingFromUser(this.tree))}}),methods:r()({},Object(c.b)(["checkTree","setLocation","uncheckTree"]),{handleEventData:function(e){this.compassDirection=e.alpha,e.webkitCompassHeading?(this.compassDirection=e.webkitCompassHeading,this.compassError=null):this.compassError="Compass not supported in this browser"},handleGeolocationData:function(e){this.setLocation(e.coords)},handleGeolocationError:function(e){this.$q.notify({message:"Geolocation failed",icon:"location_off"})},viewTreeInGoogleMaps:function(){Object(s.x)("https://www.google.com/maps/search/"+this.tree.Latitude+",+"+this.tree.Longitude+"/")}}),mounted:function(){this.tree=this.getTree(this.$route.params.id),window.DeviceOrientationEvent?(this.compassError="Compass is supported by this browser, but no reading has occurred",window.addEventListener("deviceorientation",this.handleEventData)):this.compassError="Compass not supported in this browser",this.geolocationWatcherID=navigator.geolocation.watchPosition(this.handleGeolocationData,this.handleGeolocationError)},beforeDestroy:function(){window.removeEventListener("deviceorientation",this.handleEventData),navigator.geolocation.clearWatch(this.geolocationWatcherID)}},d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.tree?n("div",[e.compassError?n("q-alert",{staticClass:"q-ma-md",attrs:{color:"warning",icon:"warning"}},[e._v("\n    "+e._s(e.compassError)+"\n  ")]):e._e(),e._v(" "),n("div",{staticClass:"tree-info q-py-md"},[n("h2",[e._v("\n      "+e._s(e.tree.LOCATION)+"\n    ")]),e._v(" "),n("h3",[e._v(e._s(e.tree["COMMON NAME"]))]),e._v(" "),n("h4",{style:{color:e.primaryColor}},[e._v("\n      "+e._s(e._f("distanceHuman")(e.tree.distance))+"\n    ")])]),e._v(" "),n("div",[e.arrowDirection?n("div",{staticClass:"arrow-container"},[n("q-icon",{style:{transform:"rotate("+e.arrowDirection+"deg)"},attrs:{color:"primary",name:"arrow_upward",size:"200px"}})],1):e._e()]),e._v(" "),n("div",{staticClass:"q-pa-md"},[n("div",[e._v("Direction to tree: "+e._s(e.treeBearing||"unknown")+"º")]),e._v(" "),n("div",[e._v("You're facing: "+e._s(e.compassDirection||"unknown")+"º")]),e._v(" "),n("q-btn",{staticClass:"q-my-md",attrs:{label:"View in Google Maps",color:"secondary"},nativeOn:{click:function(t){e.viewTreeInGoogleMaps(e.tree)}}}),e._v(" "),e.seen?n("q-btn",{staticClass:"q-my-md",attrs:{label:"Mark unseen",color:"warning"},nativeOn:{click:function(t){e.uncheckTree(e.tree)}}}):n("q-btn",{staticClass:"q-my-md",attrs:{icon:"check",label:"Mark seen",color:"positive"},nativeOn:{click:function(t){e.checkTree(e.tree)}}})],1)],1):e._e()},h=[];d._withStripped=!0;var u=n("XyMi"),p=!1;var v=function(e){p||n("LOE/")},m=Object(u.a)(l,d,h,!1,v,"data-v-4a55fd95",null);m.options.__file="src/pages/Navigate.vue";t.default=m.exports}});