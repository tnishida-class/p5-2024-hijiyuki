//　テキスト「オブジェクト」
// 練習問題：ボールのサイズをランダムに変更してみよう
// 練習問題：何も操作しなくてもボールが湧いてくる機能を追加しよう

let balls;

function setup(){
  createCanvas(windowWidth, windowHeight);
  balls = [];
}

function draw(){
  background(160, 192, 255);
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    ellipse(b.x, b.y, b.size);   //ボールを描く　位置X.Yは速度に応じて変わる  
    b.x += b.vx;
    b.y += b.vy;
  }
}

function mouseDragged(){
  const dx = mouseX - pmouseX;　　//dxdyは前回からのマウス位置の移動量
  const dy = mouseY - pmouseY;
  if(mag(dx, dy) > 5){　　//この関数は速度の大きさを計算する
    const randomSize=random(10,100);
    const b = { x: mouseX, y: mouseY, size: randomSize, vx: dx, vy: dy };
    balls.push(b);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
