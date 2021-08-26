let pokemonRepository = (function() {   
  let modalContainer = document.querySelector('modal-container');
  let modal = document.querySelector('.modal');
  let modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
  let pokemenName = document.createElement('h1');
    pokemenName.classList.add('pokemen-name');
  let pokemenHeight = document.createElement('p');
    pokemenHeight.classList.add('pokemen-height');
  let pokemenType = document.createElement('p');
    pokemenType.classList.add('pokemen-type');

  let imageContainer = document.createElement('div');
    imageContainer.classList.add('img-container');
  let pokemenImage = document.createElement('img');
    pokemenImage.classList.add('pokemen-image');

  // PokemenList empty array
  let PokemenList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; // API variable

    function add(pokemen) {
      if (
      typeof pokemen === 'object' &&
      'name' in pokemen /*&&
      "detailsUrl" in pokemen*/
      ) {
      PokemenList.push(pokemen);
      } else {
      console.log("pokemon is not correct");
      }
    }

    function getAll() {
        return PokemenList;
      } 

    function addListItem(pokemen){
    let pokemenList = document.querySelector(".pokemen-list");
    let listpokemen = document.createElement("li");
    let button = document.createElement("button");
      button.innerText = pokemen.name.toUpperCase();
      button.classList.add("button-class");
      listpokemen.appendChild(button);
      pokemenList.appendChild(listpokemen);
      button.addEventListener('click', function(event){
        showDetails(pokemen);
      });
    }

    // dialogPromiseReject; // FOR LATER USE

    // SHOW MODAL FUNCTION
    function showModal(title, text) {
      modalContainer.classList.add('is visible');
    }

    // HIDE MODAL FUNCTION
    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

      // CLOSE MODAL
      modalClose.addEventListener('click', hideModal);

      // WHEN ESC IS PRESSED TO CLOSE TO MODAL
      window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
      });

      // WHEN OUTSIDE THE MODAL IS CLICKED
      modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
        if (target === modalContainer) {
        hideModal();
        }
      });

      function showDetails(pokemen){
        loadDetails(pokemen).then(function () {
          pokemenName.innerHTML = pokemen.name;
          pokemenHeight.innerHTML = 'Height: ' + pokemen.height;
          pokemenType.innerHTML = 'Type: ' + pokemen.types;
          pokemenImage.src = pokemen.imageUrl;
          modalClose.innerHTML = "Close";
          showModal();
          });
    
        modal.appendChild(modalClose);
        modal.appendChild(pokemenName);
        modal.appendChild(pokemenHeight);
        modal.appendChild(pokemenType);
        // modalContainer.appendChild(modal);
        modal.appendChild(imageContainer);
        imageContainer.appendChild(pokemenImage);
        }

  // AFTER ADDING MODAL
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemen = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemen);
        console.log(pokemen);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types[0].type.name;
    }).catch(function (e) {
      console.error(e);
    })
  }

  // insert the return statement of the IIFE here
    return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
    };

})();

  Object.keys(pokemenRepository).forEach(function(property) {
    console.log(pokemenRepository[property]);
  });

  // pokemenRepository.add({ name: 'Kris' });
    // console.log(pokemenRepository.getAll());

  //cleaner forEach() code using myLoopFunction -- updated to include new IIFE
    pokemenRepository.loadList().then(function() {
      pokemenRepository.getAll().forEach(function(pokemen) {
      pokemenRepository.addListItem(pokemen);
      });
    });

  let result = pokemenRepository.getAll().filter(pokemen => pokemen.length > 4);
    console.log(result);







 