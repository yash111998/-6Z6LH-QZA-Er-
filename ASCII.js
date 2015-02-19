//Returns byte value of each letter in the string
var returnBinary=function(s){
    var Bin='';
    for(var i=0;i<s.length;i++){
        var a='';
        if(s.charCodeAt(i)==0)//For 0 ,8-bit Form=00000000
        {
            a="00000000";
        }
        else
        {
            var temp=new Number(s.charCodeAt(i));//Storing CharCode
            a=temp.toString(2);//parsing to String drops leading 0's
            //Adding leading 0's so that it is a byte
            while(((a.length)%8) != 0){
            a='0'+a;
            }
        }
        Bin+=a;//Adding byte form of current letter to total
    }
    return Bin;//Returning byte encoded value
}

String.prototype.toAscii85 = function() {
    var s=this;//storing current string in another var
    var bitForm=returnBinary(s);//Getting binary encoded form
    
    //Making sure it contains 4 8-bit peices (32)
    var count=0;
    while(bitForm.length%32!=0){
        count++;
        bitForm+="0";
    }
    //Counting how many zeroes had been added so that that many characters can be removed at the end
    
    
    //Getting number of 32 bit peices
    var size=Math.ceil((bitForm.length/32.0));
    var bit32=new Array(size);
    
    //Extracting each 32-bit peice into different blocks 
    for(var x=0;x<size;x++){
        bit32[x]='';
    }
    for(var x=0;x<bitForm.length;x++){
        bit32[Math.floor(x/32.0)]+=bitForm.charAt(x);
    }
    
    //Parsing each 32-bit character
    var n=new Array(size);
    for(var x=0;x<size;x++){
        n[x]=parseInt(bit32[x],2);
    }
    
    
    //Now to divide it into 5 character blocks
    for(var x=0;x<size;x++){
        bit32[x]='';
    }
    for(var x=0;x<size;x++){
        if(n[x]==0){//If n[x]=0,'!!!!!' should be encoded as z
            if(x==size-1 && count!=0){//But if 0's were added to make it 32-bit,it should be encoded as is
                bit32[x]='!!!!!';
            }
            else{
                bit32[x]='z';
            }
        }
        else{
            for(var j=1;j<=5;j++){
                bit32[x]=String.fromCharCode((n[x]%85)+33)+bit32[x];//converting to ascii 85
                n[x]/=85;
            }
        }
    }
    var ans='';//Ans is sum of all 5 character blocks obtained from above
    for(var x=0;x<size;x++){
        ans+=bit32[x];
    }
    ans=ans.substring(0,ans.length-count/8);//Removing the number of '\0' added '\0'=00000000 
    return('<~'+ans+'~>');//Returning ascii85 format
}

String.prototype.fromAscii85 = function() {
    var s=this;//storing current string in another var
    s=s.substring(2);//Removing leading '<~'
    s=s.substring(0,s.length-2);//Removing following '~>'
    var newS='';
    
    //Removing all spaces,replacing z by '!!!!!' 
    for(var x=0;x<s.length;x++){
        if(s.charCodeAt(x)<=32 || (s.charCodeAt(x)>=188 && s.charCodeAt(x)!=122)){
            newS+='';
        }
        else if(s.charAt(x)=='z'){
            newS+='!!!!!';
        }
        else{
            newS+=s.charAt(x);
        }
    }
    s=newS;
    var count=0;
    //Making length a multiple of 5 so that 5-character blocks can be made
    while(s.length%5!=0){
        s+='u';
        count++;
    }
    //Counting number of u's added so that it can be removed from answer
    
    //Breaking into blocks of 5
    var arr=new Array(s.length/5);
    for(var x=0;x<s.length/5;x++){
        arr[x]='';
    }
    for(var x=0;x<s.length;x++){
        arr[Math.floor(x/5)]+=s.charAt(x);
    }
    
    //Getting integer value of every block of 5
    var n=new Array(s.length/5);
    for(var x=0;x<s.length/5;x++){
        n[x]=0;
    }
    for(var x=0;x<s.length/5;x++){
        for(var i=0;i<5;i++){
            n[x]+=(arr[x].charCodeAt(i)-33)*Math.pow(85,5-i-1);
        }
    }
    
    //Converting to bitform,radix 2
    var bit32='';
    for(var x=0;x<s.length/5;x++){
        var temp=n[x].toString(2);
        while(temp.length%32!=0){
            temp='0'+temp;
        }
        bit32+=temp;
    }
    
    //Parsing blocks of 8 to get integer value of each encoded character
    var n1=new Array((s.length/5)*4);
    for(var x=0;x<(s.length/5)*4;x++){
        var temp=(bit32.substring(0+8*x,8*(x+1),2));
        var a=temp.indexOf('1');//Otherwise it returns by removing leading zeroes
        temp=temp.substring(a);
        n1[x]=parseInt(temp,2);
    }
    var ans='';//Ans is string made from charcodes generated in previous step
    for(var x=0;x<(s.length/5)*4;x++){
        ans+=String.fromCharCode(n1[x]);
    }
    //Removing as many characters as the number of u's added 
    ans=ans.substring(0,ans.length-count);
    return ans;
}
