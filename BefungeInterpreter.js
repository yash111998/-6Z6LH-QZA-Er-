function interpret(code) {
  var output="";
  var rows=code.split("\n");
  var planeForm;
  planeForm=new Array(rows.length);
  for(var x=0;x<=rows.length-1;x++){
    planeForm[x]=rows[x].split("");
  }
  var currentRow=0;
  var currentColumn=0;
  var direction=0;
  //0-Right 1-Left 2-Up 3-Down
  var stack=new Array(0);
  var run=true;
  var stringMode=false;
  var skip=false;
  while(run)
  {
    if(planeForm[currentRow][currentColumn]==undefined){
      console.log(planeForm);
      console.log(currentRow+","+currentColumn);
      currentColumn=0;
      //currentRow++;
    }
    if(stringMode){
      if(planeForm[currentRow][currentColumn]=="\""){
        stringMode=false;
      }
      else{
        stack.push(planeForm[currentRow][currentColumn].charCodeAt(0));
      }
    }
    else if(!skip){
      switch(planeForm[currentRow][currentColumn]){
        case "+":
          var a=stack.pop();
          var b=stack.pop();
          stack.push(a+b);
          break;
        case "-":
          var a=stack.pop();
          var b=stack.pop();
          stack.push(b-a);
          break;
        case "*":
          var a=stack.pop();
          var b=stack.pop();
          stack.push(b*a);
          break;
        case "/":
          var a=stack.pop();
          var b=stack.pop();
          stack.push((a==0)?0:Math.floor(b/a));
          break;
        case "%":
          var a=stack.pop();
          var b=stack.pop();
          stack.push((a==0)?0:(b%a));
          break;
        case "!":
          var a=stack.pop();
          stack.push((a==0)?1:0);
          break;
        case "`":
          var a=stack.pop();
          var b=stack.pop();
          stack.push((b>a)?1:0);
          break;
        case ">":
          direction=0;
          break;
        case "<":
          direction=1;
          break;
        case "^":
          direction=2;
          break;
        case "v":
          direction=3;
          break;
        case "?":
          direction=Math.floor((Math.random()*5));
          direction=(direction==5)?4:direction;
          break;
        case "_":
          var a=stack.pop();
          direction=((a==0)?0:1);
          break;
        case "|":
          var a=stack.pop();
          direction=((a==0)?3:2);
          break;
        case "\"":
          stringMode=!stringMode;
          break;
        case ":":
          if(stack.length==0){
            stack.push(0);
            break;
          }
          var a=stack[stack.length-1];
          stack.push(a);
          break;
        case "\\":
          if(stack.length==1){
            stack.push(0);
            break;
          }
          var a=stack.pop();
          var b=stack.pop();
          stack.push(a);
          stack.push(b);
          break;
        case "$":
          stack.pop();
          break;
        case ".":
          output+=stack.pop();
          break;
        case ",":
          output+=String.fromCharCode(stack.pop());
          break;
        case "#":
          skip=true;
          break;
        case "p":
          var y=stack.pop();
          var x=stack.pop();
          var v=stack.pop();
          planeForm[y][x]=String.fromCharCode(v);
          break;
        case "g":
          var y=stack.pop();
          var x=stack.pop();
          stack.push(planeForm[y][x].charCodeAt(0));
          break;
        case "@":
          run=false;
          break;
        case " ":
          break;
        case /[0-9]/:
          stack.push(planeForm[currentRow][currentColumn].charCodeAt(0)-48);
        default:
          throw "Invalid Character";
      }
    }
    else{
      skip=false;
    }
    switch(direction){
      case 0:
        currentColumn++;
        break;      
      case 1:
        currentColumn--;
        break;
      case 2:
        currentRow--;
        break;
      case 3:
        currentRow++;
    }
    
  }
  // TODO: Interpret the code!
  return output;
}
