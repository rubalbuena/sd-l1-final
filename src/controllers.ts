// El siguiente import no se usa pero es necesario
import "./pelis.json";
import { PelisCollection, Peli } from "./models";
type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

export class PelisController {
  modelo : PelisCollection
  constructor() {
    this.modelo = new PelisCollection();
  }
 async get(options?:Options):Promise<Peli[] | undefined>{
  let busco = await this.modelo.getAll();
  if (options?.id) {
   const peli = await this.modelo.getById(options.id);
   return peli ? [peli] : []; // Devuelve un array con la película o vacío
}else if (options?.search){
  return busco.filter((peli) =>{
    let tituloEncontrado = options.search.title ? peli.title.toLocaleLowerCase().includes(options?.search.title.toLocaleLowerCase()) : true
    let tagEncontrado = options.search.tag ? peli.tags.includes(options?.search.tag) : true ;
    return tagEncontrado && tituloEncontrado;
  })
} else{
  return busco;
}
}
 async getOne(options:Options):Promise<Peli | undefined>{
  try{
  let resultado = await this.get(options)[0];
  return resultado;
  } catch (error){
    console.error("no se pudo cargar la pelicula");
    throw error;
  }
}
 async add(peli:Peli): Promise<boolean>{
  try{
    let peliAgregada = await this.modelo.add(peli);
    return peliAgregada
  }catch(error){
    console.error("no se pudo agregar la pelicula",error);
    throw error;
  }
}
}
