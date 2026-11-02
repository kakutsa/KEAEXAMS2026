try {
 await import('./accounts.js?v=20261102-quotes1');
 const script=document.createElement('script');
 script.src=document.body.classList.contains('exam-page')?'exam-loader.js?v=20261102-quotes1':'home.js?v=20261102-quotes1';
 document.body.append(script);
} catch {
 document.getElementById('accountPanel').innerHTML='<p>Student account services could not load. Please check your connection and reload.</p><button class="button secondary" onclick="location.reload()">Reload</button>';
}
