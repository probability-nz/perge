import e from"peerjs";import{DocSet as t,Connection as n,init as o}from"automerge";export default class{constructor(n,o={}){this._connections={},this._actorId=n,this.peer=o.peer||new e(this._actorId),this.docSet=o.docSet||new t,this._encode=o.encode||JSON.stringify,this._decode=o.decode||JSON.parse,this.peer.on("connection",e=>{this._connections[e.peer]||this.connect(e.peer),e.on("data",t=>{this._connections[e.peer].receiveMsg(this._decode(t))})})}connect(e,t){if(this._connections[e])return this.peer.connections[e];const o=t||this.peer.connect(e),s=this._connections[e]=new n(this.docSet,e=>{o.send(this._encode(e))}),c=()=>{this._connections[e]&&(delete this._connections[e],s.close())};return o.on("close",c),o.on("error",c),s.open(),o}get(e){return this.docSet.getDoc(e)||o(this._actorId)}select(e){return(t,...n)=>{const o=t(this.get(e),...n);return this.docSet.setDoc(e,o),o}}subscribe(e,t){if("function"==typeof e)return this.docSet.registerHandler(e),()=>this.docSet.unregisterHandler(e);if("string"==typeof e&&t){const n=(n,o)=>{n===e&&t(o)};return this.docSet.registerHandler(n),()=>this.docSet.unregisterHandler(n)}return()=>{}}}
//# sourceMappingURL=index.modern.js.map
