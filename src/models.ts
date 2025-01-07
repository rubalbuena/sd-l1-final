import * as jsonfile from "jsonfile";
// El siguiente import no se usa pero es necesario
import "./pelis.json";

class Peli {
  id: number;
  title: string;
  tags: string[];
}

type SearchOptions = { title?: string; tag?: string };

class PelisCollection {
  async getAll(): Promise<Peli[]> {
    try {
      const pelis = await jsonfile.readFile("./src/pelis.json");
      return pelis;
    } catch (error) {
      console.error("Error al leer el archivo JSON", error);
      return [];
    }
  }

  async add(peli: Peli): Promise<boolean> {
    const peliexistente = await this.getById(peli.id);
    if (peliexistente) {
      return false;
    } else {
      try {
        const pelisActuales = await this.getAll();
        pelisActuales.push(peli);
        await jsonfile.writeFile("./src/pelis.json", pelisActuales);
        return true;
      } catch (error) {
        console.error("No se pudo guardar la película", error);
        return false;
      }
    }
  }

  async getById(id: number): Promise<Peli | undefined> {
    const pelis = await this.getAll();
    try{
    return pelis.find((p) => p.id === id);
    }catch(error){
      console.log("no se encontro el ID solicitado")
      return undefined;
    }
  }

  async search(options: SearchOptions): Promise<Peli[]> {
    const pelis = await this.getAll();
    return pelis.filter((p) => {
      const titleMatch = options.title ? p.title.toLocaleLowerCase().includes(options.title.toLocaleLowerCase()) : true;
      const tagMatch = options.tag ? p.tags.includes(options.tag) : true;
      return titleMatch && tagMatch;
    });
  }
}

export { PelisCollection, Peli };
let nuevoRuben = new PelisCollection
 nuevoRuben.getAll().then(p => console.log(p));
let peliSearch = {
  tag : "drama"
};
//nuevoRuben.search(peliSearch).then(p => console.log(p));
