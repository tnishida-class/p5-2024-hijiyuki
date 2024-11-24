// 最終課題を制作しよう

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

let balls;
let score = 0; // スコア
let isRunning = false; // プログラムが動いているかどうか
let startTime = 0; // タイマーの開始時刻
const lineHeight = 150; // 線の高さ (画面下からの距離)
const gameDuration = 60000; // ゲーム時間 (1分 = 60000ms)
let gameOver = false; // ゲームオーバーかどうか

function setup() {
  createCanvas(windowWidth, windowHeight);
  balls = [];
  
  // 初期表示のための設定
  textSize(32);
  fill(0);
  noStroke();
}

function draw() {
  background(160, 192, 255);
  
  // ゲームが終了した後にスコアを表示
  if (gameOver) {
    showGameOverScreen();
    return; // ゲームオーバー画面を表示した後、ゲーム内容は描画しない
  }
  
  // ゲームが開始されていない場合、操作方法を表示
  if (!isRunning) {
    showInstructions(); // 操作方法の表示
    return; // ゲーム開始前なので、ゲーム内容の描画はしない
  }
  
  // 残り時間を計算
  let remainingTime = gameDuration - (millis() - startTime);
  
  // スコア表示
  text(`Score: ${score}`, 10, 40); // 左上にスコアを表示
  
  // 残り時間表示
  if (isRunning) {
    text(`Time: ${floor(remainingTime / 1000)}s`, 10, 80); // 左上に残り時間を表示
  } else {
    text(`Time: 0s`, 10, 80); // ゲーム停止中も残り時間0秒を表示
  }
  
  // 線を描画
  stroke(0); // 線の色
  strokeWeight(4); // 線の太さ
  line(0, height - lineHeight, width, height - lineHeight); // 線を少し上に移動
  
  // 一定間隔でボールを生成する
  if (frameCount %30 === 0) { // 10フレームごとに生成
    const randomSize = random(50, 100); // ランダムなサイズ
    const b = {
      x: random(width), // 横方向ランダム
      y: 0, // 上端からスタート
      size: randomSize,
      vx: random(-2, 4), // 横方向の小さなランダムな動き
      vy: random(2, 5), // 下方向のランダムな速度
      color: color(255), // 初期色: 白
      tapped: false, // タップされたかどうかの状態
      passed: false // 線を通過したかどうか
    };
    balls.push(b);
  }
  
  // ボールを描画し、位置を更新する
  for (let i = balls.length - 1; i >= 0; i--) {
    let b = balls[i];
    fill(b.color); // ボールの色
    noStroke();
    ellipse(b.x, b.y, b.size); // ボールを描く
    b.x += b.vx;
    b.y += b.vy;

    // ボールが線を通過したかどうかを判定
    if (b.y - b.size / 2 > height - lineHeight && !b.passed) {
      if (!b.tapped) { // タップされていない場合のみスコア減少
        b.color = color(0); // 黒に変更
        score--; // スコアを減少
      }
      b.passed = true; // 通過済みとしてマーク
    }

    // ボールが画面外に出たら削除する
    if (b.y - b.size / 2 > height) {
      balls.splice(i, 1);
    }
  }
  
  // ゲーム時間のチェック
  if (isRunning && millis() - startTime > gameDuration) {
    isRunning = false; // プログラム停止
    gameOver = true; // ゲームオーバー
  }
}

function mousePressed() {
  if (!isRunning) return; // 停止中は操作できない

  // クリックした位置とボールの位置を判定
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    
    // ボールが線を通過していない場合のみタップ可能
    if (b.passed) continue; // 通過したボールはタップ不可
    
    let d = dist(mouseX, mouseY, b.x, b.y); // マウスとボールの距離
    if (d < b.size / 2 && !b.tapped) {
      b.color = color(255, 0, 0); // 赤に変更
      b.tapped = true; // タップ済みとしてマーク
      score++; // スコアを加算
    }
  }
}

function keyPressed() {
  if (key === ' ') { // スペースキー
    if (gameOver) {
      // ゲームオーバー後、操作方法画面に戻る
      score = 0; // スコアをリセット
      balls = []; // 画面上のボールをリセット
      isRunning = false; // ゲームを停止
      gameOver = false; // ゲームオーバー状態をリセット
    } else {
      // ゲーム開始
      score = 0; // スコアをリセット
      balls = []; // 画面上のボールをリセット
      isRunning = true; // プログラム開始
      startTime = millis(); // タイマーをリセット
    }
  }
}



function showInstructions() {
  textSize(24);
  fill(0);
  text("ー落下してくるボールをクリックしてくださいー", 10, height / 2 - 40);
  text("ースペースキーをタップしてゲーム開始。制限時間1分ー", 10, height / 2);
  text("ーボールが線を通過するまでにタップで1ポイントゲット。失敗でー1ポイントー", 10, height / 2 + 40);
}

function showGameOverScreen() {
  textSize(32);
  fill(0);
  text("Game Over!", width / 2 - 100, height / 2 - 40);
  text(`Your Score: ${score}`, width / 2 - 100, height / 2);
  text("スペースキーでリトライ", width / 2 - 100, height / 2 + 40);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
