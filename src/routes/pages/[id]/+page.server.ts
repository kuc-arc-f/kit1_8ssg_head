import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Config from '$lib/LibConfig';
import LibCommon from '$lib/LibCommon';

/**
* getitem
* @param
*
* @return
*/  
const getitem = async function (id: string): Promise<any> 
{
  try {   
    let postItem: any = {};
    const req = await fetch( Config.MY_JSON_URL + "/pages/show/" + id );
    const json = await req.json();  
    let items = json
//    items = LibCommon.getDatetimeArray(items);
//console.log(items)    
    postItem = items;
    return postItem;
  } catch (e) {
    console.error(e);
  }
}

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = async ({ params }) => {
console.log("id=", params.id);
  const item = await getitem(params.id);
//console.log(item);
    return {
      item: item,
    };
//    throw error(404, 'Not found');
}