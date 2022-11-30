import { renderBlock } from './lib.js';
export function renderSearchFormBlock(checkInDate, checkOutDate) {
    const todayDate = new Date().toISOString().slice(0, 10);
    const minYear = new Date().toISOString().slice(0, 4);
    const minMonth = new Date().toISOString().slice(5, 7);
    //дата въезда. Если нет, то по умолчанию + 1 день от текущего дня 
    const checkInDateDefault = new Date(new Date());
    checkInDateDefault.setDate(new Date().getDate() + 1);
    const checkInDateDefault1 = checkInDateDefault.toISOString().slice(0, 10);
    const checkInDateStr = (checkInDate === null || checkInDate === void 0 ? void 0 : checkInDate.toISOString().slice(0, 10)) || checkInDateDefault1;
    // дата выезда. по умолчанию (+2 дня от даты въезда)
    const checkOutDateDefault = new Date(new Date(checkInDateStr));
    checkOutDateDefault.setDate(new Date(checkInDateStr).getDate() + 2);
    const checkOutDateDefault1 = checkOutDateDefault.toISOString().slice(0, 10);
    const checkOutDateStr = (checkOutDate === null || checkOutDate === void 0 ? void 0 : checkOutDate.toISOString().slice(0, 10)) || checkOutDateDefault1;
    // максимальная дата в календаре, которую можно указать.
    // Это последний день следующего месяца
    const maxDateFull = new Date(Number(minYear), Number(minMonth) + 1, 0);
    const maxDay = maxDateFull.getDate();
    const maxMounth = maxDateFull.getMonth() + 1;
    const maxYear = maxDateFull.getFullYear();
    const maxDate = `${maxYear}-${maxMounth}-${maxDay}`;
    renderBlock('search-form-block', `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
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
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VhcmNoLWZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUd2QyxNQUFNLFVBQVUscUJBQXFCLENBQ25DLFdBQWtCLEVBQ2xCLFlBQW1CO0lBRW5CLE1BQU0sU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN4RCxNQUFNLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckQsTUFBTSxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXRELGtFQUFrRTtJQUNsRSxNQUFNLGtCQUFrQixHQUFHLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNoRCxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRCxNQUFNLG1CQUFtQixHQUFHLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUUsTUFBTSxjQUFjLEdBQ2xCLENBQUEsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxLQUFJLG1CQUFtQixDQUFDO0lBRWpFLG9EQUFvRDtJQUNwRCxNQUFNLG1CQUFtQixHQUFHLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsbUJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLE1BQU0sb0JBQW9CLEdBQUcsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RSxNQUFNLGVBQWUsR0FDbkIsQ0FBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUksb0JBQW9CLENBQUM7SUFFbkUsd0RBQXdEO0lBQ3hELHVDQUF1QztJQUN2QyxNQUFNLFdBQVcsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN2RSxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDckMsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsTUFBTSxPQUFPLEdBQUcsR0FBRyxPQUFPLElBQUksU0FBUyxJQUFJLE1BQU0sRUFBRSxDQUFDO0lBRXBELFdBQVcsQ0FDVCxtQkFBbUIsRUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7OzBEQWlCc0QsY0FBYyxRQUFRLFNBQVMsUUFBUSxPQUFPOzs7OzJEQUk3QyxlQUFlLFFBQVEsU0FBUyxRQUFRLE9BQU87Ozs7Ozs7Ozs7OztLQVlyRyxDQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVuZGVyQmxvY2sgfSBmcm9tICcuL2xpYi5qcyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNlYXJjaEZvcm1CbG9jayhcbiAgY2hlY2tJbkRhdGU/OiBEYXRlLFxuICBjaGVja091dERhdGU/OiBEYXRlXG4pIHtcbiAgY29uc3QgdG9kYXlEYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKTtcbiAgY29uc3QgbWluWWVhciA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCA0KTtcbiAgY29uc3QgbWluTW9udGggPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoNSwgNyk7XG5cbiAgLy/QtNCw0YLQsCDQstGK0LXQt9C00LAuINCV0YHQu9C4INC90LXRgiwg0YLQviDQv9C+INGD0LzQvtC70YfQsNC90LjRjiArIDEg0LTQtdC90Ywg0L7RgiDRgtC10LrRg9GJ0LXQs9C+INC00L3RjyBcbiAgY29uc3QgY2hlY2tJbkRhdGVEZWZhdWx0ID0gbmV3IERhdGUobmV3IERhdGUoKSk7XG4gIGNoZWNrSW5EYXRlRGVmYXVsdC5zZXREYXRlKG5ldyBEYXRlKCkuZ2V0RGF0ZSgpICsgMSk7XG4gIGNvbnN0IGNoZWNrSW5EYXRlRGVmYXVsdDEgPSBjaGVja0luRGF0ZURlZmF1bHQudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCk7IFxuICBjb25zdCBjaGVja0luRGF0ZVN0ciA9XG4gICAgY2hlY2tJbkRhdGU/LnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApIHx8IGNoZWNrSW5EYXRlRGVmYXVsdDE7XG5cbiAgLy8g0LTQsNGC0LAg0LLRi9C10LfQtNCwLiDQv9C+INGD0LzQvtC70YfQsNC90LjRjiAoKzIg0LTQvdGPINC+0YIg0LTQsNGC0Ysg0LLRitC10LfQtNCwKVxuICBjb25zdCBjaGVja091dERhdGVEZWZhdWx0ID0gbmV3IERhdGUobmV3IERhdGUoY2hlY2tJbkRhdGVTdHIpKTtcbiAgY2hlY2tPdXREYXRlRGVmYXVsdC5zZXREYXRlKG5ldyBEYXRlKGNoZWNrSW5EYXRlU3RyKS5nZXREYXRlKCkgKyAyKTtcbiAgY29uc3QgY2hlY2tPdXREYXRlRGVmYXVsdDEgPSBjaGVja091dERhdGVEZWZhdWx0LnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApO1xuICBjb25zdCBjaGVja091dERhdGVTdHIgPVxuICAgIGNoZWNrT3V0RGF0ZT8udG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCkgfHwgY2hlY2tPdXREYXRlRGVmYXVsdDE7XG4gIFxuICAvLyDQvNCw0LrRgdC40LzQsNC70YzQvdCw0Y8g0LTQsNGC0LAg0LIg0LrQsNC70LXQvdC00LDRgNC1LCDQutC+0YLQvtGA0YPRjiDQvNC+0LbQvdC+INGD0LrQsNC30LDRgtGMLlxuICAvLyDQrdGC0L4g0L/QvtGB0LvQtdC00L3QuNC5INC00LXQvdGMINGB0LvQtdC00YPRjtGJ0LXQs9C+INC80LXRgdGP0YbQsFxuICBjb25zdCBtYXhEYXRlRnVsbCA9IG5ldyBEYXRlKE51bWJlcihtaW5ZZWFyKSwgTnVtYmVyKG1pbk1vbnRoKSArIDEsIDApO1xuICBjb25zdCBtYXhEYXkgPSBtYXhEYXRlRnVsbC5nZXREYXRlKCk7XG4gIGNvbnN0IG1heE1vdW50aCA9IG1heERhdGVGdWxsLmdldE1vbnRoKCkgKyAxO1xuICBjb25zdCBtYXhZZWFyID0gbWF4RGF0ZUZ1bGwuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgbWF4RGF0ZSA9IGAke21heFllYXJ9LSR7bWF4TW91bnRofS0ke21heERheX1gO1xuIFxuICByZW5kZXJCbG9jayhcbiAgICAnc2VhcmNoLWZvcm0tYmxvY2snLFxuICAgIGBcbiAgICA8Zm9ybT5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cInNlYXJjaC1maWxlZHNldFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJjaXR5XCI+0JPQvtGA0L7QtDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaXR5XCIgdHlwZT1cInRleHRcIiBkaXNhYmxlZCB2YWx1ZT1cItCh0LDQvdC60YIt0J/QtdGC0LXRgNCx0YPRgNCzXCIgLz5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgZGlzYWJsZWQgdmFsdWU9XCI1OS45Mzg2LDMwLjMxNDFcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwicHJvdmlkZXJzXCI+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiaG9teVwiIGNoZWNrZWQgLz4gSG9teTwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm92aWRlclwiIHZhbHVlPVwiZmxhdC1yZW50XCIgY2hlY2tlZCAvPiBGbGF0UmVudDwvbGFiZWw+XG4gICAgICAgICAgPC9kaXY+LS0hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwiY2hlY2staW4tZGF0ZVwiPtCU0LDRgtCwINC30LDQtdC30LTQsDwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjaGVjay1pbi1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT0ke2NoZWNrSW5EYXRlU3RyfSBtaW49JHt0b2RheURhdGV9IG1heD0ke21heERhdGV9IG5hbWU9XCJjaGVja2luXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cImNoZWNrLW91dC1kYXRlXCI+0JTQsNGC0LAg0LLRi9C10LfQtNCwPC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNoZWNrLW91dC1kYXRlXCIgdHlwZT1cImRhdGVcIiB2YWx1ZT0ke2NoZWNrT3V0RGF0ZVN0cn0gbWluPSR7dG9kYXlEYXRlfSBtYXg9JHttYXhEYXRlfSBuYW1lPVwiY2hlY2tvdXRcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwibWF4LXByaWNlXCI+0JzQsNC60YEuINGG0LXQvdCwINGB0YPRgtC+0Lo8L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0IGlkPVwibWF4LXByaWNlXCIgdHlwZT1cInRleHRcIiB2YWx1ZT1cIlwiIG5hbWU9XCJwcmljZVwiIGNsYXNzPVwibWF4LXByaWNlXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj48YnV0dG9uPtCd0LDQudGC0Lg8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgIDwvZm9ybT5cbiAgICBgXG4gICk7XG59XG4iXX0=