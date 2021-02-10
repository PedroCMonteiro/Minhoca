
$(document).keydown(function (e)
{
  let key = e.key;

  if(key === "ArrowUp")
  {
    setMovement("up");
  }
  else if(key === "ArrowDown")
  {
    setMovement("down");
  }
  else if(key === "ArrowLeft")
  {
    setMovement("left");
  }
  else if(key === "ArrowRight")
  {
    setMovement("right");
  }
  else if(key === "Enter")
  {
    setMovement("start");
  }
  else if(key === " ")
  {
    setMovement("start");
  }
  else if(key === "Escape")
  {
    setMovement("stop");
  }
  else if(key === "p")
  {
    if(run)
      setMovement("pause");
    else
      setMovement("play");
  }
  else if(key === "h")
  {
    setMovement("help");
  }
})


function btnStart_click()
{
  setMovement("start");
  if(movement === "start")
  {
    hide(btnStart);
    show(btnPause);
    show(btnEnd);
  }
}

function btnPlay_click()
{ 
  setMovement("play");
  if(movement === "start")
  {
    hide(btnPlay);
    show(btnPause);
  }
}

function btnPause_click()
{ 
  setMovement("pause");
  if(movement === "start")
  {
    hide(btnPause);
    show(btnPlay);
  }
}

function btnOptions_click()
{ 
  //setMovement();
  if(movement === "options")
  {

  }
}

function btnEnd_click()
{
  setMovement("stop");
  if(dvHelp.style.display === "inline")
  {
    dvHelp.style.display = "none";
    cnv.style.display = "inline";
    return;
  }

  if(movement === "stop")
  {
    hide(btnPlay);
    hide(btnPause);
    hide(btnEnd);
    show(btnStart);
  }
}

function btnHelp_click()
{
  setMovement("help");
  if(movement === "help")
  {
    showControls();
    hideCanvas();
  }
}

function show(button)
{
  button.style.display = "inline";
}

function hide(button)
{
  button.style.display = "none";
}