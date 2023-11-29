!function(){"use strict";class e{constructor(){this.pathToServicesImages="img/dist/services",this.wrapperEl=document.querySelector("#service-slider .swiper-wrapper"),this.settings={slidesPerView:"auto",speed:1200,freeMode:!0,watchSlidesProgress:!0,scrollbar:{el:".service-scrollbar",draggable:!0}}}insertServicesIntoPage(e){let s="";for(var i of e)""!=i.image&&(s+=this.getServiceMarkup(i));this.wrapperEl.insertAdjacentHTML("beforeend",s),this.setEqualHeightDescriptionEl(),this.addWindowResizeListener(),this.addSliderServices()}getServiceMarkup(e){var s=this.getPriceServiceMarkup(e),i=this.getDescriptionServicesMarkup(e);return`
			<div class="swiper-slide">
				<div class="service__item">
					<div class="service__flipper">
						<div class="service__front" style="background: center / cover no-repeat url(${this.pathToServicesImages}/${e.image}) #fff;">
							<div class="service__front-inner">
								<h3 class="h3 service__subtitle">${e.name}</h3>
								${s}
							</div>
						</div>
						<div class="service__back">
							<div class="service__back-inner">
								<h3 class="h3 service__subtitle service__back-subtitle">${e.name}</h3>
								<div class="service__desc">
									${i}
								</div>
								<div class="service__item-bottom">
									${s}
								</div>
								<button class="service__button button__feedback" data-value="Проконсультироваться: ${e.name}">Проконсультироваться</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			`}getPriceServiceMarkup(e){return""!=e.price?`<p class="service__item-cost">Стоимость услуги</p><span class="service__price">${e.price}</span>`:'<span class="service__price">&nbsp;</span>'}getDescriptionServicesMarkup(e){var s,i=e.description,r=/\* (.+)/g,t=[];let c="",a="";for(;null!=(s=r.exec(i));)t.push(s[1]);var l,e=i.search(r),e=i.slice(0,e).trim();if(t[t.length-1]&&(l=i.lastIndexOf(l=t[t.length-1])+l.length,a=i.slice(l,i.length).trim()),""!=e&&(c+=`<p class="service__item-txt">${e}</p>`),0!=t.length){c+='<ul class="service__item-list">';for(var n of t)c+=`<li>${n}</li>`;c+="</ul>"}return""!=a&&(c+=`<p class="service__item-txt">${a}</p>`),c}addSliderServices(){new Swiper("#service-slider",this.settings)}setEqualHeightDescriptionEl(){var s=document.querySelectorAll(".service__desc");let i=0;for(let e=0;e<s.length;e++)s[e].style.height="auto";for(let e=0;e<s.length;e++)i=Math.max(i,s[e].offsetHeight);for(let e=0;e<s.length;e++)s[e].style.height=i+"px"}addWindowResizeListener(){window.addEventListener("resize",()=>{this.setEqualHeightDescriptionEl()})}}window.addEventListener("load",()=>{(new e).insertServicesIntoPage(services)})}();