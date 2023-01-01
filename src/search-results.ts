import { renderBlock } from './lib.js'
import { PlaceList } from './IPlace.js';
import { IPlace } from './IPlace';

export function renderSearchStubBlock() {
  renderBlock(
    "search-results-block",
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage) {
  renderBlock(
    "search-results-block",
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function renderSearchResultsBlock(place: IPlace[]) {
  renderBlock(
    "search-results-block",
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list" id="placeBox">` +
      renderPlace(place) +
      `</ul>
    `
  );
  toggleFavoriteItem(place);
}

// export function getLocalStorage(key: string): PlaceList[] {
//   let favPlaces: PlaceList[] = [];
//   favPlaces = JSON.parse(localStorage.getItem(key));
//   return favPlaces;
// }

// function checkLocalStorageFavoriteItems(idPlace: number): number | null {
//   const favPlaces = getLocalStorage("favoriteItems");

//   if (favPlaces) {
//     const indexFavPlace = Number(favPlaces.find((x) => x.id === idPlace)?.id);
//     return indexFavPlace;
//   }
//   return null;
// }

function renderPlace(place: IPlace[]): string {
  let str = "";
  let classActive = "";
  const favPlaces = <PlaceList[]>(
    JSON.parse(localStorage.getItem("favoriteItems"))
  );
  for (const key in place) {
    if (favPlaces) {
      const indexFavPlace = Number(
        favPlaces.find((x) => x.id === place[key]["id"])?.id
      );
      if (indexFavPlace) {
        classActive = "active";
      } else {
        classActive = "";
      }
    }
    // if (checkLocalStorageFavoriteItems(place[key]["id"])) {
    //   classActive = "active";
    // } else {
    //   classActive = "";
    // }

    str =
      str +
      `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
           <div id="${place[key]["id"]}" class="favorites ${classActive}"></div>
            <img class="result-img" src="${place[key]["image"]}" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place[key]["name"]}</p>
              <p class="price">${place[key]["price"]}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i>${place[key]["remoteness"]}км от вас</div>
            <div class="result-info--descr">${place[key]["description"]}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>     
    `;
  }
  return str;
}

function toggleFavoriteItem(place: IPlace[]) {
  let idel = 0;
  //console.log("favPlaces1", favPlaces);
  document.addEventListener("click", (e) => {
    if ((e.target as Element).classList.contains("favorites")) {
      idel = Number((e.target as Element).getAttribute("id"));
      if ((e.target as Element).classList.contains("active")) {
        (e.target as Element).classList.remove("active");

        // favPlaces = <PlaceList[]>(
        //   JSON.parse(localStorage.getItem("favoriteItems"))
        // );
        // if (favPlaces) {
        //   console.log("favPlaces ", favPlaces);
        //   // console.log(
        //   //   "test ",
        //   //   favPlaces.find((x) => x.id === idel)
        //   // );
        //   const indexFavPlace = Number(favPlaces.find((x) => x.id === idel).id);

        //   console.log("indexFavPlace ", indexFavPlace);
        //   if (indexFavPlace) {
        //     favPlacesAfterDel = favPlaces.filter((x) => x.id !== idel);
        //     localStorage.removeItem("favoriteItems");
        //     localStorage.setItem(
        //       "favoriteItems",
        //       JSON.stringify(favPlacesAfterDel)
        //     );
        //   }
        // }
        // checkLocalStorageFavoriteItems
        const favPlaces = <PlaceList[]>(
          JSON.parse(localStorage.getItem("favoriteItems"))
        );
        console.log("favPlaces1 ", favPlaces);
        if (favPlaces) {
          const indexFavPlace = Number(
            favPlaces.find((x) => x.id === idel)?.id
          );
          if (indexFavPlace) {
            const favPlacesAfterDel = favPlaces.filter((x) => x.id !== idel);
            localStorage.removeItem("favoriteItems");
            localStorage.setItem(
              "favoriteItems",
              JSON.stringify(favPlacesAfterDel)
            );
          }
        }

        // if (checkLocalStorageFavoriteItems(idel)) {
        //   const favPlacesAfterDel = getLocalStorage("favoriteItems").filter(
        //     (x) => x.id !== idel
        //   );
        //   localStorage.removeItem("favoriteItems");
        //   localStorage.setItem(
        //     "favoriteItems",
        //     JSON.stringify(favPlacesAfterDel)
        //   );
        // }
      } else {
        (e.target as Element).classList.add("active");

        const elemF: IPlace = place.find((x) => x.id === idel);

        const elemFavorites: PlaceList = {
          id: elemF.id,
          name: elemF.name,
          image: elemF.image,
        };
        // checkLocalStorageFavoriteItems

        const favPlaces = <PlaceList[]>(
          JSON.parse(localStorage.getItem("favoriteItems"))
        );
        console.log("favPlaces ", favPlaces);
        if (favPlaces) {
          const indexFavPlace = Number(
            favPlaces.find((x) => x.id === idel)?.id
          );
          if (!indexFavPlace) {
            console.log("test");
            favPlaces.push(elemFavorites);
            localStorage.setItem("favoriteItems", JSON.stringify(favPlaces));
          }
        } else {
          localStorage.setItem(
            "favoriteItems",
            JSON.stringify([elemFavorites])
          );
        }

        // if (!checkLocalStorageFavoriteItems(idel)) {
        //   // console.log("test");
        //   // let favPlaces = getLocalStorage("favoriteItems");
        //   // favPlaces.push(elemFavorites);
        //   localStorage.setItem(
        //     "favoriteItems",
        //     JSON.stringify(getLocalStorage("favoriteItems").push(elemFavorites))
        //   );
        // } else {
        //   localStorage.setItem("favoriteItems", JSON.stringify([elemFavorites]));
        // }
      }
    }
  });
}

