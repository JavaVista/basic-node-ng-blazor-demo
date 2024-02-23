function setMarvelApiService(componentSelector, service) {
    const component = document.querySelector(componentSelector);
    console.log(component);
    if (component) {
        component.apiService = service; 
    }
}
