webpackJsonp([1],{LQuA:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",""])},TIDo:function(n,t,e){n.exports=e.p+"img/tree.f2b9910.png"},ZJjo:function(n,t,e){var i=e("LQuA");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);(0,e("rjj0").default)("5bbc09e3",i,!1,{})},bMUb:function(n,t,e){var i=e("gPMk");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);(0,e("rjj0").default)("80f7ab8a",i,!1,{})},gPMk:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.diagram {\n  position: relative;\n}\n.dbh {\n  position: absolute;\n  top: 736px;\n  left: 260px;\n  color: orange;\n}\n.height {\n  position: absolute;\n  top: 286px;\n  left: 110px;\n  color: red;\n}\n.spread {\n  position: absolute;\n  top: 136px;\n  left: 280px;\n  color: purple;\n}\n.points {\n  position: absolute;\n  font-size: 30px;\n  top: 300px;\n  left: 250px;\n  color: blue;\n}\n",""])},iPQp:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("Dd8w"),o=e.n(i),s=e("ktak"),r=e.n(s),a=e("7109"),p=e("NYxO"),l=function(){var n=this,t=n.$createElement,i=n._self._c||t;return i("div",{staticClass:"diagram"},[i("img",{attrs:{src:e("TIDo")}}),n._v(" "),i("div",{staticClass:"dbh"},[n._v(n._s(n.dbh)+'"')]),n._v(" "),i("div",{staticClass:"height"},[n._v(n._s(n.height)+"'")]),n._v(" "),i("div",{staticClass:"spread"},[n._v(n._s(n.spread)+"'")]),n._v(" "),i("div",{staticClass:"points"},[n._v(n._s(n.points)+" points")])])},u=[];l._withStripped=!0;var c=e("XyMi"),d=!1;var v=function(n){d||e("bMUb")},f=Object(c.a)({name:"Diagram",props:["dbh","height","spread","points"]},l,u,!1,v,null,null);f.options.__file="src/components/diagram.vue";var _={name:"Details",components:{Diagram:f.exports},props:{},data:function(){return{tree:null}},computed:o()({},Object(p.c)(["getTree"]),{keys:function(){return r()(this.tree)}}),methods:{viewTreeInGoogleMaps:function(n){Object(a.r)("https://www.google.com/maps/search/"+n.Latitude+",+"+n.Longitude+"/")}},beforeMount:function(){this.tree=this.getTree(this.$route.params.id)}},g=function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[n._l(n.keys,function(t,i){return e("div",{key:i},[n._v("\n    "+n._s(t)+":\n    "+n._s(n.tree[t])+"\n  ")])}),n._v(" "),n.tree.Latitude&&n.tree.Longitude?e("div",[e("div",[n._v("Latitude: "+n._s(n.tree.Latitude))]),n._v(" "),e("div",[n._v("Longitude: "+n._s(n.tree.Longitude))]),n._v(" "),e("q-btn",{attrs:{label:"View map",color:"primary"},nativeOn:{click:function(t){n.viewTreeInGoogleMaps(n.tree)}}})],1):e("div",[n._v("No location provided")]),n._v(" "),e("Diagram",{attrs:{dbh:n.tree["DBH (in)"],height:n.tree["HEIGHT(ft)"],spread:n.tree["SPREAD (ft)"],points:n.tree.Points}})],2)},h=[];g._withStripped=!0;var b=!1;var m=function(n){b||e("ZJjo")},x=Object(c.a)(_,g,h,!1,m,null,null);x.options.__file="src/pages/Details/Details.vue";var j=x.exports;t.default=j}});