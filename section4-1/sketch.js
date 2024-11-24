// テキスト「配列」～「配列を使った描画」までを収録
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(60, 100); // 60以上100未満のランダムな数を代入
  }
  console.log(scores);

  // 合計を計算する
  let sum = 0;
  for(let i = 0; i < scores.length; i++){
    sum += scores[i];
  }
  console.log(sum);

  // ここから平均・最大・最小を求めます
  let average=sum/scores.length;　　　合計/スコア配列の要素数
  console.log(average);

  // BLANK[1]　平均値（ヒント average = 合計 / 配列の長さ）

  let largest = 0;
  for(let i = 0; i < scores.length; i++){
    if(scores[i]>largest){
      largest=scores[i];
    }
  }
　console.log(largest);

  let smallest = 100;
  for(let i = 0; i < scores.length; i++){
    // BLANK[3]　ヒント：最小値とだいたい同じ
    if(scores[i]<smallest){
      smallest=scores[i];
    }
  }
　　　console.log(smallest);// ここから棒グラフを描いていきます。まずは背景に横線をn本引く
  const n = 10;　横線を10本描く
  for(let i = 0; i < n; i++){ 
    line(0, height * i / n, width, height * i / n); }　//heightがキャンバスの高さ×キャンバスの何等分までくるか
  
  noStroke();

  for(let i = 0; i < scores.length; i++){
    const dx = width / scores.length;　//各棒グラフの横幅
    const h = height * scores[i] / 100;
    // BLANK[4] ヒント: 条件分岐を使って色を変更します
　if(scores[i]===largest){
  fill(255,0,0);
  }else if (scores[i]===smallest){
    fill(0,0,255);
    }else{
      fill(122);
    }
    rect(i * dx + 2, height - h, dx - 4, h);　//長方形を棒グラフとして書く
    　　　　　　　　　　　　　　　　　　　　　　//hは長方形の高さ
    fill(0);
    text(scores[i].toPrecision(3), i * dx, height - h);
  }
  　　　　//スコアiの値によって、高さの割合が決まる
  　　　　//キャンバスの下部から上に向かって棒を描画する
  stroke(0,200,100);
  strokeWeight(2);
  const aveLineY=height-(height* average/100);
  line(0,aveLineY,width,aveLineY);
  }
  // BLANK[5] 平均点の線を