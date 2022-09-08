const randomColors = [
    "#fc76ec",
    "#94fcf0",
    "#f7e49e",
    "#86f4c5",
    "#fdff9e",
    "#ffa2a0",
    "#a5f99d",
    "#bebdf9"
]

let rand = Math.floor(Math.random() * 8);
localStorage.setItem("color", randomColors[rand]);