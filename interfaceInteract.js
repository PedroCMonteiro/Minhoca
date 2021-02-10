$(document).keydown(function (e)
{
  let key = e.key;

  if(key === "ArrowUp")
  {
    up();
  }
  else if(key === "ArrowDown")
  {
    down();
  }
  else if(key === "ArrowLeft")
  {
    left();
  }
  else if(key === "ArrowRight")
  {
    right();
  }
  else if(key === "Enter")
  {
    start();
  }
  else if(key === " ")
  {
    start();
  }
  else if(key === "Escape")
  {
    stop();
  }
  else if(key === "p")
  {
    if(run)
        pause();
    else
        paly();
  }
  else if(key === "h")
  {
    help();
  }
})


function Start()
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
  play();
  if(game.running())
  {
    hide(btnPlay);
    show(btnPause);
  }
}

function btnPause_click()
{
  pause();
  if(game.running())
  {
    hide(btnPause);
    show(btnPlay);
  }
}

function btnOptions_click()
{ 
    if(game.runnning())
    {
        if(game.paused())
        {
            game.play();
            hideOptions();
        }
        else
        {
            game.pause();
            showOptions();
        }
    }
  //setMovement();
  if(movement === "options")
  {

  }
}

function btnEnd_click()
{
  game.stop();

  if(!game.running())
  {

  }
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