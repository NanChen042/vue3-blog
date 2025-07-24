<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

  <script setup>
import { ref, onMounted } from "vue";

// 百度地图API初始化（替换为您的AK）
const AK = "1qBawfSyasl53y87uP173BCPm3MKBpEq"; // 确保密钥正确

// 定义两点坐标（中国上海到美国旧金山）
const pointA = [121.809445, 31.161441567287586]; // 上海（经度,纬度）
const pointB = [-122.37495192953286, 37.623223645618175]; // 旧金山

// 地图容器引用
const mapContainer = ref(null);
let map = null;

// 初始化地图
const initMap = () => {
  map = new BMapGL.Map(mapContainer.value);

  // 将初始中心点设为太平洋中部，使两边都能看到
  // 使用较小的缩放级别以显示更广阔的区域
  map.centerAndZoom(new BMapGL.Point(0, 30), 2);
  map.enableScrollWheelZoom(true);

  // 绘制路径
  drawPath();
};

// 绘制两点之间的直线
const drawPath = () => {
  const startPoint = new BMapGL.Point(pointA[0], pointA[1]);
  const endPoint = new BMapGL.Point(pointB[0], pointB[1]);

  // 计算平均纬度，用于确定边界点的纬度
  const avgLat = (pointA[1] + pointB[1]) / 2;

  // 线段断点的经度位置（略微内收以确保点在瓦片内）
  const eastBoundaryLng = 179.99;
  const westBoundaryLng = -179.99;

  // 在世界边界处创建连接点
  const eastPoint = new BMapGL.Point(eastBoundaryLng, avgLat);
  const westPoint = new BMapGL.Point(westBoundaryLng, avgLat);

  // --- Step 1: Draw the two reliable Polyline segments ---
  // 绘制上海到东边界的线段
  drawLineSegment(startPoint, eastPoint, "#1890ff");

  // 绘制西边界到旧金山的线段
  drawLineSegment(westPoint, endPoint, "#1890ff");

  // --- Step 2: Create Canvas layer for the visual bridge ---
  createCanvasBridgeLayer(eastPoint, westPoint, map);

  // --- Step 3: Add markers at original locations ---
  addMarker(startPoint, "起点（上海）");
  addMarker(endPoint, "终点（旧金山）");
};

// 绘制单个线段 (保持不变)
const drawLineSegment = (start, end, color) => {
  const midPoint = new BMapGL.Point(
    (start.lng + end.lng) / 2,
    (start.lat + end.lat) / 2 + Math.sin(Math.PI * 0.5) * 5
  );
  const polyline = new BMapGL.Polyline(
    [start, midPoint, end],
    {
      strokeColor: color,
      strokeWeight: 3,
      strokeOpacity: 0.75,
    }
  );
  map.addOverlay(polyline);
};

// 创建Canvas层来绘制跨边界的连接线 (Reimplementation)
const createCanvasBridgeLayer = (eastPoint, westPoint, mapInstance) => {
  if (!BMapGL.CanvasLayer) {
    console.error("BMapGL.CanvasLayer is not available.");
    return;
  }

  const canvasLayer = new BMapGL.CanvasLayer({
    paneName: 'floatPane', // Ensure it draws above polylines
    zIndex: 10, // Explicit z-index (adjust if needed)
    update: function() {
      const canvas = this.canvas;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Get current pixel coordinates for the boundary points
      const pixelEast = mapInstance.pointToPixel(eastPoint);
      const pixelWest = mapInstance.pointToPixel(westPoint);

      // Only draw if both points were successfully converted to pixels
      if (pixelEast && pixelWest) {
          // Set style EXACTLY matching the polylines
          ctx.strokeStyle = "#1890ff";
          ctx.lineWidth = 3;
          ctx.globalAlpha = 0.75;
          ctx.lineCap = "round"; // Match polyline ends if possible

          // Draw the connecting line in pixel space
          ctx.beginPath();
          ctx.moveTo(pixelEast.x, pixelEast.y);
          ctx.lineTo(pixelWest.x, pixelWest.y);
          ctx.stroke();
      }
    }
  });

  mapInstance.addOverlay(canvasLayer);
};

// 添加标记
const addMarker = (point, label) => {
  const marker = new BMapGL.Marker(point);
  const labelContent = new BMapGL.Label(label, {
    offset: new BMapGL.Size(20, -10),
  });
  marker.setLabel(labelContent);
  map.addOverlay(marker);
};

// 生命周期钩子：加载百度地图API
onMounted(() => {
  // 动态加载百度地图API（确保正确编码AK）
  const script = document.createElement("script");
  script.src = `https://api.map.baidu.com/api?type=webgl&v=1.0&ak=${encodeURIComponent(
    AK
  )}&callback=initMap`;
  script.async = true;
  document.head.appendChild(script);

  // 全局暴露initMap回调
  window.initMap = () => {
    initMap();
  };
});
</script>

  <style>
.map-container {
  width: 100%;
  height: 600px;
}
</style>
