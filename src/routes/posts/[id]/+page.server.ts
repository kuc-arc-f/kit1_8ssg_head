import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import Config from '$lib/LibConfig';


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
    const req = await fetch( Config.MY_JSON_URL + "/posts/show/" + id );
    const json = await req.json();
//console.log(json)    
    postItem = json;
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
      id: params.id,
    };
//    throw error(404, 'Not found');
}
/*
title: 'Hello world: id=' + params.id,
content: 'Welcome to our blog. Lorem ipsum dolor sit amet...',
*/
