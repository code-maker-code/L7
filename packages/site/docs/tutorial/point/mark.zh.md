---
title: Marker
order: 8
---
<embed src="@/docs/api/common/style.md"></embed>

地图上的点可以是自定义的 `DOM`，我们将自定的 `DOM` 称为 `Marker` 。

<div>
  <div style="width:60%;float:left; margin: 10px;">
    <img  width="80%" alt="案例" src='https://gw.alipayobjects.com/mdn/rms_855bab/afts/img/A*2vBbRYT2bgIAAAAAAAAAAABkARQnAQ'>
  </div>
</div>

### 实现

下面我们来介绍如何绘制一个简单的 `Marker` 图层。

- 你可以在 `L7` 官网上找到[在线案例](/examples/component/marker#marker)

```javascript
import { Scene, Marker } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';

const scene = new Scene({
  id: 'map',
  map: new GaodeMap({
    style: 'light',
    center: [ 105.790327, 36.495636 ],
    zoom: 4
  })
});
scene.on('loaded', () => {
  addMarkers();
  scene.render();
});
function addMarkers() {
  fetch('https://gw.alipayobjects.com/os/basement_prod/67f47049-8787-45fc-acfe-e19924afe032.json')
    .then(res => res.json())
    .then(nodes => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].g !== '1' || nodes[i].v === '') { continue; }
        const el = document.createElement('label');
        el.className = 'labelclass';
        el.textContent = nodes[i].v + '℃';
        el.style.background = getColor(nodes[i].v);
        el.style.borderColor = getColor(nodes[i].v);
        const marker = new Marker({
          element: el
        }).setLnglat({ lng: nodes[i].x * 1, lat: nodes[i].y });
        scene.addMarker(marker);
      }
    });
}
function getColor(v) {
  return v > 50
    ? '#800026'
    : v > 40
      ? '#BD0026'
      : v > 30
        ? '#E31A1C'
        : v > 20
          ? '#FC4E2A'
          : v > 10
            ? '#FD8D3C'
            : v > 5
              ? '#FEB24C'
              : v > 0
                ? '#FED976'
                : '#FFEDA0';
}
```

### 使用文档

[Marker 文档](/api/component/marker/marker)

[MarkerLayer 文档](/api/component/marker/markerlayer)
