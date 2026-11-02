import {initializeApp} from 'firebase/app';
import {getAuth,onAuthStateChanged,GoogleAuthProvider,signInWithPopup,signOut} from 'firebase/auth';
import {getFirestore,doc,collection,query,orderBy,limit,startAfter,getDoc,getDocs,runTransaction,Timestamp,serverTimestamp} from 'firebase/firestore';
const app=initializeApp({apiKey:'AIzaSyCGu5Mf2U_TISIkCqT6YXNwNeH1JiEW1h8',authDomain:'keaexams2026.firebaseapp.com',projectId:'keaexams2026',storageBucket:'keaexams2026.firebasestorage.app',messagingSenderId:'257131326890',appId:'1:257131326890:web:84823edaa24061f5ff8fd3'});
const auth=getAuth(app),db=getFirestore(app);let user=null,ready=false,busy=false,versions=null;
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const write=(key,value)=>{localStorage.setItem(key,JSON.stringify(value));};
const scope=()=>user?.uid||'guest';
const key=s=>'kea:v2:'+scope()+':'+s;
const emit=()=>window.dispatchEvent(new Event('kea:history'));
function status(message){document.querySelectorAll('[data-account-status]').forEach(el=>el.textContent=message);}
// Choose once per page load; exclude the previous quote across refreshes.
const examQuotes = [
 ['Every question brings you closer to your goal.', 'Stay consistent. Your next score can be your best.'],
 ['Small steps today build stronger scores tomorrow.', 'Show up, practise, and keep moving forward.'],
 ['Your preparation today is your confidence on exam day.', 'Give this chapter your full attention.'],
 ['A mistake in practice is a lesson for the real exam.', 'Review it, understand it, and try again.'],
 ['Focus on the next question. Progress starts there.', 'One clear answer at a time.'],
 ['Consistency turns a difficult syllabus into familiar ground.', 'Make today another day of progress.'],
 ['Your effort counts before your score shows it.', 'Keep learning. Keep improving.'],
 ['Revision turns what you have read into what you remember.', 'Recall, practise, and strengthen the basics.'],
 ['You do not need a perfect day to make real progress.', 'Start with one topic and give it your best.'],
 ['Practice with purpose. Enter the exam with confidence.', 'Read carefully, think clearly, and trust your preparation.'],
 ['Every chapter you complete strengthens your foundation.', 'Build it patiently, question by question.'],
 ['Let your next attempt reflect what you learned today.', 'Learn from the explanation, then take the next step.'],
 ['Discipline today creates more choices tomorrow.', 'Protect your study time and make it count.'],
 ['Strong preparation grows through honest practice.', 'Find the gaps now and turn them into strengths.'],
 ['Your goal deserves the effort you give it today.', 'Stay focused on the work in front of you.'],
 ['Confidence is built through repeated practice.', 'Read. Recall. Revise. Repeat.']
];
const quoteKey='kea:last-exam-quote';
let previousQuote=-1;
for (const storageName of ['localStorage','sessionStorage']) {
 try { const value=JSON.parse(window[storageName].getItem(quoteKey)); if(Number.isInteger(value)&&value>=0&&value<examQuotes.length){previousQuote=value;break;} } catch {}
}
let quoteIndex=Math.floor(Math.random()*(examQuotes.length-(previousQuote>=0?1:0)));
if(previousQuote>=0&&quoteIndex>=previousQuote)quoteIndex++;
for (const storageName of ['localStorage','sessionStorage']) {try {window[storageName].setItem(quoteKey,JSON.stringify(quoteIndex));}catch{}}
const currentQuote=examQuotes[quoteIndex];
function render(){const el=document.getElementById('accountPanel');if(!el)return;el.innerHTML=`<div><b>${user?'Welcome, '+UI.escape(user.displayName||'Student')+'! Happy to see you.':'Your progress, wherever you study.'}</b><p>${UI.escape(currentQuote[0])}</p><small data-account-status role="status">${UI.escape(currentQuote[1])}</small></div><button class="button secondary" id="accountAction">${user?'Sign out':'Sign in with Google'}</button>`;el.querySelector('button').onclick=async()=>{if(Accounts.locked){status('Finish this attempt before changing accounts.');return;}try{if(user)await signOut(auth);else{const provider=new GoogleAuthProvider();provider.setCustomParameters({prompt:'select_account'});await signInWithPopup(auth,provider);}}catch(error){status(error.code==='auth/popup-closed-by-user'?'Sign-in cancelled. You can continue as a guest.':error.code==='auth/popup-blocked'?'Allow pop-ups for this site, then try sign-in again.':'Sign-in unavailable. Please try again. ('+(error.code||'network error')+')');}};}
const Accounts=window.Accounts={locked:false,get user(){return user;},key,ready:new Promise(resolve=>onAuthStateChanged(auth,u=>{if(ready){location.reload();return;}user=u;ready=true;render();resolve();flush();})),
 async version(testId){versions??=await fetch('test-versions.json').then(r=>{if(!r.ok)throw Error('Test revision unavailable');return r.json();});return versions[testId];},
 async archive(state,test,questions,config){if(!state.finished)return;state.attemptId??=UI.uuid();const owner=scope();const version=state.version||await this.version(test.id);if(!version)throw Error('Test version not registered');const a={id:state.attemptId,testId:test.id,version,title:UI.meta(test)[1],count:questions.length,answers:state.answers.map(x=>x===null?'x':x).join(''),review:state.review.map(x=>x?'1':'0').join(''),startedAt:state.startedAt,finishedAt:state.finishedAt,score:state.score,maximum:state.maximum,auto:!!state.auto};if(owner!==scope())return;const history=read(key('history'),{});history[a.id]??={...a,synced:false};write(key('history'),history);emit();if(user)flush();},
 async history(cursor=null){const uid=user?.uid,local=Object.values(read(key('history'),{}));if(!uid)return{items:local.sort((a,b)=>b.finishedAt-a.finishedAt),cursor:null};try{const constraints=[orderBy('createdAt','desc'),limit(50)];if(cursor)constraints.splice(1,0,startAfter(cursor));const snap=await getDocs(query(collection(db,'users',uid,'attempts'),...constraints));if(uid!==user?.uid)return{items:[],cursor:null};const items=snap.docs.map(d=>decode(d));const ids=new Set(items.map(x=>x.id));if(!cursor)items.push(...local.filter(a=>!a.synced&&!ids.has(a.id)));return{items:items.sort((a,b)=>b.finishedAt-a.finishedAt),cursor:snap.size===50?snap.docs.at(-1):null};}catch(error){status('Online history unavailable. Showing attempts saved on this device.');return{items:local.sort((a,b)=>b.finishedAt-a.finishedAt),cursor:null};}},
 async getAttempt(id){if(!/^[a-f0-9-]{36}$/.test(id))throw Error('Invalid attempt');if(user){try{const s=await getDoc(doc(db,'users',user.uid,'attempts',id));if(s.exists())return decode(s);}catch{}}const a=read(key('history'),{})[id];if(!a)throw Error('Attempt not found for this account');return a;},retry:()=>flush()};
function decode(s){const d=s.data();return {...d,id:s.id,startedAt:d.startedAt.toMillis(),finishedAt:d.finishedAt.toMillis(),synced:true};}
async function flush(){if(busy||!user)return;const uid=user.uid,storageKey=key('history');busy=true;try{const all=read(storageKey,{});for(const a of Object.values(all).filter(a=>!a.synced)){if(user?.uid!==uid)break;status(currentQuote[1]);const ref=doc(db,'users',uid,'attempts',a.id);const {id,synced,...data}=a;await runTransaction(db,async tx=>{const existing=await tx.get(ref);if(!existing.exists())tx.set(ref,{...data,startedAt:Timestamp.fromMillis(a.startedAt),finishedAt:Timestamp.fromMillis(a.finishedAt),createdAt:serverTimestamp()});});const fresh=read(storageKey,{});if(fresh[a.id])fresh[a.id].synced=true;write(storageKey,fresh);emit();}status(currentQuote[1]);}catch(error){status('Not synced yet. Your result is kept on this device; reconnect and use Retry sync.');}finally{busy=false;}}
window.addEventListener('online',flush);
await Accounts.ready;
