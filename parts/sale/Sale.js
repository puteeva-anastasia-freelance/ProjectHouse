!function(){"use strict";class e{constructor(){this.wrapperEl=document.querySelector("#sale-slider .swiper-wrapper"),this.settings={slidesPerView:"auto",speed:1200,freeMode:!0,watchSlidesProgress:!0,scrollbar:{el:".swiper-scrollbar",draggable:!0},breakpoints:{320:{spaceBetween:10},450:{spaceBetween:15},993:{spaceBetween:30}}}}insertCardsSalesIntoPage(e){let t="";for(var s of e)t+=this.getCardSaleMarkup(s);this.wrapperEl.insertAdjacentHTML("beforeend",t),this.setEqualHeightSubtitleElems(),this.addWindowResizeListener(),this.addSliderCardsSales()}getCardSaleMarkup(e){return`
				<div class="swiper-slide">
					<div class="sale__item">
						<span class="sale__procent">-${e.percent}%</span>
						<span class="sale__subtitle">${e.name}</span>
						<p class="sale__term">${e.term}</p>
						<button type="button" class="button button__gradient sale__button button__feedback" data-value="Получить скидку: ${e.name}">Получить скидку</button>
					</div>
				</div>`}addSliderCardsSales(){new Swiper("#sale-slider",this.settings)}setEqualHeightSubtitleElems(){var t=document.querySelectorAll(".sale__subtitle");let s=0;for(let e=0;e<t.length;e++)t[e].style.height="auto";for(let e=0;e<t.length;e++)s=Math.max(s,t[e].offsetHeight);for(let e=0;e<t.length;e++)t[e].style.height=s+"px"}addWindowResizeListener(){window.addEventListener("resize",()=>{this.setEqualHeightSubtitleElems()})}}window.addEventListener("load",()=>{(new e).insertCardsSalesIntoPage(sales)})}();