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
    let cmsData: any = {};
    const item = {
      siteId:  Config.MY_SITE_ID,
    }
    const res = await fetch(Config.MY_JSON_URL + "/posts/index", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(item),
    });        
    const json = await res.json();  
//console.log(json)    
    cmsData.items = json;
    //page
    const resPage = await fetch(Config.MY_JSON_URL + "/pages/index", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(item),
    });     
    const jsonPage = await resPage.json(); 
//console.log(jsonPage)  
    cmsData.pageItems = jsonPage;
    return cmsData;
  } catch (e) {
    console.error(e);
  }
}
//
/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params }) => {
    const data = await getList();
//console.log(data);
    return {
      title: 'Hello world!',
      content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
      items: data.items,
      pageItems: data.pageItems,
    };
    throw error(404, 'Not found');
}
