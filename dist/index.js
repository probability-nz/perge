var e,n=(e=require("peerjs"))&&"object"==typeof e&&"default"in e?e.default:e,t=require("automerge");module.exports=function(){function e(e,o){var c=this;void 0===o&&(o={}),this._connections={},this._actorId=e,this.peer=o.peer||new n(this._actorId),this.docSet=o.docSet||new t.DocSet,this._encode=o.encode||JSON.stringify,this._decode=o.decode||JSON.parse,this.peer.on("connection",function(e){c._connections[e.peer]||c.connect(e.peer),e.on("data",function(n){c._connections[e.peer].receiveMsg(c._decode(n))})})}var o=e.prototype;return o.connect=function(e,n){var o=this;if(this._connections[e])return this.peer.connections[e];var c=n||this.peer.connect(e),r=this._connections[e]=new t.Connection(this.docSet,function(e){c.send(o._encode(e))}),i=function(){o._connections[e]&&(delete o._connections[e],r.close())};return c.on("close",i),c.on("error",i),r.open(),c},o.get=function(e){return this.docSet.getDoc(e)||t.init(this._actorId)},o.select=function(e){var n=this;return function(t){var o=t.apply(void 0,[n.get(e)].concat([].slice.call(arguments,1)));return n.docSet.setDoc(e,o),o}},o.subscribe=function(e,n){var t=this;if("function"==typeof e)return this.docSet.registerHandler(e),function(){return t.docSet.unregisterHandler(e)};if("string"==typeof e&&n){var o=function(t,o){t===e&&n(o)};return this.docSet.registerHandler(o),function(){return t.docSet.unregisterHandler(o)}}return function(){}},e}();
//# sourceMappingURL=index.js.map
