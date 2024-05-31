$(document).ready(function() {
    const apiUrl = 'https://rickandmortyapi.com/api/character';
    const charactersContainer = $('#characters-container');
    const searchInput = $('#search');
  
    // Fetch characters from API
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayCharacters(data.results);
  
        // Search functionality
        searchInput.on('input', function() {
          const searchTerm = $(this).val().toLowerCase();
          const filteredCharacters = data.results.filter(character => character.name.toLowerCase().includes(searchTerm));
          displayCharacters(filteredCharacters);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  
    function displayCharacters(characters) {
      charactersContainer.empty();
      characters.forEach(character => {
        const characterDiv = $('<div class="character"></div>');
        const characterImg = $('<img>').attr('src', character.image);
        const characterName = $('<h3>').text(character.name);
        const characterStatus = $('<p>').text('Status: ' + character.status);
        
        characterDiv.append(characterImg, characterName, characterStatus);
  
        // Add class based on status
        if (character.status.toLowerCase() === 'alive') {
          characterDiv.addClass('alive');
        } else if (character.status.toLowerCase() === 'dead') {
          characterDiv.addClass('dead');
        } else {
          characterDiv.addClass('unknown');
        }
  
        charactersContainer.append(characterDiv);
      });
    }
  });