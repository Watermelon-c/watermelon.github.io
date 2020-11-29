/*
* @Author: TAO
* @Date:   2018-11-16 11:25:50
* @Last Modified by:   TAO
* @Last Modified time: 2018-11-16 11:33:34
*/
   (function (doc, win) {
            var docEl = doc.documentElement,
                    resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
                    recalc = function () {
                        var clientWidth = docEl.clientWidth;
                        if (!clientWidth) return;
                        if(clientWidth>=640){
                            docEl.style.fontSize = '20px';
                        }else{
                            docEl.style.fontSize = 20 * (clientWidth / 640) + 'px';
                        }
                    };

            if (!doc.addEventListener) return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);