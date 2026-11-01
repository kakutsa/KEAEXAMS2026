'use strict';
// Run from the repository: node scripts/register-test-versions.cjs
// Optional arguments: repository root, output SQL path.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..'));
const output=path.resolve(process.argv[3]||path.join(root,'supabase/generated-test-versions.sql'));
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'catalog.js'),'utf8'),ctx);
const core=require(path.join(root,'core.js'));
const quote=s=>"'"+String(s).replaceAll("'","''")+"'";
let sql='-- Generated immutable test versions. Apply after migrations/001_student_attempts.sql.\nbegin;\n',count=0;
for(const test of ctx.window.TEST_CATALOG){
 if(test.status!=='active')continue;
 const source=path.resolve(root,test.file.split('?')[0]);
 if(!source.startsWith(root+path.sep))throw Error('Question path outside repository');
 const c={window:{}};vm.runInNewContext(fs.readFileSync(source,'utf8'),c);
 const qs=c.window.QUESTIONS,config=c.window.EXAM_CONFIG;
 if(!Array.isArray(qs)||!qs.length||qs.length!==test.questionCount||qs.some(q=>!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3))throw Error('Invalid test: '+test.id);
 const revision=core.fingerprint(qs);
 sql+='insert into exam_private.test_versions(test_id,revision,title,config,questions) values ('+[test.id,revision,test.title,JSON.stringify(config),JSON.stringify(qs)].map(quote).join(',')+') on conflict (test_id,revision) do nothing;\n';count++;
}
sql+='commit;\n';fs.mkdirSync(path.dirname(output),{recursive:true});fs.writeFileSync(output,sql);console.log(`Registered ${count} test snapshots in ${output}`);
