import { renderBlock } from "./lib.js";
import { ISearchFormData } from "./ISearchFormData.js";
import { funcSearch, namesFields } from "./search-helpers.js";

export function renderSearchFormBlock(checkInDate?: Date, checkOutDate?: Date) {
  const todayDate = new Date().toISOString().slice(0, 10);
  const minYear = new Date().toISOString().slice(0, 4);
  const minMonth = new Date().toISOString().slice(5, 7);

  //дата въезда. Если нет, то по умолчанию + 1 день от текущего дня
  const checkInDateDefault = new Date(new Date());
  checkInDateDefault.setDate(new Date().getDate() + 1);
  const checkInDateDefault1 = checkInDateDefault.toISOString().slice(0, 10);
  const checkInDateStr =
    checkInDate?.toISOString().slice(0, 10) || checkInDateDefault1;

  // дата выезда. по умолчанию (+2 дня от даты въезда)
  const checkOutDateDefault = new Date(new Date(checkInDateStr));
  checkOutDateDefault.setDate(new Date(checkInDateStr).getDate() + 2);
  const checkOutDateDefault1 = checkOutDateDefault.toISOString().slice(0, 10);
  const checkOutDateStr =
    checkOutDate?.toISOString().slice(0, 10) || checkOutDateDefault1;

  // максимальная дата в календаре, которую можно указать.
  // Это последний день следующего месяца
  const maxDateFull = new Date(Number(minYear), Number(minMonth) + 1, 0);
  const maxDay = maxDateFull.getDate();
  const maxMounth = maxDateFull.getMonth() + 1;
  const maxYear = maxDateFull.getFullYear();
  const maxDate = `${maxYear}-${maxMounth}-${maxDay}`;

  function handleFormSubmit(
    e: SubmitEvent,
    namesFieldsForm: namesFields[],
    providers: string[]
  ) {
    e.preventDefault();
    if (e.target) {
      const dataForm = new FormData(e.target as HTMLFormElement);
      const dataRows: ISearchFormData = {};

      namesFieldsForm.forEach((el) => {
        dataRows[el] = dataForm.get(el);
      });
      dataRows["provider"] = providers;
      funcSearch(dataRows);
    }
  }

  renderBlock(
    "search-form-block",
    `
    <form id="form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value=${checkInDateStr} min=${todayDate} max=${maxDate} name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${checkOutDateStr} min=${todayDate} max=${maxDate} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
  const searchForm = document.getElementById("form");

  const namesFieldsForm: namesFields[] = ["checkin", "checkout", "price"];
  searchForm?.addEventListener("submit", (e) => {
    const providers: string[] = [];
    (e.target as Element)
      .querySelectorAll('input[name="provider"]:checked')
      .forEach((element) => {
        providers.push(element.getAttribute("value"));
      });

    handleFormSubmit(e, namesFieldsForm, providers);
  });
}
