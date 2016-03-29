var scale = 1 / devicePixelRatio;
document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
document.documentElement.setAttribute("data-dpr", devicePixelRatio);
