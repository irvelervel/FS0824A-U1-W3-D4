// LOGICA DEL CALENDARIO

// fase iniziale: cercare di capire in che mese siamo (per riempire l'h1) e quante celle sono da creare per la sezione "calendar", a seconda della data corrente; ogni volta che apriremo il calendario ci aspetteremo un numero di giorni congruo.

const now = new Date() // genero un oggetto di tipo Date nel browser
// questo oggetto può venire generato in qualsiasi momento e costruisce un riferimento all'attuale "momento storico"

const monthNames = [
  'Gennaio', // 0
  'Febbraio', // 1
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

// bozza per calcolare il numero dei giorni dei mesi, ma abbiamo trovato un modo migliore
// const numberOfDays = [
//     31,
//     28,
//     30
// ]

// DOVE VERRANNO SALVATI GLI APPUNTAMENTI DEL CALENDARIO?
// una "cassettiera"
// un array con tot elementi (30, 31, 28, 29)
// in ogni elemento (cassetto) corrispondente alla giornata, potremmo stivare
// INFINITI elementi

// ottobre sarà più o meno così
// [
//     [], [], [], [], [], [], [], [], [], [],
//     [], [], [], [], [], [], [], [], [], [],
//     [], [], [], [], [], [], [], [], [], [],
//     []
// ]

const appointments = [
  // va bene come "guscio", qui dentro però ci dovranno finire tanti array
  // quanti sono i giorni del mese
]

// divido il codice in FUNZIONI, in modo da tenerlo ordinato e riutilizzabile
const printCurrentMonthInH1 = function () {
  // questa è una funzione che si occupa di riempire l'header
  // selezioniamo l'h1 nel DOM
  const h1 = document.querySelector('h1')
  // vado a estrarre da "now" l'indice
  const monthIndex = now.getMonth() // <-- 9 per ottobre: sarebbe un perfetto indice per selezionare l'elemento giusto da "monthNames"
  const currentMonth = monthNames[monthIndex] // monthNames[9] in ottobre, quindi
  // la stringa "Ottobre"
  h1.innerText = currentMonth + ' ' + now.getFullYear() // getFullYear() torna l'ANNO
}

// genererò il numero di celle giusto per la sezione "calendar"
// cercare di capire QUANTE celle creare!
// proviamo a calcolare il numero dei giorni del mese corrente così: prendiamo la data di oggi, troviamo il mese successivo, andiamo al suo primo giorno e SOTTRAIAMO un giorno: otterremo l'ultimo giorno del mese corrente, che è anche il numero dei giorni di questo mese.
const numberOfDaysInThisMonth = function () {
  const currentYear = now.getFullYear() // 2024

  const currentMonth = now.getMonth() // 9

  // quello di cui ho bisogno è ottenere l'ULTIMO giorno del mese in corso,
  // perchè tale numero corrisponde anche al numero dei giorno di questo mese

  // per farlo mi genero una data in cui fornisco l'anno corrente, il mese SUCCESSIVO
  // e -tolgo- un giorno
  const lastDayDate = new Date(currentYear, currentMonth + 1, 0) // la data del 31 ottobre
  // la data create è del 31 ottobre (oggi che siamo il 17) perchè ho fornito
  // - l'anno corrente
  // - il mese successivo
  // - il giorno 0 di quel mese (che vorrebbe dire togliere un giorno a questa data)

  console.log(lastDayDate) // 31 ottobre!

  const numberOfDays = lastDayDate.getDate() // dalla data del 31 ottobre, estraggo il giorno del mese, cioè il numero 31
  return numberOfDays
  // questa funzione serve solo a CALCOLARE il numero dei giorni del mese
  // una volta calcolato che il numero dei giorni è pari alla data dell'ultimo giorno del mese, lo RITORNO dalla funzione; ritornarlo mi permette di finire, chiudere questa funzione e fornire questo numero dei giorni per un momento successivo

  // ti fornisce il dato e con il return puoi utilizzare questo dato successivamente
}

const unselectPreviousCell = function () {
  // lo scopo di questa funzione è ripulire le celle da eventuali classi "selected"

  // approccio BULLDOZER
  // trovo un array di TUTTE LE CELLE
  const allTheCells = document.getElementsByClassName('day')
  for (let i = 0; i < allTheCells.length; i++) {
    // per ogni cella, rimuovo un eventuale classe "selected"
    allTheCells[i].classList.remove('selected')
    // questa operazione NON danneggia eventuali celle che NON hanno la classe "selected"
  }

  // approccio "sniper"
  // vado a trovare la precedente cella con "selected"
  // ...
  // e gliela tolgo
  // ...
}

const changeDayInSpan = function (i) {
  console.log('I VALE', i)
  // prendo il valore della cella su cui sto cliccando e lo inserisco nello span
  // "Click on a Day", a sx del form
  const spanToReplace = document.getElementById('newMeetingDay')
  spanToReplace.innerText = i + 1
  spanToReplace.classList.add('hasDay')
}

const createDayCells = function () {
  // qui creerò tutte le celle per la sezione "calendar"
  // le individuo grazie al numero dei giorni del mese corrente, che mi dirà
  // quante celle creare

  // prendiamo il riferimento alla sezione "calendar"
  const calendarSection = document.getElementById('calendar')
  // <section id="calendar"></section>

  // recupero il numero dei giorni del mese corrente
  const daysInThisMonth = numberOfDaysInThisMonth() // 31
  console.log('NUMERO DELLE CELLE DA CREARE', daysInThisMonth)

  // CICLO per generare le celle, devo generare un numero "daysInThisMonth" di celle
  for (let i = 0; i < daysInThisMonth; i++) {
    // 31 volte (in ottobre)
    // per ogni giorno del mese...

    // ...riempio la "cassettiera" con un "cassetto"
    appointments.push([])
    // alla fine del for avrà generato per ottobre 31 sotto-array

    // ...creo una cella
    const dayCell = document.createElement('div')
    // <div></div>
    dayCell.classList.add('day') // applico una classe CSS
    // <div class="day"></div>

    // prima di proseguire, rendo la cella CLICCABILE
    dayCell.addEventListener('click', function (e) {
      // prima cosa: togliamo la classe "selected" da qualsiasi precedente selezione
      unselectPreviousCell()

      // "selezioniamo" la cella (diamogli la classe "selected")
      dayCell.classList.add('selected')

      // cambio il contenuto dello span a sx del form
      changeDayInSpan(i)
      // questa funzione necessita dell'indice del for per funzionare,
      // perchè deve riempire lo span in basso con il giorno del mese
      // che recuperiamo grazie a i + 1
      // poichè abbiamo spostato la funzione fuori dal ciclo for, la i
      // non è più disponibile all'interno della funzione; per risolvere,
      // passiamo la i alla funzione COME PARAMETRO, in modo che il suo
      // i + 1 continui ad essere definito
    })

    // abbiamo creato la cella, inseriamoci il contenuto
    const cellValue = document.createElement('h3')
    cellValue.innerText = i + 1 // da 1 a 31 (in ottobre)

    // postilla: cerchiamo di colorare in modo diverso la giornata di oggi
    const today = now.getDate() // oggi ritorna 17

    if (i + 1 === today) {
      // entro in questo if solo per una cella, quella la cui etichetta
      // corrisponde alla giornata di oggi (es. 17)
      cellValue.classList.add('color-epic') // colore viola
    }

    // appendiamo l'h3 alla cella
    dayCell.appendChild(cellValue)
    // appendo il div alla section
    calendarSection.appendChild(dayCell)
  }
}

// qui invoco le funzioni che dovranno venire eseguite all'avvio della pagina
// stampo il mese corrente nell'h1
printCurrentMonthInH1() // <-- viene invocata all'avvio
createDayCells() // <-- viene invocata all'avvio
console.log('CASSETTIERA', appointments)
