/* Optional contributions never change test access or account permissions. */
'use strict';
(()=>{
 const $=id=>document.getElementById(id),dialog=$('supportDialog'),config=window.SUPPORT_CONFIG||{};
 if(!dialog)return;
 function render(){const host=$('supportPayment');host.replaceChildren();
  if(config.upiId&&/^[a-zA-Z0-9._-]{2,256}@[a-zA-Z0-9.-]{2,64}$/.test(config.upiId)){
   const note=document.createElement('p');note.className='support-notice';note.textContent='UPI ID: '+config.upiId;host.append(note);
   const options=document.createElement('div');options.className='support-amounts';options.setAttribute('role','group');options.setAttribute('aria-label','Optional contribution amount');
   const pay=document.createElement('a');pay.className='button primary support-payment-link';pay.textContent='Choose amount in your UPI app';
   function amount(value){const params=new URLSearchParams({pa:config.upiId,pn:config.recipientName||'KEAEXAMS2026',cu:'INR',tn:'Voluntary support for free KEAEXAMS2026 tests'});if(value)params.set('am',String(value));pay.href='upi://pay?'+params.toString();options.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.amount)===value)));pay.textContent=value?'Support with ₹'+value:'Choose amount in your UPI app';}
   for(const value of [25,50,100,0]){const b=document.createElement('button');b.type='button';b.className='button secondary';b.dataset.amount=value;b.textContent=value?'₹'+value:'Other amount';b.onclick=()=>amount(value);options.append(b);}host.append(options,pay);amount(0);
   const hint=document.createElement('p');hint.className='storage-note';hint.textContent='On a phone, this opens a UPI app. On a computer, use the displayed UPI ID in your payment app. Confirm the recipient and amount before paying.';host.append(hint);
  }else if(config.supportUrl){try{const url=new URL(config.supportUrl);if(url.protocol!=='https:')throw Error('HTTPS required');const a=document.createElement('a');a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.className='button primary';a.textContent='Open support page';host.append(a);}catch{unavailable(host);}}
  else unavailable(host);
 }
 function unavailable(host){const p=document.createElement('p');p.className='support-notice';p.textContent='Our support details are being set up. Your encouragement means a lot—keep practising and share the free tests with a friend.';host.append(p);}
 $('supportBtn').onclick=()=>{render();dialog.showModal();};$('closeSupport').onclick=$('supportDone').onclick=()=>dialog.close();
})();
