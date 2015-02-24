#Description:

ASCII85 is a binary-to-ASCII encoding scheme that's used within PDF and Postscript, and which provides data-size savings over base 64. Your task is to extend the String object with two new methods, toAscii85 and fromAscii85, which handle encoding and decoding ASCII85 strings.

*Encoding*
The toAscii85 method should take no arguments and must encode the value of the string to ASCII85, without any line breaks or other whitespace added to the native ASCII85-encoded value.

###Example:
```
'easy'.toAscii85() should return <~ARTY*~>
'moderate'.toAscii85() should return <~D/WrrEaa'$~>
'somewhat difficult'.toAscii85() should return <~F)Po,GA(E,+Co1uAnbatCif~>

*Decoding*
The fromAscii85 method should take no arguments and must decode the value of the string (which is presumed to be ASCII85-encoded text).
```
###Example:
```
'<~ARTY*~>'.fromAscii85() should return easy
'<~D/WrrEaa\'$~>'.fromAscii85() should return moderate
'<~F)Po,GA(E,+Co1uAnbatCif~>'.fromAscii85() should return somewhat difficult
```



##Encoding
You can learn all about ASCII85 [here](http://en.wikipedia.org/wiki/Ascii85). And remember, this is a binary-to-ASCII encoding scheme, so the input isn't necessarily always a readable string! A brief summary of the salient points, however, is as follows:

In general, four binary bytes are encoded into five ASCII85 characters.
The character set that ASCII85 encodes into is the 85 characters between ASCII 33 (!) and ASCII 117 (u), as well as ASCII 122 (z), which is used for data compression (see below).  
 1.  
In order to encode, four binary bytes are taken together as a single 32-bit number (you can envision concatenating their binary representations, which creates a 32-bit binary number). 
 2.  
You then serially perform division by 85, and add 33 to the remainder of each division to get the ASCII character value for the encoded value; the first division and addition of 33 is the rightmost character in the encoded five-character block, etc. (This is all represented well is the visualization in the Wikipedia page's example.)
 3.  
If the last block to be encoded contains less than four bytes, it's padded with nulls to a total length of four bytes, and then after encoding, the same number of characters are removed as were added in the padding step.
 4.  
If a block to be encoded contains all nulls, then that block is encoded as a simple z (ASCII 122) rather than the fully-encoded value of !!!!!.
 5.  
The final encoded value is surrounded by <~ at the start and ~> at the end. In the wild, whitespace can be inserted as needed (e.g., line breaks for mail transport agents); in this kata, whitespace shouldn't be added to the final encoded value for the sake of checking the fidelity of the encoding.

##Decoding
 1.  
Decoding applies the above in reverse; each block of five encoded characters is taken as its ASCII character codes, multiplied by powers of 85 according to the position in the block of five characters (again, see the Wikipedia example visualization), and then broken into four separate bytes to determine the corresponding binary values.
 2.  
If a block to be decoded contains less than five characters, it is padded with u characters (ASCII 117), decoded appropriately, and then the same number of characters are removed from the end of the decoded block as us were added.
 3.  
All whitespace in encoded values is ignored (as in, it's removed from the encoded data before the data is broken up into the five-character blocks to be decoded).


#####Extra Notes
To make your testing easier, two functions are preloaded for your use if you wish:

generateRandomReadableStrings(num, len): generates an array of num strings of length len containing only readable ASCII characters
generateRandomBinaryData(num, len): generates an array of num strings of length len containing binary data (ASCII code 0—255)
