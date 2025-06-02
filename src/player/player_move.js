// https://www.youtube.com/watch?v=kX18GQurDQg
document.addEventListener("DOMContentLoaded", () => {
  let player = document.getElementById("player");
  const SPEED = 1;

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key == "d") {
      let style_player = window.getComputedStyle(player);
      let pos_value = style_player.getPropertyValue("left").replace("px", "");
      console.log(pos_value);
      player.style.left = Number(pos_value) + SPEED + "px";
    }
  });
});
