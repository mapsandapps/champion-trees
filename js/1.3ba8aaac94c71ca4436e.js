webpackJsonp([1],{"8flI":function(t,a,e){var n=e("ZpzD");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,e("rjj0").default)("bb3a467c",n,!1,{})},TIDo:function(t,a,e){t.exports=e.p+"img/tree.f2b9910.png"},ZpzD:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.diagram[data-v-7cb74d1a] {\n  position: relative;\n}\n.diagram img[data-v-7cb74d1a] {\n    width: 50%;\n    height: 50%;\n}\n.diagram .dbh[data-v-7cb74d1a] {\n    position: absolute;\n    top: 320px;\n    left: 100px;\n    color: orange;\n}\n.diagram .height[data-v-7cb74d1a] {\n    position: absolute;\n    top: 120px;\n    left: 40px;\n    color: red;\n}\n.diagram .spread[data-v-7cb74d1a] {\n    position: absolute;\n    top: 54px;\n    left: 110px;\n    color: purple;\n}\n.diagram .points[data-v-7cb74d1a] {\n    position: absolute;\n    font-size: 20px;\n    top: 124px;\n    left: 124px;\n    color: blue;\n}\n",""])},dAKm:function(t,a,e){var n=e("vxJQ")("round");t.exports=n},iPQp:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("Dd8w"),i=e.n(n),s=e("ktak"),r=e.n(s),o=e("dAKm"),d=e.n(o),c=e("NYxO"),p=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("q-card",{staticClass:"q-ma-sm"},[n("q-card-title",[t._v("Prototype Diagram")]),t._v(" "),n("q-card-main",[n("div",{staticClass:"diagram"},[n("img",{attrs:{src:e("TIDo")}}),t._v(" "),n("div",{staticClass:"dbh"},[t._v(t._s(t.dbh)+'"')]),t._v(" "),n("div",{staticClass:"height"},[t._v(t._s(t.height)+"'")]),t._v(" "),n("div",{staticClass:"spread"},[t._v(t._s(t.spread)+"'")]),t._v(" "),n("div",{staticClass:"points"},[t._v(t._s(t.points)+" points")])])])],1)},v=[];p._withStripped=!0;var l=e("XyMi"),u=!1;var _=function(t){u||e("8flI")},f=Object(l.a)({name:"Diagram",props:["dbh","height","spread","points"]},p,v,!1,_,"data-v-7cb74d1a",null);f.options.__file="src/components/diagram.vue";var m={name:"Details",components:{Diagram:f.exports},props:{},data:function(){return{tree:null}},computed:i()({},Object(c.c)(["getTree"]),{dbh:function(){return d()(Number(this.tree["CIR (in)"])/Math.PI,1)},keys:function(){return r()(this.tree)}}),methods:{navigateToNavigate:function(){this.$router.push({name:"Navigate",params:{id:this.tree.ID}})}},mounted:function(){this.tree=this.getTree(this.$route.params.id)}},h=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.tree?e("div",{staticClass:"q-pa-md"},[e("div",[t._v(t._s(t._f("ordinal")(t.tree.Rank))+" largest "+t._s(t.tree["COMMON NAME"])+" in Atlanta")]),t._v(" "),e("div",[t._v("At "+t._s(t.tree.LOCATION))]),t._v(" "),e("div",[t._v(t._s(t.tree.Points)+" points")]),t._v(" "),t.tree.Latitude&&t.tree.Longitude?e("div",[e("q-btn",{staticClass:"q-my-md",attrs:{label:"Navigate to Tree",color:"primary"},on:{click:t.navigateToNavigate}})],1):e("div",[t._v("No location provided")]),t._v(" "),e("q-card",{staticClass:"q-ma-sm kitchen-sink"},[e("q-card-title",[t._v("Kitchen Sink")]),t._v(" "),e("q-card-main",t._l(t.keys,function(a,n){return e("div",{key:n},[t._v("\n        "+t._s(a)+":\n        "+t._s(t.tree[a])+"\n      ")])}))],1),t._v(" "),e("Diagram",{attrs:{dbh:t.dbh,height:t.tree["HEIGHT(ft)"],spread:t.tree["SPREAD (ft)"],points:t.tree.Points}})],1):t._e()},g=[];h._withStripped=!0;var b=!1;var x=function(t){b||e("wfqR")},q=Object(l.a)(m,h,g,!1,x,"data-v-6194cbe1",null);q.options.__file="src/pages/Details/Details.vue";var D=q.exports;a.default=D},sqvF:function(t,a,e){(t.exports=e("FZ+f")(!1)).push([t.i,"\n.kitchen-sink[data-v-6194cbe1] {\n  color: gray;\n  margin-top: 160px;\n}\n",""])},wfqR:function(t,a,e){var n=e("sqvF");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,e("rjj0").default)("0a103c11",n,!1,{})}});