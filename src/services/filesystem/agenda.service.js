import { __dirname } from '../../utils.js';
import fs from 'fs';

export default class SistemasService {
  _agenda;
  _dirPath;
  _filePath;
  _fs;

  constructor() {
    this._agenda = new Array();
    this._dirPath = __dirname + '/files/data';
    this._filePath = this._dirPath + "/agenda/agenda.json";
    this._fs = fs;
  }

  async _prepararDirectorioBase() {
    await this._fs.promises.mkdir(this._dirPath, { recursive: true });
    if (!this._fs.existsSync(this._filePath)) {
      await this._fs.promises.writeFile(this._filePath, "[]");
    }
  }

  async save(tel) {
    tel.id = Math.floor(Math.random() * 20000 + 1);
    try {
      await this._prepararDirectorioBase();
      this._agenda = await this.getAll();
      this._agenda.push(tel);
      await this._fs.promises.writeFile(this._filePath, JSON.stringify(this._agenda));
      return tel;
    } catch (error) {
      console.error(`Error guardando recurso, detalle del error: ${error}`);
      throw Error(`Error guardando recurso, detalle del error: ${error}`);
    }
  }

  async getAll() {
    try {
      await this._prepararDirectorioBase();
      let data = await this._fs.promises.readFile(this._filePath, "utf-8");
      this._agenda = JSON.parse(data);
      return this._agenda;
    } catch (error) {
      throw Error(`Error consultando la agenda por archivo, valide el archivo: ${this._dirPath}, detalle del error: ${error}`);
    }
  }

  // obtener un tel por id 
  async getById(id) {
    try {
      this._agenda = await this.getAll();
      let tel = this._agenda.find(s => s.id == id);
      if (!tel) {
        throw Error(`No se encontró el telefono con id: ${id}`);
      }
      return tel;
    } catch (error) {
      throw Error(`Error consultando a la agenda por id, detalle del error: ${error}`);
    }
  }

  // actualizar un telefono por id
  async update(id, telefono) {
    try {
      this._agenda = await this.getAll();
      let agendaIndex = this._agenda.findIndex(s => s.id == id);
      if (agendaIndex == -1) {
        throw Error(`No se encontró el telefono con id: ${id}`);
      }
      this._agenda[agendaIndex] = {
        ...this._agenda[agendaIndex],  // Mantener lo que ya tenía
        ...telefono                   // Cambiar lo que trae 
      };
      await this._fs.promises.writeFile(this._filePath, JSON.stringify(this._agenda));
      return telefono;
    } catch (error) {
      throw Error(`Error actualizando el telefono, detalle del error: ${error}`);
    }
  }

  //borrar un tel 
  async delete(id) {
    try {
      this._agenda = await this.getAll();
      let agendaIndex = this._agenda.findIndex(s => s.id == id);
      if (agendaIndex == -1) {
        throw Error(`No se encontró el telefono con id: ${id}`);
      }
      this._agenda.splice(agendaIndex, 1);
      await this._fs.promises.writeFile(this._filePath, JSON.stringify(this._agenda));
    } catch (error) {
      throw Error(`Error eliminando el telefono, detalle del error: ${error}`);
    }
  }
};