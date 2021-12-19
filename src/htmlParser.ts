import { JSDOM } from 'jsdom';
import { notEmpty } from './helpers';

type EpisodeType = 'MANGA CANON' | 'ANIME CANON' | 'MIXED CANON/FILLER' | 'FILLER';

export type Episode = {
  number: number;
  title: string;
  type: EpisodeType;
  airDate: Date;
};

export type Show = {
  name: string;
  searchableName: string;
};

class HtmlParser {

  parseShowList(html: string): Show[] {
    const dom = new JSDOM(html);
    const showList = dom.window.document.querySelector('#ShowList') as HTMLDivElement;
    const showGroups = showList.querySelectorAll('.Group') as NodeListOf<HTMLDivElement>;
    const shows = Array.from(showGroups)
      .map(showGroup => showGroup.querySelectorAll('ul > li > a'))
      .map(showGroup => Array.from(showGroup))
      .flat() as HTMLAnchorElement[];

    return Array.from(shows)
      .filter(notEmpty)
      .map(show => ({
        name: show.textContent!!,
        searchableName: show.href.split('/').pop()!!
      }));
  }

  parseShow(html: string): Episode[] {
    const dom = new JSDOM(html);
    const episodeList = dom.window.document.querySelector('table.EpisodeList') as HTMLTableElement;
    const episodes = Array.from(episodeList.querySelectorAll('tr'))
      .filter(episode => episode.id.startsWith('eps'));

    return episodes.map(episode => ({
      number: parseInt(episode.querySelector('.Number')!!.textContent as string, 10),
      title: episode.querySelector('.Title')!!.textContent as string,
      type: episode.querySelector('.Type')!!.textContent as EpisodeType,
      airDate: new Date(episode.querySelector('.Date')!!.textContent as string),
    }));
  }

}

export default HtmlParser;