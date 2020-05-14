const chessGame = (function () {
  const canvas = document.getElementById("canvas")
  const button = document.querySelector("button")
  const ctx = canvas.getContext("2d")
  const pieceWidth = 24
  const size = 20
  canvas.width = pieceWidth * (size + 1)
  canvas.height = canvas.width
  let list = []

  function drawCheckerBoard() {
    for (let i = 1; i < size + 1; i++) {
      ctx.beginPath()
      ctx.moveTo(pieceWidth, i * pieceWidth)
      ctx.lineTo(pieceWidth * size, i * pieceWidth)
      ctx.moveTo(i * pieceWidth, pieceWidth)
      ctx.lineTo(pieceWidth * i, pieceWidth * size)
      ctx.stroke()
    }
  }

  function drawPiece(item) {
    ctx.beginPath()
    ctx.arc(item.x, item.y, pieceWidth / 2, 0, 2 * Math.PI, false)
    ctx.fillStyle = item.color
    ctx.fill()
  }

  function setList(data) {
    list = data
  }

  function getList() {
    return list
  }

  function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function play(e) {
    const { clientX, clientY } = e
    const X = Math.round(clientX / pieceWidth) * pieceWidth
    const Y = Math.round(clientY / pieceWidth) * pieceWidth
    list.push({
      x: X,
      y: Y,
      color: list.length % 2 === 0 ? "black" : "white",
    })
    window.dispatchEvent(
      new CustomEvent("updateChess", {
        detail: list,
      })
    )
    drawPiece(list[list.length - 1])
  }

  function withDraw(e) {
    list.pop()
    window.dispatchEvent(
      new CustomEvent("updateChess", {
        detail: list,
      })
    )
    clearBoard()
    drawCheckerBoard()
    list.forEach(drawPiece)
  }

  function bindEvent() {
    canvas.addEventListener("click", play)
    button.addEventListener("click", withDraw)
  }

  function init() {
    drawCheckerBoard()
    bindEvent()
  }

  init()

  return {
    drawCheckerBoard,
    drawPiece,
    clearBoard,
    setList,
    getList,
  }
})()
