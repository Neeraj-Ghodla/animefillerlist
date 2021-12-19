import axios  from "axios";
import HtmlParser, { Show, Episode } from "./htmlParser";

class AnimeFillerList {

  private htmlParser = new HtmlParser();
  private static BASE_URL = 'https://animefillerlist.com/shows/';

  async listShows(): Promise<Show[]> {
    const html = (await axios.get(AnimeFillerList.BASE_URL)).data;
    return this.htmlParser.parseShowList(html);
  }

  async getShow(show: string): Promise<Episode[]> {
    const url = encodeURI(`${AnimeFillerList.BASE_URL}/${show}`);
    const html = (await axios.get(url)).data;
    return this.htmlParser.parseShow(html);
  }

}

export default AnimeFillerList;