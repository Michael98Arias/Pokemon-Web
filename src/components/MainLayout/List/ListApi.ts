import HttpService from '../../../shared/services/HttpService';

import {ListInitial, DataItem } from './interfaces/List';

class ListApi {
    public ListInitialApi = (): Promise<ListInitial> => {
		const url = 'pokemon'
		return HttpService.get(url)
	};
	public DataItemApi = (name:string): Promise<DataItem> => {
		const url = `pokemon/${name}`
		return HttpService.get(url)
	};
}

export default new ListApi();
