!function(){"use strict";class e{constructor(){this.buttonFeedbackElems=document.querySelectorAll(".button__feedback"),this.popUpOverlayEl=document.querySelector(".pop-up__overlay"),this.acceptedEl=document.querySelector(".accepted")}addButtonsFeedbackClickListener(){let o=0;this.buttonFeedbackElems.forEach(p=>{p.addEventListener("click",()=>{var e=this.getNameForm(p),t=this.getTextButton(p),t=this.getFormFeedback(t,e,o);this.popUpOverlayEl.classList.add("active-pop-up"),this.acceptedEl.insertAdjacentHTML("beforebegin",t),this.addMaskPhone(),this.addCloseElemsClickListener(),this.addPopUpElemsClickListener(),this.addButtonsPopUpClickListener(),o++})})}getFormFeedback(e,t,p){return`<div class="pop-up">
			<div class="pop-up__container">
				<div class="pop-up__body">
					<form class="pop-up__form form-application">
						<input type="hidden" name="name-form" value="${t}">
						<p class="pop-up__txt">Оставьте Ваши контактные данные и&nbsp;наш менеджер свяжется с&nbsp;Вами в&nbsp;ближайшее время</p>
						<label for="name-pop-up-${p}" class="pop-up__label">Ваше имя</label>
						<input type="text" placeholder="Иван Иванович" id="name-pop-up-${p}" class="pop-up__input" name="name" >
						<label for="phone-pop-up-${p}" class="pop-up__label">Ваш номер телефона*</label>
						<input type="text" placeholder="+375 (__)___-__-__" class="pop-up__input mask-phone" required id="phone-pop-up-${p}" name="phone">	
						<span class="txt pop-up__error pop-up__error-phone">Для отправки формы, пожалуйста, укажите Ваш номер телефона</span>
						<button class="button__gradient pop-up__button">${e}</button>
					</form>
					<div class="pop-up__close">
						<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" class="pop-up__close-svg">
							<path d="M1.375 1.375L10.625 10.625" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M10.625 1.375L1.375 10.625" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
					</div>
				</div>
			</div>
		</div>`}getTextButton(e){return""==e.textContent.trim()?e.dataset.value:e.textContent.trim()}getNameForm(e){return e.dataset.value}addMaskPhone(){let e;$(".mask-phone").mask("+375 (99) 999-99-99"),$(".pop-up .mask-phone").on("keyup",function(){12==(e=$(this).val().match(/\d+/g).join("").length)&&$(".pop-up__error-phone").css("display","none")})}addCloseElemsClickListener(){document.querySelectorAll(".pop-up__close").forEach(t=>{t.addEventListener("click",()=>{var e=t.closest(".pop-up");this.popUpOverlayEl.classList.remove("active-pop-up"),e.style.display="none"})})}addButtonsPopUpClickListener(){document.querySelectorAll(".pop-up__button").forEach(e=>{var t=e.closest(".pop-up");let p=t.querySelector(".mask-phone"),o=t.querySelector(".pop-up__error-phone");e.addEventListener("click",()=>{""==p.value?o.style.display="block":o.style.display="none"})})}addPopUpElemsClickListener(){document.querySelectorAll(".pop-up").forEach(p=>{p.addEventListener("click",e=>{var t=p.querySelector(".pop-up__container");e.target==t&&(this.popUpOverlayEl.classList.remove("active-pop-up"),p.style.display="none")})})}}window.addEventListener("load",()=>{(new e).addButtonsFeedbackClickListener()})}();