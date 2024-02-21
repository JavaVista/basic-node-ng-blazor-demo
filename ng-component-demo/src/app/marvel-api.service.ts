import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import md5 from 'md5';

@Injectable({
  providedIn: 'root'
})
export class MarvelApiService {
  private publicKey = environment.PUBLIC_KEY;
  private privateKey = environment.PRIVATE_KEY;

  constructor() { }

  async fetchCharacter(characterName: string): Promise<any> {
    const ts = new Date().getTime();
    const hash = md5(ts + this.privateKey + this.publicKey);
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${this.publicKey}&hash=${hash}&name=${characterName}`;
    return fetch(url).then((res) => res.json());
  }

  async fetchCharactersThatStartWith(characterName: string): Promise<any> {
    const ts = new Date().getTime();
    const hash = md5(ts + this.privateKey + this.publicKey);
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${this.publicKey}&hash=${hash}&nameStartsWith=${characterName}`;
    return fetch(url).then((res) => res.json());
  }
}
