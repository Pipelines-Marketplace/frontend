import async from 'q';
export async function tags_fetchapi(){

const data = await fetch('');
return data.json();

}

