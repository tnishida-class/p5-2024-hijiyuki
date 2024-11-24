// 練習問題「心臓の鼓動のように大きくなったり小さくなったりする円」

let size = 50;//円の初期のサイズ
 let count = 0;//変動する、円の大きさ
let cycle = 100;//鼓動の周期、100で戻る
let increment = 1;//鼓動の増える速度、通常は１
function setup(){
 createCanvas(200, 200);//キャンバス作成
}
function draw(){
 background(160, 192, 255);// 背景を水色に
 count = (count + increment) % cycle;//countをincrementの分増加させる
  if (keyIsPressed) {
  increment = 2;//鼓動の速度、キーを押すと2倍になる
} else {
 increment = 1;//押してない時は普通の速度
  }
  if (count < cycle/2) {//countがcycle/2の時円は大きくなる
 size = count + 50;
 } else {
 size = (cycle - count) + 50;//上以外の時、円は小さくなる
 }
 ellipse(width/2, height/2, size);//円の位置、大きさ
}