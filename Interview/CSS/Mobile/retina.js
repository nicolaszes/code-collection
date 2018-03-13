/**
 * retina
 * boreder: 1px
 */
 
 .scale{
   position: relative;
 }
 .scale:after{
   content:"";
   position: absolute;
   bottom:0px;
   left:0px;
   right:0px;
   border-bottom:1px solid #ddd;
   -webkit-transform:scaleY(.5);
   -webkit-transform-origin:0 0;
 }
