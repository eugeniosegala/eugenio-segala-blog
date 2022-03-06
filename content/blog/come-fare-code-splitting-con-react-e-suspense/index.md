---
title: Come fare Code Splitting con React e Suspense
date: "2018-11-13T13:00:00.000Z"
description: Recentemente il team di React ha aggiunto la possibilità di importare dinamicamente i componenti grazie ad un metodo chiamato "lazy", per poi richiamarli con Suspense. Questa nuova funzionalità semplifica ancora di più il code-splitting.
---

Se leggi questo blog probabilmente avrai notato la mia particolare attenzione alle performance verso le applicazioni
client. Infatti tempo addietro ho pubblicato
l’articolo: [Come fare Code Splitting con React e WebPack](/come-fare-code-splitting-con-react-e-webpack/).

**Parlavo appunto della possibilità di “splittare” la propria applicazione in piccoli “chuncks” per renderla più
performante.**

Recentemente però il team di **React** ha aggiunto la possibilità di **importare dinamicamente** i componenti
grazie a `lazy`, per poi richiamarli con `Suspense`. Questa nuova funzionalità semplifica ancora di più la procedura
esaminata nel precedentemente articolo.

Ci tengo a precisare che questo post fa riferimento alla versione **16.6** di React. **Quindi se è necessario aggiornare
la libreria.**

Vediamo dunque nel dettaglio come è possibile utilizzare questa nuova funzionalità di React.

Prima di tutto dobbiamo importare nel nostro componente, `Suspense`:

`import React, { Component, Suspense } from 'react';`

Immaginiamo dunque, di voler importare un componente React, la sintassi tradizionale come volti di voi sapranno, è la
seguente:

`import Prodotti from './containers/Prodotti';`

Se volessimo invece caricarlo dinamicamente, dovremmo utilizzare appunto `lazy`. A questo punto la sintassi dovrebbe
essere:

`const Prodotti = React.lazy(() => import('./containers/Prodotti'));`

Come avrete notato abbiamo associato il componente ad una costante, passandolo come argomento a `lazy`, che permette di
importarlo dinamicamente.

Dopoché possiamo richiamare il componente (ad esempio all’interno di una rotta con il metodo `render`) grazie
a `Suspense`:

```jsx
<Route
 path="/prodotti"
 render={() => (
   <Suspense fallback={<div>Caricamento...</div>}>
     <Prodotti />
   </Suspense>
 )}
/>
```

Prima di `Suspense` era necessario creare un componente **HOC (higher-order component)** che “wrappava” il componente
importato. Ora possiamo farlo automaticamente, ed è anche possibile mostrare un messaggio di caricamento in
una `fallback` direttamente gestita da `Suspense`.

Naturalmente è possibile richiamare il componente anche al di fuori delle rotte con molta facilità:

```jsx
{this.state.prodotti &&
  <Suspense fallback={<div>Caricamento...</div>}>
    <Prodotti/>
  </Suspense>
}
```

Insomma, per quanto mi riguarda queste novità rendono ancora più fruibili concetti come il code splitting avvicinandoli
anche ad utenti novizi a questa libreria.

**E’ importante sapere che:** suddividere tutta l’applicazione in chunk è controproducente in quando obbligheremo
l’utente a effettuare chiamate ad altri file senza motivo. L’applicativo sarà più piccolo in termini di dimensione, ma
più lento in termini di caricamento a causa della risposta.
