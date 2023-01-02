import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Config from '$lib/LibConfig';

/**
* getList
* @param
*
* @return
*/  
const getList = async function (): Promise<any> 
{
  try {   
    let postItem: any[] = [];
    const item = {
      siteId:  Config.MY_SITE_ID,
    }
    const res = await fetch(Config.MY_JSON_URL + "/posts/index", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(item),
    });        
    //const req = await fetch( url );
    const json = await res.json();  
//console.log(json)    
    postItem = json;
    return postItem;
  } catch (e) {
    console.error(e);
  }
}
//
/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params }) => {
    const items = await getList();
//console.log(items);
    return {
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
      items: items,
    };
    throw error(404, 'Not found');
}
