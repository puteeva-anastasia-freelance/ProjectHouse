!function(){"use strict";class t{constructor(){this.toTopEl=document.querySelector(".to-top")}addWindowScrollListener(){window.addEventListener("scroll",()=>{this.addButtonOnPage()})}addButtonOnPage(){var t=window.pageYOffset;1.5*window.innerHeight<t?this.toTopEl.classList.add("active"):this.toTopEl.classList.remove("active")}}window.addEventListener("load",()=>{(new t).addWindowScrollListener()})}();