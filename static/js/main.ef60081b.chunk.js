(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{138:function(e,t,a){e.exports=a(139)},139:function(e,t,a){"use strict";a.r(t);var n=a(132),r=a(133),s=a(136),c=a(134),l=a(137),o=(a(140),a(10)),i=a.n(o),u=a(135),m=a.n(u),h=(a(346),function(e){function t(){var e,a;Object(n.a)(this,t);for(var r=arguments.length,l=new Array(r),o=0;o<r;o++)l[o]=arguments[o];return(a=Object(s.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(l)))).state={history:[{squares:Array(9).fill(null)}],move:0,xIsNext:!0},a.handleClick=function(e){var t=a.state.history.slice(0,a.state.move+1),n=t[t.length-1].squares.slice();d(n)||n[e]||(n[e]=a.state.xIsNext?"X":"O",a.setState({history:t.concat([{squares:n}]),move:t.length,xIsNext:!a.state.xIsNext}))},a.jumpTo=function(e){a.setState({move:e,xIsNext:e%2===0})},a}return Object(l.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this,t=this.state.history,a=t[this.state.move],n=d(a.squares),r=0,s=t.map(function(t,a){return i.a.createElement(p,{key:r++,move:a,jumpTo:e.jumpTo})});return i.a.createElement("div",{className:"game"},i.a.createElement("h1",{className:"main-title"},"React Tic Tac Toe"),i.a.createElement("div",{className:"orientation-wrapper"},i.a.createElement("div",{className:"board-and-score"},i.a.createElement(v,{squares:a.squares,handleClick:this.handleClick}),i.a.createElement("h3",{className:"next-player"},n?"Winner: "+n:"Next player: "+(this.state.xIsNext?"X":"O"))),i.a.createElement("ul",{className:"history-list"},s)))}}]),t}(i.a.Component)),v=function(e){var t=e.squares,a=e.handleClick,n=0,r=Array(9).fill(null).map(function(e,r){return i.a.createElement(f,{key:n++,position:r,value:t[r],handleClick:a})});return i.a.createElement("div",{className:"game-board"},r)},f=function(e){var t=e.position,a=e.value,n=e.handleClick,r="square square"+(t+1);return i.a.createElement("button",{className:r,onClick:function(){n(t)}},a)},p=function(e){var t=e.move,a=e.jumpTo,n=t?"Go to Move #"+t:"Go to Game Start";return i.a.createElement("li",{className:"history-item"},i.a.createElement("button",{className:"jump-button",onClick:function(){a(t)}},n))};function d(e){var t=null;return[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].forEach(function(a){return e[a[0]]&&a.every(function(t){return e[a[0]]===e[t]})?t=e[a[0]]:null}),t}m.a.render(i.a.createElement(h,null),document.getElementById("root"))},346:function(e,t,a){}},[[138,1,2]]]);
//# sourceMappingURL=main.ef60081b.chunk.js.map