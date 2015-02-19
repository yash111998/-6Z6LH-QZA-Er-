function calc(expr) {
  // TODO: Your awesome code here
  var eachChar=expr.split(" ");
  if(expr==""){
    return 0;
  }
  var stack=new Array(0);
  for(var i=0;i<eachChar.length;i++){
    switch(eachChar[i]){
      case "+":
        var a=stack.pop();
        var b=stack.pop()
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
        stack.push(b/a);
        break;
      default : stack.push(parseFloat(eachChar[i]));
    }
  }
  return (stack.pop());
}
