function checkNull(obj, defaultReturn) {
	if (obj) {
		return obj;
	}
	return defaultReturn ;
}

export default checkNull;