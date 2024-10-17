// LOGICA DEL CALENDARIO

// fase iniziale: cercare di capire in che mese siamo (per riempire l'h1) e quante celle sono da creare per la sezione "calendar", a seconda della data corrente; ogni volta che apriremo il calendario ci aspetteremo un numero di giorni congruo.

const now = new Date() // genero un oggetto di tipo Date nel browser
// questo oggetto può venire generato in qualsiasi momento e costruisce un riferimento all'attuale "momento storico"

const monthNames = [
  'Gennaio', // 0
  'Febbario', // 1
  'Marzo', // 2
  'Aprile', // 3
  'Maggio', // 4
  'Giugno', // 5
  'Luglio', // 6
  'Agosto', // 7
  'Settembre', // 8
  'Ottobre', // 9
  'Novembre', // 10
  'Dicembre', // 11
]

// divido il codice in FUNZIONI, in modo da tenerlo ordinato e riutilizzabile
const printCurrentMonthInH1 = function () {
  // questa è una funzione che si occupa di riempire l'header
  const h1 = document.querySelector('h1')
  const monthIndex = now.getMonth() // <-- 9 per ottobre: sarebbe un perfetto indice per selezionare l'elemento giusto da "monthNames"
  const currentMonth = monthNames[monthIndex] // monthNames[9] in ottobre, quindi
  // la stringa "Ottobre"
  h1.innerText = currentMonth + ' ' + now.getFullYear() // getFullYear() torna l'ANNO
}

// qui invoco le funzioni che dovranno venire eseguite all'avvio della pagina
// stampo il mese corrente nell'h1
printCurrentMonthInH1() // <-- viene invocata all'avvio

// genererò il numero di celle giusto per la sezione "calendar"
