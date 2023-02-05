let circles = [
  {
    top: "100%",
    left: "100%",
    X: "-50%",
    Y: "-50%",
    size: 20,
  },
  {
    top: "23%",
    left: "10%",
    X: "-50%",
    Y: "-50%",
    size: 10,
  },
  {
    top: "0",
    left: "15%",
    X: "-50%",
    Y: "-50%",
    size: 10,
  },
  {
    top: "50%",
    left: "100%",
    X: "-50%",
    Y: "20%",
    size: 15,
  },
  {
    top: 0,
    left: 0,
    X: "-20%",
    Y: "-30%",
    size: 16,
  },
  {
    top: "100%",
    left: "77%",
    X: "-20%",
    Y: "-30%",
    size: 16,
  },
];
createCircle(circles);
function createCircle(datas) {
  datas.forEach((data) => {
    let circle = document.createElement("div");
    document.body.appendChild(circle);
    circle.classList.add("circle-bg");
    circle.style.top = data.top;
    circle.style.left = data.left;
    circle.style.transform = `translateX(${data.X}) translateY(${data.Y})`;
    circle.style.width = data.size + "rem";
    circle.style.height = data.size + "rem";
  });
}
