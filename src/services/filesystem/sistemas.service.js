import { __dirname } from '../../utils.js';
import fs from 'fs';

export default class SistemasService {
  _sistemas;
  _dirPath;
  _filePath;
  _fs;

  constructor() {
    this._sistemas = new Array();
    this._dirPath = __dirname + '/files/data';
    this._filePath = this._dirPath + "/sistemas/sistemas.json";
    this._fs = fs;
  }

  async _prepararDirectorioBase() {
    await this._fs.promises.mkdir(this._dirPath, { recursive: true });
    if (!this._fs.existsSync(this._filePath)) {
      await this._fs.promises.writeFile(this._filePath, "[]");
    }
  }

  async save(sistema) {
    sistema.id = Math.floor(Math.random() * 20000 + 1);
    try {
      await this._prepararDirectorioBase();
      this._sistemas = await this.getAll();
      this._sistemas.push(sistema);
      await this._fs.promises.writeFile(this._filePath, JSON.stringify(this._sistemas));
      return sistema;
    } catch (error) {
      console.error(`Error guardando recurso, detalle del error: ${error}`);
      throw Error(`Error guardando recurso, detalle del error: ${error}`);
    }
  }

  async getAll() {
    try {
      await this._prepararDirectorioBase();
      let data = await this._fs.promises.readFile(this._filePath, "utf-8");
      this._sistemas = JSON.parse(data);
      return this._sistemas;
    } catch (error) {
      throw Error(`Error consultando los sistemas por archivo, valide el archivo: ${this._dirPath},
             detalle del error: ${error}`);
    }
  }

  // obtener un sistema por id 
  async getById(id) {
    try {
      this._sistemas = await this.getAll();
      let sistema = this._sistemas.find(s => s.id == id);
      if (!sistema) {
        throw Error(`No se encontró el sistema con id: ${id}`);
      }
      return sistema;
    } catch (error) {
      throw Error(`Error consultando el sistema por id, detalle del error: ${error}`);
    }
  }

  // actualizar un sistema por id
  async update(id, sistema) {
    try {
      this._sistemas = await this.getAll();
      let sistemaIndex = this._sistemas.findIndex(s => s.id == id);
      if (sistemaIndex == -1) {
        throw Error(`No se encontró el sistema con id: ${id}`);
      }
      this._sistemas[sistemaIndex] = {
        ...this._sistemas[sistemaIndex],  // Mantener lo que ya tenía
        ...sistema                   // Cambiar lo que trae nuevoSistema
      };
      await this._fs.promises.writeFile(this._filePath, JSON.stringify(this._sistemas));
      return sistema;
    } catch (error) {
      throw Error(`Error actualizando el sistema, detalle del error: ${error}`);
    }
  }
};