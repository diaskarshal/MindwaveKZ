window.saveDataAcrossSessions = true;     
if(localStorage.getItem("calibration")==1){
  webgazer
  .setGazeListener((data, timestamp) => {
    if (data === null) return;
  })
  .begin();
}else{
  const c = confirm("Готовы приступить к калибровке входных данных?");
  var b1,b2,b3,b4,b5;
  function checkButtons(){
    if(b1 && b2 && b3 && b4 && b5) {
      alert("Готово! Можете приступить к тестированию.")
      localStorage.setItem("calibration", 1);
      console.log(localStorage.getItem("calibration"))
      document.querySelector(".calibration").style.display = "none"
    }
  }

  if(c==true){   
    webgazer
      .setGazeListener((data, timestamp) => {
        if (data === null) return;
      })
      .begin();

    b1=false;b2=false;b3=false;b4=false;b5=false;
    const para = document.createElement("div");
    para.className="calibration";
    document.body.appendChild(para);

    const dot1 = document.createElement("div");
    dot1.className="dot1";
    dot1.innerText = "1";
    document.querySelector(".calibration").appendChild(dot1);

    const dot2 = document.createElement("div");
    dot2.className="dot2";
    dot2.innerText = "2";
    document.querySelector(".calibration").appendChild(dot2);

    const dot3 = document.createElement("div");
    dot3.className="dot3";
    dot3.innerText = "3";
    document.querySelector(".calibration").appendChild(dot3);

    const dot4 = document.createElement("div");
    dot4.className="dot4";
    dot4.innerText = "4";
    document.querySelector(".calibration").appendChild(dot4);

    const dot5 = document.createElement("div");
    dot5.className="dot5";
    dot5.innerText = "5";
    document.querySelector(".calibration").appendChild(dot5);

    btnDot1=document.querySelector(".dot1");
    btnDot1.addEventListener("click",function(){ 
      checkButtons();   
      btnDot1.style.opacity = Number(btnDot1.style.opacity) + 0.2;
      if(Number(btnDot1.style.opacity)>=1) {
        btnDot1.style.backgroundColor = 'yellow';
        b1=true;
      }
    })

    btnDot2=document.querySelector(".dot2");
    btnDot2.addEventListener("click",function(){    
      checkButtons();
      btnDot2.style.opacity = Number(btnDot2.style.opacity) + 0.2;
      if(Number(btnDot2.style.opacity)>=1){
        btnDot2.style.backgroundColor = 'yellow';
        b2=true;
      } 
    })

    btnDot3=document.querySelector(".dot3");
    btnDot3.addEventListener("click",function(){  
      checkButtons();  
      btnDot3.style.opacity = Number(btnDot3.style.opacity) + 0.2;
      if(Number(btnDot3.style.opacity)>=1){
        btnDot3.style.backgroundColor = 'yellow';
        b3=true;
      }
    })

    btnDot4=document.querySelector(".dot4");
    btnDot4.addEventListener("click",function(){    
      checkButtons();
      btnDot4.style.opacity = Number(btnDot4.style.opacity) + 0.2;
      if(Number(btnDot4.style.opacity)>=1) {
        btnDot4.style.backgroundColor = 'yellow';
        b4=true;
      }
    })

    btnDot5=document.querySelector(".dot5");
    btnDot5.addEventListener("click",function(){    
      checkButtons();
      btnDot5.style.opacity = Number(btnDot5.style.opacity) + 0.2;
      if(Number(btnDot5.style.opacity)>=1) {
        btnDot5.style.backgroundColor = 'yellow';
        b5=true;
      }
    })
    setTimeout(function(){alert("Нажмите последовательно на кнопки 5 раз, пока кнопка не станет жёлтого цевета")},100);  
  }

}