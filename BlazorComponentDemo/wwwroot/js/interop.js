window.marvelComponentInterop = {
    fetchCharacter: function (componentId, characterName) {
        const component = document.querySelector(`#${componentId}`);
        console.log(component)
        if (component && component.fetchCharacter) {
            component.fetchCharacter(characterName);
        } else {
            console.error("Component not found or fetchCharacter method not available.");
        }
    }
};

