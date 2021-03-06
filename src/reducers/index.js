import { LOADING, SUCCESS, ERROR, COUNTRY_CHANGED, CATEGORY_CHANGED, PAGE_CHANGED } from '../constants/constants';

const init = {
	data: [],
	statusCode:'200',
	status: 'initial',
	country: 'id',
	category: '',
	activePage: 1,
};

export default (state = init, action) => {
	switch(action.type) {
		case LOADING:
			return {...state,status:"loading"}
		case SUCCESS:
			return {...state,status:"success", data: action.items}
		case ERROR :
			return {...state,status:"error", statusCode: action.statusCode}
		case COUNTRY_CHANGED :
			return {...state,country:action.countryName}
		case CATEGORY_CHANGED :
			return {...state,category:action.categoryName}
		case PAGE_CHANGED :
			return {...state,activePage:action.activePage}
		default:
					return state;
	}
}